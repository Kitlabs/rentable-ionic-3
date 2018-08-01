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
import { NavController, IonicPage, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Details } from '../details/details';
import { PaymentProvider } from '../../providers/payment/payment';
import { Storage } from '@ionic/storage';
import { ItemsProvider } from '../../providers/items/items';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
var ClaimrenterPage = /** @class */ (function () {
    function ClaimrenterPage(navCtrl, navParams, storage, itemprovider, toastCtrl, loadingCtrl, af, alertCtrl, paymentProvider, chatProvider) {
        // this.Product ={
        //   img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', ownername: 'John', item_title:'house', price:'25', description:'this is good rentalable book', selectdate:'19/7/2017', total_cost:'100'
        // }
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.itemprovider = itemprovider;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.af = af;
        this.alertCtrl = alertCtrl;
        this.paymentProvider = paymentProvider;
        this.chatProvider = chatProvider;
        this.claimowner = ClaimownerPage;
        this.otherprofile = OtherprofilePage;
        this.detail = Details;
        this.submitBtnStatus = false;
        this.i = 0;
        this.j = 0;
        this.agreeSectionStatus = false;
        this.bothPartyDidntAgreeStatus = false;
        this.claimOwnerCommentStatus = false;
        // this.renter = {
        //   img: 'assets/img/profile-img.png', name: 'John', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
        // }  
        this.data = [];
        //overall rating given to user
        this.userRatingNeg = [];
        this.userRatingPos = [];
        //pick up rating
        this.pickUpRatingPos = [];
        this.pickUpRatingNeg = [];
        //return rating
        this.returnRatingPos = [];
        this.returnRatingNeg = [];
        //data from chat
        this.itemId = this.navParams.get("requestedItemId");
        this.msgKey = this.navParams.get("msgKey");
        this.chatRef = this.navParams.get("chatRef");
        this.itemOwnerId = this.navParams.get("itemOwnerId");
        console.log(this.itemOwnerId);
        this.active_flag = true;
        this.yesStatus = "assets/icon/no_tick.png";
        this.noStatus = "assets/icon/no_tick.png";
    }
    ClaimrenterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ClaimrenterPage');
        this.storage.get('userId').then(function (id) {
            _this.userId = id;
            _this.itemprovider.getClaimDetails(id, _this.itemId).subscribe(function (data) {
                console.log(data);
                if (data.json().msg == "success") {
                    _this.data = data.json().PostData[0];
                    _this.basePath = data.json().base_path;
                    _this.bothPartyDidntAgreeStatus = _this.data.ReturnBothPartyAgree == 1 ? true : false;
                    _this.claimOwnerCommentStatus = _this.data.ClaimComment ? true : false;
                    _this.setPickUpRatingTitle(_this.data.PickupRating);
                    _this.setReturnRatingTitle(_this.data.ReturnRating);
                    _this.setPickUpRating();
                    _this.setReturnRating();
                    _this.hideShowAgreeSection();
                }
            }, function (err) {
                console.log("error");
                _this.presentToast("Please try again later");
                _this.navCtrl.pop();
            });
        }); //end of storage
    };
    /**
     * ReturnBothPartyAgree
     * 1 = didn't agree (Both parties do not agree on the return conditions – the renter can accept or reject the claim made by the owner)
     * 0/null = agree
     */
    ClaimrenterPage.prototype.hideShowAgreeSection = function () {
        if (this.data.ReturnBothPartyAgree == "1") {
            //both party didn't agree
            this.agree = "No";
            this.submitBtnStatus = false;
            this.agreeSectionStatus = true;
        }
        else {
            this.agree = "Yes";
            this.submitBtnStatus = true;
            this.agreeSectionStatus = false;
        }
    };
    ClaimrenterPage.prototype.setReturnRating = function () {
        if (this.data.Status == "ReturnedPending" || this.data.Status == "Returned") {
            for (var i = 0; i < this.data.ReturnRating; i++) {
                this.returnRatingPos[i] = i;
            }
            for (var j = 0; j < 5 - this.data.ReturnRating; j++) {
                this.returnRatingNeg[j] = j;
            }
        }
    };
    ClaimrenterPage.prototype.setPickUpRating = function () {
        for (var i = 0; i < this.data.PickupRating; i++) {
            this.pickUpRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - this.data.PickupRating; j++) {
            this.pickUpRatingNeg[j] = j;
        }
    };
    ClaimrenterPage.prototype.setPickUpRatingTitle = function (rating) {
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
    ClaimrenterPage.prototype.setReturnRatingTitle = function (rating) {
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
    ClaimrenterPage.prototype.radioChecked = function () {
        if (this.agree == "No") {
            this.active_flag = true;
        }
        else {
            this.active_flag = false;
        }
    };
    ClaimrenterPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ClaimrenterPage.prototype.yesChange = function () {
        if (this.i == 0) {
            this.yesStatus = "assets/icon/yes_tick.png";
            this.noStatus = "assets/icon/no_tick.png";
            this.agree = "Yes";
            this.submitBtnStatus = true;
            this.i = 1;
            this.j = 0;
        }
        else {
            this.yesStatus = "assets/icon/no_tick.png";
            this.agree = "Yes";
            this.submitBtnStatus = false;
            this.i = 0;
            this.j = 0;
        }
    };
    ClaimrenterPage.prototype.noChange = function () {
        if (this.j == 0) {
            this.noStatus = "assets/icon/yes_tick.png";
            this.yesStatus = "assets/icon/no_tick.png";
            this.agree = "No";
            this.j = 1;
            this.i = 0;
            this.submitBtnStatus = true;
        }
        else {
            this.noStatus = "assets/icon/no_tick.png";
            this.agree = "No";
            this.j = 0;
            this.i = 0;
            this.submitBtnStatus = false;
        }
    };
    ClaimrenterPage.prototype.submit = function () {
        var msgOwner, msgRenter;
        if (this.agree == "Yes") {
            msgRenter = "You have accepted the claim and $" + this.data.ClaimBondAmount + " will be deducted from the security deposit";
            msgOwner = "The renter accepted your claim";
            this.hitApiWithCaptureAuth(msgOwner, msgRenter, this.data.ClaimBondAmount);
        }
        if (this.agree == "No") {
            msgRenter = "You have rejected the claim; the owner might contact Rentable team to solve this claim";
            msgOwner = "The renter rejected your claim. If you are not satisfied with this action please lodge a claim with us, claim@rentableapp.com";
            this.hitApiWithoutCaptureAuth(msgOwner, msgRenter);
        }
    };
    ClaimrenterPage.prototype.hitApiWithCaptureAuth = function (msgOwner, msgRenter, captureBondAmount) {
        var _this = this;
        console.log("hitApiWithCaptureAuth");
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.paymentProvider.captureSecurityDeposit(this.userId, this.itemId, captureBondAmount).subscribe(function (data) {
            console.log("CAPTURE_PAYMENT=", data);
            if (data.json().msg == "succeeded" || data.json().msg == "pending") {
                _this.itemprovider.replyToClaim(_this.userId, _this.itemId, _this.agree).subscribe(function (data) {
                    _this.loading.dismiss();
                    if (data.json().msg == "success") {
                        _this.af.list(_this.chatRef).update(_this.msgKey, {
                            type: "claim_by_owner_hide"
                        });
                        _this.chatProvider.sendMessageRental(_this.userId, _this.itemOwnerId, _this.itemId, "claim_by_owner_response", msgOwner, msgRenter);
                        _this.chatProvider.sendMessageRental(_this.userId, _this.itemOwnerId, _this.itemId, "feedback_show", "Give Feedback", "Give feedback");
                        _this.markMessageAsUnRead();
                        _this.presentToast("Sent Successfully");
                        _this.navCtrl.pop();
                    }
                    if (data.json().msg == "error") {
                        _this.presentToast("Try again later");
                        _this.navCtrl.pop();
                    }
                }, function (err) {
                    _this.loading.dismiss();
                    _this.navCtrl.pop();
                });
            }
            else {
                _this.loading.dismiss();
                if (data.json().msg == "failed" || data.json().msg == "error") {
                    _this.presentAlert(data.json().msg_details);
                }
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.presentToast("Please try again later");
        });
    };
    ClaimrenterPage.prototype.hitApiWithoutCaptureAuth = function (msgOwner, msgRenter) {
        var _this = this;
        console.log("hitApiWithoutCaptureAuth");
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.itemprovider.replyToClaim(this.userId, this.itemId, this.agree).subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data);
            if (data.json().msg == "success") {
                _this.af.list(_this.chatRef).update(_this.msgKey, {
                    type: "claim_by_owner_hide"
                });
                _this.chatProvider.sendMessageRental(_this.userId, _this.itemOwnerId, _this.itemId, "claim_by_owner_response", msgOwner, msgRenter);
                _this.chatProvider.sendMessageRental(_this.userId, _this.itemOwnerId, _this.itemId, "feedback_show", "Give Feedback", "Give feedback");
                _this.markMessageAsUnRead();
                _this.presentToast("Sent Successfully");
                _this.navCtrl.pop();
            }
            if (data.json().msg == "error") {
                _this.presentToast("Try again later");
                _this.navCtrl.pop();
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.navCtrl.pop();
        });
    };
    ClaimrenterPage.prototype.markMessageAsUnRead = function () {
        console.log("markMessageAsUnRead");
        this.chatProvider.markMessageAsUnread(this.userId, this.itemOwnerId, this.itemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    ClaimrenterPage.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    ClaimrenterPage.prototype.presentToast = function (msg) {
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
    ClaimrenterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-claimrenter',
            templateUrl: 'claimrenter.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            ItemsProvider,
            ToastController,
            LoadingController,
            AngularFireDatabase,
            AlertController,
            PaymentProvider,
            ChatProvider])
    ], ClaimrenterPage);
    return ClaimrenterPage;
}());
export { ClaimrenterPage };
//# sourceMappingURL=claimrenter.js.map