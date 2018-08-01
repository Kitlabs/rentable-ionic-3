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
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/payment/profile';
import { EditprofilePage } from '../editprofile/editprofile';
import { Storage } from '@ionic/storage';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
var ProfileinputPage = /** @class */ (function () {
    function ProfileinputPage(navCtrl, navParams, profileprovier, storage, loadingCtrl, modalCtrl, alertCtrl, authprovier, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileprovier = profileprovier;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authprovier = authprovier;
        this.toastCtrl = toastCtrl;
        this.editprofile = EditprofilePage;
        this.formtype = navParams.get("type");
        this.data = navParams.get("data");
        this.option = navParams.get("option");
        this.countrycode = "+" + this.navParams.get("code");
        console.log(this.countrycode);
        console.log(this.data);
        this.btnUpdate = this.data ? true : false;
        if (this.formtype == "POSTAL CODE") {
            this.postalFieldStatus = true;
        }
        else {
            this.postalFieldStatus = false;
        }
        this.storage.get('userId').then(function (data) {
            _this.userId = data;
        });
    }
    ProfileinputPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfileinputPage');
    };
    ProfileinputPage.prototype.removetext = function () {
        this.data = "";
    };
    ProfileinputPage.prototype.change = function () {
        this.btnUpdate = this.data ? true : false;
    };
    ProfileinputPage.prototype.emailChange = function () {
        var EMAIL_REGEXP = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        this.btnUpdate = EMAIL_REGEXP.test(this.data) ? true : false;
        console.log("EMAIL_STATUS=", this.btnUpdate);
    };
    ProfileinputPage.prototype.mobileChange = function () {
        var number = this.data;
        console.log("LENGTH=", number.toString().length);
        this.btnUpdate = number.toString().length > 7 ? true : false;
    };
    ProfileinputPage.prototype.takeMe = function () {
        var _this = this;
        console.log("sadfadf asdf alsdkfj a ");
        // this.navCtrl.setRoot("CountrycodePage",{
        //   type:"updatenumber"
        // });
        var shareModel = this.modalCtrl.create('CountrycodePage', { type: 'updatenumber' });
        shareModel.onDidDismiss(function (data) {
            console.log("DATA==", data);
            _this.countrycode = data;
        });
        shareModel.present();
    };
    ProfileinputPage.prototype.save = function () {
        var _this = this;
        // this.profileprovier.ChangeProfile(this.formtype, this.data).subscribe(data =>{
        //   console.log(data);
        // })
        if (this.formtype == "FIRST NAME") {
            this.firstname = this.data;
        }
        if (this.formtype == "LAST NAME") {
            this.lastname = this.data;
        }
        if (this.formtype == "EMAIL") {
            this.email = this.data;
        }
        if (this.formtype == "PASSWORD") {
            this.password = this.data;
        }
        if (this.formtype == "POSTAL CODE") {
            this.postalcode = this.data;
            this.authprovier.getAddressFromPostalCode(this.postalcode).subscribe(function (data) {
                console.log(data.json());
                _this.location = data.json().results[0].formatted_address;
                _this.lat = data.json().results[0].geometry.location.lat;
                _this.lng = data.json().results[0].geometry.location.lng;
                _this.locToSave = data.json().results[0].geometry.location;
                _this.updateUserProfile();
            });
        }
        else if (this.formtype == "MOBILE NUMBER") {
            this.phonenumber = this.data;
            this.getVerificationCode();
            //this.presentVerificationPrompt();
        }
        else {
            this.updateUserProfile();
        }
    };
    ProfileinputPage.prototype.getVerificationCode = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        var number = this.countrycode + "0" + this.phonenumber;
        this.profileprovier.getVerificationCode(number, this.userId).subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data.json());
            if (data.json().msg == "success") {
                _this.presentVerificationPrompt();
            }
            if (data.json().msg == "error") {
                _this.showToast("Try again later");
            }
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    ProfileinputPage.prototype.presentVerificationPrompt = function () {
        var _this = this;
        var shareModel = this.modalCtrl.create('UpdateMobileNumberPage');
        shareModel.onDidDismiss(function (data) {
            _this.updateMobileNumber(data);
        });
        shareModel.present();
        // let alert = this.alertCtrl.create({
        //   title: 'Enter Verification Code',
        //   inputs: [
        //     {
        //       name: 'code',
        //       placeholder: 'Enter code'
        //     }
        //   ],
        //   buttons: [
        //     {
        //       text: 'Cancel',
        //       role: 'cancel',
        //       handler: data => {
        //         console.log('Cancel clicked');
        //       }
        //     },
        //     {
        //       text: 'Update',
        //       handler: data => {
        //         console.log(data.code);
        //       }
        //     }
        //   ]
        // });
        // alert.present();
    };
    ProfileinputPage.prototype.updateMobileNumber = function (code) {
        var _this = this;
        console.log("asdfadsf=", code);
        console.log("Call is received to update mobile number");
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        var number = this.countrycode + "0" + this.phonenumber;
        this.profileprovier.updateMobileNumber(number, this.userId, code).subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data.json());
            if (data.json().msg == "success") {
                _this.showToast(data.json().msg_details);
            }
            if (data.json().msg == "error") {
                _this.showToast(data.json().msg_details);
            }
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    ProfileinputPage.prototype.updateUserProfile = function () {
        var _this = this;
        this.storage.get('userId').then(function (userId) {
            if (userId != null) {
                _this.profileprovier.ChangeProfile(_this.email, _this.phonenumber, _this.password, _this.firstname, _this.lastname, _this.photourl, _this.postalcode, userId, _this.lat, _this.lng, _this.location).subscribe(function (data) {
                    console.log(data.json());
                    if (data.json().msg == "success") {
                        if (_this.formtype == "POSTAL CODE") {
                            _this.storage.set('location', _this.locToSave);
                        }
                        _this.showToast(data.json().msg_details);
                    }
                    if (data.json().msg == "error") {
                        _this.showToast("Try again later");
                    }
                }, function (err) {
                    alert("error");
                });
            }
            else {
            }
        });
    };
    ProfileinputPage.prototype.numberFill = function () {
        if (this.formtype == "POSTAL CODE") {
            console.log("postal code");
            //this.status=true;
        }
    };
    ProfileinputPage.prototype.showToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
            _this.navCtrl.popTo(EditprofilePage);
        });
        toast.present();
    };
    ProfileinputPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-profileinput',
            templateUrl: 'profileinput.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ProfileProvider,
            Storage,
            LoadingController,
            ModalController,
            AlertController,
            AuthenticateProvider,
            ToastController])
    ], ProfileinputPage);
    return ProfileinputPage;
}());
export { ProfileinputPage };
//# sourceMappingURL=profileinput.js.map