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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
var ModalPlaceautocompletePage = /** @class */ (function () {
    function ModalPlaceautocompletePage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    ModalPlaceautocompletePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalPlaceautocompletePage');
    };
    ModalPlaceautocompletePage.prototype.ngOnInit = function () {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    };
    ModalPlaceautocompletePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalPlaceautocompletePage.prototype.chooseItem = function (item) {
        console.log('modal > chooseItem > item > ', item);
        this.viewCtrl.dismiss(item);
    };
    ModalPlaceautocompletePage.prototype.updateSearch = function () {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var self = this;
        var config = {
            types: ['geocode'],
            input: this.autocomplete.query
        };
        this.acService.getPlacePredictions(config, function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            if (status == "OK") {
                predictions.forEach(function (prediction) {
                    self.autocompleteItems.push(prediction);
                });
            }
        });
    };
    ModalPlaceautocompletePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-modal-placeautocomplete',
            templateUrl: 'modal-placeautocomplete.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController])
    ], ModalPlaceautocompletePage);
    return ModalPlaceautocompletePage;
}());
export { ModalPlaceautocompletePage };
//# sourceMappingURL=modal-placeautocomplete.js.map