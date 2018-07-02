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
var TabPage = /** @class */ (function () {
    function TabPage(navCtrl, navParams, storage, keyboard, ev) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.keyboard = keyboard;
        this.ev = ev;
        this.tab1Root = Home;
        this.tab2Root = Myrent;
        this.tab3Root = AddPage;
        this.tab4Root = ChatPage;
        this.tab5Root = AlertsPage;
        this.myIndex = navParams.data.tabIndex || 0;
        this.ev.subscribe("message", function (countCarItem) {
            console.log("Event occurred");
            _this.countCarItem = countCarItem;
        });
    }
    TabPage.prototype.ionViewDidEnter = function () {
        console.log("inside tab view did enter");
        /*this.keyboard.onKeyboardShow().subscribe(()=>{

            console.log("Keyboard show");
            var tabbars = document.getElementsByClassName('tabbar');
            for(var i=0; i<tabbars.length; i++) {
            var node = <HTMLElement>tabbars[i];
            node.style.display ='none';
            }
                     
        });

         this.keyboard.onKeyboardHide().subscribe(()=>{
                console.log("Keyboard hide");
                var tabbars = document.getElementsByClassName('tabbar');
                for(var i=0; i<tabbars.length; i++) {
                var node = <HTMLElement>tabbars[i];
                node.style.display = 'flex';
                }

        });*/
    };
    TabPage.prototype.ionViewDidLoad = function () {
    };
    TabPage.prototype.ionViewDidLeave = function () {
        console.log("Did leave tab");
    };
    TabPage.prototype.myMethod = function (tag) {
        console.log(tag);
        if (tag == "home") {
            this.myIndex = 0;
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
            Keyboard,
            Events])
    ], TabPage);
    return TabPage;
}());
export { TabPage };
//# sourceMappingURL=tab.js.map