import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { data } from './apirespons';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomePage {
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
  svgJson: Array<{size: number, color: string, enableClick: boolean, text: number, x: number, y: number, topText: string, bottomText: string}> = [];
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    let d = 0;
    const currentGroup = Number(this.data['upcoming'].Group);
    let index: number;
    if(currentGroup < 26) {
      index = 25 - currentGroup;
    } else if(currentGroup < 50) {
      index = 50 - currentGroup;
    } else if(currentGroup < 75) {
      index = 75 - currentGroup;
    } else if(currentGroup < 100) {
      index = 100 - currentGroup;
    } else if(currentGroup < 125) {
      index = 125 - currentGroup;
    } else if(currentGroup < 150) {
      index = 150 - currentGroup;
    } else if(currentGroup < 175) {
      index = 175 - currentGroup;
    };
    for(let i = 0; i < 25; i++) {
      let x: number;
      if(d === 0 || d === 2) {
        x = this.circleCodes.center
      } else if(d === 1) {
        x = this.circleCodes.right
      } else if(d === 3) {
        x = this.circleCodes.left
        d = -1;
      }
      d++;
      this.svgJson.push({
        size: this.size.md,
        color: '',
        enableClick: false,
        text: this.data['upcoming'].Group + i,
        x: x,
        y: this.circleCodes.start,
        topText: '',
        bottomText: ''
      });
    }
    this.svgJson.push({
      size: this.size.md,
      color: '',
      enableClick: false,
      text: this.data['upcoming'].Group,
      x: this.circleCodes.center,
      y: this.circleCodes.start,
      topText: '',
      bottomText: ''
    });
    let x: number;
    if(d === 0 || d === 2) {
      x = this.circleCodes.center
    } else if(d === 1) {
      x = this.circleCodes.right
    } else if(d === 3) {
      x = this.circleCodes.left
      d = -1;
    }
    d++;
    const completedTask = (this.data['current'].TotalNoOfTaskCompleted / this.data['current'].Threshold) * 100;
    this.svgJson.push({
      size: this.size.lg,
      color: 'green',
      enableClick: true,
      text: this.data['current'].Group,
      x: x,
      y: this.circleCodes.start,
      topText: 'Keep Going...',
      bottomText: completedTask +'% Completed'
    });
    const keys = Object.keys(this.data['previous'])
    
    keys.forEach((key, i) => {
      console.log(i)
      let x: number;
      if(d === 0 || d === 2) {
        x = this.circleCodes.center
      } else if(d === 1) {
        x = this.circleCodes.right
      } else if(d === 3) {
        x = this.circleCodes.left
        d = -1;
      }
      d++;
      console.log();
      this.svgJson.push({
        size: this.size.sm,
        color: 'blue',
        enableClick: false,
        text: this.data['previous'][keys[keys.length - (i+1)]].Group,
        x: x,
        y: this.circleCodes.start,
        topText: '',
        bottomText: ''
      });
    })
  }
  openTaskView() {
    console.log('hi')
  }

}
