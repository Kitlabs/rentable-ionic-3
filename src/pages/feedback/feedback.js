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
import { ProfileProvider } from '../../providers/payment/profile';
import { Storage } from '@ionic/storage';
import { Profile } from '../profile/profile';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
var FeedbackPage = /** @class */ (function () {
    function FeedbackPage(navCtrl, navParams, profileprovider, storage, af, chatProvider, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileprovider = profileprovider;
        this.storage = storage;
        this.af = af;
        this.chatProvider = chatProvider;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.profile = Profile;
        this.condition = [0, 1, 2, 3, 4];
        this.goodcondition = [];
        this.titlenumber = 300;
        this.submitBtnStatus = false;
        for (var i = 0; i < 5; ++i) {
            this.goodcondition[i] = false;
        }
        this.itemId = this.navParams.get("requestedItemId");
        this.msgKey = this.navParams.get("msgKey");
        this.chatRef = this.navParams.get("chatRef");
        this.itemOwnerId = this.navParams.get("itemOwnerId");
        this.showLog(this.itemId);
        this.showLog(this.itemOwnerId);
    }
    FeedbackPage.prototype.showLog = function (msg) {
        console.log(msg);
    };
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
    };
    FeedbackPage.prototype.changecondition = function (i) {
        console.log(i);
        for (var j = 0; j <= i; ++j) {
            this.goodcondition[j] = true;
        }
        for (var l = i + 1; l <= 5; ++l) {
            this.goodcondition[l] = false;
        }
        this.appfeedback = i + 1;
        this.submitBtnStatus = this.appfeedback > 0 ? true : false;
    };
    FeedbackPage.prototype.number = function () {
        var n = this.feedbacktext.length;
        this.titlenumber = 300 - n;
    };
    //serId,PostId,FeedbackRating,FeedbackComment)
    FeedbackPage.prototype.submit = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.storage.get('userId').then(function (id) {
            _this.profileprovider.giveFeedback(id, _this.itemId, _this.appfeedback, _this.feedbacktext).subscribe(function (data) {
                _this.loading.dismiss();
                if (data.json().msg == "success") {
                    _this.af.list(_this.chatRef).update(_this.msgKey, {
                        type: "feedback_hide"
                    });
                    _this.chatProvider.sendMessageRental(id, _this.itemOwnerId, _this.itemId, "feedback_response", _this.appfeedback + " rating given as feedback ", "Feedback submitted");
                    _this.presentToast("Feedback submitted successfully");
                    _this.navCtrl.pop();
                }
                else {
                    _this.presentToast("Please try again later");
                }
            }, function (err) {
                _this.loading.dismiss();
                _this.presentToast("Please try again later");
            });
        });
    };
    FeedbackPage.prototype.presentToast = function (msg) {
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
    FeedbackPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-feedback',
            templateUrl: 'feedback.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ProfileProvider,
            Storage,
            AngularFireDatabase,
            ChatProvider,
            LoadingController,
            ToastController])
    ], FeedbackPage);
    return FeedbackPage;
}());
export { FeedbackPage };
//# sourceMappingURL=feedback.js.map