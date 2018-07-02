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
import { NavController, AlertController, NavParams, ToastController, LoadingController, ModalController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Device } from '@ionic-native/device';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { FCM } from "@ionic-native/fcm";
import { FormBuilder, Validators } from '@angular/forms';
import { Register } from '../register/register';
import { TabPage } from '../tab/tab';
import { Storage } from '@ionic/storage';
var Login = /** @class */ (function () {
    function Login(navCtrl, alertCtrl, navParams, afAuth, device, formBuilder, authporvider, toastCtrl, loadingCtrl, storage, modalCtrl, fcm, platform) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.device = device;
        this.formBuilder = formBuilder;
        this.authporvider = authporvider;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.fcm = fcm;
        this.platform = platform;
        this.register = Register;
        this.expanded = true;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.phonenumber = navParams.get("pnumber");
        this.name = navParams.get("pname");
        this.loginForm = formBuilder.group({
            password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])]
        });
        this.password = this.loginForm.controls['password'];
        // this.fcm.getToken()
        //   .then((token:string)=>{
        //     this.token=token;
        //   })
        //   .catch(error=>{
        //     //ocurrió un error al procesar el token
        //     console.error(error);
        //   });
    }
    Login.prototype.ionViewDidLoad = function () {
        this.password = this.loginForm.controls['password'];
    };
    Login.prototype.ionViewWillEnter = function () {
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'none';
        }
    };
    Login.prototype.ionViewWillLeave = function () {
        if (this.tabBarElement) {
            this.tabBarElement.style.display = 'flex';
        }
    };
    //method to count input length
    Login.prototype.numberfill = function () {
        var n = this.password.value.length;
        if (n > 20) {
            this.lengthExceed = true;
        }
        else {
            this.lengthExceed = false;
        }
    };
    /*
    method to log in user
    */
    Login.prototype.login = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.storage.set("phone", this.phonenumber);
        if (this.password.value == null) {
            this.storage.get('phone').then(function (data) {
                _this.phonenumber = data;
            });
        }
        this.password = this.password.value;
        this.loading.present();
        this.authporvider.login(this.phonenumber, this.password).subscribe(function (data) {
            console.log(data.json().user_details);
            _this.userInfo = data.json().user_details;
            //store user location into storage
            var location = { lat: _this.userInfo[0].lat, lng: _this.userInfo[0].lng };
            _this.storage.set('location', location);
            if (data.json().msg == "success") {
                _this.storage.set("userId", _this.userInfo[0].id);
                //uncomment when not running on browser
                _this.sendToken(_this.userInfo[0].id);
                _this.navCtrl.setRoot(TabPage);
            }
            if (data.json().msg == "error") {
                _this.ionViewDidLoad();
                _this.showToast("Invalid login details");
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.showToast("Please try again later");
            //error
        }, function () {
            _this.loading.dismiss();
        });
    };
    /*
      Method to update device token
    */
    Login.prototype.sendToken = function (userId) {
        var _this = this;
        if (this.platform.is('cordova')) {
            //getting token
            this.fcm.getToken().then(function (token) {
                _this.authporvider.updateDeviceToken(userId, token);
            });
        }
    };
    /*
    old method to login with firebase
    */
    Login.prototype.loginOld = function () {
        this.navCtrl.setRoot(TabPage);
        this.type = this.device.platform;
        console.log('device type  ', this.type);
        console.log(this.email);
        // this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(data => {
        //   localStorage.clear();
        //   localStorage.setItem('uid', data.uid);
        //   this.authporvider.sendtoken(data.uid, this.token, this.device).subscribe(data =>{
        //     this.navCtrl.setRoot(TabPage);
        //   });
        // }, err => {
        //   console.log('login Error =--', err);
        // });
    };
    Login.prototype.forgotPassword = function () {
        var modal = this.modalCtrl.create("ForgetPasswordPromptPage", { showBackdrop: true, enableBackdropDismiss: true });
        modal.present();
    };
    Login.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top"
        });
        toast.present(toast);
    };
    Login = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [NavController,
            AlertController,
            NavParams,
            AngularFireAuth,
            Device,
            FormBuilder,
            AuthenticateProvider,
            ToastController,
            LoadingController,
            Storage,
            ModalController,
            FCM,
            Platform])
    ], Login);
    return Login;
}());
export { Login };
//# sourceMappingURL=login.js.map