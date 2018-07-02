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
import { FormBuilder, Validators } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Facebook } from '@ionic-native/facebook';
import { FinishsignPage } from '../finishsign/finishsign';
import { Register } from '../register/register';
import { TabPage } from '../tab/tab';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, Authprovider, formBuilder, alertCtrl, loadingCtrl, device, fb, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Authprovider = Authprovider;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.device = device;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.finishsign = FinishsignPage;
        this.register = Register;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.fullnameChanged = false;
        this.submitAttempt = false;
        console.log("inside constructor");
        //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        var EMAIL_REGEXP = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        var PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;
        this.registerForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP), Validators.maxLength(50)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required, Validators.pattern(PASSWORD_REGEXP)])],
            confirmpassword: ['', Validators.required],
        }, { validator: this.matchingPasswords('password', 'confirmpassword') });
        this.Usersignup = navParams.get("user");
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.showFb = false;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPagePage');
        this.email = this.registerForm.controls['email'];
        this.password = this.registerForm.controls['password'];
        this.confirmpassword = this.registerForm.controls['confirmpassword'];
    };
    SignupPage.prototype.ionViewWillEnter = function () {
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'none';
        }
        ///this.registerForm.get('email').setValue(localStorage.getItem('userEmail'));
        //this.registerForm.get('email').setValue("abc@gmail.com");
    };
    SignupPage.prototype.ionViewWillLeave = function () {
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'flex';
        }
    };
    SignupPage.prototype.elementChanged = function (input) {
        var field = input.inputControl;
        this[field + "Changed"] = true;
    };
    SignupPage.prototype.facebook = function () {
    };
    SignupPage.prototype.doRegister = function () {
        /*    this.Usersignup.email=this.email.value;
            this.Usersignup.password=this.password.value;
            this.uuid=this.device.uuid;
      
            console.log('device token',this.uuid);
            console.log(this.Usersignup.phonenumber);
          this.navCtrl.setRoot(FinishsignPage,{
            user:this.Usersignup
          });*/
        //this.Usersignup.id=0;
        this.Usersignup.email = this.email.value;
        this.Usersignup.password = this.password.value;
        //this.email="abc@gmail.com";
        //localStorage.setItem("userEmail",this.email.value);
        this.navCtrl.push(FinishsignPage, {
            user: this.Usersignup
        });
    };
    //Method to register with facebook 
    SignupPage.prototype.doRegisterWithFb = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status == "connected") {
                _this.showFb = true;
                _this.getUserDetail(res.authResponse.userID);
            }
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
        this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    };
    SignupPage.prototype.getUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,first_name,last_name,picture,gender", ["public_profile"])
            .then(function (res) {
            _this.users = res;
            _this.Usersignup.id = 1;
            _this.Usersignup.email = _this.users.email;
            _this.Usersignup.password = _this.password.value;
            _this.Usersignup.firstName = _this.users.first_name;
            _this.Usersignup.lastName = _this.users.last_name;
            //this.Usersignup.fbId=userid;
            //this.fbEmail="suraj2";
            //set the email in ui
            _this.fbEmail = _this.users.email;
            _this.registerForm.get('email').setValue(_this.users.email);
            // this.navCtrl.setRoot(FinishsignPage,{
            //   user:this.Usersignup
            // });
            // this.navCtrl.push(FinishsignPage,{
            //   user:this.Usersignup
            // })
            /*this.Authprovider.signup(this.Usersignup).subscribe(data=>{
            
            if(data.json().msg=="success"){
              this.showToastWithCloseButton("Registered Successfully");
                this.userInfo=data.json(). user_details;
                this.storage.set("userId",this.userInfo[0].id);
              }
            });*/
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    SignupPage.prototype.matchingPasswords = function (passwordKey, confirmPasswordKey) {
        // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
        return function (group) {
            var password = group.controls[passwordKey];
            var confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    };
    SignupPage.prototype.showToastWithCloseButton = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top"
        });
        toast.onDidDismiss(function () {
            _this.navCtrl.setRoot(TabPage);
        });
        toast.present();
    };
    SignupPage = __decorate([
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AuthenticateProvider,
            FormBuilder,
            AlertController,
            LoadingController,
            Device,
            Facebook,
            ToastController,
            Storage])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map