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
import { ChatProvider } from '../../providers/chat/chat';
import { FormBuilder } from '@angular/forms';
import { Myrent } from '../myrent/myrent';
import { AngularFireDatabase } from 'angularfire2/database';
var PickupPage = /** @class */ (function () {
    function PickupPage(navCtrl, navParams, itemProvider, storage, loadingCtrl, toastCtrl, af, chatProvider, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemProvider = itemProvider;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.af = af;
        this.chatProvider = chatProvider;
        this.fb = fb;
        this.details = Details;
        this.condition = [0, 1, 2, 3, 4];
        this.submitBtnStatus = false;
        this.yesNoStatus = true;
        this.i = 0;
        this.j = 0;
    }
    PickupPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidLoad PickupPage');
        this.active_flag = false;
        this.agree = "yes";
        this.newItemRating = 0;
        this.goodcondition = [];
        this.comment = "";
        this.itemRatingPos = [];
        this.itemRatingNeg = [];
        console.log("AGEE=" + this.agree);
        for (var i = 0; i < 5; ++i) {
            this.goodcondition[i] = false;
        }
        this.pItemId = this.navParams.get("itemId");
        this.pItemRating = this.navParams.get("itemRating");
        this.itemOwnerId = this.navParams.get("itemOwnerId");
        this.setUserRating(this.pItemRating);
        this.setOldRating(this.pItemRating);
        this.message = "DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
        this.yesStatus = "assets/icon/no_tick.png";
        this.noStatus = "assets/icon/no_tick.png";
    };
    PickupPage.prototype.godetail = function () {
        this.navCtrl.pop();
    };
    PickupPage.prototype.radioChecked = function () {
        console.log(this.agree);
        if (this.agree == "no") {
            this.active_flag = true;
            this.message = "SELECT NEW CONDITION OF THE ITEM  ?";
            this.yesNoStatus = false;
            this.submitBtnStatus = false;
        }
        else {
            this.yesNoStatus = false;
            this.active_flag = false;
            this.message = "DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
            this.submitBtnStatus = true;
        }
    };
    PickupPage.prototype.yesChange = function () {
        if (this.i == 0) {
            this.yesStatus = "assets/icon/yes_tick.png";
            this.noStatus = "assets/icon/no_tick.png";
            this.message = "DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
            this.agree = "yes";
            this.submitBtnStatus = true;
            this.i = 1;
            this.j = 0;
        }
        else {
            this.yesStatus = "assets/icon/no_tick.png";
            this.agree = "yes";
            this.submitBtnStatus = false;
            this.message = "DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
            this.i = 0;
            this.j = 0;
        }
    };
    PickupPage.prototype.noChange = function () {
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
    PickupPage.prototype.changecondition = function (i) {
        for (var j = 0; j <= i; ++j) {
            this.goodcondition[j] = true;
        }
        for (var l = i + 1; l <= 5; ++l) {
            this.goodcondition[l] = false;
        }
        // if(this.message.length>0){
        //   this.submitBtnStatus=true;
        // }else{
        //   this.submitBtnStatus=false;
        // }
        this.newItemRating = i + 1;
        this.setNewRatingCondition(this.newItemRating);
        this.submitBtnStatus = true;
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
    PickupPage.prototype.commentAdd = function () {
        console.log(this.comment);
        // if(this.comment.length){
        //   if(this.active_flag==true && this.newItemRating==0 ){
        //     //not agree with the condition of item (new rating of item)
        //       this.submitBtnStatus=false;
        //   }else{
        //     this.submitBtnStatus=true;
        //   }
        // }else{
        //   this.submitBtnStatus=false;
        // }
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
        var _this = this;
        //{"action":"RequestStatusChange", "UserId":"1","PostId":"68","Status":"PickedUp","PickupComment":"Its Newly itemd sdfsd","UserAgree":"1","PickupRating":"5"}
        console.log("STATUS=" + this.agree);
        if (this.agree == "no") {
            //not agree with the condition of item (new rating of item)
            this.newItemRating = this.newItemRating;
            this.userAgree = 0;
            this.cMesage = "Not agreed to pick up the item condition rating " + this.pItemRating + " and new rating is " + this.newItemRating;
            console.log(this.cMesage);
        }
        else {
            //agree with condition of item
            this.newItemRating = this.pItemRating;
            this.userAgree = 1;
            this.cMesage = "Agreed with the item condition i.e " + this.pItemRating;
            console.log(this.cMesage);
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
            _this.cUserId = uid;
            _this.itemProvider.sendPickupRequest(uid, _this.pItemId, _this.comment, _this.userAgree, _this.newItemRating).subscribe(function (data) {
                _this.loading.dismiss();
                if (data.json().msg == "success") {
                    //this.chatProvider.sendMessage(uid,this.itemOwnerId,this.pItemId,this.cMesage,"pickup");
                    _this.chatProvider.sendMessageRental(uid, _this.itemOwnerId, _this.pItemId, "pickup_request_show", "Please confirm pick up request, click here", "Pick up request pending approval");
                    _this.markMessageAsUnRead(uid);
                    _this.showToast("Pickup request has been sent successfully");
                }
                else {
                    _this.showToast("Please try again later");
                }
            }, function (err) {
                _this.loading.dismiss();
            });
        });
    };
    PickupPage.prototype.markMessageAsUnRead = function (uid) {
        console.log("markMessageAsUnRead");
        this.chatProvider.markMessageAsUnread(uid, this.itemOwnerId, this.pItemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    PickupPage.prototype.showToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 3000
        });
        toast.onDidDismiss(function () {
            _this.navCtrl.push(Myrent);
            //this.navCtrl.pop();
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
            ToastController,
            AngularFireDatabase,
            ChatProvider,
            FormBuilder])
    ], PickupPage);
    return PickupPage;
}());
export { PickupPage };
//# sourceMappingURL=pickup.js.map