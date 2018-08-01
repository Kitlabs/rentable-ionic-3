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
import { NavController, IonicPage, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ClaimrenterPage } from '../claimrenter/claimrenter';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
import { ItemsProvider } from '../../providers/items/items';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
var ClaimownerPage = /** @class */ (function () {
    function ClaimownerPage(navCtrl, navParams, storage, itemprovider, toastCtrl, loadingCtrl, af, chatProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.itemprovider = itemprovider;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.af = af;
        this.chatProvider = chatProvider;
        this.detail = Details;
        this.claimrenter = ClaimrenterPage;
        this.submitBtnStatus = false;
        this.bothPartyDidntAgreeStatus = false;
        this.titlenumber = 350;
        this.rentalRequestDetails = [];
        //overall rating given to user
        this.userRatingNeg = [];
        this.userRatingPos = [];
        //pick up rating
        this.pickUpRatingPos = [];
        this.pickUpRatingNeg = [];
        //return rating
        this.returnRatingPos = [];
        this.returnRatingNeg = [];
        this.requesterId = this.navParams.get("requesterId");
        this.requestedItemId = this.navParams.get("requestedItemId");
        this.msgKey = this.navParams.get("msgKey");
        this.chatRef = this.navParams.get("chatRef");
    }
    ClaimownerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ClaimownerPage');
        this.storage.get('userId').then(function (id) {
            _this.userId = id;
            _this.itemprovider.getClaimDetails(_this.requesterId, _this.requestedItemId).subscribe(function (data) {
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.rentalRequestDetails = data.json().PostData[0];
                    _this.basePath = _this.rentalRequestDetails.base_path;
                    _this.securityDeposit = _this.rentalRequestDetails.securityDeposit;
                    _this.bothPartyDidntAgreeStatus = _this.rentalRequestDetails.ReturnBothPartyAgree == 1 ? true : false;
                    _this.setPickUpRatingTitle(_this.rentalRequestDetails.PickupRating);
                    _this.setReturnRatingTitle(_this.rentalRequestDetails.ReturnRating);
                    _this.setPickRating();
                    _this.setReturnRating();
                }
            }, function (err) {
                console.log("error");
            });
        }); //end of storage
    };
    ClaimownerPage.prototype.setReturnRating = function () {
        if (this.rentalRequestDetails.Status == "ReturnedPending" || this.rentalRequestDetails.Status == "Returned") {
            for (var i = 0; i < this.rentalRequestDetails.ReturnRating; i++) {
                this.returnRatingPos[i] = i;
            }
            for (var j = 0; j < 5 - this.rentalRequestDetails.ReturnRating; j++) {
                this.returnRatingNeg[j] = j;
            }
        }
    };
    ClaimownerPage.prototype.setPickRating = function () {
        //Pick up time rating
        for (var i = 0; i < this.rentalRequestDetails.PickupRating; i++) {
            this.pickUpRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - this.rentalRequestDetails.PickupRating; j++) {
            this.pickUpRatingNeg[j] = j;
        }
    };
    ClaimownerPage.prototype.checker = function () {
        var isNumeric = /^\d+$/.test(this.bondToClaimAmount);
        if (!isNumeric) {
            document.getElementById('claimamount').style.color = "#FF0000";
        }
        else {
            document.getElementById('claimamount').style.color = "#000000";
        }
        if (parseFloat(this.bondToClaimAmount) > 0.0 && parseFloat(this.bondToClaimAmount) <= parseFloat(this.securityDeposit)) {
            this.submitBtnStatus = this.bondToClaimAmount && this.securityDeposit ? true : false;
        }
        else {
            this.submitBtnStatus = false;
        }
    };
    ClaimownerPage.prototype.setPickUpRatingTitle = function (rating) {
        if (rating <= 1) {
            this.pickUpRatingTitle = "POOR";
        }
        if (rating == 2) {
            this.pickUpRatingTitle = "FAIR";
        }
        if (rating == 3) {
            this.pickUpRatingTitle = "GOOD";
        }
        if (rating == 4) {
            this.pickUpRatingTitle = "VERY GOOD";
        }
        if (rating == 5) {
            this.pickUpRatingTitle = "EXCELLENT";
        }
    };
    ClaimownerPage.prototype.setReturnRatingTitle = function (rating) {
        if (rating <= 1) {
            this.returnRatingTitle = "POOR";
        }
        if (rating == 2) {
            this.returnRatingTitle = "FAIR";
        }
        if (rating == 3) {
            this.returnRatingTitle = "GOOD";
        }
        if (rating == 4) {
            this.returnRatingTitle = "VERY GOOD";
        }
        if (rating == 5) {
            this.returnRatingTitle = "EXCELLENT";
        }
    };
    ClaimownerPage.prototype.sendData = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        var msgRenter = "The owner is claiming $" + this.bondToClaimAmount + " amount from your security deposit. Please click here to review.";
        var msgOwner = "You are claiming $" + this.bondToClaimAmount + " from the security deposit";
        this.loading.present();
        this.itemprovider.acceptRejectReturnRating(this.requesterId, this.requestedItemId, 2, this.bondToClaimAmount, this.securityDeposit, this.comment).subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data);
            if (data.json().msg == "success") {
                _this.af.list(_this.chatRef).update(_this.msgKey, {
                    type: "return_request_response_claim_hide"
                });
                _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "claim_by_owner_show", msgOwner, msgRenter);
                _this.markMessageAsUnRead();
                _this.presentToast("Claim has been submitted successfully");
                _this.navCtrl.pop();
            }
            if (data.json().msg == "error") {
                _this.presentToast("Request already accepted ");
                _this.navCtrl.pop();
            }
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    ClaimownerPage.prototype.markMessageAsUnRead = function () {
        console.log("markMessageAsUnRead");
        this.chatProvider.markMessageAsUnread(this.userId, this.requesterId, this.requestedItemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    ClaimownerPage.prototype.number = function () {
        var n = this.comment.length;
        this.titlenumber = 350 - n;
    };
    ClaimownerPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ClaimownerPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed Toast');
        });
        toast.present();
    };
    ClaimownerPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-claimowner',
            templateUrl: 'claimowner.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            ItemsProvider,
            ToastController,
            LoadingController,
            AngularFireDatabase,
            ChatProvider])
    ], ClaimownerPage);
    return ClaimownerPage;
}());
export { ClaimownerPage };
//# sourceMappingURL=claimowner.js.map