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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
var UpdateMobileNumberPage = /** @class */ (function () {
    function UpdateMobileNumberPage(navCtrl, navParams, viewCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.formgroup = formBuilder.group({
            digitcode: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])]
        });
        this.Usersignup = [];
        this.digitcode = this.formgroup.controls['digitcode'];
    }
    UpdateMobileNumberPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UpdateMobileNumberPage');
    };
    UpdateMobileNumberPage.prototype.numberfill = function () {
        var n = this.digitcode.value.length;
        if (n > 4) {
            //document.getElementById("code").style.backgroundColor = "red";
            document.getElementById("code").style.color = "red";
        }
        else {
            document.getElementById("code").style.color = "white";
        }
    };
    UpdateMobileNumberPage.prototype.closeModel = function () {
        this.viewCtrl.dismiss(this.digitcode.value);
    };
    UpdateMobileNumberPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    UpdateMobileNumberPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-update-mobile-number',
            templateUrl: 'update-mobile-number.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            FormBuilder])
    ], UpdateMobileNumberPage);
    return UpdateMobileNumberPage;
}());
export { UpdateMobileNumberPage };
//# sourceMappingURL=update-mobile-number.js.map