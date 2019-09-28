import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { data } from './apirespons';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomePage implements AfterViewInit {
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
  }
  size = {
    sm: 45,
    lg: 60,
    md: 50
  }
  data = data;
  level = 3;
  svgJson: Array<{size: number, color: string, enableClick: boolean, text: number, x: number, y: number, topText: string, bottomText: string}> = [];
  themeBackground: string[] = [
    '#0e314d', '#0e314d', '#091746', '#581461', '#bc4549', '#bd8636', '#5e852a', '#46988c'
  ];
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    let d = 0;
    const current = 'current';
    const previous = 'previous';
    const currentGroup = Number(this.data[current].Group);
    let index: number;
    const totalBlock = 25 * this.level;
    if (currentGroup < totalBlock) {
      index = totalBlock - currentGroup;
    }
    let x: number;
    for (let i = 0; i < index; i++) {

      if (d === 0 || d === 2) {
        x = this.circleCodes.center;
      } else if (d === 1) {
        x = this.circleCodes.right;
      } else if (d === 3) {
        x = this.circleCodes.left;
        d = -1;
      }
      d++;
      this.svgJson.push({
        size: this.size.md,
        color: '',
        enableClick: false,
        text: this.data[current].Group + (index - i),
        x,
        y: this.circleCodes.start,
        topText: '',
        bottomText: ''
      });
    }
    if (d === 0 || d === 2) {
      x = this.circleCodes.center;
    } else if (d === 1) {
      x = this.circleCodes.right;
    } else if (d === 3) {
      x = this.circleCodes.left;
      d = -1;
    }
    d++;
    const completedTask = (this.data[current].TotalNoOfTaskCompleted / this.data[current].Threshold) * 100;
    this.svgJson.push({
      size: this.size.lg,
      color: 'green',
      enableClick: true,
      text: this.data[current].Group,
      x,
      y: this.circleCodes.start,
      topText: 'Keep Going...',
      bottomText: completedTask + '% Completed'
    });
    const keys = Object.keys(this.data[previous]);

    keys.forEach((key, i) => {
      if (d === 0 || d === 2) {
        x = this.circleCodes.center;
      } else if (d === 1) {
        x = this.circleCodes.right;
      } else if (d === 3) {
        x = this.circleCodes.left;
        d = -1;
      }
      d++;
      this.svgJson.push({
        size: this.size.sm,
        color: 'blue',
        enableClick: false,
        text: this.data[previous][keys[keys.length - (i + 1)]].Group,
        x,
        y: this.circleCodes.start,
        topText: '',
        bottomText: ''
      });
    });
  }

  ngAfterViewInit() {
    console.log('af')
    const eleRef: any = document.getElementById('current');
    const currentGroup: any = document.getElementById('currentGroup');
    if (eleRef) {
      const scroll = Number(eleRef.getAttribute('cy'));
      if (scroll) {
       // this.content.scrollByPoint(0, (scroll - 150), 1000);
      }
      currentGroup.onmouseover = ((event: MouseEvent) => {
        console.log('4545')
        currentGroup.setAttribute('style', 'transform: scale(1.2) translate(-51px, -345px)');
        eleRef.setAttribute('filter', 'url(#shadow)');
      });
      currentGroup.onmouseleave = ((event: MouseEvent) => {
        currentGroup.setAttribute('style', 'transform: scale(1) translate(0, 0)');
        eleRef.setAttribute('filter', '');
      });
    }
  }
  openTaskView() {
    console.log('hi')
  }

}
