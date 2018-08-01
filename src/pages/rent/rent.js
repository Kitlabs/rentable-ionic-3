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
import { NavController, NavParams, Navbar, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileProvider } from '../../providers/payment/profile';
import { Home } from '../home/home';
import { RejectPage } from '../reject/reject';
import { AcceptPage } from '../accept/accept';
import { Details } from '../details/details';
import { ItemsProvider } from '../../providers/items/items';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
var RentPage = /** @class */ (function () {
    function RentPage(navCtrl, navParams, storage, itemprovider, toastCtrl, loadingCtrl, af, alertCtrl, chatProvider, profileProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.itemprovider = itemprovider;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.af = af;
        this.alertCtrl = alertCtrl;
        this.chatProvider = chatProvider;
        this.profileProvider = profileProvider;
        this.home = Home;
        this.accept = AcceptPage;
        this.rentreject = RejectPage;
        this.detail = Details;
        this.condition = [0, 1, 2, 3, 4];
        this.goodcondition = [];
        for (var i = 0; i < 3; ++i) {
            this.goodcondition[i] = true;
        }
        for (var i = 3; i < 5; ++i) {
            this.goodcondition[i] = false;
        }
        this.Product = {
            img: 'assets/img/11.png', ownerimage: 'assets/img/profile-img.png', ownername: 'John', item_title: 'house', price: '25', description: 'this is good rentalable book', selectdate: '19/7/2017', total_cost: '100'
        };
        this.renter = {
            img: 'assets/img/profile-img.png', name: 'John', address: 'Sydney Australia', rate: '4.5', rent_nuber: '10', owner_number: '20'
        };
        this.rentalRequestDetails = [];
        this.userRatingNeg = [];
        this.userRatingPos = [];
        this.requesterId = this.navParams.get("requesterId");
        this.requestedItemId = this.navParams.get("requestedItemId");
        this.msgKey = this.navParams.get("msgKey");
        this.chatRef = this.navParams.get("chatRef");
    }
    RentPage.prototype.backdetail = function () {
        this.navCtrl.pop();
    };
    RentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('userId').then(function (id) {
            _this.userId = id;
        });
        this.getRentalReqeustInfo();
        this.getUserRating();
    };
    RentPage.prototype.getRentalReqeustInfo = function () {
        var _this = this;
        this.itemprovider.getRentalRequestDetails(this.requesterId, this.requestedItemId).subscribe(function (data) {
            if (data.json().msg == "success") {
                _this.rentalRequestDetails = data.json().PostData[0];
                if (_this.rentalRequestDetails.Status == 'Cancel') {
                    _this.af.list(_this.chatRef).update(_this.msgKey, {
                        type: "rental_request_hide"
                    });
                    _this.showAlertMessage("The rental request has been cancelled");
                }
                var fromDateStr = _this.rentalRequestDetails.FromDate;
                var toDateStr = _this.rentalRequestDetails.ToDate;
                var fromDateRes = fromDateStr.split("-");
                var toDateRes = toDateStr.split("-");
                _this.fromDate = fromDateRes[2] + "/" + fromDateRes[1] + "/" + fromDateRes[0].slice(2);
                _this.toDate = toDateRes[2] + "/" + toDateRes[1] + "/" + toDateRes[0].slice(2);
                _this.basePath = data.json().base_path;
                _this.priceBreakDown();
            }
            else {
                _this.navCtrl.pop();
            }
        }, function (err) {
            console.log("error");
            _this.navCtrl.pop();
        });
    };
    RentPage.prototype.priceBreakDown = function () {
        //delivery fee not applied
        if (this.rentalRequestDetails.needDelivery == 0) {
            this.toolTip = "Rental Cost = $" + this.rentalRequestDetails.rentalCostWithoutFee + "                    Service Fee = $" + this.rentalRequestDetails.rentableServiceFee;
            console.log(this.toolTip);
        }
        else {
            //delivery fee applied
            this.toolTip = "Rental Cost = $" + this.rentalRequestDetails.rentalCostWithoutFee + "                     Service Fee = $" + this.rentalRequestDetails.rentableServiceFee + "                      Delivery Fee = $" + this.rentalRequestDetails.deliveryfee;
        }
    };
    /*
      navigate to reject request page
    */
    RentPage.prototype.goToRejectRequest = function () {
        this.navCtrl.push(RejectPage, {
            requesterId: this.requesterId,
            requestedItemId: this.requestedItemId,
            msgKey: this.msgKey,
            chatRef: this.chatRef,
            userId: this.userId
        });
    };
    /*
      navigate to accept request page
    */
    RentPage.prototype.goToAcceptRequest = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.itemprovider.acceptRentalRequest(this.requesterId, this.requestedItemId, "Rented").subscribe(function (data) {
            _this.loading.dismiss();
            if (data.json().msg == "success") {
                _this.af.list(_this.chatRef).update(_this.msgKey, {
                    type: "rental_request_hide"
                });
                _this.presentToast("Request has been accepted successfully");
                //uid,interlocutor,itemid,message,type
                _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "rental_request_response", "rental request has been approved", "rental request has been approved");
                _this.navCtrl.pop();
            }
            if (data.json().msg == "error") {
                _this.presentToast("Request already accepted ");
                _this.navCtrl.pop();
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.navCtrl.pop();
        });
    };
    /*
      Function to set user rating
    */
    RentPage.prototype.getUserRating = function () {
        var _this = this;
        var rating;
        //product rating
        this.profileProvider.getRating(this.requesterId).subscribe(function (data) {
            rating = data.json().AverageRating;
            if (data.json().msg == "success") {
                if (rating > 0 && rating < 1) {
                    rating = 0;
                }
                if (rating >= 1 && rating < 2) {
                    rating = 1;
                }
                if (rating >= 2 && rating < 3) {
                    rating = 2;
                }
                if (rating >= 3 && rating < 4) {
                    rating = 3;
                }
                if (rating >= 4 && rating < 5) {
                    rating = 4;
                }
                if (rating >= 5) {
                    rating = 5;
                }
                for (var i = 0; i < rating; i++) {
                    _this.userRatingPos[i] = i;
                }
                for (var j = 0; j < 5 - rating; j++) {
                    _this.userRatingNeg[j] = j;
                }
            }
        }, function (err) {
        });
    };
    RentPage.prototype.showAlertMessage = function (subTitle) {
        var _this = this;
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            enableBackdropDismiss: false,
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }]
        });
        alert.present();
    };
    RentPage.prototype.presentToast = function (msg) {
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
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], RentPage.prototype, "navBar", void 0);
    RentPage = __decorate([
        Component({
            selector: 'page-rent',
            templateUrl: 'rent.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            ItemsProvider,
            ToastController,
            LoadingController,
            AngularFireDatabase,
            AlertController,
            ChatProvider,
            ProfileProvider])
    ], RentPage);
    return RentPage;
}());
export { RentPage };
//# sourceMappingURL=rent.js.map