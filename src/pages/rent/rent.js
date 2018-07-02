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
import { NavController, NavParams, Navbar, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
import { RejectPage } from '../reject/reject';
import { AcceptPage } from '../accept/accept';
import { Details } from '../details/details';
import { ItemsProvider } from '../../providers/items/items';
import { ChatPage } from '../chat/chat';
var RentPage = /** @class */ (function () {
    function RentPage(navCtrl, navParams, storage, itemprovider, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.itemprovider = itemprovider;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
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
        console.log(this.requesterId);
        console.log(this.requestedItemId);
    }
    RentPage.prototype.backdetail = function () {
        this.navCtrl.pop();
    };
    RentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get('userId').then(function (id) {
            _this.userId = id;
            _this.itemprovider.getRentalRequestDetails(_this.requesterId, _this.requestedItemId).subscribe(function (data) {
                if (data.json().msg == "success") {
                    _this.rentalRequestDetails = data.json().PostData[0];
                    _this.basePath = data.json().base_path;
                    console.log("UserRating=" + _this.rentalRequestDetails.rating);
                    //product rating
                    for (var i = 0; i < _this.rentalRequestDetails.rating; i++) {
                        _this.userRatingPos[i] = i;
                    }
                    for (var j = 0; j < 5 - _this.rentalRequestDetails.rating; j++) {
                        _this.userRatingNeg[j] = j;
                    }
                }
            }, function (err) {
                console.log("error");
            });
        }); //end of storage
    };
    /*
      navigate to reject request page
    */
    RentPage.prototype.goToRejectRequest = function () {
        this.navCtrl.push(RejectPage, {
            requesterId: this.requesterId,
            requestedItemId: this.requestedItemId
        });
    };
    /*
      navigate to accept request page
    */
    RentPage.prototype.goToAcceptRequest = function () {
        var _this = this;
        this.itemprovider.acceptRentalRequest(this.requesterId, this.requestedItemId, "Rented").subscribe(function (data) {
            if (data.json().msg == "success") {
                _this.presentToast("Request has been accepted successfully");
                _this.navCtrl.push(Home);
            }
            if (data.json().msg == "error") {
                _this.presentToast("Request already accepted ");
                _this.navCtrl.setRoot(ChatPage);
            }
        }, function (err) {
        });
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
            LoadingController])
    ], RentPage);
    return RentPage;
}());
export { RentPage };
//# sourceMappingURL=rent.js.map