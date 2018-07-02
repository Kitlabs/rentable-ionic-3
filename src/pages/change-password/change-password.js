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
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, navParams, formBuilder, loadingCtrl, storage, authProvider, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.authProvider = authProvider;
        this.toastCtrl = toastCtrl;
        var PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;
        this.changeForm = formBuilder.group({
            oldPass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
            newpass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.pattern(PASSWORD_REGEXP), Validators.required])],
            conpass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
        }, { validator: this.matchingPasswords('newpass', 'conpass') });
        //attached control with form
        this.oldPass = this.changeForm.controls['oldPass'];
        this.newPass = this.changeForm.controls['newpass'];
        this.conPass = this.changeForm.controls['conpass'];
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangePasswordPage');
    };
    ChangePasswordPage.prototype.closeScreen = function () {
        this.navCtrl.pop();
    };
    ChangePasswordPage.prototype.matchingPasswords = function (passwordKey, confirmPasswordKey) {
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
    ChangePasswordPage.prototype.changePassword = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.storage.get('userId').then(function (data) {
            _this.authProvider.changePassword(data, _this.oldPass.value, _this.newPass.value).subscribe(function (data) {
                _this.loading.dismiss();
                if (data.json().msg == "error") {
                    _this.presentToast(data.json().msg_details, 0);
                    _this.changeForm.reset();
                }
                if (data.json().msg == "success") {
                    _this.presentToast(data.json().msg_details, 1);
                    _this.changeForm.reset();
                }
            }, function (err) {
                _this.loading.dismiss();
            });
        });
    };
    ChangePasswordPage.prototype.presentToast = function (msg, id) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        if (id == 1) {
            toast.onDidDismiss(function () {
                _this.navCtrl.pop();
            });
        }
        toast.present();
    };
    ChangePasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-change-password',
            templateUrl: 'change-password.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FormBuilder,
            LoadingController,
            Storage,
            AuthenticateProvider,
            ToastController])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());
export { ChangePasswordPage };
//# sourceMappingURL=change-password.js.map