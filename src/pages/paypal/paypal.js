var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AddpaymentPage } from '../addpayment/addpayment';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { AppSetting } from '../../providers/api_route';
/*
   Generated class for the PaypalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PaypalPage = /** @class */ (function () {
    function PaypalPage(navCtrl, navParams, toastCtrl, payPal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.payPal = payPal;
        this.addpayment = AddpaymentPage;
        this.currencies = ['EUR', 'USD'];
        this.payPalEnvironment = 'payPalEnvironmentSandbox';
        this.payment = new PayPalPayment('10.10', 'USD', 'TV', 'sale');
    }
    PaypalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PaypalPagePage');
    };
    PaypalPage.prototype.makePayment = function () {
        var _this = this;
        this.payPal.init({
            PayPalEnvironmentProduction: AppSetting.paypalEnvironmentProduction,
            PayPalEnvironmentSandbox: AppSetting.paypalEnvironmentSandbox
        }).then(function () {
            _this.payPal.prepareToRender(_this.payPalEnvironment, new PayPalConfiguration({})).then(function () {
                _this.payPal.renderSinglePaymentUI(_this.payment).then(function (response) {
                    alert("Successfully paid. Status = " + response.response.state);
                    _this.showToastWithCloseButton(response);
                    console.log(response);
                }, function () {
                    _this.showToastWithCloseButton("Error or render dialog closed without being successful");
                    console.error('Error or render dialog closed without being successful');
                });
            }, function () {
                _this.showToastWithCloseButton("Error in configuration");
                console.error('Error in configuration');
            });
        }, function () {
            _this.showToastWithCloseButton("Error in initialization, maybe PayPal isn\'t supported or something else");
            console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
        });
    };
    PaypalPage.prototype.showToastWithCloseButton = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    PaypalPage = __decorate([
        Component({
            selector: 'page-paypal',
            templateUrl: 'paypal.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ToastController,
            PayPal])
    ], PaypalPage);
    return PaypalPage;
}());
export { PaypalPage };
//# sourceMappingURL=paypal.js.map