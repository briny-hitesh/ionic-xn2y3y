import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PopoverController, IonContent } from '@ionic/angular';

import { SessionStorageService } from 'angular-web-storage';
import { UserJourneyApiService } from '../services/user-journey/user-journey-api/user-journey-api.service';
import { ScoreBoardService } from '../services/score-board/score-board.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.page.html',
  styleUrls: ['./task-board.page.scss']
})
export class TaskBoardPage implements OnInit, AfterViewInit {
  scoreHeadsUpInfo: any;
  svgHeight: number;
  circleCodes: {
    left: number;
    right: number;
    center: number;
    start: number;
  } = {
      left: 190,
      right: 400,
      center: 300,
      start: 50
  };
  xCodes: number[] = [
    300, 400, 300, 190
  ];
  size = {
    sm: 45,
    lg: 60,
    md: 50
  };
  level = 2;
  svgJson: Array<{
    size: number, color: string, enableClick: boolean, text: number, x: number, y: number, topText: string, bottomText: string
    }> = [];

  themeBackground: string[] = [
    '#0e314d', '#0e314d', '#091746', '#581461', '#bc4549', '#bd8636', '#5e852a', '#46988c'
  ];

  @ViewChild('content', {static: true}) content: IonContent;
  @ViewChild('currentGroup', {static: true}) currentGroup: ElementRef;
  constructor(
    private router: Router,
    private userJourneyService: UserJourneyApiService,
    public PopupController: PopoverController,
    private scoreHeadsUpService: ScoreBoardService,
    private sessionStorageService: SessionStorageService
  ) {}

  userJourney: any;
  heightSize: any;
  previousGroup: any;

  ngOnInit(): void {
    this.getuserJourneyApiResults();
    this.userJourneyService.getuserJourneyTask().subscribe((res: any) => {
      this.sessionStorageService.set('group', this.previousGroup);
    });
    this.getScoreHeadsUpInfo();
    // this.setupScroll();
  }

  ngAfterViewInit() {
    const eleRef: any = document.getElementById('current');
    const currentGroup: any = document.getElementById('currentGroup');
    if (eleRef) {
      const scroll = Number(eleRef.getAttribute('cy'));
      if (scroll) {
        this.content.scrollByPoint(0, (scroll - 150), 1000);
      }
      currentGroup.onmouseover = ((event: MouseEvent) => {
        const cy = eleRef.getAttribute('cy');
        currentGroup.setAttribute('transform', `translate(300, ${cy}) scale(1.2) translate(-300, -${cy})`);
        eleRef.setAttribute('filter', 'url(#shadow)');
      });
      currentGroup.onmouseleave = ((event: MouseEvent) => {
        currentGroup.setAttribute('transform', 'scale(1) translate(0, 0)');
        eleRef.setAttribute('filter', '');
      });
    }
  }

  getScoreHeadsUpInfo() {
    this.scoreHeadsUpService.getData().subscribe(res => {
      this.scoreHeadsUpInfo = res;
    });
  }


  getuserJourneyApiResults() {
    this.userJourneyService.getuserJourneyTask().subscribe(res => {
      this.userJourney = res;
      this.setupSVGData();
    });
  }

  setLevel(currentGroup) {
    if (currentGroup <= 25) {
      this.level = 1;
    } else if (currentGroup <= 50) {
      this.level = 2;
    } else if (currentGroup <= 75) {
      this.level = 3;
    } else if (currentGroup <= 100) {
      this.level = 4;
    } else if (currentGroup <= 125) {
      this.level = 5;
    } else if (currentGroup <= 150) {
      this.level = 6;
    } else if (currentGroup <= 175) {
      this.level = 7;
    }
  }

  setupSVGData(): void {
    let d = 0;
    const current = 'current';
    const previous = 'previous';
    const currentGroup = Number(this.userJourney[current].Group);
    let index: number;
    this.setLevel(currentGroup);
    const totalBlock = 25 * this.level;
    const firstBlock = totalBlock - 25;
    if (currentGroup < totalBlock) {
      index = totalBlock - currentGroup;
    }
    for (let i = 0; i < index; i++) {
      this.svgJson.push({
        size: this.size.md,
        color: '',
        enableClick: false,
        text: this.userJourney[current].Group + (index - i),
        x: this.xCodes[d],
        y: this.circleCodes.start,
        topText: '',
        bottomText: ''
      });
      if (d === 3 ) {
        d = -1;
      }
      d++;
    }
    const completedTask = (this.userJourney[current].TotalNoOfTaskCompleted / this.userJourney[current].Threshold) * 100;
    this.svgJson.push({
      size: this.size.lg,
      color: 'green',
      enableClick: true,
      text: this.userJourney[current].Group,
      x: this.xCodes[d],
      y: this.circleCodes.start,
      topText: 'Keep Going...',
      bottomText: completedTask + '% Completed'
    });
    d++;
    const keys = Object.keys(this.userJourney[previous]);
    console.log(firstBlock);
    keys.forEach((key, i) => {
      if (firstBlock >  this.userJourney[previous][keys[keys.length - (i + 1)]].Group) {
        return;
      }
      this.svgJson.push({
        size: this.size.sm,
        color: 'blue',
        enableClick: false,
        text: this.userJourney[previous][keys[keys.length - (i + 1)]].Group,
        x: this.xCodes[d],
        y: this.circleCodes.start,
        topText: '',
        bottomText: ''
      });
      if (d === 3 ) {
        d = -1;
      }
      d++;
    });
    this.svgHeight = (this.svgJson.length * 100) + 100;
  }
  openTaskView() {
    this.router.navigate(['home/view']);
  }
  setupScroll($event) {
    console.log($event);
  }
}
