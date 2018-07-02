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
import { ActionSheetController, ViewController, AlertController, App, LoadingController, NavController, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
var MapModal = /** @class */ (function () {
    function MapModal(loadingCtrl, toastCtrl, app, nav, zone, platform, alertCtrl, storage, actionSheetCtrl, geolocation, viewCtrl) {
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
        this.addressElement = null;
        this.listSearch = '';
        this.search = false;
        this.switch = "map";
        this.regionals = [];
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
    }
    MapModal.prototype.viewPlace = function (id) {
        console.log('Clicked Marker', id);
    };
    MapModal.prototype.loadMaps = function () {
        if (!!google) {
            this.initializeMap();
            this.initAutocomplete();
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
        // reference : https://github.com/driftyco/ionic/issues/7223
        console.log('text');
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
            console.log('Searchdata', location);
            var options = {
                center: location,
                zoom: 10
            };
            _this.map.setOptions(options);
            //this.addMarker(location, "Mein gesuchter Standort");
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
                    sub.next(place.geometry.location);
                    //sub.complete();
                }
            });
        });
    };
    MapModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    MapModal.prototype.initializeMap = function () {
        var _this = this;
        this.zone.run(function () {
            var mapEle = _this.mapElement.nativeElement;
            _this.map = new google.maps.Map(mapEle, {
                zoom: 5,
                center: { lat: -33.8688, lng: 151.2093 },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom: false,
                disableDefaultUI: true,
                zoomControl: true,
                scaleControl: true,
            });
            var markers = [];
            var _loop_1 = function (regional) {
                regional.distance = 0;
                regional.visible = false;
                regional.current = false;
                var markerData = {
                    position: {
                        lat: -33.8688,
                        lng: 151.2093
                    },
                    map: _this.map,
                    title: regional.title,
                };
                regional.marker = new google.maps.Marker(markerData);
                markers.push(regional.marker);
                regional.marker.addListener('click', function () {
                    for (var _i = 0, _a = _this.regionals; _i < _a.length; _i++) {
                        var c = _a[_i];
                        c.current = false;
                        //c.infoWindow.close();
                    }
                    _this.currentregional = regional;
                    regional.current = true;
                    //regional.infoWindow.open(this.map, regional.marker);
                    _this.map.panTo(regional.marker.getPosition());
                });
            };
            for (var _i = 0, _a = _this.regionals; _i < _a.length; _i++) {
                var regional = _a[_i];
                _loop_1(regional);
            }
            google.maps.event.addListenerOnce(_this.map, 'idle', function () {
                google.maps.event.trigger(_this.map, 'resize');
                mapEle.classList.add('show-map');
                _this.bounceMap(markers);
                _this.getCurrentPositionfromStorage(markers);
            });
            google.maps.event.addListener(_this.map, 'bounds_changed', function () {
                _this.zone.run(function () {
                    _this.resizeMap();
                });
            });
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
    // go show currrent location
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
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: position
        });
        this.addInfoWindow(marker, content);
        return marker;
    };
    MapModal.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
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
            ViewController])
    ], MapModal);
    return MapModal;
}());
export { MapModal };
//# sourceMappingURL=modal-page.js.map