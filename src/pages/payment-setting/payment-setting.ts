import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpaymentPage } from '../addpayment/addpayment';
import { Profile } from '../profile/profile'
@IonicPage()
@Component({
  selector: 'page-payment-setting',
  templateUrl: 'payment-setting.html',
})
export class PaymentSettingPage {
  profile=Profile;
  payment=AddpaymentPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSettingPage');
  }

  goToBankPage(){
    this.navCtrl.push('AddBankPage');
  }

}
