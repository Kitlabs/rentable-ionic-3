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
import { NavController, NavParams, Platform, ViewController, ModalController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
var ShareModal = /** @class */ (function () {
    function ShareModal(navCtrl, navParams, platform, modalCtrl, viewCtrl, socialSharing, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.socialSharing = socialSharing;
        this.alertCtrl = alertCtrl;
        this.subject = 'Message from Rentable Application';
        this.message = 'Take your app development skills to the next level with Mastering Ionic 2 - the definitive guide';
        this.image = 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
        this.uri = 'https://www.jadecreative.co.nz';
        this.rootUrl = '54.79.124.187/api/uploads/';
    }
    ShareModal.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShareModalPage');
        this.productTitle = this.navParams.get('productTitle');
        this.productDescription = this.navParams.get('productDescription');
        this.productDailyRentalCost = this.navParams.get('productDailyRentalCost');
        this.image = this.navParams.get('productImage');
        this.message = "Title=" + this.productTitle + " , " + "Description=" + this.productDescription + " , " + "Daily rental cost=" + "$" + this.productDailyRentalCost;
        console.log(this.image);
    };
    ShareModal.prototype.shareViaFacebook = function () {
        var _this = this;
        console.log("facebook share");
        this.platform.ready()
            .then(function () {
            _this.socialSharing.shareViaFacebook(_this.message, _this.image, _this.image)
                .then(function (data) {
                _this.presentAlert('Shared via Facebook');
            })
                .catch(function (err) {
                _this.presentAlert('Was not shared via Facebook');
            });
        })
            .catch(function (err) {
            _this.presentAlert('Not able to be shared via Facebook');
        });
        // });
    };
    ShareModal.prototype.shareViaTwitter = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.socialSharing.shareViaTwitter(_this.message, _this.image, _this.image)
                .then(function (data) {
                _this.presentAlert('Shared via Twitter');
            })
                .catch(function (err) {
                _this.presentAlert('Was not shared via Twitter');
            });
        });
    };
    ShareModal.prototype.shareViaWhatsapp = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.socialSharing.shareViaWhatsApp(_this.message, _this.image, _this.image)
                .then(function (data) {
                _this.presentAlert('Shared via Whatsapp');
            })
                .catch(function (err) {
                _this.presentAlert('Was not shared via Whatsapp');
            });
        });
    };
    ShareModal.prototype.closeShareDialog = function () {
        this.viewCtrl.dismiss();
    };
    //  shareViaInstagram(){
    //    this.platform.ready()
    //    .then(() =>
    //    {
    //       SocialSharing.shareViaInstagram(this.message, this.image)
    //       .then((data) =>
    //       {
    //          console.log('Shared via shareViaInstagram');
    //       })
    //       .catch((err) =>
    //       {
    //          console.log('Was not shared via Instagram');
    //       });
    //    });
    // }
    ShareModal.prototype.shareViaEmail = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.socialSharing.canShareViaEmail()
                .then(function () {
                _this.socialSharing.shareViaEmail(_this.message, _this.subject, _this.sendTo)
                    .then(function (data) {
                    console.log('Shared via Email');
                })
                    .catch(function (err) {
                    console.log('Not able to be shared via Email');
                });
            })
                .catch(function (err) {
                console.log('Sharing via Email NOT enabled');
            });
        });
    };
    ShareModal.prototype.presentAlert = function (subTitle) {
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    ShareModal.prototype.close = function () {
        this.viewCtrl.dismiss(); // This works fine
    };
    ShareModal = __decorate([
        Component({
            selector: 'page-share-modal',
            templateUrl: 'share-modal.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Platform,
            ModalController,
            ViewController,
            SocialSharing,
            AlertController])
    ], ShareModal);
    return ShareModal;
}());
export { ShareModal };
//# sourceMappingURL=share-modal.js.map