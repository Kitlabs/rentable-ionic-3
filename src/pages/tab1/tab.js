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
import { NavController, NavParams, Tabs, Events } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { Home } from '../home/home';
import { Myrent } from '../myrent/myrent';
import { AddPage } from '../add/add';
import { AlertsPage } from '../alerts/alerts';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
var TabPage = /** @class */ (function () {
    function TabPage(navCtrl, navParams, storage, authprovier, events, keyboard, ev) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.authprovier = authprovier;
        this.events = events;
        this.keyboard = keyboard;
        this.ev = ev;
        this.tab1Root = Home;
        this.tab2Root = Myrent;
        this.tab3Root = AddPage;
        this.tab4Root = ChatPage;
        this.tab5Root = AlertsPage;
        this.tabStatus = true;
        this.myIndex = navParams.data.tabIndex || 0;
        this.countCarItem = null;
    }
    TabPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad tab page");
    };
    TabPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log("ionViewDidEnter tab page");
        this.ev.subscribe("messageCount", function (count) {
            //alert('messageCount');
            if (count == 0) {
                _this.countCarItem = "1+";
            }
            else {
                _this.countCarItem = null;
            }
            console.log("COUNT=", _this.countCarItem);
        });
        this.ev.subscribe("rentalCount", function (count) {
            //alert('rentalCount');
            console.log('Count here ------' + count);
            if (count == 0) {
                _this.countCarItem = "1+";
            }
            else {
                _this.countCarItem = null;
            }
            console.log("COUNT=", _this.countCarItem);
        });
        this.ev.subscribe("counter", function (count) {
            //alert('counter');
            if (count == 0) {
                _this.countCarItem = "1+";
            }
            else {
                _this.countCarItem = null;
            }
            console.log("COUNT=", _this.countCarItem);
        });
    };
    TabPage.prototype.tabChanged = function ($ev) {
        var _this = this;
        console.log("TAB CHANGED");
        this.events.subscribe('CARDSTATUS', function (data) {
            if (data == 1) {
                _this.tabStatus = true;
            }
            else {
                _this.tabStatus = false;
            }
        });
        //  this.storage.set('CARD_STATUS',1);
        this.storage.get('CARD_STATUS').then(function (data) {
            console.log(data);
            if (data == 0) {
                console.log("CARDDdd");
                _this.tabStatus = false;
            }
        });
        switch ($ev.tabTitle) {
            case "HOME":
                this.tabRef.select(0);
                break;
            case "ITEMS":
                this.tabRef.select(1);
                break;
            case "POST":
                this.tabRef.select(2);
                break;
            case "CHAT":
                this.countCarItem = null;
                this.tabRef.select(3);
                break;
            default:
                break;
        }
    };
    __decorate([
        ViewChild('tabs'),
        __metadata("design:type", Tabs)
    ], TabPage.prototype, "tabRef", void 0);
    TabPage = __decorate([
        Component({
            selector: 'page-tab',
            templateUrl: 'tab.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            AuthenticateProvider,
            Events,
            Keyboard,
            Events])
    ], TabPage);
    return TabPage;
}());
export { TabPage };
//# sourceMappingURL=tab.js.map