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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Likes } from '../likes/likes'; //favourites screen
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
var Myrent = /** @class */ (function () {
    function Myrent(navCtrl, navParams, itemprovider, storage, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemprovider = itemprovider;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.own_rent = "own";
        this.date = "current";
        this.isavailable = "available";
        this.ownshowwhite = false;
        this.rentshowwhite = false;
        this.favourites = Likes;
        this.details = Details;
        this.showdeleteicon = true;
        this.rent_like = [];
        for (var i = 0; i < 4; ++i) {
            this.rent_like[i] = false;
        }
        this.own_like = [];
        for (var i = 0; i < 4; ++i) {
            this.own_like[i] = false;
        }
        this.itemprovider.Getownavailable(localStorage.getItem('uid')).subscribe(function (data) {
            console.log(data.json().result);
        }, function (err) {
            console.log(err);
        });
        this.itemprovider.Getownrent(localStorage.getItem('uid')).subscribe(function (data) {
            console.log(data.json().result);
        }, function (err) {
            console.log(err);
        });
        this.itemprovider.Getrentcurrent(localStorage.getItem('uid')).subscribe(function (data) {
            console.log(data.json().result);
        }, function (err) {
            console.log(err);
        });
        this.itemprovider.Getrentcurrent(localStorage.getItem('uid')).subscribe(function (data) {
            console.log(data.json().result);
        }, function (err) {
            console.log(err);
        });
        this.rentedListNotFound = true;
        this.rent_currentlist = [];
        this.profileimage = 'assets/img/profile-img.png';
        /*this.own_avaiablelist =
        [
          {img: 'assets/img/11.png', title: 'John', view:'10', favourity:'20', id:'0'},
          {img: 'assets/img/22.png', title: 'alex', view:'10', favourity:'20', id:'1'},
          {img: 'assets/img/33.png', title: 'eric', view:'10', favourity:'20', id:'2'},
          {img: 'assets/img/11.png', title: 'kevin', view:'10', favourity:'20' ,id:'3'},
        ]*/
        /*this.own_rentedlist =
        [
          {img: 'assets/img/11.png', title: 'apartment', profileimage:'assets/img/profile-img.png', profilename:'John', delete:'yes', rentday:'5'},
          {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'2'},
          {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'3' },
          {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'2'},
          {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'3' }
        ]*/
        /*  this.rent_currentlist =
          [
            {img: 'assets/img/11.png', title: 'John', view:'43', favourity:'40',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'0'},
            {img: 'assets/img/22.png', title: 'jens', view:'234', favourity:'50',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'1'},
            {img: 'assets/img/33.png', title: 'eric', view:'12', favourity:'26',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'2'},
            {img: 'assets/img/11.png', title: 'daniel', view:'52', favourity:'23',unlike:'assets/icon/like.png',like:'assets/icon/like-full.png',islike:'false', id:'3'},
          ]
      */
        // this.rent_historylist =
        // [
        //   {img: 'assets/img/11.png', title: 'apartment', profileimage:'assets/img/profile-img.png', profilename:'John', delete:'yes', rentday:'5' },
        //   {img: 'assets/img/22.png', title: 'wedding', profileimage:'assets/img/profile-img.png', profilename:'rascal', delete:'yes',  rentday:'3'},
        //   {img: 'assets/img/33.png', title: 'shop', profileimage:'assets/img/profile-img.png', profilename:'sizza', delete:'yes', rentday:'2' }
        // ]
    }
    ;
    Myrent.prototype.showdelete = function () {
        if (this.own_rent == "own") {
            console.log("own");
            if (this.isavailable == "available") {
                console.log("available");
                this.showdeleteicon = true;
            }
            if (this.isavailable == "rented") {
                console.log("rented");
                this.showdeleteicon = false;
            }
        }
        if (this.own_rent == "rent") {
            console.log("rent");
            this.showdeleteicon = false;
        }
    };
    Myrent.prototype.ownshowheart = function (i) {
        this.own_like[i] = !this.own_like[i];
    };
    Myrent.prototype.rentshowheart = function (i) {
        this.rent_like[i] = !this.rent_like[i];
    };
    /*Get all available item */
    Myrent.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.own_avaiablelist = [];
        this.own_rentedlist = [];
        this.rent_currentlist = [];
        this.rent_historylist = [];
        localStorage.setItem('status', 'true');
        this.own_avaiablelist = null;
        this.own_rentedlist = null;
        this.storage.get('userId').then(function (id) {
            _this.userId = id;
            /**I OWN - AVAILABLE */
            _this.itemprovider.getIOwnAvailableItemsSecond(id, "IownAvailable").subscribe(function (data) {
                console.log("I OWN AVAILABEL");
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.own_avaiablelist = data.json().data;
                }
            });
            /**I OWN-RENTED */
            _this.itemprovider.getIOwnRentedItems(id, "IownRented").subscribe(function (data) {
                console.log("I OWN RENTED");
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.own_rentedlist = data.json().data;
                }
            });
            /**I RENT-CURRENT */
            _this.itemprovider.getIRentCurrentItems(id).subscribe(function (data) {
                console.log("i rent current");
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.rent_currentlist = data.json().PostData;
                    _this.basePath = data.json().base_path;
                }
            });
            /**I RENT-HISTORY */
            _this.itemprovider.getIRentHistoryItems(id).subscribe(function (data) {
                console.log("i rent history");
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.rent_historylist = data.json().PostData;
                    _this.basePath = data.json().base_path;
                }
            });
        }); //end of storage
        this.clearPostDetails();
    };
    Myrent.prototype.clearPostDetails = function () {
        var _this = this;
        console.log("clearPostDetails");
        this.storage.get('postid').then(function (id) {
            if (id) {
                _this.storage.set('postid', null);
                _this.storage.set('image', null);
                _this.storage.set("status", "false");
                _this.storage.set("itemTitle", null);
                _this.storage.set("itemCategory", null);
                _this.storage.set("itemConditionMark", null);
                _this.storage.set("itemConditionTitle", null);
                _this.storage.set("dailyPrice", null);
                _this.storage.set("fairPrice", null);
                _this.storage.set("distance", null);
                console.log("adfadsfasdfasdf");
            }
        });
    };
    Myrent.prototype.goToDetailsOwnAvailable = function (itemId) {
        this.navCtrl.push("OwnPostDetailPage", {
            status: 'Available',
            itemId: itemId,
        });
    };
    Myrent.prototype.goToDetailsOwnRented = function (itemId, amount, fromDate, toDate, status, renterId, rentalCostWithoutFee, rentableServiceFee, itemOwnerFee) {
        this.navCtrl.push("OwnPostDetailPage", {
            itemId: itemId,
            renterId: renterId,
            amount: amount,
            rentalCostWithoutFee: rentalCostWithoutFee,
            rentableServiceFee: rentableServiceFee,
            itemOwnerFee: itemOwnerFee,
            fromDate: fromDate,
            toDate: toDate,
            status: status,
        });
    };
    Myrent.prototype.gotToDetails = function (itemId, amount, fromDate, toDate, status, rentalCostWithoutFee, rentableServiceFee, itemOwnerFee) {
        this.navCtrl.push("DetailsRentPage", {
            itemId: itemId,
            amount: amount,
            rentalCostWithoutFee: rentalCostWithoutFee,
            rentableServiceFee: rentableServiceFee,
            itemOwnerFee: itemOwnerFee,
            fromDate: fromDate,
            toDate: toDate,
            status: status
        });
    };
    Myrent.prototype.goToOtherProfile = function (id) {
        this.navCtrl.push(OtherprofilePage, {
            userId: id
        });
    };
    /*
      Method to delete post
      */
    Myrent.prototype.deleteItem = function (itemId, deleteId, status) {
        var _this = this;
        console.log("Call is received to delete item " + itemId);
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        if (status == "IOwnAvailable") {
            //data contain userid
            this.itemprovider.deleteItemById(itemId).subscribe(function (data) {
                console.log(data);
                _this.loading.dismiss();
                if (data.json().msg == "success") {
                    //this.ionViewWillEnter();
                    _this.own_avaiablelist.splice(deleteId, 1);
                }
                else {
                }
            }, function (err) {
                _this.loading.dismiss();
                console.log();
            });
        }
        if (status == "IRentHistory") {
            this.itemprovider.deleteIRentHistoryItem(this.userId, itemId).subscribe(function (data) {
                console.log(data);
                _this.loading.dismiss();
                if (data.json().msg == "success") {
                    //this.ionViewWillEnter();
                    _this.rent_historylist.splice(deleteId, 1);
                }
                else {
                }
            }, function (err) {
                _this.loading.dismiss();
                console.log();
            });
        }
    };
    /**
     *
     * @param itemId contain the id of item to delete
     * @param deleteId contain the index id of item showing on screen
     * @param status //distinguish among where it called from "IOwnAvailable" "IRentHistory"
     */
    Myrent.prototype.presentConfirm = function (itemId, deleteId, status) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to delete this post?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.deleteItem(itemId, deleteId, status);
                    }
                }
            ]
        });
        alert.present();
    };
    Myrent = __decorate([
        Component({
            selector: 'page-myrent',
            templateUrl: 'myrent.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemsProvider,
            Storage,
            LoadingController,
            AlertController])
    ], Myrent);
    return Myrent;
}());
export { Myrent };
//# sourceMappingURL=myrent.js.map