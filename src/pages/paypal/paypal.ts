import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';

import { AddpaymentPage } from '../addpayment/addpayment';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { AppSetting } from '../../providers/api_route'
/* 
   Generated class for the PaypalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html'
})
export class PaypalPage {

	addpayment=AddpaymentPage;
  currencies:any;
  payPalEnvironment:string;
  payment:PayPalPayment;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController,
    public payPal:PayPal) {

    this.currencies=['EUR','USD'];
    this.payPalEnvironment= 'payPalEnvironmentSandbox';
    this.payment = new PayPalPayment('10.10', 'USD', 'TV', 'sale');
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad PaypalPagePage');
  }


  makePayment(){

    this.payPal.init({
      PayPalEnvironmentProduction: AppSetting.paypalEnvironmentProduction,
      PayPalEnvironmentSandbox: AppSetting.paypalEnvironmentSandbox
    }).then(() => {
        this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
        this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
          alert(`Successfully paid. Status = ${response.response.state}`);
          this.showToastWithCloseButton(response)
          console.log(response);
        }, () => {
          this.showToastWithCloseButton("Error or render dialog closed without being successful");
          console.error('Error or render dialog closed without being successful');
        });
      }, () => {
        this.showToastWithCloseButton("Error in configuration");
        console.error('Error in configuration');
      });
    }, () => {
      this.showToastWithCloseButton("Error in initialization, maybe PayPal isn\'t supported or something else");
       console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
    });
  }


    showToastWithCloseButton(msg:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }


}
