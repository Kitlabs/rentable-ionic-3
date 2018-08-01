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
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { PaymentProvider } from '../../providers/payment/payment';
import { Storage } from '@ionic/storage';
var AddBankPage = /** @class */ (function () {
    function AddBankPage(navCtrl, navParams, paymentProvider, storage, loadingCtrl, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.paymentProvider = paymentProvider;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.account_type = "individual";
        this.alphabetRegex = /^[A-Za-z ]*$/;
        this.status = false;
        this.searchStatus = false;
        this.bankData = [];
    }
    AddBankPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddBankPage');
    };
    AddBankPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidLoad CreditPagePage');
        this.bankAttachedStatus = false;
        this.storage.get('userId').then(function (userId) {
            _this.userId = userId;
            _this.getBankDetails(userId);
        });
    };
    AddBankPage.prototype.getBankDetails = function (userId) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.paymentProvider.getBankAccount(userId).subscribe(function (data) {
            console.log(data);
            loading.dismiss();
            if (data.json().msg == "success") {
                _this.bankAttachedStatus = true;
                _this.status = true;
                _this.bankSavedData = data.json().data[0];
                console.log(_this.bankSavedData);
            }
            if (data.json().msg == "error") {
                _this.status = false;
                _this.bankAttachedStatus = false;
            }
        }, function (err) {
            loading.dismiss();
            _this.presentToast("Please try again later", 1);
        });
    };
    AddBankPage.prototype.deleteBankAccount = function (bankId) {
        this.presentConfirm('Confirm', "You cannot delete a linked bank account,please add another account to deleting this one");
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });
        // loading.present();
        // this.paymentProvider.deleteBankAccount(this.userId,bankId).subscribe( 
        //   data=>{
        //       console.log(data);
        //       loading.dismiss();
        //       if(data.json().msg=="success"){ 
        //         this.bankAttachedStatus=false;
        //       }
        //       if(data.json().msg=="error"){
        //         this.bankAttachedStatus=true;
        //       }
        //   },
        //   err=>{
        //       loading.dismiss();
        //       this.presentToast("Please try again later",1);
        //   }
        // );
    };
    /**
     * Method trigger if user start typing on form and validation will be check here
     */
    AddBankPage.prototype.change = function () {
        if (!this.accountHolderName.match(this.alphabetRegex) || this.accountHolderName == "" ||
            !this.checkAccountBsb(this.accountBsb) || this.accountBsb == "" ||
            !this.checkAccountNumber(this.accountNumber) || this.accountNumber == "") {
            this.searchStatus = false; //disable the buttion
        }
        else {
            this.searchStatus = true;
        }
    };
    /**
     * BSB (6 Characters)
     */
    AddBankPage.prototype.checkAccountBsb = function (number) {
        var regex = new RegExp("^[0-9]{6}$");
        if (number) {
            if (regex.test(number)) {
                console.log("bsb number true");
                return true;
            }
            else {
                console.log("bsb number false");
                return false;
            }
        }
    };
    /**
     * Account Number (6-10 characters)
     */
    AddBankPage.prototype.checkAccountNumber = function (number) {
        var regex = new RegExp("^[0-9]{6,10}$");
        if (number) {
            if (regex.test(number)) {
                console.log("account number true");
                return true;
            }
            else {
                console.log("account number false");
                return false;
            }
        }
    };
    AddBankPage.prototype.removeAccountHolderName = function () {
        this.accountHolderName = "";
    };
    AddBankPage.prototype.removeBsb = function () {
        this.accountBsb = "";
    };
    AddBankPage.prototype.removeAccountNumber = function () {
        this.accountNumber = "";
    };
    /**
     * Method used to add bank account
     */
    AddBankPage.prototype.addBank = function () {
        var _this = this;
        this.bankData.accHolderName = this.accountHolderName;
        this.bankData.accBsbNumber = this.accountBsb;
        this.bankData.accNumber = this.accountNumber;
        this.bankData.accType = this.account_type;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.paymentProvider.addBankAccount(this.bankData, this.userId).subscribe(function (data) {
            console.log(data);
            loading.dismiss();
            if (data.json().msg == "success") {
                _this.presentToast("Bank has been added successfully", 0);
            }
            if (data.json().msg == "error") {
                _this.presentAlert(data.json().msg_details);
            }
        }, function (err) {
            console.log(err);
            _this.presentToast("Invalid card details", 1);
            loading.dismiss();
        });
    };
    AddBankPage.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    AddBankPage.prototype.presentToast = function (msg, id) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            if (id == 0) {
                _this.navCtrl.pop();
            }
            else {
            }
        });
        toast.present();
    };
    AddBankPage.prototype.presentConfirm = function (title, msg) {
        var _this = this;
        //You cannot delete a linked bank account,please add another account to deleting this one
        var alert = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Add New',
                    handler: function () {
                        _this.bankAttachedStatus = false;
                    }
                }
            ]
        });
        alert.present();
    };
    AddBankPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-add-bank',
            templateUrl: 'add-bank.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            PaymentProvider,
            Storage,
            LoadingController,
            AlertController,
            ToastController])
    ], AddBankPage);
    return AddBankPage;
}());
export { AddBankPage };
//# sourceMappingURL=add-bank.js.map