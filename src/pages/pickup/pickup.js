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
import { ItemsProvider } from '../../providers/items/items';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PickupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PickupPage = /** @class */ (function () {
    function PickupPage(navCtrl, navParams, itemProvider, storage, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemProvider = itemProvider;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.details = Details;
        this.condition = [0, 1, 2, 3, 4];
    }
    PickupPage.prototype.ionViewDidEnter = function () {
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
    PickupPage.prototype.godetail = function () {
        this.navCtrl.pop();
    };
    PickupPage.prototype.radioChecked = function () {
        if (this.agree == "no") {
            this.active_flag = true;
        }
        else {
            this.active_flag = false;
        }
    };
    PickupPage.prototype.changecondition = function (i) {
        for (var j = 0; j <= i; ++j) {
            this.goodcondition[j] = true;
        }
        for (var l = i + 1; l <= 5; ++l) {
            this.goodcondition[l] = false;
        }
        this.newItemRating = i + 1;
        this.setNewRatingCondition(this.newItemRating);
    };
    PickupPage.prototype.setOldRating = function (rating) {
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
    /*
     function to set rating given by owner w
     */
    PickupPage.prototype.setUserRating = function (rating) {
        for (var i = 0; i < rating; i++) {
            this.itemRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - rating; j++) {
            this.itemRatingNeg[j] = j;
        }
    };
    PickupPage.prototype.setNewRatingCondition = function (rating) {
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
    PickupPage.prototype.sendData = function () {
        //{"action":"RequestStatusChange", "UserId":"1","PostId":"68","Status":"PickedUp","PickupComment":"Its Newly itemd sdfsd","UserAgree":"1","PickupRating":"5"}
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
        this.loading.present();
        console.log(this.comment);
        console.log(this.userAgree);
        console.log(this.newItemRating);
        this.storage.get('userId').then(function (uid) {
            _this.itemProvider.sendPickupRequest(uid, _this.pItemId, _this.comment, _this.userAgree, _this.newItemRating).subscribe(function (data) {
                _this.loading.dismiss();
                console.log(data.json);
                if (data.json().msg == "success") {
                    _this.showToast("Pickup request has been sent successfully");
                }
            }, function (err) {
                _this.loading.dismiss();
            });
        });
    };
    PickupPage.prototype.showToast = function (msg) {
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
    PickupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pickup',
            templateUrl: 'pickup.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemsProvider,
            Storage,
            LoadingController,
            ToastController])
    ], PickupPage);
    return PickupPage;
}());
export { PickupPage };
//# sourceMappingURL=pickup.js.map