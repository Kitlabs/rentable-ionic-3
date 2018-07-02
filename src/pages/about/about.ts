import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/payment/profile';

import { Profile } from '../profile/profile';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {

	profile=Profile;
	about:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public profileprovier: ProfileProvider) {
  	this.profileprovier.Aboutinfo(localStorage.getItem('uid')).subscribe(data =>{
  		console.log(data);
  		this.about=data;
  	}, err =>{
  		console.log(err);
  	});
  }

}