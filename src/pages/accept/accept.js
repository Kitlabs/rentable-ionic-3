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
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
var AcceptPage = /** @class */ (function () {
    function AcceptPage(navCtrl, navParams, itemProvider, storage, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemProvider = itemProvider;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.details = Details;
        this.condition = [0, 1, 2, 3, 4];
    }
    AcceptPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidLoad PickupPage');
        this.active_flag = true;
        this.agree = "no";
        this.newItemRating = 0;
        this.goodcondition = [];
        this.comment = "";
        this.itemRatingPos = [];
        this.itemRatingNeg = [];
        for (var i = 0; i < 5; ++i) {
            this.goodcondition[i] = false;
        }
        this.pItemId = this.navParams.get("itemId");
        this.pItemRating = this.navParams.get("itemRating");
        this.setUserRating(this.pItemRating);
        this.setOldRating(this.pItemRating);
    };
    AcceptPage.prototype.setOldRating = function (rating) {
        if (rating <= 1) {
            this.preRatingCondtion = "POOR";
        }
        if (rating == 2) {
            this.preRatingCondtion = "FAIR";
        }
        if (rating == 3) {
            this.preRatingCondtion = "GOOD";
        }
        if (rating == 4) {
            this.preRatingCondtion = "VERY GOOD";
        }
        if (rating == 5) {
            this.preRatingCondtion = "EXCELLENT";
        }
    };
    AcceptPage.prototype.changecondition = function (i) {
        for (var j = 0; j <= i; ++j) {
            this.goodcondition[j] = true;
        }
        for (var l = i + 1; l <= 5; ++l) {
            this.goodcondition[l] = false;
        }
        this.newItemRating = i + 1;
        console.log("New Rating=" + i);
        this.setNewRatingCondition(this.newItemRating);
    };
    AcceptPage.prototype.setNewRatingCondition = function (rating) {
        if (rating <= 1) {
            this.newRatingCondition = "POOR";
        }
        if (rating == 2) {
            this.newRatingCondition = "FAIR";
        }
        if (rating == 3) {
            this.newRatingCondition = "GOOD";
        }
        if (rating == 4) {
            this.newRatingCondition = "VERY GOOD";
        }
        if (rating == 5) {
            this.newRatingCondition = "EXCELLENT";
        }
    };
    AcceptPage.prototype.godetail = function () {
        this.navCtrl.pop();
    };
    AcceptPage.prototype.radioChecked = function () {
        if (this.agree == "no") {
            this.active_flag = true;
        }
        else {
            this.active_flag = false;
        }
    };
    /*
     function to set rating given by owner w
     */
    AcceptPage.prototype.setUserRating = function (rating) {
        console.log("Rating=" + rating);
        for (var i = 0; i < rating; i++) {
            this.itemRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - rating; j++) {
            this.itemRatingNeg[j] = j;
        }
    };
    AcceptPage.prototype.submit = function () {
        var _this = this;
        if (this.active_flag == true) {
            //not agree with the condition of item (new rating of item)
            this.newItemRating = this.newItemRating;
            this.userAgree = 0;
        }
        else {
            //agree with condition of item
            this.newItemRating = this.pItemRating;
            this.userAgree = 1;
        }
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        //this.loading.present();
        console.log(this.comment);
        console.log(this.userAgree);
        console.log(this.newItemRating);
        this.storage.get('userId').then(function (uid) {
            _this.itemProvider.sendReturnedRequest(uid, _this.pItemId, _this.comment, _this.newItemRating).subscribe(function (data) {
                _this.loading.dismiss();
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.showToast("Returned request has been sent successfully");
                }
            }, function (err) {
                _this.loading.dismiss();
            });
        });
    };
    AcceptPage.prototype.showToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
            _this.navCtrl.pop();
        });
        toast.present();
    };
    AcceptPage = __decorate([
        Component({
            selector: 'page-accept',
            templateUrl: 'accept.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemsProvider,
            Storage,
            LoadingController,
            ToastController])
    ], AcceptPage);
    return AcceptPage;
}());
export { AcceptPage };
//# sourceMappingURL=accept.js.map