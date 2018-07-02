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
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { FormBuilder, Validators } from '@angular/forms';
var ForgetPasswordPromptPage = /** @class */ (function () {
    function ForgetPasswordPromptPage(navCtrl, navParams, viewCtrl, toastCtrl, authProvider, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.authProvider = authProvider;
        this.formBuilder = formBuilder;
        //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        var EMAIL_REGEXP = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        this.forgetForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP), Validators.maxLength(50)])]
        });
    }
    ForgetPasswordPromptPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgetPasswordPromptPage');
        this.email = this.forgetForm.controls['email'];
    };
    ForgetPasswordPromptPage.prototype.doForget = function () {
        var _this = this;
        this.email = this.email.value;
        this.viewCtrl.dismiss();
        this.authProvider.sendForgetCode(this.email).subscribe(function (data) {
            if (data.json().msg == "success") {
                _this.showToast("A reset code has been sent to your phone", 1);
            }
            if (data.json().msg == "error") {
                _this.showToast(data.json().msg_details, 2);
            }
        }, function (err) {
            _this.showToast("Please try again later", 2);
        }, function () {
        });
    };
    ForgetPasswordPromptPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    ForgetPasswordPromptPage.prototype.showToast = function (msg, id) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top"
        });
        toast.onDidDismiss(function () {
            if (id == 1) {
                _this.navCtrl.push("ForgetpassswordPage", {
                    email: _this.email
                });
            }
        });
        toast.present(toast);
    };
    ForgetPasswordPromptPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-forget-password-prompt',
            templateUrl: 'forget-password-prompt.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            ToastController,
            AuthenticateProvider,
            FormBuilder])
    ], ForgetPasswordPromptPage);
    return ForgetPasswordPromptPage;
}());
export { ForgetPasswordPromptPage };
//# sourceMappingURL=forget-password-prompt.js.map