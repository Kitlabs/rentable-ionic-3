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
import { NavController, NavParams, ModalController, Content, LoadingController, App, Events } from 'ionic-angular';
import { MapModal } from '../modal-page/modal-page';
import { ItemsProvider } from '../../providers/items/items';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Profile } from '../profile/profile';
import { SearchPage } from '../search/search';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
var Home = /** @class */ (function () {
    function Home(navCtrl, navParams, modalCtrl, itemprovider, authProvider, storage, app, ev, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.itemprovider = itemprovider;
        this.authProvider = authProvider;
        this.storage = storage;
        this.app = app;
        this.ev = ev;
        this.loadingCtrl = loadingCtrl;
        this.profile = Profile;
        this.search = SearchPage;
        this.details = Details;
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
            { active_img: 'assets/icon/cat-nearyou.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value: 'nearby' },
            { active_img: 'assets/icon/cat-electronics.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value: 'electronics' },
            { active_img: 'assets/icon/cat-cars.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value: 'cars' },
            { active_img: 'assets/icon/cat-sports.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value: 'sports' },
            { active_img: 'assets/icon/cat-home.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value: 'home' },
            { active_img: 'assets/icon/cat-movies.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value: 'movies' },
            { active_img: 'assets/icon/cat-fashion.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value: 'fashion' },
            { active_img: 'assets/icon/cat-baby.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value: 'baby' },
            { active_img: 'assets/icon/cat-tools.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value: 'tools' },
            { active_img: 'assets/icon/cat-party.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value: 'party' },
            { active_img: 'assets/icon/cat-other.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png', value: 'other' },
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
        console.log("it is last");
    };
    Home.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('userId').then(function (data) {
            _this.userId = data;
            //this.filterItems("");
            // this.getItemsByCategoryName(this.categorySelected);
            _this.getNearbyItem();
        });
    };
    Home.prototype.ionViewCanLeave = function () {
        console.log("It is finished");
    };
    Home.prototype.godetails = function (itemId) {
        console.log(itemId);
        this.navCtrl.push(Details, {
            itemId: itemId
        });
    };
    Home.prototype.presentModal = function () {
        var modal = this.modalCtrl.create(MapModal);
        modal.present();
    };
    Home.prototype.ActiveFavourite = function (itemId) {
        var _this = this;
        this.favouritlist[itemId] = true;
        this.like[itemId] = false;
        this.itemprovider.addRemoveFavourite(this.userId, itemId, 1).subscribe(function (data) {
            console.log(data);
            _this.getItemsByCategoryName(_this.categorySelected);
        });
    };
    Home.prototype.DeactiveFavourite = function (itemId) {
        var _this = this;
        this.favouritlist[itemId] = false;
        this.like[itemId] = true;
        this.itemprovider.addRemoveFavourite(this.userId, itemId, 0).subscribe(function (data) {
            console.log(data);
            _this.getItemsByCategoryName(_this.categorySelected);
        });
    };
    Home.prototype.filterItems = function (event) {
        var _this = this;
        this.itemprovider.getItemsBySearch(this.searchtext, this.userId).subscribe(function (data) {
            if (data.json().msg == "success") {
                _this.listOfItems = data.json().data;
                console.log(_this.listOfItems);
                _this.dataNotFound = false;
            }
            else {
                _this.listOfItems = [];
                _this.dataNotFound = true;
                //no response
            }
        }, function (err) {
        }, function () {
        });
    };
    Home.prototype.myFunction = function (event) {
        this.ev.publish("message", "100");
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var parent = event.srcElement.parentElement;
        var preparent = parent.parentElement;
        var children = preparent.children;
        var count = children.length;
        var categoryid;
        for (var i = 0; i < count; ++i) {
            if (parent == children[i]) {
                var image = this.categorylist[i].active_img;
                categoryid = this.categorylist[i].title;
                this.categorySelected = categoryid;
                this.getItemsByCategoryName(categoryid);
                children[i].getElementsByTagName('img')[0].setAttribute("src", image);
            }
            else {
                var inactiveimage = this.categorylist[i].inactive_img;
                children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
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
    //function to get all items
    Home.prototype.getAllItems = function () {
        /*    this.loading=this.loadingCtrl.create({
                spinner:'bubbles',
                content:`Please wait..`
              });
        
              
            this.loading.present();*/
        /*    this.itemprovider.getAllItem(this.userId).subscribe(
              data=>{
        
                 console.log(data);
                 if(data.json().msg=="success"){
                   this.listOfItems=data.json().data;
                   this.dataNotFound=false;
        
                 }else{
                   this.dataNotFound=true;
                   //no response
                 }
              },
              err=>{
              },
              ()=>{
              }
        
              );*/
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
                }
            }, function (err) {
            });
        });
    };
    /*
     Method used to highlight already favourite item
    */
    Home.prototype.favouriteItem = function () {
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
            LoadingController])
    ], Home);
    return Home;
}());
export { Home };
//# sourceMappingURL=home.js.map