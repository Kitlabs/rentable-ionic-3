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
import { NavController, NavParams, LoadingController, AlertController, App, ToastController } from 'ionic-angular';
import { Postitemprovider } from '../../providers/items/postitem';
import { PostdetailPage } from '../postdetail/postdetail';
import { AddPage } from '../add/add';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
var PostcostPage = /** @class */ (function () {
    function PostcostPage(navCtrl, navParams, postitemprovider, storage, loadingCtrl, alertCtrl, toastCtrl, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.postitemprovider = postitemprovider;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.postdetail = PostdetailPage;
        this.addpage = AddPage;
        //variables initialization
        this.deliver = false; //status of deliver checkbox    
        this.dailyprice = "5";
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
        console.log("Next Enable");
        document.getElementById("next").style.color = "#ffffff";
    };
    PostcostPage.prototype.nextDisable = function () {
        console.log("Next Disable");
        document.getElementById("next").style.color = "#ffffff66";
    };
    PostcostPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.checkEditOrNewPost();
        this.storage.get("status").then(function (res) {
            if (res == "true") {
                _this.storage.get("dailyPrice").then(function (res) {
                    if (res != null) {
                        _this.dailyprice = res;
                        _this.nextStatus = _this.nextStatus + 1;
                    }
                });
                _this.storage.get("fairPrice").then(function (res) {
                    if (res) {
                        _this.fairprice = res;
                        console.log("FAIR PRICE=", _this.fairprice);
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
                            if (res != null && res > 1) {
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
                        if (_this.nextStatus == 2) {
                            console.log("3 ifE ");
                            _this.nextEnable();
                        }
                        else {
                            console.log("5 elseE ");
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
    PostcostPage.prototype.checkEditOrNewPost = function () {
        var _this = this;
        this.storage.get('postid').then(function (id) {
            if (id) {
                _this.editStatus = true;
            }
        });
    };
    PostcostPage.prototype.number = function () {
        var isFairPriceNumber = /^\d+$/.test(this.fairprice);
        var isDailyPriceNumber = /^\d+$/.test(this.dailyprice);
        if (this.dailyprice.length == 0 || this.dailyprice < 5 || this.fairprice == null || this.fairprice == "" || !isFairPriceNumber || !isDailyPriceNumber) {
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
    PostcostPage.prototype.securityDeposit = function () {
        var isFairPriceNumber = /^\d+$/.test(this.fairprice);
        var isDailyPriceNumber = /^\d+$/.test(this.dailyprice);
        if (!isFairPriceNumber) {
            document.getElementById('securityDeposit').style.color = "#FF0000";
        }
        else {
            document.getElementById('securityDeposit').style.color = "#000000";
        }
        if (this.dailyprice.length == 0 || this.dailyprice < 5 || this.fairprice == null || this.fairprice == "" || !isFairPriceNumber || !isDailyPriceNumber) {
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
    PostcostPage.prototype.dailyPriceChange = function () {
        var isDailyPriceNumber = /^\d+$/.test(this.dailyprice);
        var isFairPriceNumber = /^\d+$/.test(this.fairprice);
        if (!isDailyPriceNumber) {
            document.getElementById('dailyPrice').style.color = "#FF0000";
        }
        else {
            document.getElementById('dailyPrice').style.color = "#000000";
            if (this.dailyprice < 5 && this.dailyprice >= 0) {
                document.getElementById('dailyPrice').style.color = "#FF0000";
                this.showToast("Minimum Daily Rental Price Is $5");
            }
            else {
                document.getElementById('dailyPrice').style.color = "#000000";
            }
        }
        if (this.dailyprice.length == 0 || this.dailyprice < 5 || this.fairprice == null || this.fairprice == "" || !isDailyPriceNumber || !isFairPriceNumber) {
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
    PostcostPage.prototype.removedailyprice = function () {
        this.dailyprice = "";
    };
    PostcostPage.prototype.removefee = function () {
        this.fee = "";
    };
    PostcostPage.prototype.backadd = function () {
        if (this.deliver != false) {
            this.storage.set("deliver", "true");
            this.storage.set("fee", this.fee);
        }
        else {
            this.storage.set("deliver", "false");
            this.storage.set("fee", "");
        }
        this.storage.set("status", "true");
        this.storage.set("dailyPrice", this.dailyprice);
        this.storage.set("fairPrice", this.fairprice);
        this.storage.set("distance", this.distance);
        this.navCtrl.setRoot(AddPage);
    };
    PostcostPage.prototype.backdetail = function () {
        // this.navCtrl.push(PostdetailPage);
        if (this.deliver != false) {
            this.storage.set("deliver", "true");
            this.storage.set("fee", this.fee);
        }
        else {
            this.storage.set("deliver", "false");
            this.storage.set("fee", "");
        }
        this.storage.set("status", "true");
        this.storage.set("dailyPrice", this.dailyprice);
        this.storage.set("fairPrice", this.fairprice);
        this.storage.set("distance", this.distance);
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
        var isFairPriceNumber = /^\d+$/.test(this.fairprice);
        var isDailyPriceNumber = /^\d+$/.test(this.dailyprice);
        if (this.dailyprice.length == 0 || this.dailyprice < 5 || this.fairprice == null || this.fairprice == "" || !isDailyPriceNumber || !isFairPriceNumber) {
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
                    this.postItemNew();
                }
            }
            else {
                this.postItemNew();
            }
        }
    };
    PostcostPage.prototype.closeScreen = function () {
        console.log(this.editStatus);
        if (this.editStatus) {
            this.closeEditPrompt();
        }
        else {
            this.presentConfirm();
        }
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
            _this.itempost.deliver = _this.deliver;
            _this.itempost.distance = _this.distance;
            _this.itempost.deliveryOrPickUpFee = _this.fee;
            _this.itempost.securityDeposit = _this.fairprice;
            //CHECKING OLD POST OR NEW POST  
            _this.storage.get('postid').then(function (id) {
                console.log("POST COST ID=", id);
                if (id) {
                    // OLD POST
                    _this.itempost.PostId = id;
                    console.log("TESTTT=", _this.itempost);
                    _this.postitemprovider.updatePostDetail(_this.itempost).subscribe(function (data) {
                        console.log(data);
                        _this.loading.dismiss();
                        if (data.json().msg == "success") {
                            _this.clearPostDetailsFromStorage();
                            _this.presentSuccessfullAlert("Updated Successfully", 0);
                        }
                        else {
                            _this.presentAlert("Please try again later");
                        }
                    }, function (err) {
                        _this.loading.dismiss();
                        _this.presentAlert("Please check your internet connection");
                        console.log(err);
                    });
                    console.log("OLD POST");
                }
                else {
                    console.log("NEW POST");
                    //NEW POST
                    _this.postitemprovider.postItem(_this.itempost).subscribe(function (data) {
                        console.log(data);
                        _this.loading.dismiss();
                        if (data.json().msg == "success") {
                            _this.clearPostDetailsFromStorage();
                            _this.presentSuccessfullAlert("Posted Successfully", 1);
                        }
                        else {
                            _this.presentAlert("Please try again later");
                        }
                    }, function (err) {
                        _this.loading.dismiss();
                        _this.presentAlert("Please check your internet connection");
                        console.log(err);
                    });
                }
            });
        }); //end of storage
    };
    PostcostPage.prototype.closeEditPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm ',
            message: 'Do you want to discontinue and information will not saved',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        //do nothing here
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.clearPostDetailsFromStorage();
                        _this.app.getRootNav().getActiveChildNav().select(1);
                    }
                }
            ]
        });
        alert.present();
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
                        _this.clearPostDetailsFromStorage();
                        _this.navCtrl.setRoot(Home);
                        _this.app.getRootNav().getActiveChildNav().select(0);
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        if (_this.dailyprice != null) {
                            _this.storage.set("status", "true");
                            _this.storage.set("dailyPrice", _this.dailyprice);
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
                        _this.app.getRootNav().getActiveChildNav().select(0);
                    }
                }
            ]
        });
        alert.present();
    };
    /*
    Method to clear storage data
    */
    PostcostPage.prototype.clearPostDetailsFromStorage = function () {
        this.storage.set("status", "false");
        this.storage.set("itemTitle", null);
        this.storage.set("itemCategory", null);
        this.storage.set("itemConditionMark", null);
        this.storage.set("itemConditionTitle", null);
        this.storage.set('image', null);
        this.storage.set('postid', null);
        this.storage.set('dailyPrice', null);
        this.storage.set('weeklyPrice', null);
        this.storage.set('fairPrice', null);
        this.storage.set('deliver', null);
        this.storage.set('fee', null);
        this.storage.set('distance', null);
    };
    //method used to present alert to user
    PostcostPage.prototype.presentAlert = function (subTitle) {
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    PostcostPage.prototype.presentSuccessfullAlert = function (subTitle, id) {
        var _this = this;
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            buttons: [{
                    text: 'Ok',
                    handler: function () {
                        if (id == 1) {
                            //take to home tab
                            _this.app.getRootNav().getActiveChildNav().select(0);
                            _this.navCtrl.setRoot(Home);
                        }
                        else {
                            //take to item tab
                            _this.app.getRootNav().getActiveChildNav().select(1);
                        }
                    }
                }]
        });
        alert.present();
    };
    PostcostPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
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
            ToastController,
            App])
    ], PostcostPage);
    return PostcostPage;
}());
export { PostcostPage };
//# sourceMappingURL=postcost.js.map