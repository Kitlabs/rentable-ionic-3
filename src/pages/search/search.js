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
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
import { MapModal } from '../modal-page/modal-page';
import { SearchresultPage } from '../searchresult/searchresult';
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, modalCtrl, navParams, itemprovider, ev, storage) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.itemprovider = itemprovider;
        this.ev = ev;
        this.storage = storage;
        this.map = MapModal;
        this.searchresult = SearchresultPage;
        this.home = Home;
        this.distance = 0;
        this.priceSliderStatus = false;
        //Hold the status of search button
        this.searchStatus = false;
        this.anyFilteredSelectedStatus = false;
        this.timeMin = 5;
        this.timeMax = 500;
        this.resetStatus = false;
        this.categorylist = [
            // {active_img: 'assets/icon/cat-nearyou-red.png', title: 'Nearby', inactive_img: 'assets/icon/cat-nearyou-grey.png', value:'nearby',radionumber:'radio1'},
            { active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', tempimage: 'assets/icon/cat-electronics-grey.png', value: 'electronics', radionumber: 'radio2', class: 'deactive' },
            { active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', tempimage: 'assets/icon/cat-cars-grey.png', value: 'cars', radionumber: 'radio3', class: 'deactive' },
            { active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', tempimage: 'assets/icon/cat-sports-grey.png', value: 'sports', radionumber: 'radio4', class: 'deactive' },
            { active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', tempimage: 'assets/icon/cat-home-grey.png', value: 'home', radionumber: 'radio5', class: 'deactive' },
            { active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', tempimage: 'assets/icon/cat-movies-grey.png', value: 'movies', radionumber: 'radio6', class: 'deactive' },
            { active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', tempimage: 'assets/icon/cat-fashion-grey.png', value: 'fashion', radionumber: 'radio7', class: 'deactive' },
            { active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', tempimage: 'assets/icon/cat-baby-grey.png', value: 'baby', radionumber: 'radio8', class: 'deactive' },
            { active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', tempimage: 'assets/icon/cat-tools-grey.png', value: 'tools', radionumber: 'radio9', class: 'deactive' },
            { active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', tempimage: 'assets/icon/cat-party-grey.png', value: 'party', radionumber: 'radio10', class: 'deactive' },
            { active_img: 'assets/icon/cat-other-red.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png', tempimage: 'assets/icon/cat-other-grey.png', value: 'other', radionumber: 'postradio11', class: 'deactive' }
        ];
        this.location = "Change Location";
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPagePage');
        this.time = {
            lower: 5,
            upper: 500,
        };
        this.timeMin2 = this.timeMin;
        this.timeMax2 = this.timeMax;
        //this.initAutocomplete();
    };
    /*
      Not used
    */
    SearchPage.prototype.ngOnInit = function () {
        // this.acService = new google.maps.places.AutocompleteService();        
        // this.autocompleteItems = [];
        // this.autocomplete = {
        // query: ''
        // };        
    };
    SearchPage.prototype.setBadge = function (time) {
        this.timeMin2 = time.lower;
        this.timeMax2 = time.upper;
        this.fromprice = time.lower;
        this.toprice = time.upper;
        if (this.fromprice == 5 && this.toprice == 500) {
            this.checkAnyFilterOptionSelectedOrNot("set badge");
        }
        else {
            console.log("ELSEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            this.enableShowButton();
        }
    };
    SearchPage.prototype.onAgeChange = function (ev) {
        console.log(ev);
    };
    SearchPage.prototype.selected = function (value) {
        this.orderBy = value;
    };
    SearchPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("ionViewWillEnter");
        this.storage.get('selectedFilterOption').then(function (filteredOption) {
            console.log("SELECTED FILTERED OPTION=", filteredOption);
            if (JSON.parse(filteredOption)) {
                _this.setFilteredOption(JSON.parse(filteredOption));
            }
        });
    };
    /*
    Not used
    */
    SearchPage.prototype.updateSearch = function () {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var self = this;
        var config = {
            types: ['geocode'],
            input: this.autocomplete.query,
            componentRestrictions: {}
        };
        this.acService.getPlacePredictions(config, function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            predictions.forEach(function (prediction) {
                self.autocompleteItems.push(prediction);
            });
        });
    };
    SearchPage.prototype.chooseItem = function (selectedPlace) {
        console.log(selectedPlace);
    };
    SearchPage.prototype.presentModal = function () {
        //   let modal = this.modalCtrl.create('ModalPlaceautocompletePage');
        //   modal.onDidDismiss(data => {
        var _this = this;
        //     if(data){
        //       console.log(data);
        //       this.location = data.description;
        //       // get details
        //       this.getPlaceDetail(data.description);
        //     }                
        // })
        //   modal.present();
        var modal = this.modalCtrl.create(this.map);
        modal.onDidDismiss(function (data) {
            if (data) {
                console.log("D I S M I S S = ", data);
                _this.location = data.address;
                _this.lat = data.lat;
                _this.lng = data.lng;
                _this.loc = data.address;
                _this.enableShowButton();
            }
        });
        modal.present();
    };
    SearchPage.prototype.gohome = function () {
        this.navCtrl.setRoot(Home);
    };
    SearchPage.prototype.demo = function () {
        console.log("Demo");
    };
    SearchPage.prototype.getPlaceDetail = function (address) {
        var self = this;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //callback(results[0].geometry.location);
                console.log(results[0].geometry.location);
                self.lat = results[0].geometry.location.lat();
                self.lng = results[0].geometry.location.lng();
                var s = address;
                var fields = s.split(/,/);
                var loc1 = fields[0];
                self.loc = loc1;
                console.log(this.lat + "," + this.lng);
            }
        });
        // this.demo();
        // var request = {
        //     placeId: place_id
        // };
        // this.placesService = new google.maps.places.PlacesService(this.map);
        // this.placesService.getDetails(request, callback);
        // function callback(place, status) {
        //     if (status == google.maps.places.PlacesServiceStatus.OK) {
        //         console.log('page > getPlaceDetail > place > ', place);
        //         // set full address
        //         self.location = place.formatted_address;
        //         self.lat = place.geometry.location.lat();
        //         self.lng = place.geometry.location.lng();
        //       }else{
        //         console.log('page > getPlaceDetail > status > ', status);
        //     }
        // }
    };
    /**
     * Method to update the search filter if user already saved filtering options
     */
    SearchPage.prototype.setFilteredOption = function (option) {
        var _this = this;
        console.log(option);
        //1.location
        if (option.location) {
            this.location = option.location;
            this.lat = option.lat;
            this.lng = option.lng;
            this.loc = option.location;
            this.enableShowButton();
        }
        else {
            this.location = "Change Location";
        }
        //2.category
        this.storage.get("categorySelectedFilter").then(function (res) {
            if (res) {
                if (res.catStatus == "true") {
                    console.log(res);
                    //catName:this.category,catImage:this.categoryImg,
                    //let selected={"catStatus":"true","catTitle":this.categorylist[i].title,"catValue":this.categorylist[i].value,"catId":i}
                    _this.category = res.catTitle;
                    _this.categoryImg = res.catImg;
                    _this.categorylist[parseInt(res.catId)].tempimage = _this.categorylist[parseInt(res.catId)].active_img;
                    _this.categorylist[parseInt(res.catId)].class = 'active';
                    console.log(_this.categorylist);
                    //document.getElementById(res.catValue).setAttribute("src",this.categorylist[parseInt(res.catId)].active_img);
                    //document.getElementById(res.catTitle).style.color="#f55349";
                    _this.enableShowButton();
                }
            }
        });
        //3.distance
        if (option.distance != 0) {
            this.lat = option.lat;
            this.lng = option.lng;
            this.distance = option.distance;
            this.enableShowButton();
        }
        //4.price
        if (option.fromPrice || option.toPrice) {
            this.toprice = option.toPrice;
            this.fromprice = option.fromPrice;
            this.timeMin2 = this.fromprice;
            this.timeMax2 = this.toprice;
            this.time = {
                lower: this.timeMin2,
                upper: this.timeMax2
            };
        }
        //5.posted within
        if (option.postedWithin) {
            this.within = option.postedWithin;
        }
        //6.sortby 
        //if sortby contain first then we need to include location
        if (option.sortedBy) {
            this.sortBy = option.sortedBy;
            if (option.sortedBy == "Closest first") {
                this.lat = option.lat;
                this.lng = option.lng;
            }
        }
    };
    /**
     * Method to reset the already selected filter option to default
    */
    SearchPage.prototype.reset = function () {
        var _this = this;
        this.resetStatus = true;
        this.category = "";
        this.distance = 0;
        this.fromprice = "";
        this.toprice = "";
        this.location = "Change Location";
        this.within = "";
        this.sortBy = "";
        this.lat = "";
        this.lng = "";
        this.loc = "";
        this.time = {
            lower: 5,
            upper: 500,
        };
        this.disableShowButton();
        this.storage.set("search_location", null);
        this.storage.set('selectedFilterOption', null);
        this.storage.get("categorySelectedFilter").then(function (res) {
            if (res) {
                if (res.catStatus == "true") {
                    _this.categorylist[parseInt(res.catId)].class = 'deactive';
                    _this.categorylist[parseInt(res.catId)].tempimage = _this.categorylist[parseInt(res.catId)].inactive_img;
                    // document.getElementById(res.catValue).setAttribute("src",this.categorylist[parseInt(res.catId)].inactive_img);//image item.value
                    // document.getElementById(res.catTitle).style.color="#000";//item.title
                    _this.storage.set("categorySelectedFilter", null);
                }
            }
        });
    };
    /*
      Method used to select or deselect the category
    */
    SearchPage.prototype.myFunction = function (event) {
        console.log(event);
        var target = event.target || event.srcElement || event.currentTarget;
        var parent = event.srcElement.parentElement;
        var preparent = parent.parentElement;
        var divparent = preparent.parentElement;
        var children = divparent.children;
        var count = children.length;
        for (var i = 0; i < count; ++i) {
            if (preparent == children[i]) {
                console.log(preparent);
                console.log(children[i]);
                this.categorylist[i].tempimage = this.categorylist[i].active_img;
                this.categorylist[i].class = 'active';
                // var image = this.categorylist[i].active_img;
                this.category = this.categorylist[i].title;
                this.categoryImg = this.categorylist[i].inactive_img;
                this.categorylist[i].catId = i;
                var selected = { "catStatus": "true", "catTitle": this.categorylist[i].title, "catValue": this.categorylist[i].value, "catId": i, "catImg": this.categoryImg };
                this.storage.set("categorySelectedFilter", selected);
                //console.log(this.categorylist);
                // console.log(children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0] + "children[i]");
                // children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", image);
                // children[i].getElementsByTagName('label')[0].getElementsByTagName('span')[0].setAttribute("style", "color: #f55349;");
                this.enableShowButton();
            }
            else {
                this.categorylist[i].tempimage = this.categorylist[i].inactive_img;
                this.categorylist[i].class = 'deactive';
                // children[i].getElementsByTagName('label')[0].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
                // children[i].getElementsByTagName('label')[0].getElementsByTagName('span')[0].setAttribute("style", "color: #000;");
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
    /**
     * Called when distance change
     * Need to send location details with distance
    */
    SearchPage.prototype.distanceChange = function () {
        console.log(this.distance);
        if (this.distance != 0) {
            this.enableShowButton();
        }
        else {
            this.checkAnyFilterOptionSelectedOrNot("distance change");
        }
    };
    /**
     * Called when from price change : not used 17 apr
    */
    SearchPage.prototype.fromPriceChange = function () {
        var a = parseFloat(this.fromprice);
        var b = parseFloat(this.toprice);
        if (this.fromprice && this.toprice) {
            if (a > b) {
                document.getElementById('from-price').className = 'price-invalid';
            }
            else {
                document.getElementById('from-price').className = 'price-valid';
                document.getElementById('to-price').className = 'price-valid';
            }
        }
        else {
            console.log("else part");
        }
    };
    /**
     * Called when to price change :not used 17apr
    */
    SearchPage.prototype.toPriceChange = function () {
        var a = parseFloat(this.fromprice);
        var b = parseFloat(this.toprice);
        if (this.toprice && this.fromprice) {
            if (b < a) {
                this.disableShowButton();
                document.getElementById('to-price').className = 'price-invalid';
            }
            else {
                this.enableShowButton();
                document.getElementById('from-price').className = 'price-valid';
                document.getElementById('to-price').className = 'price-valid';
            }
        }
        else {
            console.log("else part");
        }
    };
    SearchPage.prototype.checkAnyFilterOptionSelectedOrNot = function (msg) {
        // this.filteredOptionList=
        // {lat:this.lat,lng:this.lng,location:this.loc,
        // catName:this.category,catImage:this.categoryImg,
        // distance:this.distance,
        // fromPrice:this.fromprice,toPrice:this.toprice,
        // postedWithin:this.within,
        // sortedBy:this.sortBy};
        console.log("TESTING............");
        console.log("LOC=", this.loc);
        console.log("CATEGORY", this.category);
        console.log("DISTANCE=", this.distance);
        console.log("FROM PRICE=", this.fromprice);
        console.log("FROM PRICE=", this.toprice);
        console.log("WITH IN=", this.within);
        console.log("SORT BY=", this.sortBy);
        if (this.loc || this.category || this.distance != 0 || this.fromprice > 5 || this.toprice <= 500 || this.within || this.sortBy) {
            if (this.fromprice != 5 && this.toprice != 500) {
                console.log("isidididdddddddddddddddddd");
                this.enableShowButton();
            }
            else {
                this.disableShowButton();
            }
        }
        else {
            console.log("disableeeee");
            this.disableShowButton();
        }
    };
    SearchPage.prototype.enableShowButton = function () {
        this.searchStatus = true;
        this.anyFilteredSelectedStatus = true;
    };
    SearchPage.prototype.disableShowButton = function () {
        console.log("disableeeee");
        this.searchStatus = false;
        this.anyFilteredSelectedStatus = false;
    };
    SearchPage.prototype.postedWithinChange = function () {
        if (this.within) {
            this.enableShowButton();
        }
        else {
            this.checkAnyFilterOptionSelectedOrNot("posted within");
        }
    };
    /**
     * called when sort by change
     * if "closest first" option selected then we need to send location details too
    */
    SearchPage.prototype.sortByChange = function () {
        if (this.sortBy) {
            this.enableShowButton();
        }
        else {
            this.checkAnyFilterOptionSelectedOrNot("sort by change");
        }
    };
    /**
     * 1.Category
     * 2.PostedWithin
     * 3.PriceFrom
     * 4.PriceTo
     * 5.Lat
     * 6.Long
     * 7.Range
     * 8.userId
     * 9.SortBy
     */
    SearchPage.prototype.searchsave = function () {
        var _this = this;
        //if user selected "distance" or "closest first" option but not selected the location 
        //then we need to get the saved user location from storage 
        if (!this.lat) {
            if (this.sortBy == "Closest First" || this.distance > 0) {
                console.log("closest first and distance  selected");
                //check whether user selected the location or not
                if (this.location != "Change Location") {
                    //if yes
                    console.log("location if");
                    this.goToFilterResultPage();
                }
                else {
                    //if no
                    console.log("inside locaioneeeeeeeeeeeeeeee");
                    this.storage.get('location').then(function (location) {
                        _this.lat = location.lat;
                        _this.lng = location.lng;
                        _this.goToFilterResultPage();
                    });
                }
            }
            else {
                console.log("closest first or distance options  not selected but location selected");
                this.goToFilterResultPage();
            }
        }
        else {
            console.log("location selected by user");
            this.goToFilterResultPage();
        }
        //  this.filteredOptionList=
        //  {
        //    locationData:[{
        //     lat:this.lat,lng:this.lng,location:this.location
        //    }],
        //    categoryData:[{
        //     catName:this.category,catImage:this.categoryImg
        //    }],
        //    distance:this.distance,
        //    priceRange:[{
        //     fromPrice:this.fromprice,toPrice:this.toprice
        //    }],
        //    postedWithin:this.within,
        //    sortedBy:this.sortBy
        //  }
    };
    SearchPage.prototype.goToFilterResultPage = function () {
        var _this = this;
        //8 paramsparams
        this.filteredOptionList =
            { lat: this.lat, lng: this.lng, location: this.loc,
                catName: this.category, catImage: this.categoryImg,
                distance: this.distance,
                fromPrice: this.fromprice, toPrice: this.toprice,
                postedWithin: this.within,
                sortedBy: this.sortBy };
        this.storage.set('selectedFilterOption', JSON.stringify(this.filteredOptionList)).then(function (data) {
            console.log("STORAGE=" + data);
            _this.navCtrl.push(SearchresultPage);
        });
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
        __metadata("design:paramtypes", [NavController,
            ModalController,
            NavParams,
            ItemsProvider,
            Events,
            Storage])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map