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
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { LandingPage } from '../landing/landing';
/**
 * Generated class for the ForgetpassswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ForgetpassswordPage = /** @class */ (function () {
    function ForgetpassswordPage(navCtrl, navParams, formBuilder, authprovier, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.authprovier = authprovier;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.code = "6465";
        var PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;
        this.forgetForm = formBuilder.group({
            code: ['', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
            newpass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.pattern(PASSWORD_REGEXP), Validators.required])],
            conpass: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
        }, { validator: this.matchingPasswords('newpass', 'conpass') });
        this.email = this.navParams.get("email");
        this.code = this.forgetForm.controls['code'];
        this.newpass = this.forgetForm.controls['newpass'];
        this.conpass = this.forgetForm.controls['conpass'];
    }
    ForgetpassswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetpassswordPage');
    };
    ForgetpassswordPage.prototype.forgetPassword = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.authprovier.resetForgetPassword(this.email, this.code.value, this.newpass.value, this.conpass.value).subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data);
            if (data.json().msg == "success") {
                _this.showToast(data.json().msg_details);
                _this.navCtrl.push(LandingPage);
            }
            if (data.json().msg == "error") {
                _this.showToast(data.json().msg_details);
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.showToast("Please try again later");
        });
    };
    ForgetpassswordPage.prototype.matchingPasswords = function (passwordKey, confirmPasswordKey) {
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
    ForgetpassswordPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top"
        });
        toast.present(toast);
    };
    ForgetpassswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-forgetpasssword',
            templateUrl: 'forgetpasssword.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FormBuilder,
            AuthenticateProvider,
            LoadingController,
            ToastController])
    ], ForgetpassswordPage);
    return ForgetpassswordPage;
}());
export { ForgetpassswordPage };
//# sourceMappingURL=forgetpasssword.js.map