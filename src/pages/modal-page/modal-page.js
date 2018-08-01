var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, ViewController, AlertController, App, LoadingController, NavController, Platform, ToastController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
var MapModal = /** @class */ (function () {
    function MapModal(loadingCtrl, toastCtrl, app, nav, zone, platform, alertCtrl, storage, actionSheetCtrl, geolocation, viewCtrl, ev) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.nav = nav;
        this.zone = zone;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.actionSheetCtrl = actionSheetCtrl;
        this.geolocation = geolocation;
        this.viewCtrl = viewCtrl;
        this.ev = ev;
        this.addressElement = null;
        this.listSearch = '';
        this.search = false;
        this.switch = "map";
        this.regionals = [];
        this.plResultStatus = false;
        this.platform.ready().then(function () { return _this.loadMaps(); });
        this.regionals = [{
                "title": "Marker 1",
                "latitude": 52.50094,
                "longitude": 13.29922,
            }, {
                "title": "Marker 3",
                "latitude": 52.50010,
                "longitude": 13.29922,
            }, {
                "title": "Marker 2",
                "latitude": 49.1028606,
                "longitude": 9.8426116
            }];
        this.strSelectedPlace = "Search here";
    }
    ;
    MapModal.prototype.viewPlace = function (id) {
        console.log('Clicked Marker', id);
    };
    //********************************************* NEW GOOGLE MAP INTEGRATION ******************************************* */
    MapModal.prototype.ngOnInit = function () {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    };
    MapModal.prototype.chooseItem = function (data) {
        var self = this;
        this.plResultStatus = false;
        this.strSelectedPlace = data;
        this.onSelectAddress(data, function (location) {
            //Do something with location
            if (location)
                console.log(location);
            self.autocomplete.query = data;
            self.searchLocation = { address: data, lat: location.lat(), lng: location.lng() };
            var myPos = new google.maps.LatLng(location.lat(), location.lng());
            var options = {
                center: myPos,
                zoom: 14
            };
            self.map.setOptions(options);
            self.addMarker(location, data);
        });
    };
    MapModal.prototype.goPrevious = function () {
        this.nav.pop();
    };
    MapModal.prototype.addMarkerNew = function (map) {
        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: map.getCenter()
        });
        var content = "<h4>Information!</h4>";
        this.addInfoWindow(marker, content);
    };
    MapModal.prototype.updateSearch = function () {
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
            self.autocompleteItems = [];
            if (status == "OK") {
                self.plResultStatus = true;
                predictions.forEach(function (prediction) {
                    self.autocompleteItems.push(prediction);
                });
            }
            else {
                self.plResultStatus = false;
            }
        });
    };
    //CODE TO GET LAT/LNG FROM ADDRESS 
    MapModal.prototype.onSelectAddress = function (address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location);
            }
            else {
                alert("Can't find address: " + status);
                callback(null, null);
            }
        });
    };
    MapModal.prototype.publicSelectedLocation = function (address, lat, lng) {
        this.ev.publish('searchLocation', address, lat, lng);
        this.dismiss();
    };
    /* ******************************************************************************* */
    MapModal.prototype.loadMaps = function () {
        if (!!google) {
            this.initializeMap();
            //this.initAutocomplete();
        }
        else {
            this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.');
        }
    };
    MapModal.prototype.errorAlert = function (title, message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.loadMaps();
                    }
                }
            ]
        });
        alert.present();
    };
    /*
    Not used
    */
    MapModal.prototype.mapsSearchBar = function (ev) {
        // set input to the value of the searchbar
        //this.search = ev.target.value;
        console.log(ev);
        console.log('search');
        var autocomplete = new google.maps.places.Autocomplete(ev);
        autocomplete.bindTo('bounds', this.map);
        return new Observable(function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    sub.next(place.geometry.location);
                    console.log('geometry location', place.geometry.location);
                    sub.complete();
                }
            });
        });
    };
    MapModal.prototype.initAutocomplete = function () {
        var _this = this;
        //reference : https://github.com/driftyco/ionic/issues/7223
        console.log('text');
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
            console.log('Searchdata', location);
            var options = {
                center: location,
                zoom: 14
            };
            _this.map.setOptions(options);
            _this.addMarker(location, _this.searchresult);
        });
    };
    MapModal.prototype.createAutocomplete = function (addressEl) {
        var _this = this;
        var autocomplete = new google.maps.places.Autocomplete(addressEl);
        var address;
        autocomplete.bindTo('bounds', this.map);
        return new Observable(function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                console.log("PLACE=", JSON.stringify(place));
                console.log('place', place.formatted_address);
                address = place.formatted_address;
                _this.searchresult = address;
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    console.log('Search Lat', place.geometry.location.lat());
                    console.log('Search Lng', place.geometry.location.lng());
                    _this.ev.publish('searchLocation', place.formatted_address, place.geometry.location.lat(), place.geometry.location.lng());
                    sub.next(place.geometry.location);
                    //  sub.complete();
                }
            });
        });
    };
    MapModal.prototype.dismiss = function () {
        console.log(this.searchLocation);
        if (this.searchLocation) {
            //user selected location 
            this.storage.set("search_location", this.searchLocation);
        }
        else {
        }
        this.viewCtrl.dismiss(this.searchLocation);
    };
    MapModal.prototype.initializeMap = function () {
        var _this = this;
        this.zone.run(function () {
            var mapEle = _this.mapElement.nativeElement;
            _this.map = new google.maps.Map(mapEle, {
                zoom: 12,
                center: { lat: 0, lng: 0 },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: false,
                disableDefaultUI: true,
                zoomControl: true,
                scaleControl: true,
            });
            _this.markers = [];
            _this.storage.get('search_location').then(function (result) {
                if (result) {
                    console.log(result);
                    var lat = result.lat;
                    var lng = result.lng;
                    _this.autocomplete.query = result.address;
                    _this.searchLocation = result;
                    var myPos = new google.maps.LatLng(lat, lng);
                    var options = {
                        center: myPos,
                        zoom: 14
                    };
                    _this.map.setOptions(options);
                    var location_1 = { lat: lat, lng: lng };
                    _this.addMarker(location_1, result.address);
                }
                else {
                    //location info saved in post code of user
                    _this.storage.get('location').then(function (result) {
                        console.log(result);
                        var lat = result.lat;
                        var lng = result.lng;
                        _this.autocomplete.query = result.address;
                        _this.searchLocation = result;
                        var myPos = new google.maps.LatLng(lat, lng);
                        var options = {
                            center: myPos,
                            zoom: 14
                        };
                        _this.map.setOptions(options);
                        var location = { lat: lat, lng: lng };
                        _this.addMarker(location, result.address);
                    });
                }
            });
            // for (let regional of this.regionals) {
            //   regional.distance = 0;
            //   regional.visible = false;
            //   regional.current = false;
            //   let markerData = {
            //     position: {
            //       lat: -33.8688,
            //       lng: 151.2093
            //     },
            //     map: this.map,
            //     title: regional.title,
            //   };
            //   regional.marker = new google.maps.Marker(markerData);
            //   this.markers.push(regional.marker);
            //   regional.marker.addListener('click', () => {
            //     for (let c of this.regionals) {
            //       c.current = false;
            //       //c.infoWindow.close();
            //     }
            //     this.currentregional = regional;
            //     regional.current = true;
            //     //regional.infoWindow.open(this.map, regional.marker);
            //     this.map.panTo(regional.marker.getPosition());
            //   });
            // }
            // google.maps.event.addListenerOnce(this.map, 'idle', () => {
            //   google.maps.event.trigger(this.map, 'resize');
            //   mapEle.classList.add('show-map');
            //   this.bounceMap(this.markers);
            //   this.getCurrentPositionfromStorage(this.markers)
            // });
            // google.maps.event.addListener(this.map, 'bounds_changed', () => {
            //   this.zone.run(() => {
            //     this.resizeMap();
            //   });
            // });
        });
    };
    //Center zoom
    //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
    MapModal.prototype.bounceMap = function (markers) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }
        this.map.fitBounds(bounds);
    };
    MapModal.prototype.resizeMap = function () {
        var _this = this;
        setTimeout(function () {
            google.maps.event.trigger(_this.map, 'resize');
        }, 200);
    };
    MapModal.prototype.getCurrentPositionfromStorage = function (markers) {
        var _this = this;
        this.storage.get('lastLocation').then(function (result) {
            console.log("position from stoarge=" + result);
            if (result) {
                var myPos = new google.maps.LatLng(result.lat, result.long);
                _this.map.setOptions({
                    center: myPos,
                    zoom: 14
                });
                var marker = _this.addMarker(myPos, "My last saved Location: " + result.location);
                markers.push(marker);
                _this.bounceMap(markers);
                _this.resizeMap();
            }
        });
    };
    MapModal.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    MapModal.prototype.choosePosition = function () {
        var _this = this;
        this.storage.get('lastLocation').then(function (result) {
            if (result) {
                var actionSheet = _this.actionSheetCtrl.create({
                    title: 'Last Location: ' + result.location,
                    buttons: [
                        {
                            text: 'Reload',
                            handler: function () {
                                _this.getCurrentPosition();
                            }
                        },
                        {
                            text: 'Delete',
                            handler: function () {
                                _this.storage.set('lastLocation', null);
                                _this.showToast('Location deleted!');
                                _this.initializeMap();
                            }
                        },
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: function () {
                            }
                        }
                    ]
                });
                actionSheet.present();
            }
            else {
                _this.getCurrentPosition();
            }
        });
    };
    //Go show currrent location
    MapModal.prototype.getCurrentPosition = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Searching Location ...'
        });
        this.loading.present();
        var locationOptions = { timeout: 10000, enableHighAccuracy: true };
        this.geolocation.getCurrentPosition(locationOptions).then(function (position) {
            _this.loading.dismiss().then(function () {
                _this.showToast('Location found!');
                console.log(position.coords.latitude, position.coords.longitude);
                var myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var options = {
                    center: myPos,
                    zoom: 14
                };
                _this.map.setOptions(options);
                _this.addMarker(myPos, "Mein Standort!");
                var alert = _this.alertCtrl.create({
                    title: 'Location',
                    message: 'Do you want to save the Location?',
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: 'Save',
                            handler: function (data) {
                                var lastLocation = { lat: position.coords.latitude, long: position.coords.longitude };
                                console.log(lastLocation);
                                _this.storage.set('lastLocation', lastLocation).then(function () {
                                    _this.showToast('Location saved');
                                });
                            }
                        }
                    ]
                });
                alert.present();
            });
        }, function (error) {
            _this.loading.dismiss().then(function () {
                _this.showToast('Location not found. Please enable your GPS!');
                console.log(error);
            });
        });
    };
    MapModal.prototype.toggleSearch = function () {
        if (this.search) {
            this.search = false;
        }
        else {
            this.search = true;
        }
    };
    MapModal.prototype.addMarker = function (position, content) {
        var self = this;
        this.removeMarker();
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: position,
            draggable: true,
        });
        google.maps.event.addListener(marker, 'dragend', function (evt) {
            //content: '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>'
            var geocoder = new google.maps.Geocoder;
            var latlng = { lat: evt.latLng.lat(), lng: evt.latLng.lng() };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                self.autocomplete.query = results[0].formatted_address;
                self.searchLocation = { address: results[0].formatted_address, lat: evt.latLng.lat(), lng: evt.latLng.lng() };
            });
        });
        google.maps.event.addListener(marker, 'drag', function (evt) {
            console.log("marker is being dragged");
        });
        this.addInfoWindow(marker, content);
        //Push your newly created marker into the array:
        //this.markers.push(marker);
        //return marker;
    };
    MapModal.prototype.removeMarker = function () {
        this.clearMarkers();
        this.markers = [];
    };
    // Deletes all markers in the array by removing references to them.
    MapModal.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    // Sets the map on all markers in the array.
    MapModal.prototype.setMapOnAll = function (map) {
        if (this.markers.length) {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(map);
            }
        }
    };
    MapModal.prototype.addInfoWindow = function (marker, content) {
        var self = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], MapModal.prototype, "mapElement", void 0);
    __decorate([
        ViewChild('searchbar', { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], MapModal.prototype, "searchbar", void 0);
    MapModal = __decorate([
        Component({
            selector: 'page-modal-page',
            templateUrl: 'modal-page.html'
        }),
        __metadata("design:paramtypes", [LoadingController,
            ToastController,
            App,
            NavController,
            NgZone,
            Platform,
            AlertController,
            Storage,
            ActionSheetController,
            Geolocation,
            ViewController,
            Events])
    ], MapModal);
    return MapModal;
}());
export { MapModal };
//# sourceMappingURL=modal-page.js.map