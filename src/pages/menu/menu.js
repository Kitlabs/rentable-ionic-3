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
import { NavController, NavParams, Nav } from 'ionic-angular';
import { TabPage } from '../tab/tab';
import { Home } from '../home/home';
import { Profile } from '../profile/profile';
import { PaymentsPage } from '../payments/payments';
import { About } from '../about/about';
import { ContactPage } from '../contact/contact';
import { TcPage } from '../tc/tc';
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rootPage = TabPage;
        /*pages: PageInterface[] = [
        { title: 'Home', name: 'TabPage',  tabComponent: Home, index: 0, icon: 'home' },
        { title: 'Profile', name: 'TabPage',  tabComponent: Profile, index: 1, icon: 'home' },
        { title: 'Payments', name: 'TabPage',  tabComponent: Payments, index: 2, icon: 'home' },
        { title: 'About', name: 'TabPage',  tabComponent: About, index: 3, icon: 'home' },
        { title: 'T&C', name: 'TabPage',  tabComponent: TcPage, index: 4, icon: 'home' },
        { title: 'Contact US', name: 'TabPage',  tabComponent: ContactPage, index: 5, icon: 'home' }
      ];*/
        this.pages = [
            { title: 'Home', tabComponent: Home, index: 0, icon: 'home' },
            { title: 'Profile', tabComponent: Profile, icon: 'home' },
            { title: 'Payments', tabComponent: PaymentsPage, icon: 'home' },
            { title: 'About', tabComponent: About, icon: 'home' },
            { title: 'T&C', tabComponent: TcPage, icon: 'home' },
            { title: 'Contact US', tabComponent: ContactPage, icon: 'home' }
        ];
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MenuPagePage');
    };
    MenuPage.prototype.openPage = function (page) {
        var params = {};
        if (page.index) {
            params = { tabIndex: page.index };
        }
        console.log(page.title + " rascal page");
        console.log(this.nav + " rascal nav");
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        }
        else {
            console.log(page.tabComponent + "rascal name");
            this.navCtrl.setRoot(page.tabComponent);
        }
    };
    MenuPage.prototype.isActive = function (page) {
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Component({
            selector: 'page-menu',
            templateUrl: 'menu.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.js.map