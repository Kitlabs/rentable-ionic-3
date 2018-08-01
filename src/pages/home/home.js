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
import { NavController, NavParams, ModalController, Content, LoadingController, App, Events, ToastController } from 'ionic-angular';
import { MapModal } from '../modal-page/modal-page';
import { ItemsProvider } from '../../providers/items/items';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Profile } from '../profile/profile';
import { SearchPage } from '../search/search';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
// mobiscroll.settings = {
//   theme: 'ios',
//   display: 'bottom'
// };
var Home = /** @class */ (function () {
    // date: any = [new Date(2018,6,18), new Date(2018,6,30)];
    function Home(navCtrl, navParams, modalCtrl, itemprovider, authProvider, storage, app, ev, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.itemprovider = itemprovider;
        this.authProvider = authProvider;
        this.storage = storage;
        this.app = app;
        this.ev = ev;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.profile = Profile;
        this.search = SearchPage;
        this.details = Details;
        //time to hide and show add card message to user
        this.maxTime = 5;
        console.log("it is constructor");
        this.expanded = true;
        this.itemlist = [];
        this.like = [];
        // for (var i = 0; i < 12; ++i) {
        //   this.like[i]=false;
        // }
        this.favouritlist = [];
        // this.itemprovider.Getitems().subscribe(data=>{
        //   for (var j=0;j<data.json().result.length;j++) {
        //     this.itemlist[j]=data.json().result[j];
        //     console.log(this.itemlist[j]);
        //   }
        //   this.itemlist=data.json().result;
        // }, err =>{
        //   console.log(err);
        // })
        this.url = "54.79.124.187/api/uploads/";
        this.searchcategory = this.itemlist;
        this.dataNotFound = true;
        this.message = "There is no data available";
        this.categorylist = [
            // {active_img: 'assets/icon/cat-nearyou.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby'},
            { active_img: 'assets/icon/cat-electronics.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value: 'electronics', tempimage: 'assets/icon/cat-electronics-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-cars.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value: 'cars', tempimage: 'assets/icon/cat-cars-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-sports.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value: 'sports', tempimage: 'assets/icon/cat-sports-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-home.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value: 'home', tempimage: 'assets/icon/cat-home-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-movies.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value: 'movies', tempimage: 'assets/icon/cat-movies-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-fashion.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value: 'fashion', tempimage: 'assets/icon/cat-fashion-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-baby.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value: 'baby', tempimage: 'assets/icon/cat-baby-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-tools.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value: 'tools', tempimage: 'assets/icon/cat-tools-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-party.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value: 'party', tempimage: 'assets/icon/cat-party-grey.png', class: 'deactive' },
            { active_img: 'assets/icon/cat-other.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png', value: 'other', tempimage: 'assets/icon/cat-other-grey.png', class: 'deactive' },
        ];
        this.categorygrid = [
            { img: 'assets/img/01.png', price: '21', id: '0' },
            { img: 'assets/img/02.png', price: '56', id: '1' },
            { img: 'assets/img/03.png', price: '34', id: '2' },
            { img: 'assets/img/04.png', price: '21', id: '3' },
            { img: 'assets/img/01.png', price: '15', id: '4' },
            { img: 'assets/img/02.png', price: '65', id: '5' },
            { img: 'assets/img/03.png', price: '64', id: '6' },
            { img: 'assets/img/04.png', price: '123', id: '7' },
            { img: 'assets/img/01.png', price: '21', id: '8' },
            { img: 'assets/img/02.png', price: '12', id: '9' },
            { img: 'assets/img/03.png', price: '52', id: '10' },
            { img: 'assets/img/04.png', price: '212', id: '11' }
        ];
        var imagelist = [];
        this.categorySelected = "Nearby";
    }
    Home.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("it is last");
        this.ev.subscribe("messageCountt", function (count) {
            _this.ev.publish('messageCount', 0);
            _this.presentToast();
        });
        this.ev.subscribe("rentalCountt", function (count) {
            _this.ev.publish('rentalCount', 0);
            _this.presentToast();
        });
        this.storage.get('counter').then(function (data) {
            if (data != null) {
                _this.ev.publish('counter');
            }
        });
        this.totalCount();
    };
    Home.prototype.clearPostDetails = function () {
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
    Home.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            duration: 3000,
            position: 'top',
            cssClass: "toast-success"
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Home.prototype.increaseBadge = function () {
        this.ev.publish('messageCount', 1);
        this.presentToast();
    };
    Home.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('CARD_STATUS').then(function (data) {
            if (data == 0) {
                console.log("Card Status=", data);
                _this.showCardAttachedPrompt();
            }
            else {
                _this.hideTipMessage = true;
                console.log("Hide Tip Message");
            }
        });
        this.storage.get('userId').then(function (data) {
            _this.userId = data;
            _this.clearPostDetails();
            _this.totalCount();
            _this.cardAttachedStatus();
            if (_this.searchtext) {
                _this.searchItems();
            }
            else {
                _this.storage.get("categorySelectedHome").then(function (res) {
                    if (res) {
                        if (res.catStatus == "true") {
                            console.log("category already selected");
                            _this.categorylist[parseInt(res.catId)].tempimage = _this.categorylist[parseInt(res.catId)].active_img;
                            _this.categorylist[parseInt(res.catId)].class = 'active';
                            // document.getElementById(res.catValue).setAttribute("src",this.categorylist[parseInt(res.catId)].active_img);//image item.value
                            // document.getElementById(res.catTitle).style.color="#ffffff";//item.title
                            _this.getItemsByCategoryName(res.catTitle);
                            var selected = { "catStatus": "false" };
                            //this.storage.set("categorySelectedHome",selected);
                            _this.cardAttachedStatus();
                        }
                        else {
                            console.log("Hey we are calling nearby people to get");
                            _this.getNearbyItem();
                        }
                    }
                    else {
                        //called when app installed first time
                        _this.getNearbyItem();
                    }
                });
            }
        });
    };
    Home.prototype.cardAttachedStatus = function () {
        var _this = this;
        this.authProvider.getUserDetail(this.userId).subscribe(function (data) {
            if (data.json().msg == 'success') {
                _this.storage.set("CARD_STATUS", data.json().cardstatus);
                _this.storage.set("USER_CHATTING_STATUS", 0);
                _this.ev.publish('CARDSTATUS', data.json().cardstatus);
            }
        });
    };
    Home.prototype.totalCount = function () {
        var _this = this;
        this.itemprovider.getChatListOwn(this.userId).subscribe(function (data) {
            console.log("DATA=", data);
            console.log(data.json().IsRead);
            if (data.json().IsRead != undefined) {
                _this.ev.publish('messageCount', 0);
                //this.presentToast();
            }
            else {
                //this.ev.publish('messageCount',1);
                //this.presentToast();
            }
        }, function (err) {
            console.log("error");
        });
        this.itemprovider.getChatListRent(this.userId).subscribe(function (data) {
            console.log("DATA=", data);
            console.log(data.json().IsRead);
            if (data.json().IsRead != undefined) {
                _this.ev.publish('messageCount', 0);
                //this.presentToast();
            }
            else {
                //this.ev.publish('messageCount',1);
            }
        }, function (err) {
            console.log("error");
        });
    };
    Home.prototype.ionViewCanLeave = function () {
        console.log("It is finished");
    };
    Home.prototype.convertImageUrlToBase64 = function (URL) {
        // var canvas = document.createElement("canvas");
        // canvas.width = img.width;
        // canvas.height = img.height;
        // var ctx = canvas.getContext("2d");
        // ctx.drawImage(img, 0, 0);
        // var dataURL = canvas.toDataURL("image/png");
        // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        // var img = new Image();
        //   img.src = URL;
        //   img.onload = function() {
        //       var canvas = document.createElement("canvas");
        //       canvas.width = 500;
        //       canvas.height = 500;
        //       var ctx = canvas.getContext("2d");
        //       ctx.drawImage(, 0, 0);
        //       var dataURL = canvas.toDataURL("image/png");
        //       alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
        //   };
    };
    Home.prototype.showCardAttachedPrompt = function () {
        var _this = this;
        this.timer = setTimeout(function (x) {
            if (_this.maxTime <= 0) { }
            _this.maxTime -= 1;
            if (_this.maxTime > 0) {
                _this.hideTipMessage = false;
                _this.showCardAttachedPrompt();
            }
            else {
                _this.hideTipMessage = true;
            }
        }, 1000);
    };
    Home.prototype.godetails = function (itemId) {
        this.navCtrl.push(Details, {
            itemId: itemId
        });
    };
    Home.prototype.presentModal = function () {
        var modal = this.modalCtrl.create(MapModal);
        modal.present();
    };
    Home.prototype.ActiveFavourite = function (itemId) {
        this.like[itemId] = true;
        this.itemprovider.addRemoveFavourite(this.userId, itemId, 1).subscribe(function (data) {
            console.log(data);
            //this.getItemsByCategoryName(this.categorySelected);
        });
    };
    Home.prototype.DeactiveFavourite = function (itemId) {
        console.log("dislike");
        //this.favouritlist[itemId]=false;
        this.like[itemId] = false;
        this.itemprovider.addRemoveFavourite(this.userId, itemId, 0).subscribe(function (data) {
            console.log(data);
            //this.getItemsByCategoryName(this.categorySelected);
        });
    };
    Home.prototype.removeSelectedCategory = function () {
        var _this = this;
        this.catSelectedNumber = -1;
        this.storage.get("categorySelectedHome").then(function (res) {
            console.log("storage data");
            console.log(res);
            if (res) {
                if (res.catStatus == "true") {
                    document.getElementById(res.catValue).setAttribute("src", _this.categorylist[parseInt(res.catId)].inactive_img); //image item.value
                    document.getElementById(res.catTitle).style.color = "#666a71"; //item.title
                    var selected = { "catStatus": "false" };
                    _this.storage.set("categorySelectedHome", selected);
                }
            }
        });
    };
    Home.prototype.goToProfile = function () {
        this.navCtrl.setRoot(this.profile);
    };
    Home.prototype.goToFilter = function () {
        this.navCtrl.setRoot(this.search);
    };
    Home.prototype.searchItems = function () {
        var _this = this;
        console.log(this.categorySelected);
        if (this.searchtext != "") {
            //this.removeSelectedCategory();
            this.categorySelected = this.categorySelected == "Nearby" ? "" : this.categorySelected;
            this.itemprovider.getItemsBySearch(this.searchtext, this.userId, this.categorySelected).subscribe(function (data) {
                if (data.json().msg == "success") {
                    _this.listOfItems = data.json().data;
                    _this.addFavUnFav();
                    _this.dataNotFound = false;
                    console.log("success");
                }
                else {
                    _this.listOfItems = [];
                    _this.dataNotFound = true;
                    console.log("failure");
                }
            });
        }
        else {
            this.listOfItems = [];
            var selected = { "catStatus": "false" };
            this.storage.set("categorySelectedHome", selected);
            if (this.categorySelected) {
                this.getItemsByCategoryName(this.categorySelected);
            }
            else {
                this.getNearbyItem();
            }
        }
    };
    Home.prototype.onCancel = function () {
        console.log("cacenl");
        this.getNearbyItem();
        var selected = { "catStatus": "false" };
        this.storage.set("categorySelectedHome", selected);
    };
    /*
      Method used to highlight the selected category
    */
    Home.prototype.myFunction = function (event) {
        this.searchtext = "";
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var parent = event.srcElement.parentElement;
        var preparent = parent.parentElement;
        var children = preparent.children;
        var count = children.length;
        var categoryid;
        for (var i = 0; i < count; ++i) {
            if (parent == children[i]) {
                if (this.catSelectedNumber == i) {
                    //means user selecting the category second time ,in this case remove that category and call the nearbyitem method
                    console.log("SELECTED SECOND TIME");
                    this.categorylist[i].tempimage = this.categorylist[i].active_img;
                    this.categorylist[i].class = 'active';
                    this.catSelectedNumber = -1;
                    var inactiveimage = this.categorylist[i].inactive_img;
                    children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
                    children[i].getElementsByTagName('p')[0].setAttribute("style", "color: #6d7178;");
                    var selected = { "catStatus": "false" };
                    this.storage.set("categorySelectedHome", selected);
                    this.categorySelected = "";
                    this.getNearbyItem();
                }
                else {
                    console.log("SELECTED FIRST TIME");
                    //category selected first time
                    this.categorylist[i].tempimage = this.categorylist[i].active_img;
                    this.categorylist[i].class = 'active';
                    var image = this.categorylist[i].active_img;
                    categoryid = this.categorylist[i].title;
                    this.categorySelected = categoryid;
                    this.getItemsByCategoryName(categoryid);
                    // children[i].getElementsByTagName('img')[0].setAttribute("src", image);//make selected category image active
                    // children[i].getElementsByTagName('p')[0].setAttribute("style", "color: #ffffff;");//make selected category title active
                    this.catSelectedNumber = i;
                    //localStorage.setItem('status','true');
                    //Saving category selected 
                    var selected = { "catStatus": "true", "catTitle": this.categorylist[i].title, "catValue": this.categorylist[i].value, "catId": i };
                    this.storage.set("categorySelectedHome", selected);
                }
            }
            else {
                this.categorylist[i].tempimage = this.categorylist[i].inactive_img;
                this.categorylist[i].class = 'deactive';
                // var inactiveimage=this.categorylist[i].inactive_img;
                // children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
                // children[i].getElementsByTagName('p')[0].setAttribute("style", "color: #666a71;");
            }
        }
        var n = 0;
        this.searchcategory = [];
        for (var i = 0; i < this.itemlist.length; i++) {
            if (this.itemlist[i].category == categoryid) {
                this.searchcategory[n] = this.itemlist[i];
                n++;
            }
        }
        this.content.resize();
    };
    /*
    Method to get all items by category name
    */
    Home.prototype.getItemsByCategoryName = function (categoryName) {
        var _this = this;
        this.categorySelected = categoryName;
        this.listOfItems = null;
        console.log(this.categorySelected);
        if (categoryName == "Nearby") {
            this.getNearbyItem();
        }
        else {
            this.storage.get('userId').then(function (data) {
                _this.userId = data;
                //var array = myString.split(',');
                _this.itemprovider.getItemByCategoryName(categoryName, _this.userId, "available").subscribe(function (data) {
                    console.log(data);
                    if (data.json().msg == "success") {
                        _this.dataNotFound = false;
                        _this.listOfItems = data.json().data;
                        _this.basePath = _this.listOfItems.base_path;
                        _this.addFavUnFav();
                    }
                    else {
                        _this.dataNotFound = true;
                        //no response
                    }
                }, function (err) {
                    //this.loading.dismiss();
                    console.log();
                });
            }); //end of storage
        }
    };
    /*
    Method to which items user make fav or unfav
    */
    Home.prototype.addFavUnFav = function () {
        console.log("favourite and unfavourite");
        for (var i = 0; i < this.listOfItems.length; ++i) {
            if (this.listOfItems[i].favourites == 0) {
                this.like[parseInt(this.listOfItems[i].id)] = false;
                console.log("IF=" + this.listOfItems[i].id);
            }
            else {
                this.like[parseInt(this.listOfItems[i].id)] = true;
                console.log("ELSE=" + this.listOfItems[i].id);
            }
        }
    };
    /*
    Method to get nearby item
    */
    Home.prototype.getNearbyItem = function () {
        //{"action":"NearByItems", "user_lat":"30.709315", "user_lng":"76.690514","userId":"3"}
        var _this = this;
        this.storage.get('location').then(function (location) {
            _this.itemprovider.getNearbyItems(_this.userId, location.lat, location.lng).subscribe(function (data) {
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.listOfItems = data.json().post_data;
                    _this.addFavUnFav();
                }
                else {
                    console.log("No item around you");
                    _this.listOfItems = [];
                }
            }, function (err) {
            });
        });
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], Home.prototype, "content", void 0);
    Home = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ModalController,
            ItemsProvider,
            AuthenticateProvider,
            Storage,
            App,
            Events,
            ToastController,
            LoadingController])
    ], Home);
    return Home;
}());
export { Home };
//# sourceMappingURL=home.js.map