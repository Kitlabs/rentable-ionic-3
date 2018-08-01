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
import { NavController, NavParams, ToastController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { FCM } from "@ionic-native/fcm";
import { TabPage } from '../tab/tab';
import { SignupPage } from '../signup/signup';
import { Register } from '../register/register';
import { Storage } from '@ionic/storage';
var FinishsignPage = /** @class */ (function () {
    function FinishsignPage(navCtrl, navParams, formBuilder, authprovier, toastCtrl, loadingCtrl, storage, alertCtrl, fcm, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.authprovier = authprovier;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.platform = platform;
        this.home = TabPage;
        this.signup = SignupPage;
        this.register = Register;
        var POSTAL_REGEXP = "[0-9]*";
        this.finishsignupform = formBuilder.group({
            firstname: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
            lastname: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
            postalcode: ['', Validators.compose([Validators.pattern(POSTAL_REGEXP), Validators.minLength(4), Validators.maxLength(4), Validators.required])],
            dob: ['', Validators.required],
            termaccepted: [false, Validators.compose([this.isChecked, Validators.required])]
        });
        this.Usersignup = navParams.get("user");
        this.firstname = this.finishsignupform.controls['firstname'];
        this.lastname = this.finishsignupform.controls['lastname'];
        this.postalcode = this.finishsignupform.controls['postalcode'];
        this.termaccepted = this.finishsignupform.controls['termaccepted'];
        this.dob = this.finishsignupform.controls['dob'];
        if (this.platform.is('cordova')) {
            //getting token
            this.fcm.getToken().then(function (token) {
                _this.Usersignup.fcmToken = token;
            });
        }
    }
    FinishsignPage.prototype.ionViewDidLoad = function () {
    };
    FinishsignPage.prototype.ionViewDidEnter = function () {
    };
    FinishsignPage.prototype.ionViewWillEnter = function () {
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'none';
        }
        this.finishsignupform.get('firstname').setValue(this.Usersignup.firstName);
        this.finishsignupform.get('lastname').setValue(this.Usersignup.lastName);
    };
    FinishsignPage.prototype.ionViewWillLeave = function () {
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'flex';
        }
    };
    //method go to sign up page
    FinishsignPage.prototype.goToSignUp = function () {
        //this.navCtrl.setRoot(SignupPage);
        this.navCtrl.pop();
    };
    FinishsignPage.prototype.finishsignup = function () {
        var _this = this;
        var dob = this.dob.value;
        var dobArr = dob.split("-");
        this.Usersignup.firstname = this.firstname.value;
        this.Usersignup.lastname = this.lastname.value;
        this.Usersignup.postalcode = this.postalcode.value;
        this.Usersignup.day = dobArr[2];
        this.Usersignup.month = dobArr[1];
        this.Usersignup.year = dobArr[0];
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //Get address from postal code
        this.authprovier.getAddressFromPostalCode(this.postalcode.value).subscribe(function (data) {
            _this.Usersignup.location = data.json().results[0].formatted_address;
            _this.Usersignup.lat = data.json().results[0].geometry.location.lat;
            _this.Usersignup.lng = data.json().results[0].geometry.location.lng;
            _this.location = data.json().results[0].geometry.location;
            //TO GET CITY AND COUNTRY
            for (var i in data.json().results[0].address_components) {
                //CITY
                if (data.json().results[0].address_components[i].types[0] == "administrative_area_level_1") {
                    _this.Usersignup.City = data.json().results[0].address_components[i].short_name;
                }
                //COUNTRY
                if (data.json().results[0].address_components[i].types[0] == "country") {
                    _this.Usersignup.Country = data.json().results[0].address_components[i].short_name;
                }
            }
            _this.authprovier.signup(_this.Usersignup).subscribe(function (data) {
                _this.loading.dismiss();
                if (data.json().msg == "success") {
                    _this.storage.set("userId", data.json().userId); //saving userId
                    _this.storage.set('location', _this.location); //saving location
                    _this.storage.set("CARD_STATUS", 0);
                    _this.showToast("Registered Successfully");
                }
                else {
                    if (data.json().msg == "error") {
                        _this.presentAlert(data.json().msg_details.replace("Stripe", "application"));
                    }
                }
            }, function (err) {
                _this.loading.dimiss();
                _this.showToastWithCloseButton("Please try again ");
            });
        }, function (err) {
            //on error
            _this.loading.dimiss();
            _this.showToastWithCloseButton("Please try again");
        });
    };
    FinishsignPage.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    /*
      Method to display toast message
    */
    FinishsignPage.prototype.showToastWithCloseButton = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top"
        });
        toast.present();
    };
    FinishsignPage.prototype.showToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
            _this.navCtrl.setRoot(TabPage);
        });
        toast.present();
    };
    //function to chek whether checkbox checked or not
    FinishsignPage.prototype.isChecked = function (control) {
        if (control.value != true) {
            return {
                "notChecked": true
            };
        }
        return null;
    };
    FinishsignPage = __decorate([
        Component({
            selector: 'page-finishsign',
            templateUrl: 'finishsign.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FormBuilder,
            AuthenticateProvider,
            ToastController,
            LoadingController,
            Storage,
            AlertController,
            FCM,
            Platform])
    ], FinishsignPage);
    return FinishsignPage;
}());
export { FinishsignPage };
//# sourceMappingURL=finishsign.js.map