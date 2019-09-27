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
  svgJson: Array<{size: number, color: string, enableClick: boolean, text: number, x: number, y: number}> = [];
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log(data);
    this.svgJson.push({
      size: this.size.md,
      color: '',
      enableClick: false,
      text: this.data['upcoming'].Group,
      x: this.circleCodes.center,
      y: this.circleCodes.start,
    });
    this.svgJson.push({
      size: this.size.lg,
      color: 'green',
      enableClick: false,
      text: this.data['current'].Group,
      x: this.circleCodes.right,
      y: this.circleCodes.start,
    });
  }

}
