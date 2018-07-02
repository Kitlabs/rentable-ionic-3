import { Component,ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { LandingPage } from '../landing/landing';
/**
 * Generated class for the WalkthroughPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html',
})
export class WalkthroughPage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";
  state: string = 'x';
  status:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
    this.status=(this.navParams.get('type')=='profile') ? true :false ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalkthroughPage');
  }

  skip() {
    console.log("Call is received to skip page");
    this.storage.set("walkthrough","true");
    this.navCtrl.setRoot(LandingPage);
  }


  slideChanged() {
    if (this.slides.isEnd())
    {
      console.log("end slide");
      this.skipMsg = "Get Started";     
    }else{
      console.log("no end slide");
      this.skipMsg="Skip"
    }
  }
}
