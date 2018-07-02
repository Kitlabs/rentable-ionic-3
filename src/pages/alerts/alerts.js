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
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ItemsProvider } from '../../providers/items/items';
import { AlertdetailPage } from '../alertdetail/alertdetail';
import { OpportunityPage } from '../opportunity/opportunity';
/*
  Generated class for the AlertsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AlertsPage = /** @class */ (function () {
    function AlertsPage(navCtrl, navParams, nativePageTransitions, itemprovider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativePageTransitions = nativePageTransitions;
        this.itemprovider = itemprovider;
        this.alertdetail = AlertdetailPage;
        this.opportunity = OpportunityPage;
        this.list =
            [
                { alertname: 'John', history: '24', startprice: '20', lastprice: '30', distance: '10', startduration: 'July 1', lastduration: 'July 10' },
                { alertname: 'name 2', history: '2', startprice: '40', lastprice: '50', distance: '20', startduration: 'July 6', lastduration: 'July 14' },
                { alertname: 'name 3', history: '24', startprice: '24', lastprice: '32', distance: '30', startduration: 'July 14', lastduration: 'July 23' },
            ];
        this.categorylist =
            [
                { alertname: 'John', history: '24', startprice: '20', lastprice: '30', distance: '10', startduration: 'July 1', lastduration: 'July 10' },
                { alertname: 'name 2', history: '2', startprice: '40', lastprice: '50', distance: '20', startduration: 'July 6', lastduration: 'July 14' },
                { alertname: 'name 3', history: '24', startprice: '24', lastprice: '32', distance: '30', startduration: 'July 14', lastduration: 'July 23' },
            ];
        this.alert_opportunity = "alert";
        this.itemprovider.Getalerthistory(localStorage.getItem('uid')).subscribe(function (data) {
        }, function (err) {
        });
        this.itemprovider.Getoppotunityhistory(localStorage.getItem('uid')).subscribe(function (data) {
        }, function (err) {
        });
        this.alertview = true;
        console.log("constructer");
        this.itemdelete = false;
    }
    AlertsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AlertsPagePage');
    };
    AlertsPage.prototype.goalertview = function () {
        this.navCtrl.setRoot(AlertdetailPage);
    };
    AlertsPage.prototype.goopportunityview = function () {
        this.navCtrl.setRoot(OpportunityPage);
    };
    AlertsPage.prototype.showalert = function () {
        if (this.alert_opportunity == "alert") {
            this.alertview = true;
        }
        else
            this.alertview = false;
    };
    AlertsPage.prototype.deletealert = function (n) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i] == n) {
                this.list.splice(i, 1);
            }
        }
    };
    AlertsPage.prototype.deletecategory = function (n) {
        for (var i = 0; i < this.categorylist.length; i++) {
            if (this.categorylist[i] == n) {
                this.categorylist.splice(i, 1);
            }
        }
    };
    AlertsPage = __decorate([
        Component({
            selector: 'page-alerts',
            templateUrl: 'alerts.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            NativePageTransitions,
            ItemsProvider])
    ], AlertsPage);
    return AlertsPage;
}());
export { AlertsPage };
//# sourceMappingURL=alerts.js.map