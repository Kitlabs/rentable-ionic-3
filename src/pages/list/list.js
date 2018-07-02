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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Filter } from '../filter/filter';
import { Details } from '../details/details';
var List = /** @class */ (function () {
    function List(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.details = Details;
        this.list = [{ img: 'assets/img/11.png', title: 'Stylish house' }, { img: 'assets/img/22.png', title: 'Big Houses' }, { img: 'assets/img/33.png', title: 'Big Houses' }, { img: 'assets/img/11.png', title: 'Stylish house' }, { img: 'assets/img/11.png', title: 'Stylish house' }, { img: 'assets/img/22.png', title: 'Big Houses' }, { img: 'assets/img/33.png', title: 'Big Houses' }, { img: 'assets/img/11.png', title: 'Stylish house' }];
    }
    List.prototype.presentFilterModal = function () {
        var FilterModal = this.modalCtrl.create(Filter, { userId: 8675309 });
        FilterModal.present();
    };
    List = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ModalController])
    ], List);
    return List;
}());
export { List };
//# sourceMappingURL=list.js.map