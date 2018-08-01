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
import { ItemsProvider } from '../../providers/items/items';
import { Profile } from '../profile/profile';
import { SearchPage } from '../search/search';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
var SearchresultPage = /** @class */ (function () {
    function SearchresultPage(navCtrl, navParams, itemprovider, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemprovider = itemprovider;
        this.storage = storage;
        this.profile = Profile;
        this.search = SearchPage;
        this.details = Details;
        //filterStatus
        this.locationStatus = false;
        this.catNameStatus = false;
        this.distanceStatus = false;
        this.priceStatus = false;
        this.postedWithinStatus = false;
        this.sortedByStatus = false;
        this.itemlist = [];
        this.like = [];
    }
    SearchresultPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewDidLoad SearchresultPagePage');
        this.storage.get('selectedFilterOption').then(function (filteredOption) {
            _this.selectedFilterOption = JSON.parse(filteredOption);
            _this.selectedFilter();
            _this.getFilteredData();
        });
    };
    /**
     *
     * @param option this.filteredOptionList=
       {lat:this.lat,lng:this.lng,location:this.location,
       catName:this.category,catImage:this.categoryImg,
       distance:this.distance,
       fromPrice:this.fromprice,toPrice:this.toprice,
       postedWithin:this.within,
       sortedBy:this.sortBy};
     */
    SearchresultPage.prototype.selectedFilter = function () {
        console.log("selected filter method");
        console.log(this.selectedFilterOption);
        console.log("LOCATION=" + this.selectedFilterOption.location);
        //1.location
        if (this.selectedFilterOption.location) {
            this.locationStatus = true;
            this.lat = this.selectedFilterOption.lat;
            this.lng = this.selectedFilterOption.lng;
            this.location = this.selectedFilterOption.location;
        }
        else {
            this.locationStatus = false;
        }
        //2.category
        if (this.selectedFilterOption.catName) {
            this.catNameStatus = true;
            this.catName = this.selectedFilterOption.catName;
            this.catImage = this.selectedFilterOption.catImage;
        }
        else {
            this.catNameStatus = false;
        }
        //3.distance
        if (this.selectedFilterOption.distance != 0) {
            console.log("inside distance status");
            this.distanceStatus = true;
            this.lat = this.selectedFilterOption.lat;
            this.lng = this.selectedFilterOption.lng;
            this.distance = this.selectedFilterOption.distance;
        }
        else {
            console.log("outside distance status");
            this.distanceStatus = false;
        }
        //4.price
        if (this.selectedFilterOption.fromPrice || this.selectedFilterOption.toPrice) {
            this.toPrice = this.selectedFilterOption.toPrice;
            this.fromPrice = this.selectedFilterOption.fromPrice;
            if (this.fromPrice == 5 && this.toPrice < 500) {
                this.priceStatus = true;
            }
            else if (this.fromPrice > 5 && this.toPrice == 500) {
                this.priceStatus = true;
            }
            else if (this.fromPrice == 5 && this.toPrice == 500) {
                this.priceStatus = false;
            }
            this.fromToPrice = "$" + this.selectedFilterOption.fromPrice + " to " + this.selectedFilterOption.toPrice;
        }
        else {
            this.priceStatus = false;
            this.toPrice = "";
            this.fromPrice = "";
        }
        //5.posted within
        if (this.selectedFilterOption.postedWithin) {
            this.postedWithinStatus = true;
            this.postedWithin = this.selectedFilterOption.postedWithin;
        }
        else {
            console.log("else posted within");
            this.postedWithinStatus = false;
            this.postedWithin = "";
        }
        //6.sortby 
        //if sortby contain first then we need to include location
        if (this.selectedFilterOption.sortedBy) {
            this.sortedByStatus = true;
            this.sortedBy = this.selectedFilterOption.sortedBy;
            if (this.selectedFilterOption.sortedBy == "Closest first") {
                this.lat = this.selectedFilterOption.lat;
                this.lng = this.selectedFilterOption.lng;
            }
        }
        else {
            this.sortedByStatus = false;
        }
        console.log("------------------------------------");
        console.log(this.locationStatus);
        console.log(this.catNameStatus);
        console.log(this.distanceStatus);
        console.log(this.priceStatus);
        console.log(this.sortedByStatus);
    };
    /**
     *
     * @param removeFilterId contain id of filter to remove
     * 0:category
     * 1:location
     * 2.distance
     * 3.price
     * 4.posted within
     * 5.sort by
     */
    SearchresultPage.prototype.removeFilter = function (removeFilterId) {
        switch (removeFilterId) {
            case 0:
                this.catNameStatus = false;
                this.catName = "";
                this.getFilteredData();
                this.goToHomePage();
                break;
            case 1:
                this.locationStatus = false;
                if (this.sortedBy != "Closest first" || !this.distanceStatus) {
                    this.lat = "";
                    this.lng = "";
                }
                this.getFilteredData();
                this.goToHomePage();
                break;
            case 2:
                this.distanceStatus = false;
                this.distance = "";
                if (!this.locationStatus || this.sortedBy != "Closest first") {
                    this.lat = "";
                    this.lng = "";
                }
                this.getFilteredData();
                this.goToHomePage();
                break;
            case 3:
                this.priceStatus = false;
                this.fromPrice = "";
                this.toPrice = "";
                this.getFilteredData();
                this.goToHomePage();
                break;
            case 4:
                this.postedWithinStatus = false;
                this.postedWithin = "";
                this.getFilteredData();
                this.goToHomePage();
                break;
            case 5:
                this.sortedByStatus = false;
                this.sortedBy = "";
                if (!this.distanceStatus || !this.locationStatus) {
                    if (this.sortedBy == "Closest first") {
                        this.lat = "";
                        this.lng = "";
                    }
                }
                this.getFilteredData();
                this.goToHomePage();
                break;
            default:
                console.log("default statement");
                break;
        }
    };
    SearchresultPage.prototype.goToFilter = function () {
        this.navCtrl.setRoot(this.search);
    };
    SearchresultPage.prototype.goToHomePage = function () {
        // locationStatus:boolean=false;
        // catNameStatus:boolean=false;
        // distanceStatus:boolean=false;
        // priceStatus:boolean=false;
        // postedWithinStatus:boolean=false;
        // sortedByStatus:boolean=false;
        console.log(this.locationStatus);
        console.log(this.catNameStatus);
        console.log(this.distanceStatus);
        console.log(this.priceStatus);
        console.log(this.sortedByStatus);
        if (!this.locationStatus && !this.catNameStatus && !this.distanceStatus && !this.priceStatus && !this.sortedByStatus && !this.postedWithinStatus) {
            this.navCtrl.setRoot(Home);
            console.log("hey i'm going to home");
        }
        else {
            console.log("not going to home");
        }
    };
    /**
     * Method to get filter data from api
    */
    SearchresultPage.prototype.getFilteredData = function () {
        //userId,Category,PostedWithin,PriceFrom,PriceTo,Lat,Long,Range,SortBy
        var _this = this;
        this.storage.get('userId').then(function (userId) {
            _this.userId = userId;
            _this.itemprovider.getFilterData(userId, _this.catName, _this.postedWithin, _this.fromPrice, _this.toPrice, _this.lat, _this.lng, _this.distance, _this.sortedBy).subscribe(function (data) {
                //{"msg":"error","msg_details":"Error in Query."}
                console.log(data);
                if (data.json().msg == "success") {
                    _this.itemlist = data.json().data;
                    _this.addFavUnFav();
                }
                else {
                    _this.itemlist = [];
                }
            }, function (err) {
                console.log(err);
            }); //end
        }); //end of storage
    };
    SearchresultPage.prototype.godetails = function (itemId) {
        localStorage.setItem("filterStatus", "true");
        this.navCtrl.push(Details, {
            itemId: itemId
        });
    };
    SearchresultPage.prototype.ActiveFavourite = function (itemId) {
        console.log("like");
        //this.favouritlist[itemId]=true;
        this.like[itemId] = true;
        this.itemprovider.addRemoveFavourite(this.userId, itemId, 1).subscribe(function (data) {
            console.log(data);
            //this.getItemsByCategoryName(this.categorySelected);
        });
    };
    SearchresultPage.prototype.DeactiveFavourite = function (itemId) {
        console.log("dislike");
        //this.favouritlist[itemId]=false;
        this.like[itemId] = false;
        this.itemprovider.addRemoveFavourite(this.userId, itemId, 0).subscribe(function (data) {
            console.log(data);
            //this.getItemsByCategoryName(this.categorySelected);
        });
    };
    /*
    Method to which items user make fav or unfav
    */
    SearchresultPage.prototype.addFavUnFav = function () {
        for (var i = 0; i < this.itemlist.length; ++i) {
            console.log(this.itemlist[i].favourites);
            if (this.itemlist[i].Favourite == 0) {
                this.like[parseInt(this.itemlist[i].id)] = false;
            }
            else {
                this.like[parseInt(this.itemlist[i].id)] = true;
            }
        }
    };
    SearchresultPage = __decorate([
        Component({
            selector: 'page-searchresult',
            templateUrl: 'searchresult.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemsProvider,
            Storage])
    ], SearchresultPage);
    return SearchresultPage;
}());
export { SearchresultPage };
//# sourceMappingURL=searchresult.js.map