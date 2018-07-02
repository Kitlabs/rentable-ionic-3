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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/payment/profile';
import { EditprofilePage } from '../editprofile/editprofile';
import { Storage } from '@ionic/storage';
var ProfileinputPage = /** @class */ (function () {
    function ProfileinputPage(navCtrl, navParams, profileprovier, storage, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileprovier = profileprovier;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.editprofile = EditprofilePage;
        this.formtype = navParams.get("type");
        this.data = navParams.get("data");
        /*this.Profiledata=this.profileprovier.Getprofile(this.uuid).subscribe(data =>{
        this.firstname=data.json().result.firstName;
        this.lastname=data.json().result.lastName;
        this.email=data.json().result.email;
        this.phonenumber=data.json().result.phoneNumber;
        this.postalcode=data.json().result.postalCode;
        this.password=data.json().result.fireId;
        this.photourl=data.json().result.photoURL;
      },
      err =>{
        console.log(err);
      });*/
        if (this.formtype == "PASSWORD") {
            this.forgetPassField = true;
        }
        else {
            this.forgetPassField = false;
        }
    }
    ProfileinputPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfileinputPage');
    };
    ProfileinputPage.prototype.removetext = function () {
        this.data = "";
    };
    ProfileinputPage.prototype.save = function () {
        var _this = this;
        // this.profileprovier.ChangeProfile(this.formtype, this.data).subscribe(data =>{
        //   console.log(data);
        // })
        if (this.formtype == "FIRST NAME") {
            this.firstname = this.data;
        }
        if (this.formtype == "LAST NAME") {
            this.lastname = this.data;
        }
        if (this.formtype == "MOBILE NUMBER") {
            this.phonenumber = this.data;
        }
        if (this.formtype == "EMAIL") {
            this.email = this.data;
        }
        if (this.formtype == "PASSWORD") {
            this.password = this.data;
        }
        if (this.formtype == "POSTAL CODE") {
            this.postalcode = this.data;
        }
        this.storage.get('userId').then(function (userId) {
            if (userId != null) {
                _this.profileprovier.ChangeProfile(_this.email, _this.phonenumber, _this.password, _this.firstname, _this.lastname, _this.photourl, _this.postalcode, userId).subscribe(function (data) {
                    console.log(data.json());
                    if (data.json().msg == "success") {
                        _this.showToast(data.json().msg_details);
                    }
                    if (data.json().msg == "error") {
                        _this.showToast("Under Development");
                    }
                }, function (err) {
                    alert("error");
                });
            }
            else {
            }
        });
    };
    ProfileinputPage.prototype.showToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
            _this.navCtrl.popTo(EditprofilePage);
        });
        toast.present();
    };
    ProfileinputPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-profileinput',
            templateUrl: 'profileinput.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ProfileProvider,
            Storage,
            ToastController])
    ], ProfileinputPage);
    return ProfileinputPage;
}());
export { ProfileinputPage };
//# sourceMappingURL=profileinput.js.map