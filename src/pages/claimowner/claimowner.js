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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClaimrenterPage } from '../claimrenter/claimrenter';
import { Details } from '../details/details';
/**
 * Generated class for the ClaimownerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ClaimownerPage = /** @class */ (function () {
    function ClaimownerPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detail = Details;
        this.claimrenter = ClaimrenterPage;
        this.titlenumber = 350;
    }
    ClaimownerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ClaimownerPage');
    };
    ClaimownerPage.prototype.number = function () {
        var n = this.itemtitle.length;
        this.titlenumber = 350 - n;
    };
    ClaimownerPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-claimowner',
            templateUrl: 'claimowner.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], ClaimownerPage);
    return ClaimownerPage;
}());
export { ClaimownerPage };
//# sourceMappingURL=claimowner.js.map