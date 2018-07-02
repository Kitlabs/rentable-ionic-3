var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Home } from '../home/home';
import { MapModal } from '../modal-page/modal-page';
import { SearchresultPage } from '../searchresult/searchresult';
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, modalCtrl, navParams, itemprovider) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.itemprovider = itemprovider;
        this.map = MapModal;
        this.searchresult = SearchresultPage;
        this.home = Home;
        this.categorylist = [
            { active_img: 'assets/icon/cat-nearyou-red.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value: 'nearby', radionumber: 'radio1' },
            { active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value: 'electronics', radionumber: 'radio2' },
            { active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value: 'cars', radionumber: 'radio3' },
            { active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value: 'sports', radionumber: 'radio4' },
            { active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value: 'home', radionumber: 'radio5' },
            { active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value: 'movies', radionumber: 'radio6' },
            { active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value: 'fashion', radionumber: 'radio7' },
            { active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value: 'baby', radionumber: 'radio8' },
            { active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value: 'tools', radionumber: 'radio9' },
            { active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value: 'party', radionumber: 'radio10' }
        ];
        this.category = [];
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPagePage');
        //this.initAutocomplete();
    };
    SearchPage.prototype.presentModal = function () {
        var modal = this.modalCtrl.create(MapModal);
        modal.present();
    };
    SearchPage.prototype.reset = function () {
        this.category = [];
        this.distance = 0;
        this.fromprice = 0;
        this.toprice = 0;
        this.location = "";
        this.date = "";
        this.within = "all";
        this.langs = "hightolow";
    };
    SearchPage.prototype.myFunction = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        console.log(event.srcElement + " event.srcElement");
        var parent = event.srcElement.parentElement;
        console.log(parent + " parent");
        var preparent = parent.parentElement;
        var divparent = preparent.parentElement;
        var children = divparent.children;
        console.log(preparent + " preparent");
        var count = children.length;
        console.log(count + "count");
        for (var i = 0; i < count; ++i) {
            if (preparent == children[i]) {
                var image = this.categorylist[i].active_img;
                this.category = this.categorylist[i];
                console.log(children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0] + "children[i]");
                children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", image);
            }
            else {
                var inactiveimage = this.categorylist[i].inactive_img;
                children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
            }
        }
    };
    SearchPage.prototype.changlocation = function () {
        // var searchBox = new google.maps.places.SearchBox(this.location);
        // this.map.addListener('bounds_changed', function() {
        //       searchBox.setBounds(this.map.getBounds());
        //     });
        // console.log(this.location);
        // searchBox.addListener('places_changed', function() {
        //   var places = searchBox.getPlaces();
        //     if (places.length == 0) {
        //       return;
        //     }
        // });
    };
    SearchPage.prototype.topricechange = function () {
    };
    SearchPage.prototype.frompricechange = function () {
    };
    SearchPage.prototype.searchsave = function () {
        this.navCtrl.push(SearchresultPage, {
            category: this.category,
            location: this.location,
            date: this.date,
            fromprice: this.fromprice,
            toprice: this.toprice,
            distance: this.distance,
            lang: this.langs,
            within: this.within
        });
        // this.itemprovider.Searchsave(this.category, this.location, this.date, this.fromprice, this.toprice, this.distance, this.within, this.langs)
        // .subscribe(
        //   data=>{
        //     console.log('success search');
        //     this.navCtrl.push(SearchresultPage);
        // }, err =>{
        //   console.log(err);
        // });
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], SearchPage.prototype, "mapElement", void 0);
    SearchPage = __decorate([
        Component({
            selector: 'page-search',
            templateUrl: 'search.html'
        }),
        __metadata("design:paramtypes", [NavController, ModalController, NavParams, ItemsProvider])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map