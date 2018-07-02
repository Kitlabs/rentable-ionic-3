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
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { RentPage } from '../rent/rent';
import { ChatPage } from '../chat/chat';
/*
  Generated class for the RejectPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var RejectPage = /** @class */ (function () {
    function RejectPage(navCtrl, navParams, itemProvider, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemProvider = itemProvider;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.rent = RentPage;
        this.tracks = [];
        this.isremove = false;
        this.rejectreason = [{ reason: 'I am away', icon: 'ios-bug-outline' }, { reason: 'item is broken', icon: 'ios-plane-outline' }, { reason: 'Item being fixed', icon: 'ios-plane-outline' }, { reason: 'item unavailable', icon: 'ios-plane-outline' }];
        this.rejectimage = [{ img: 'assets/icon/reject-imaway.png', activeimg: 'assets/icon/reject-imaway-active.png' }, { img: 'assets/icon/reject-itembroken.png', activeimg: 'assets/icon/reject-itembroken-active.png' }, { img: 'assets/icon/reject-itemfixed.png', activeimg: 'assets/icon/reject-itemfixed-active.png' }, { img: 'assets/icon/reject-itemunavailable.png', activeimg: 'assets/icon/reject-itemunavailable-active.png' }];
        this.requesterId = this.navParams.get("requesterId");
        this.requestedItemId = this.navParams.get("requestedItemId");
    }
    RejectPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RejectPagePage');
    };
    RejectPage.prototype.myFunction = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var element = event.srcElement;
        console.log(element);
        var parent = event.srcElement.parentElement;
        console.log(parent);
        var preparent = parent.parentElement;
        console.log(preparent);
        var children = preparent.children;
        var count = children.length;
        console.log(count + element);
        for (var i = 0; i < count; ++i) {
            if (parent == children[i]) {
                var image = this.rejectimage[i].activeimg;
                this.reject = this.rejectreason[i].reason;
                console.log(this.reject);
                children[i].getElementsByTagName('img')[0].setAttribute("src", image);
            }
            else {
                var inactiveimage = this.rejectimage[i].img;
                console.log(children[i].getElementsByTagName('img')[0] + "children");
                children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
            }
        }
    };
    RejectPage.prototype.gorequest = function () {
        this.navCtrl.pop();
    };
    RejectPage.prototype.Rejectsubmit = function () {
        var _this = this;
        if (this.reject != null) {
            if (this.isremove == true) {
                this.removeStatus = 1;
            }
            if (this.isremove == false) {
                this.removeStatus = 0;
            }
            this.itemProvider.rejectRentalRequest(this.requesterId, this.requestedItemId, this.reject, this.removeStatus).subscribe(function (data) {
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.presentToast(data.json().msg_details, 1);
                }
            }, function (err) {
            });
        }
        else {
            this.presentToast("Please choose your rejection option", 0);
        }
    };
    RejectPage.prototype.presentToast = function (msg, id) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            if (id == 1) {
                _this.navCtrl.setRoot(ChatPage);
            }
            else {
            }
        });
        toast.present();
    };
    RejectPage = __decorate([
        Component({
            selector: 'page-reject',
            templateUrl: 'reject.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemsProvider,
            LoadingController,
            ToastController])
    ], RejectPage);
    return RejectPage;
}());
export { RejectPage };
//# sourceMappingURL=reject.js.map