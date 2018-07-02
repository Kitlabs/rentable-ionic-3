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
import { NavController, NavParams, Navbar, AlertController, App, Tabs, ViewController } from 'ionic-angular';
import { PostcostPage } from '../postcost/postcost';
import { AddPage } from '../add/add';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
var PostdetailPage = /** @class */ (function () {
    function PostdetailPage(navCtrl, navParams, storage, app, alertCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.postcost = PostcostPage;
        this.addpage = AddPage;
        this.condition = [0, 1, 2, 3, 4];
        this.categorylist = [
            // {active_img: 'assets/icon/cat-nearyou-red.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby',radionumber:'postradio1'},
            { active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value: 'electronics', radionumber: 'postradio2' },
            { active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value: 'cars', radionumber: 'postradio3' },
            { active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value: 'sports', radionumber: 'postradio4' },
            { active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value: 'home', radionumber: 'postradio5' },
            { active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value: 'movies', radionumber: 'postradio6' },
            { active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value: 'fashion', radionumber: 'postradio7' },
            { active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value: 'baby', radionumber: 'postradio8' },
            { active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value: 'tools', radionumber: 'postradio9' },
            { active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value: 'party', radionumber: 'postradio10' }
        ];
        this.itemtitle = "";
        this.titlenumber = 25;
        this.conditiontitle = "";
        this.conditionnumber = 200;
        this.goodcondition = [];
        this.Postitem = [];
        this.categorySelected = [];
        this.conditionmark = 0;
        this.conditionn = false;
        for (var i = 0; i < 5; ++i) {
            this.goodcondition[i] = false;
        }
        this.isNextEnabled = false;
        this.nextStatus = 0;
    }
    PostdetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad PostdetailPage');
        this.navBar.backButtonClick = function () {
            _this.navCtrl.setRoot(AddPage);
        };
    };
    PostdetailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("will enterrrr");
        this.count = 0;
        console.log(this.count);
        this.storage.get("status").then(function (res) {
            if (res == "true") {
                _this.storage.get("itemTitle").then(function (res) {
                    if (res != null) {
                        _this.itemtitle = res;
                        _this.nextStatus = _this.nextStatus + 1;
                    }
                    else {
                    }
                });
                _this.storage.get("itemCategory").then(function (res) {
                    if (res != null) {
                        _this.category = res;
                        _this.nextStatus = _this.nextStatus + 1;
                        _this.storage.get("categorySelected").then(function (res) {
                            console.log("storage data");
                            console.log(res);
                            if (res.catStatus == "true") {
                                document.getElementById(res.catValue).setAttribute("src", _this.categorylist[parseInt(res.catId)].active_img); //image item.value
                                document.getElementById(res.catTitle).style.color = "#f55349"; //item.title
                            }
                        });
                    }
                });
                _this.storage.get("itemConditionMark").then(function (res) {
                    if (res != null) {
                        _this.conditionmark = res;
                        _this.showSelectedCondition(res);
                        _this.nextStatus = _this.nextStatus + 1;
                    }
                    else {
                    }
                });
                _this.storage.get("itemConditionTitle").then(function (res) {
                    if (res != null) {
                        _this.conditiontitle = res;
                        _this.nextStatus = _this.nextStatus + 1;
                        //enable/disable next button
                        if (_this.nextStatus == 4) {
                            //enable
                            _this.nextEnable();
                        }
                        else {
                            //disable
                            _this.nextDisable();
                        }
                    }
                });
            }
            else {
                _this.nextDisable();
            }
        });
    };
    PostdetailPage.prototype.nextEnable = function () {
        document.getElementById("next").style.color = "#ffffff";
    };
    PostdetailPage.prototype.nextDisable = function () {
        document.getElementById("next").style.color = "#ffffff66";
    };
    PostdetailPage.prototype.myFunction = function (event) {
        /*Code to remove previous selected category*/
        var target = event.target || event.srcElement || event.currentTarget;
        var parent = event.srcElement.parentElement;
        var preparent = parent.parentElement;
        var divparent = preparent.parentElement;
        var children = divparent.children;
        var count = children.length;
        for (var i = 0; i < count; ++i) {
            if (preparent == children[i]) {
                this.category = this.categorylist[i].title;
                var image = this.categorylist[i].active_img;
                //save category info
                var selected = { "catStatus": "true", "catTitle": this.categorylist[i].title, "catValue": this.categorylist[i].value, "catId": i };
                this.storage.set("categorySelected", selected);
                //highlight selected category
                console.log(children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0] + "children[i]");
                children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", image);
                children[i].getElementsByTagName('label')[0].getElementsByTagName('span')[0].setAttribute("style", "color: #f55349;");
                //check the validation
                if (this.itemtitle.length == 0 || this.conditionmark == 0 || this.conditiontitle == "") {
                    this.nextDisable();
                }
                else {
                    this.nextEnable();
                }
            } //end of if
            else {
                var inactiveimage = this.categorylist[i].inactive_img;
                children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
                children[i].getElementsByTagName('label')[0].getElementsByTagName('span')[0].setAttribute("style", "color: gray;");
            }
        }
    };
    PostdetailPage.prototype.myFocus = function (id) {
        //0 means user has focus field
        //1 means user not have focust 
        //hide the bottom tabs
        if (id == 0) {
            var tabbars = document.getElementsByClassName('tabbar');
            for (var i = 0; i < tabbars.length; i++) {
                var node = tabbars[i];
                node.style.display = 'none';
                // document.getElementById("conditiontitle").style.marginBottom="250px";
                //document.getElementById("conditiontitle").scrollIntoView();
            }
        }
        //unhide the bottom tabs
        if (id == 1) {
            var tabbars = document.getElementsByClassName('tabbar');
            for (var i = 0; i < tabbars.length; i++) {
                var node = tabbars[i];
                node.style.display = 'flex';
            }
        }
    };
    PostdetailPage.prototype.number = function () {
        //ng model field
        //itemtitle
        //category
        //condition
        //conditiontitle
        var n = this.itemtitle.length;
        this.titlenumber = 25 - n;
        if (this.itemtitle.length == 0 || this.category == null || this.conditionmark == 0 || this.conditiontitle == "") {
            this.nextDisable();
        }
        else {
            this.nextEnable();
        }
    };
    PostdetailPage.prototype.focus = function () {
        document.getElementById("conditiontitle").style.marginBottom = "250px";
        // document.getElementById("conditiontitle").scrollIntoView();
    };
    PostdetailPage.prototype.conditionnum = function () {
        var n = this.conditiontitle.length;
        this.conditionnumber = 200 - n;
        if (this.itemtitle.length == 0 || this.category == null || this.conditionmark == 0 || this.conditiontitle == "") {
            this.nextDisable();
        }
        else {
            this.nextEnable();
        }
    };
    PostdetailPage.prototype.showSelectedCondition = function (i) {
        console.log("Rating=" + i);
        for (var j = 0; j <= i - 1; ++j) {
            this.goodcondition[j] = true;
        }
        for (var l = i + 1; l <= 5; ++l) {
            this.goodcondition[l] = false;
        }
        this.conditionmark = i;
        if (this.itemtitle.length == 0 || this.category == null || this.conditionmark == 0 || this.conditiontitle == "") {
            this.nextDisable();
        }
        else {
            this.nextEnable();
        }
    };
    PostdetailPage.prototype.changecondition = function (i) {
        for (var j = 0; j <= i; ++j) {
            this.goodcondition[j] = true;
        }
        for (var l = i + 1; l <= 5; ++l) {
            this.goodcondition[l] = false;
        }
        this.conditionmark = i + 1;
        if (this.itemtitle.length == 0 || this.conditionmark == 0 || this.category == null || this.conditiontitle == "") {
            this.nextDisable();
        }
        else {
            this.nextEnable();
        }
    };
    PostdetailPage.prototype.goaddpage = function () {
        this.navCtrl.setRoot(AddPage);
    };
    PostdetailPage.prototype.closeScreen = function () {
        this.presentConfirm();
    };
    PostdetailPage.prototype.gopostcost = function () {
        if (this.itemtitle.length == 0 || this.category == null || this.conditionmark == 0 || this.conditiontitle == "") {
            //this.presentAlert("All fields are mandatory");
        }
        else {
            this.Postitem.itemtitle = this.itemtitle;
            this.Postitem.category = this.category;
            this.Postitem.conditionmark = this.conditionmark;
            this.Postitem.conditiontitle = this.conditiontitle;
            this.storage.set("status", "true");
            this.storage.set("itemTitle", this.itemtitle);
            this.storage.set("itemCategory", this.category);
            this.storage.set("itemConditionMark", this.conditionmark);
            this.storage.set("itemConditionTitle", this.conditiontitle);
            console.log(this.Postitem);
            this.navCtrl.setRoot(PostcostPage, {
                itempost: this.Postitem
            });
        }
    };
    PostdetailPage.prototype.removeItemItems = function () {
        this.itemtitle = "";
    };
    PostdetailPage.prototype.removeItemDetails = function () {
        this.conditiontitle = "";
    };
    //method used to present alert to user
    PostdetailPage.prototype.presentAlert = function (subTitle) {
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    PostdetailPage.prototype.presentConfirm = function () {
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
                        _this.app.getRootNav().getActiveChildNav().select(0);
                        _this.navCtrl.setRoot(Home);
                        _this.navCtrl.push(Home).then(function () {
                            var index = _this.viewCtrl.index;
                            _this.navCtrl.remove(index);
                            //this.app.getRootNav().getActiveChildNav().select(0);
                        });
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        if (_this.itemtitle != null) {
                            _this.storage.set("status", "true");
                            _this.storage.set("itemTitle", _this.itemtitle);
                        }
                        if (_this.category != null) {
                            _this.storage.set("status", "true");
                            _this.storage.set("itemCategory", _this.category);
                        }
                        if (_this.conditionmark != 0) {
                            _this.storage.set("status", "true");
                            _this.storage.set("itemConditionMark", _this.conditionmark);
                        }
                        if (_this.conditiontitle != "") {
                            _this.storage.set("status", "true");
                            _this.storage.set("itemConditionTitle", _this.conditiontitle);
                        }
                        _this.app.getRootNav().getActiveChildNav().select(0);
                        _this.navCtrl.setRoot(Home);
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], PostdetailPage.prototype, "navBar", void 0);
    __decorate([
        ViewChild('tabs'),
        __metadata("design:type", Tabs)
    ], PostdetailPage.prototype, "tabRef", void 0);
    PostdetailPage = __decorate([
        Component({
            selector: 'page-postdetail',
            templateUrl: 'postdetail.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            App,
            AlertController,
            ViewController])
    ], PostdetailPage);
    return PostdetailPage;
}());
export { PostdetailPage };
//# sourceMappingURL=postdetail.js.map