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
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Details } from '../details/details';
import { Profile } from '../profile/profile';
import { SearchPage } from '../search/search';
import { Myrent } from '../myrent/myrent';
import { Storage } from '@ionic/storage';
var Likes = /** @class */ (function () {
    function Likes(navCtrl, navParams, itemprovider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemprovider = itemprovider;
        this.storage = storage;
        this.profile = Profile;
        this.search = SearchPage;
        this.details = Details;
        this.myrent = Myrent;
        this.like = [];
        this.categorylist = [];
        for (var i = 0; i < 12; ++i) {
            this.like[i] = false;
        }
        /*this.categorylist = [
          {img: 'assets/img/01.png', price:'21',id:'0'},
          {img: 'assets/img/02.png', price:'56',id:'1'},
          {img: 'assets/img/03.png', price:'34',id:'2'},
          {img: 'assets/img/04.png', price:'21',id:'3'},
          {img: 'assets/img/01.png', price:'15',id:'4'},
          {img: 'assets/img/02.png', price:'65',id:'5'},
          {img: 'assets/img/03.png', price:'64',id:'6'},
          {img: 'assets/img/04.png', price:'123',id:'7'},
          {img: 'assets/img/01.png', price:'21',id:'8'},
          {img: 'assets/img/02.png', price:'12',id:'9'},
          {img: 'assets/img/03.png', price:'52',id:'10'},
          {img: 'assets/img/04.png', price:'212',id:'11'}
        ]*/
    }
    Likes.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad LikesPage');
        this.navBar.backButtonClick = function () {
            _this.navCtrl.setRoot(Myrent);
        };
        this.getListOfFavouriteList();
    };
    Likes.prototype.ActiveLike = function (i) {
        this.like[i] = false;
    };
    Likes.prototype.UnactiveLike = function (i) {
        this.like[i] = true;
    };
    Likes.prototype.ActiveFavourite = function (itemId) {
        var _this = this;
        this.like[itemId] = false;
        this.itemprovider.addRemoveFavourite(this.userId, itemId, 1).subscribe(function (data) {
            _this.getListOfFavouriteList();
        });
    };
    Likes.prototype.DeactiveFavourite = function (itemId) {
        var _this = this;
        this.like[itemId] = true;
        this.itemprovider.addRemoveFavourite(this.userId, itemId, 0).subscribe(function (data) {
            _this.getListOfFavouriteList();
        });
    };
    Likes.prototype.goToDetails = function (itemId) {
        this.navCtrl.push(Details, {
            itemId: itemId
        });
    };
    Likes.prototype.getListOfFavouriteList = function () {
        var _this = this;
        this.storage.get('userId').then(function (data) {
            _this.userId = data;
            _this.itemprovider.getFavouriteList(_this.userId).subscribe(function (data) {
                console.log("succes");
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.basePath = data.json().base_path;
                    _this.categorylist = data.json().msg_details;
                }
                if (data.json().msg == "error") {
                }
            }, function (err) {
                console.log("error");
            });
        });
    };
    Likes.prototype.filterItems = function () {
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], Likes.prototype, "navBar", void 0);
    Likes = __decorate([
        Component({
            selector: 'page-likes',
            templateUrl: 'likes.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemsProvider,
            Storage])
    ], Likes);
    return Likes;
}());
export { Likes };
//# sourceMappingURL=likes.js.map