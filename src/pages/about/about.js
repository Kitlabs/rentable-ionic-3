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
import { NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/payment/profile';
import { Profile } from '../profile/profile';
var About = /** @class */ (function () {
    function About(navCtrl, navParams, profileprovier) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileprovier = profileprovier;
        this.profile = Profile;
        this.profileprovier.Aboutinfo(localStorage.getItem('uid')).subscribe(function (data) {
            console.log(data);
            _this.about = data;
        }, function (err) {
            console.log(err);
        });
    }
    About = __decorate([
        Component({
            selector: 'page-about',
            templateUrl: 'about.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ProfileProvider])
    ], About);
    return About;
}());
export { About };
//# sourceMappingURL=about.js.map