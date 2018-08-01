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
import { NavController, NavParams } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { Details } from '../details/details';
import { ProfileProvider } from '../../providers/payment/profile';
import { ItemsProvider } from '../../providers/items/items';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
/*
  Generated class for the OtherprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var OtherprofilePage = /** @class */ (function () {
    function OtherprofilePage(navCtrl, navParams, storage, authprovier, itemprovider, profileProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.authprovier = authprovier;
        this.itemprovider = itemprovider;
        this.profileProvider = profileProvider;
        this.rent = RentPage;
        this.productdetail = Details;
        this.like = [];
        for (var i = 0; i < 12; ++i) {
            this.like[i] = false;
        }
        this.userRatingNeg = [];
        this.userRatingPos = [];
        this.otherprofile = {
            img: 'assets/img/profile-img.png', name: 'John Doe', address: 'Sydney Australia', rate: '4.5', rent_nuber: '10', owner_number: '20'
        };
        this.avaiablelist =
            [
                { img: 'assets/img/11.png', title: 'John', view: '10', favourity: '20', id: '0' },
                { img: 'assets/img/22.png', title: 'John', view: '10', favourity: '20', id: '1' },
                { img: 'assets/img/33.png', title: 'John', view: '10', favourity: '20', id: '2' },
                { img: 'assets/img/11.png', title: 'John', view: '10', favourity: '20', id: '3' },
                { img: 'assets/img/22.png', title: 'John', view: '10', favourity: '20', id: '4' },
                { img: 'assets/img/33.png', title: 'John', view: '10', favourity: '20', id: '5' },
            ];
        this.postlist =
            [
                { img: 'assets/img/33.png', title: 'John', view: '10', favourity: '20', id: '0' },
                { img: 'assets/img/11.png', title: 'John', view: '10', favourity: '20', id: '1' },
                { img: 'assets/img/22.png', title: 'John', view: '10', favourity: '20', id: '2' },
                { img: 'assets/img/11.png', title: 'John', view: '10', favourity: '20', id: '3' },
                { img: 'assets/img/22.png', title: 'John', view: '10', favourity: '20', id: '4' },
                { img: 'assets/img/33.png', title: 'John', view: '10', favourity: '20', id: '5' },
            ];
        this.userId = this.navParams.get("userId");
        this.basePath = "http://54.79.124.187/api/uploads/";
    }
    OtherprofilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OtherprofilePagePage');
        this.isavailable = "available";
        this.getUserDetails();
        this.setUserRating();
        this.getItemWithStatus("available");
    };
    OtherprofilePage.prototype.ActiveLike = function (i) {
        this.like[i] = !this.like[i];
    };
    //method to get user details
    OtherprofilePage.prototype.getUserDetails = function () {
        var _this = this;
        this.authprovier.getUserDetail(this.userId).subscribe(function (data) {
            console.log(data);
            _this.userInfo = data.json().userDetails;
            _this.name = _this.userInfo[0].firstName + " " + _this.userInfo[0].lastName;
            _this.profilePic = _this.basePath + _this.userInfo[0].photoURL;
        });
    };
    /*
      function to get list of item  via status
      status can be available,rented,pending,returned
      */
    OtherprofilePage.prototype.getItemWithStatus = function (status) {
        var _this = this;
        this.itemprovider.getIOwnAvailableItemsSecond(this.userId, "IownAvailable").subscribe(function (data) {
            console.log("I OWN AVAILABEL");
            console.log(data.json());
            if (data.json().msg == "success") {
                _this.own_avaiablelist = data.json().data;
            }
        });
    };
    OtherprofilePage.prototype.goToProductDetail = function (itemId) {
        this.navCtrl.push(Details, {
            itemId: itemId
        });
        //this.navCtrl.pop();
    };
    OtherprofilePage.prototype.goPreviousPage = function () {
        /*this.navCtrl.push(Details,{
          itemId:this.itemId
        })*/
        this.navCtrl.pop();
    };
    /*
      Function to set user rating
    */
    OtherprofilePage.prototype.setUserRating = function () {
        var _this = this;
        var rating;
        //product rating
        this.profileProvider.getRating(this.userId).subscribe(function (data) {
            rating = data.json().AverageRating;
            console.log(rating);
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
    OtherprofilePage = __decorate([
        Component({
            selector: 'page-otherprofile',
            templateUrl: 'otherprofile.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            AuthenticateProvider,
            ItemsProvider,
            ProfileProvider])
    ], OtherprofilePage);
    return OtherprofilePage;
}());
export { OtherprofilePage };
//# sourceMappingURL=otherprofile.js.map