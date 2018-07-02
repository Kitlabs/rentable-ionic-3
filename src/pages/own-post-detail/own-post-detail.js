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
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
var OwnPostDetailPage = /** @class */ (function () {
    function OwnPostDetailPage(navCtrl, navParams, itemprovider, loadingCtrl, authProvider, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemprovider = itemprovider;
        this.loadingCtrl = loadingCtrl;
        this.authProvider = authProvider;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.itemId = navParams.get("itemId");
        this.Product = [];
    }
    OwnPostDetailPage.prototype.ionViewDidLoad = function () {
        this.getOwnProductDetails();
    };
    OwnPostDetailPage.prototype.backicon = function () {
        this.navCtrl.pop();
    };
    OwnPostDetailPage.prototype.getOwnProductDetails = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.storage.get('userId').then(function (uid) {
            //data contain userid
            _this.itemprovider.getItemDetail(_this.itemId, uid).subscribe(function (data) {
                console.log(data);
                if (data.json().msg == "success") {
                    _this.Product = data.json().data[0];
                    console.log(_this.Product);
                    //this.listOfItems=data.json().data;
                    /*this.test=data.json().data[0].image;
                    console.log(this.test.split('|'))*/
                    _this.sliderImages = data.json().data[0].image.split('|');
                    if (_this.Product.currentcondition <= 1) {
                        _this.itemconditiontext = "POOR";
                    }
                    if (_this.Product.currentcondition == 2) {
                        _this.itemconditiontext = "FAIR";
                    }
                    if (_this.Product.currentcondition == 3) {
                        _this.itemconditiontext = "GOOD";
                    }
                    if (_this.Product.currentcondition == 4) {
                        _this.itemconditiontext = "VERY GOOD";
                    }
                    if (_this.Product.currentcondition == 5) {
                        _this.itemconditiontext = "EXCELLENT";
                    }
                    _this.getUserInfo(_this.Product.userId);
                }
                else {
                    //no response
                }
            }, function (err) {
                _this.loading.dismiss();
                console.log();
            }, function () {
                _this.loading.dismiss();
            });
        }); //end of storage
    };
    OwnPostDetailPage.prototype.getUserInfo = function (userId) {
        var _this = this;
        this.authProvider.getUserDetail(userId).subscribe(function (data) {
            _this.fullname = data.json().userDetails[0].firstName + " " + data.json().userDetails[0].lastName;
        }, function (err) {
        }, function () {
        });
    };
    /*
    Method to delete post
    */
    OwnPostDetailPage.prototype.deleteItem = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //data contain userid
        this.itemprovider.deleteItemById(this.itemId).subscribe(function (data) {
            if (data.json().msg == "success") {
                _this.navCtrl.pop();
            }
            else {
            }
        }, function (err) {
            _this.loading.dismiss();
            console.log();
        }, function () {
            _this.loading.dismiss();
        });
    };
    OwnPostDetailPage.prototype.presentConfirm = function () {
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
                        _this.deleteItem();
                    }
                }
            ]
        });
        alert.present();
    };
    OwnPostDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-own-post-detail',
            templateUrl: 'own-post-detail.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemsProvider,
            LoadingController,
            AuthenticateProvider,
            AlertController,
            Storage])
    ], OwnPostDetailPage);
    return OwnPostDetailPage;
}());
export { OwnPostDetailPage };
//# sourceMappingURL=own-post-detail.js.map