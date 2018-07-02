import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { About } from '../about/about';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {

  about = About;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

}
