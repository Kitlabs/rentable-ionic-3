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
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { PaymentProvider } from '../../providers/payment/payment';
import { PaypalPage } from '../paypal/paypal';
import { CreditPage } from '../credit/credit';
import { Profile } from '../profile/profile';
import { PayPage } from '../stripe/pay/pay';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AddpaymentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AddpaymentPage = /** @class */ (function () {
    function AddpaymentPage(navCtrl, navParams, alertCtrl, toastCtrl, storage, events, loadingCtrl, paymentprovider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.paymentprovider = paymentprovider;
        this.credit = CreditPage;
        this.paypal = PaypalPage;
        this.profile = Profile;
        this.stripe = PayPage;
        this.deleteOptionStatus = false;
        this.cards = [];
        this.primaryCard = 5;
    }
    AddpaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddpaymentPagePage');
    };
    AddpaymentPage.prototype.ionViewDidEnter = function () {
        this.cards = [];
        this.getListOfAttachedCard();
    };
    AddpaymentPage.prototype.goToPrevious = function () {
        this.navCtrl.push('PaymentSettingPage');
    };
    /**
     * Method to get list of attached cards
     */
    AddpaymentPage.prototype.getListOfAttachedCard = function () {
        var _this = this;
        this.storage.get('userId').then(function (userId) {
            _this.userId = userId;
            _this.paymentprovider.getListofCards(userId).subscribe(function (data) {
                console.log(data);
                if (data.json().msg == "success") {
                    _this.events.publish('CARDSTATUS', 1);
                    _this.storage.set("CARD_STATUS", 1);
                    _this.cards = data.json().data;
                    _this.deleteOptionStatus = data.json().RentedStatus == 'success' ? false : true;
                    for (var _i = 0, _a = _this.cards; _i < _a.length; _i++) {
                        var card = _a[_i];
                        if (card.PrimaryCard == 0) {
                            _this.primaryCard = card.id;
                        }
                    }
                }
                else {
                    _this.events.publish('CARDSTATUS', 0);
                    _this.cards = [];
                }
            }, function (err) {
                _this.cards = [];
            });
        });
    };
    /**
     * Method to update the primary card id
     * @param cardId contain card Id
     */
    AddpaymentPage.prototype.updatePrimaryCard = function (cardId) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.paymentprovider.updatePrimaryCard(cardId, this.userId).subscribe(function (data) {
            console.log(data.json());
            loading.dismiss();
            if (data.json().msg == "success") {
                _this.presentToast("Primary card has been set");
            }
            else {
                _this.presentToast("Please try again later");
            }
        }, function (err) {
            loading.dismiss();
            console.log(err);
        });
    };
    /**
     * Method to delete card
     * @param cardId contain cardId
     */
    AddpaymentPage.prototype.deleteCard = function (cardId, index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Do you want to delete this card ?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('delete operation has been cancelled');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.paymentprovider.deleteCard(cardId, _this.userId).subscribe(function (data) {
                            console.log(data.json());
                            if (data.json().msg == "success") {
                                _this.presentToast("Deleted successfully");
                                _this.getListOfAttachedCard();
                            }
                            else {
                                _this.presentToast(data.json().msg_details);
                            }
                        }, function (err) {
                            _this.presentToast("Please try again later");
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    AddpaymentPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddpaymentPage = __decorate([
        Component({
            selector: 'page-addpayment',
            templateUrl: 'addpayment.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AlertController,
            ToastController,
            Storage,
            Events,
            LoadingController,
            PaymentProvider])
    ], AddpaymentPage);
    return AddpaymentPage;
}());
export { AddpaymentPage };
//# sourceMappingURL=addpayment.js.map