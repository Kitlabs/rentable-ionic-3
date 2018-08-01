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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var HelpSupportPage = /** @class */ (function () {
    function HelpSupportPage(navCtrl, navParams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        var localData = http.get('assets/faq.json').map(function (res) { return res.json().items; });
        localData.subscribe(function (data) {
            _this.information = data;
            console.log(data);
        });
    }
    HelpSupportPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpSupportPage');
    };
    HelpSupportPage.prototype.toggleSection = function (i) {
        this.information[i].open = !this.information[i].open;
    };
    HelpSupportPage.prototype.toggleItem = function (i, j) {
        this.information[i].children[j].open = !this.information[i].children[j].open;
    };
    HelpSupportPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-help-support',
            templateUrl: 'help-support.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Http])
    ], HelpSupportPage);
    return HelpSupportPage;
}());
export { HelpSupportPage };
//# sourceMappingURL=help-support.js.map