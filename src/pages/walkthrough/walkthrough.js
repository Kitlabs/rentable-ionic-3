var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LandingPage } from '../landing/landing';
/**
 * Generated class for the WalkthroughPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var WalkthroughPage = /** @class */ (function () {
    function WalkthroughPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.skipMsg = "Skip";
        this.state = 'x';
        this.status = (this.navParams.get('type') == 'profile') ? true : false;
    }
    WalkthroughPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WalkthroughPage');
    };
    WalkthroughPage.prototype.skip = function () {
        console.log("Call is received to skip page");
        this.storage.set("walkthrough", "true");
        this.navCtrl.setRoot(LandingPage);
    };
    WalkthroughPage.prototype.slideChanged = function () {
        if (this.slides.isEnd()) {
            console.log("end slide");
            this.skipMsg = "Get Started";
        }
        else {
            console.log("no end slide");
            this.skipMsg = "Skip";
        }
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], WalkthroughPage.prototype, "slides", void 0);
    WalkthroughPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-walkthrough',
            templateUrl: 'walkthrough.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage])
    ], WalkthroughPage);
    return WalkthroughPage;
}());
export { WalkthroughPage };
//# sourceMappingURL=walkthrough.js.map