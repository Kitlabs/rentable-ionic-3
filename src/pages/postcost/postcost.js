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
import { NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { Postitemprovider } from '../../providers/items/postitem';
import { PostdetailPage } from '../postdetail/postdetail';
import { AddPage } from '../add/add';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
var PostcostPage = /** @class */ (function () {
    function PostcostPage(navCtrl, navParams, postitemprovider, storage, loadingCtrl, alertCtrl, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.postitemprovider = postitemprovider;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.postdetail = PostdetailPage;
        this.addpage = AddPage;
        //variables initialization
        this.deliver = false; //status of deliver checkbox    
        this.dailyprice = "";
        this.weeklyprice = "";
        this.fairprice = ""; //as security deposit
        this.distance = 1;
        this.fee = "";
        this.nextStatus = 0;
        this.itempost = navParams.get("itempost");
        //get the useId from storage
        this.storage.get('userId').then(function (data) {
            _this.userId = data;
        });
    }
    PostcostPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PostcostPage');
    };
    PostcostPage.prototype.nextEnable = function () {
        document.getElementById("next").style.color = "#ffffff";
    };
    PostcostPage.prototype.nextDisable = function () {
        document.getElementById("next").style.color = "#ffffff66";
    };
    PostcostPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get("status").then(function (res) {
            if (res == "true") {
                _this.storage.get("dailyPrice").then(function (res) {
                    if (res != null) {
                        _this.dailyprice = res;
                        _this.nextStatus = _this.nextStatus + 1;
                    }
                });
                _this.storage.get("weeklyPrice").then(function (res) {
                    if (res != null) {
                        _this.weeklyprice = res;
                        _this.nextStatus = _this.nextStatus + 1;
                    }
                });
                _this.storage.get("fairPrice").then(function (res) {
                    if (res != 0) {
                        _this.fairprice = res;
                        _this.nextStatus = _this.nextStatus + 1;
                    }
                });
                //checking deliver status
                _this.storage.get("deliver").then(function (res) {
                    if (res == "true") {
                        _this.deliver = true;
                        _this.storage.get("fee").then(function (res) {
                            if (res != null) {
                                _this.fee = res;
                                _this.nextStatus = _this.nextStatus + 1;
                            }
                        });
                        _this.storage.get("distance").then(function (res) {
                            if (res != null) {
                                _this.distance = res;
                                _this.nextStatus = _this.nextStatus + 1;
                            }
                        });
                        //if deliver checked
                        if (_this.nextStatus == 5) {
                            _this.nextEnable();
                            console.log("5 if ");
                        }
                        else {
                            _this.nextDisable();
                            console.log("5 else ");
                        }
                    }
                    else {
                        //if deliver not checked
                        if (_this.nextStatus == 3) {
                            console.log("3 if ");
                            _this.nextEnable();
                        }
                        else {
                            console.log("5 if ");
                            _this.nextDisable();
                        }
                    }
                }); //end of storage deliver
            }
            else {
                _this.nextDisable();
            }
        });
        //getting stored location and using while posting the items
        this.storage.get("location").then(function (location) {
            //current location
            _this.itempost.lat = location.lat;
            _this.itempost.lng = location.lng;
        });
    };
    PostcostPage.prototype.number = function () {
        this.weeklyprice = this.dailyprice * 7;
        this.weeklyprice = this.weeklyprice.toString().slice(0, 4);
        if (this.weeklyprice == 0) {
            this.weeklyprice = "";
        }
        if (this.dailyprice.length == 0 || this.weeklyprice.length == 0 || this.fairprice == null || this.fairprice == "" || this.weeklyprice.length == 0) {
            console.log("zeror");
            this.nextDisable();
        }
        else {
            if (this.deliver == true) {
                if (this.fee.length == 0) {
                    this.nextDisable();
                }
                else {
                    this.nextEnable();
                }
            }
            else {
                this.fee = "";
                this.nextEnable();
            }
        }
        //document.getElementById('week').textContent=String(this.dailyprice*7);
    };
    PostcostPage.prototype.numberWeekly = function (i) {
        if (i == 0) {
            if (this.dailyprice.length == 0 || this.weeklyprice.length == 0 || this.fairprice == null || this.fairprice == "" || this.weeklyprice.length == 0) {
                console.log("zeror");
                this.nextDisable();
            }
            else {
                if (this.deliver == true) {
                    if (this.fee.length == 0) {
                        this.nextDisable();
                    }
                    else {
                        this.nextEnable();
                    }
                }
                else {
                    this.fee = "";
                    this.nextEnable();
                }
            }
        }
        if (i == 1) {
            this.weeklyprice = "";
            this.nextDisable();
        }
    };
    PostcostPage.prototype.securityDeposit = function () {
        if (this.dailyprice.length == 0 || this.weeklyprice.length == 0 || this.fairprice == null || this.fairprice == "" || this.weeklyprice.length == 0) {
            this.nextDisable();
        }
        else {
            if (this.deliver == true) {
                if (this.fee.length == 0) {
                    this.nextDisable();
                }
                else {
                    this.nextEnable();
                }
            }
            else {
                this.fee = "";
                this.nextEnable();
            }
        }
    };
    PostcostPage.prototype.removefairprice = function () {
        this.fairprice = "";
    };
    PostcostPage.prototype.removeweeklyprice = function () {
        this.weeklyprice = null;
    };
    PostcostPage.prototype.removedailyprice = function () {
        this.dailyprice = "";
    };
    PostcostPage.prototype.removefee = function () {
        this.fee = "";
    };
    PostcostPage.prototype.backadd = function () {
        this.navCtrl.setRoot(AddPage);
    };
    PostcostPage.prototype.backdetail = function () {
        // this.navCtrl.push(PostdetailPage);
        this.navCtrl.setRoot(PostdetailPage);
    };
    PostcostPage.prototype.Postitem = function () {
        //old code (current user locattion used when posting the item)
        //   Geolocation.getCurrentPosition().then((resp) => {
        //    // resp.coords.latitude
        //    // resp.coords.longitude
        //    this.lat=resp.coords.latitude;
        //    this.lng=resp.coords.longitude;
        //    //this.presentAlert(this.lat+","+this.lng);
        //   }).catch((error) => {
        //   console.log('Error getting location', error);
        // });  
        this.checkValidation();
    };
    PostcostPage.prototype.checkValidation = function () {
        if (this.dailyprice.length == 0 || this.weeklyprice.length == 0 || this.fairprice.length == 0) {
            //this.nextDisable();
            //do nothing
        }
        else {
            if (this.deliver == true) {
                if (this.fee.length == 0) {
                    //this.nextDisable();
                    //do nothing
                }
                else {
                    //this.nextEnable();
                    this.postItemNew();
                }
            }
            else {
                this.postItemNew();
                //this.nextEnable();
            }
        }
    };
    PostcostPage.prototype.closeScreen = function () {
        this.presentConfirm();
    };
    PostcostPage.prototype.postItemNew = function () {
        var _this = this;
        //creating the loading
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //fetching image from storage
        this.storage.get('image').then(function (data) {
            _this.itempost.image = JSON.stringify(data);
            _this.itempost.userId = _this.userId;
            _this.itempost.dailyPrice = _this.dailyprice;
            _this.itempost.weeklyprice = _this.weeklyprice;
            _this.itempost.deliver = _this.deliver;
            _this.itempost.distance = _this.distance;
            _this.itempost.deliveryOrPickUpFee = _this.fee;
            console.log(_this.itempost);
            _this.postitemprovider.postItem(_this.itempost).subscribe(function (data) {
                console.log(data);
                _this.loading.dismiss();
                if (data.json().msg == "success") {
                    _this.storage.set("status", "false");
                    _this.storage.set("itemTitle", null);
                    _this.storage.set("itemCategory", null);
                    _this.storage.set("itemConditionMark", null);
                    _this.storage.set("itemConditionTitle", null);
                    _this.storage.set('image', null);
                    _this.presentSuccessfullAlert("Posted Successfully");
                }
                else {
                    _this.presentAlert("Please try again later");
                }
            }, function (err) {
                _this.loading.dismiss();
                _this.presentAlert("Please check your internet connection");
                console.log(err);
            }, function () {
                console.log("complete");
            });
        }); //end of storage
    };
    PostcostPage.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm ',
            message: 'Do you want to save your information before closing?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        _this.storage.set("status", "false");
                        _this.storage.set("itemTitle", null);
                        _this.storage.set("itemCategory", null);
                        _this.storage.set("itemConditionMark", null);
                        _this.storage.set("itemConditionTitle", null);
                        _this.storage.set('image', null);
                        _this.storage.set('dailyPrice', null);
                        _this.storage.set('weeklyPrice', null);
                        _this.storage.set('fairPrice', null);
                        _this.storage.set('deliver', null);
                        _this.storage.set('fee', null);
                        _this.storage.set('distance', null);
                        _this.navCtrl.setRoot(Home);
                        // this.app.getRootNav().getActiveChildNav().select(0);
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        if (_this.dailyprice != null) {
                            _this.storage.set("status", "true");
                            _this.storage.set("dailyPrice", _this.dailyprice);
                        }
                        if (_this.weeklyprice != null) {
                            _this.storage.set("status", "true");
                            _this.storage.set("weeklyPrice", _this.weeklyprice);
                        }
                        if (_this.fairprice != null) {
                            _this.storage.set("status", "true");
                            _this.storage.set("fairPrice", _this.fairprice);
                        }
                        if (_this.deliver != false) {
                            _this.storage.set("deliver", "true");
                            if (_this.fee != null) {
                                _this.storage.set("status", "true");
                                _this.storage.set("fee", _this.fee);
                            }
                            if (_this.distance != null) {
                                _this.storage.set("status", "true");
                                _this.storage.set("distance", _this.distance);
                            }
                        }
                        _this.navCtrl.setRoot(Home);
                    }
                }
            ]
        });
        alert.present();
    };
    //method used to present alert to user
    PostcostPage.prototype.presentAlert = function (subTitle) {
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    PostcostPage.prototype.presentSuccessfullAlert = function (subTitle) {
        var _this = this;
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        _this.app.getRootNav().getActiveChildNav().select(0);
                        _this.navCtrl.setRoot(Home);
                    }
                }]
        });
        alert.present();
    };
    PostcostPage = __decorate([
        Component({
            selector: 'page-postcost',
            templateUrl: 'postcost.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Postitemprovider,
            Storage,
            LoadingController,
            AlertController,
            App])
    ], PostcostPage);
    return PostcostPage;
}());
export { PostcostPage };
//# sourceMappingURL=postcost.js.map