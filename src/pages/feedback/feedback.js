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
import { ProfileProvider } from '../../providers/payment/profile';
import { Profile } from '../profile/profile';
/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FeedbackPage = /** @class */ (function () {
    function FeedbackPage(navCtrl, navParams, profileprovider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileprovider = profileprovider;
        this.profile = Profile;
        this.condition = [0, 1, 2, 3, 4];
        this.goodcondition = [];
        for (var i = 0; i < 5; ++i) {
            this.goodcondition[i] = false;
        }
        this.titlenumber = 300;
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
    };
    FeedbackPage.prototype.changecondition = function (i) {
        console.log(i, "id");
        for (var j = 0; j <= i; ++j) {
            this.goodcondition[j] = true;
        }
        for (var l = i + 1; l <= 5; ++l) {
            this.goodcondition[l] = false;
        }
        this.appfeedback = i;
    };
    FeedbackPage.prototype.number = function () {
        var n = this.feedbacktext.length;
        this.titlenumber = 400 - n;
    };
    FeedbackPage.prototype.submit = function () {
        this.profileprovider.Appfeedback(this.appfeedback, this.feedbacktext).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    FeedbackPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-feedback',
            templateUrl: 'feedback.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ProfileProvider])
    ], FeedbackPage);
    return FeedbackPage;
}());
export { FeedbackPage };
//# sourceMappingURL=feedback.js.map