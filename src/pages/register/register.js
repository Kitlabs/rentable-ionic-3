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
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { SignupPage } from '../signup/signup';
import { FinishsignPage } from '../finishsign/finishsign';
import { Storage } from '@ionic/storage';
var Register = /** @class */ (function () {
    function Register(navCtrl, navParams, formBuilder, Authprovider, toastCtrl, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.Authprovider = Authprovider;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.signup = SignupPage;
        this.finishsign = FinishsignPage;
        this.formgroup = formBuilder.group({
            digitcode: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])]
        });
        this.Usersignup = [];
        this.digitcode = this.formgroup.controls['digitcode'];
        this.phonenumber = navParams.get("pnumber");
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }
    Register.prototype.ionViewWillEnter = function () {
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'none';
        }
    };
    Register.prototype.ionViewWillLeave = function () {
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'flex';
        }
    };
    Register.prototype.numberfill = function () {
        var n = this.digitcode.value.length;
        if (n > 4) {
            //document.getElementById("code").style.backgroundColor = "red";
            document.getElementById("code").style.color = "red";
        }
        else {
            document.getElementById("code").style.color = "white";
        }
    };
    Register.prototype.gosignup = function () {
        /*this.Usersignup.phonenumber = this.phonenumber;
        this.Authprovider.smsverify(this.phonenumber,this.digitcode.value).subscribe(data => {
          let res = data.json().success;
          console.log('hehe', res);
          
          if(!res)
            alert('Please reenter your sms code');
          else
            this.navCtrl.push(SignupPage,{
              user: this.Usersignup
            });
        });*/
        var _this = this;
        this.initLoader();
        this.loading.present();
        this.Usersignup.phonenumber = this.phonenumber;
        console.log("Sign up clicked");
        console.log(this.phonenumber);
        console.log(this.digitcode.value);
        this.Authprovider.smsverify(this.phonenumber, this.digitcode.value).subscribe(function (data) {
            if (data.json().msg == "success") {
                _this.navCtrl.push(SignupPage, {
                    user: _this.Usersignup
                });
            }
            if (data.json().msg == "error") {
                _this.showToastWithCloseButton("Invalid verification code used, please try again");
                document.getElementById("code").style.color = "red";
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.showToast("Please check your internet connection");
        }, function () {
            _this.loading.dismiss();
        });
    };
    /*
    function to send otp again
    */
    Register.prototype.sendOtp = function () {
        var _this = this;
        console.log("send otp again");
        this.initLoader();
        this.loading.present();
        //send otp to number 
        this.Authprovider.Sendsms(this.phonenumber).subscribe(function (data) {
            console.log(data.json());
            if (data.json().msg == "success") {
                _this.showToast("A code has been sent to your phone");
            }
            if (data.json().msg == "error") {
                _this.showToast("Please try again later");
            }
        }, function (err) {
            console.log(err);
            _this.loading.dismiss();
            _this.showToast("Please try again later");
        }, function () {
            _this.loading.dismiss();
        });
    };
    Register.prototype.initLoader = function () {
        //to show loader
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
    };
    Register.prototype.showToastWithCloseButton = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            showCloseButton: true,
            closeButtonText: "OK"
        });
        toast.present();
    };
    Register.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top"
        });
        toast.present(toast);
    };
    Register = __decorate([
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
            providers: [AuthenticateProvider]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FormBuilder,
            AuthenticateProvider,
            ToastController,
            LoadingController,
            Storage])
    ], Register);
    return Register;
}());
export { Register };
//# sourceMappingURL=register.js.map