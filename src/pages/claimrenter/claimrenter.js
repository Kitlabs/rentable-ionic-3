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
import { ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Details } from '../details/details';
/**
 * Generated class for the ClaimrenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ClaimrenterPage = /** @class */ (function () {
    function ClaimrenterPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.claimowner = ClaimownerPage;
        this.otherprofile = OtherprofilePage;
        this.detail = Details;
        this.Product = {
            img: 'assets/img/11.png', ownerimage: 'assets/img/profile-img.png', ownername: 'John', item_title: 'house', price: '25', description: 'this is good rentalable book', selectdate: '19/7/2017', total_cost: '100'
        };
        this.renter = {
            img: 'assets/img/profile-img.png', name: 'John', address: 'Sydney Australia', rate: '4.5', rent_nuber: '10', owner_number: '20'
        };
        this.active_flag = true;
        this.agree = "no";
    }
    ClaimrenterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ClaimrenterPage');
    };
    ClaimrenterPage.prototype.radioChecked = function () {
        if (this.agree == "no") {
            this.active_flag = true;
        }
        else {
            this.active_flag = false;
        }
    };
    ClaimrenterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-claimrenter',
            templateUrl: 'claimrenter.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], ClaimrenterPage);
    return ClaimrenterPage;
}());
export { ClaimrenterPage };
//# sourceMappingURL=claimrenter.js.map