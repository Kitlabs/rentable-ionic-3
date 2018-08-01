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
import { Myrent } from '../myrent/myrent';
import { ChatProvider } from '../../providers/chat/chat';
var AcceptPage = /** @class */ (function () {
    function AcceptPage(navCtrl, navParams, itemProvider, storage, loadingCtrl, toastCtrl, chatProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemProvider = itemProvider;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.chatProvider = chatProvider;
        this.details = Details;
        this.condition = [0, 1, 2, 3, 4];
        this.submitBtnStatus = false;
        this.i = 0;
        this.j = 0;
    }
    AcceptPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidLoad PickupPage');
        this.active_flag = false;
        this.agree = "yes";
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
        this.itemOwnerId = this.navParams.get("itemOwnerId");
        console.log("PickUpRating=", this.pItemRating);
        this.message = "IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
        this.yesStatus = "assets/icon/no_tick.png";
        this.noStatus = "assets/icon/no_tick.png";
        this.getPickUpRating();
    };
    AcceptPage.prototype.getPickUpRating = function () {
        var _this = this;
        this.storage.get('userId').then(function (uid) {
            _this.itemProvider.getPickUpAndReturnRating(uid, _this.pItemId).subscribe(function (data) {
                if (data.json().msg == "success") {
                    _this.pItemRating = data.json().data[0].PickupRating;
                    _this.setUserRating(_this.pItemRating);
                    //this.setOldRating(this.pItemRating);
                    console.log(_this.pItemRating);
                }
            }, function (err) {
                _this.navCtrl.pop();
            });
        });
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
        this.setNewRatingCondition(this.newItemRating);
        this.submitBtnStatus = true;
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
    AcceptPage.prototype.toggleChange = function () {
        console.log(this.agreewith);
        if (this.agreewith) {
            this.submitBtnStatus = true;
            this.yesStatus = "assets/icon/yes_tick.png";
            this.noStatus = "assets/icon/no_tick.png";
            this.message = "IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
            this.agree = "yes";
            this.i = 1;
            this.j = 0;
        }
        else {
            this.submitBtnStatus = false;
            this.yesStatus = "assets/icon/yes_tick.png";
            this.noStatus = "assets/icon/no_tick.png";
            this.message = "IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
            this.agree = "yes";
            this.i = 1;
            this.j = 0;
        }
    };
    /*
     function to set rating given by owner
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
    AcceptPage.prototype.yesChange = function () {
        if (this.i == 0) {
            this.yesStatus = "assets/icon/yes_tick.png";
            this.noStatus = "assets/icon/no_tick.png";
            this.message = "IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
            this.agree = "yes";
            this.submitBtnStatus = true;
            this.i = 1;
            this.j = 0;
        }
        else {
            this.yesStatus = "assets/icon/no_tick.png";
            this.agree = "yes";
            this.submitBtnStatus = false;
            this.message = "IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
            this.i = 0;
            this.j = 0;
        }
    };
    AcceptPage.prototype.noChange = function () {
        if (this.j == 0) {
            this.noStatus = "assets/icon/yes_tick.png";
            this.yesStatus = "assets/icon/no_tick.png";
            this.message = "SELECT NEW CONDITION OF THE ITEM  ?";
            this.agree = "no";
            this.submitBtnStatus = this.newItemRating > 0 ? true : false;
            this.j = 1;
            this.i = 0;
        }
        else {
            this.noStatus = "assets/icon/no_tick.png";
            this.agree = "yes";
            this.message = "DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
            this.j = 0;
            this.i = 0;
            this.submitBtnStatus = false;
        }
    };
    /**
     * Case 1: Check whether the product rating change or not
     * Case 2: Check whether the both party agree or not
     */
    AcceptPage.prototype.submit = function () {
        var _this = this;
        var ownermsg, rentermsg;
        console.log(this.newItemRating);
        console.log(this.pItemRating);
        console.log(this.agree);
        rentermsg = "Return request pending approval";
        ownermsg = "Please confirm return request, click here";
        if (this.agreewith) {
            //both party are not agree with item condition
            //rentermsg="Product Returned. Both parties did not agree with the product conditions.";
            //ownermsg="Both parties did not agree with the product conditions. To make a claim click here";
            this.newItemRating = 0;
            this.agree = "none";
        }
        else {
            //Both party  agree then check the product rating
            if (this.agree == "yes") {
                //rentermsg="Return request pending approval";
                //ownermsg="Please confirm return request, click here";
                this.newItemRating = this.pItemRating;
            }
            else {
                //Not agree with rating
                //rentermsg="Product returned in different conditions when rented";
                //ownermsg="Product returned in different conditions when rented. To make a claim click here";
                this.newItemRating = this.newItemRating;
            }
        }
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        console.log(this.newItemRating);
        this.loading.present();
        this.storage.get('userId').then(function (uid) {
            _this.itemProvider.sendReturnedRequest(uid, _this.pItemId, _this.comment, _this.newItemRating, _this.agreewith, _this.agree).subscribe(function (data) {
                _this.loading.dismiss();
                console.log(data.json());
                if (data.json().msg == "success") {
                    //this.chatProvider.sendMessage(uid,this.itemOwnerId,this.pItemId,"Returned request has been sent succesfully","return");
                    _this.chatProvider.sendMessageRental(uid, _this.itemOwnerId, _this.pItemId, "return_request_show", ownermsg, rentermsg);
                    _this.markMessageAsUnRead(uid);
                    _this.showToast("Returned request has been sent successfully");
                }
            }, function (err) {
                _this.loading.dismiss();
            });
        });
    };
    AcceptPage.prototype.markMessageAsUnRead = function (uid) {
        console.log("markMessageAsUnRead");
        this.chatProvider.markMessageAsUnread(uid, this.itemOwnerId, this.pItemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    AcceptPage.prototype.showToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 3000
        });
        toast.onDidDismiss(function () {
            //this.navCtrl.pop();
            _this.navCtrl.push(Myrent);
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
            ToastController,
            ChatProvider])
    ], AcceptPage);
    return AcceptPage;
}());
export { AcceptPage };
//# sourceMappingURL=accept.js.map