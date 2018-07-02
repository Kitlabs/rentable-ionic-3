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
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { ProfileProvider } from '../../providers/payment/profile';
import { Profile } from '../profile/profile';
import { ProfileinputPage } from '../profileinput/profileinput';
import { Storage } from '@ionic/storage';
/*
  Generated class for the EditprofilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EditprofilePage = /** @class */ (function () {
    function EditprofilePage(navCtrl, navParams, profileprovider, camera, loadingCtrl, toastCtrl, device, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.profileprovider = profileprovider;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.device = device;
        this.storage = storage;
        this.profile = Profile;
        this.editprofile = {
            img: 'assets/img/profile-img.png', name: 'John Doe', address: 'Sydney Australia', rate: '4.5', rent_nuber: '10', owner_number: '20'
        };
        //this.imageURI="assets/img/profile-img.png";
        this.imageURI = "54.79.124.187/api/uploads/dummy.png";
    }
    EditprofilePage_1 = EditprofilePage;
    EditprofilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditprofilePagePage');
    };
    EditprofilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter EditprofilePagePage');
        this.profilePic = [];
        this.storage.get('userId').then(function (userId) {
            if (userId != null) {
                _this.Profiledata = _this.profileprovider.Getprofile(userId).subscribe(function (data) {
                    console.log(data.json().userDetails);
                    _this.firstname = data.json().userDetails[0].firstName;
                    _this.lastname = data.json().userDetails[0].lastName;
                    _this.email = data.json().userDetails[0].email;
                    _this.phonenumber = data.json().userDetails[0].phoneNumber;
                    _this.postalcode = data.json().userDetails[0].postalCode;
                    _this.password = data.json().userDetails[0].password;
                    _this.imageURI = "http://54.79.124.187/api/uploads/" + data.json().userDetails[0].photoURL;
                    //this.imageURI=data.json().userDetails[0].photoURL;
                    //this.imageURI="http://54.79.124.187/api/uploads/"+data.json().userDetails[0].photoURL;
                    _this.basePath = "54.79.124.187/api/uploads/";
                }, function (err) {
                    console.log(err);
                });
            }
            else {
            }
        });
    };
    EditprofilePage.prototype.firstfocus = function () {
        this.navCtrl.push(ProfileinputPage, {
            type: "FIRST NAME",
            data: this.firstname
        });
    };
    EditprofilePage.prototype.lastfocus = function () {
        this.navCtrl.push(ProfileinputPage, {
            type: "LAST NAME",
            data: this.lastname
        });
    };
    EditprofilePage.prototype.mobilefocus = function () {
        // this.navCtrl.push(ProfileinputPage,{
        //    type: "MOBILE NUMBER"
        //  })
        this.showDevelopment("Under Development");
    };
    EditprofilePage.prototype.emailfocus = function () {
        // this.navCtrl.push(ProfileinputPage,{
        //   type: "EMAIL"
        // })
        this.showDevelopment("Under Development");
    };
    EditprofilePage.prototype.passwordfocus = function () {
        //  this.navCtrl.push(ProfileinputPage,{
        //   type: "PASSWORD"
        // })
        //this.showDevelopment("Under Development");
        this.navCtrl.push('ChangePasswordPage');
    };
    EditprofilePage.prototype.postalfocus = function () {
        this.navCtrl.push(ProfileinputPage, {
            type: "POSTAL CODE",
            data: this.postalcode
        });
    };
    EditprofilePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    EditprofilePage.prototype.getImage = function () {
        var _this = this;
        console.log("take photo");
        var options = {
            quality: 50,
            targetHeight: 800,
            targetWidth: 800,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
            _this.profilePic.push(imageData);
            _this.uploadProfileImage();
        });
        // this.profileprovider.ChangeProfile(this.email, this.phonenumber, this.password, this.firstname, this.lastname, filename, this.postalcode).subscribe(
        //   data=>{
        //     alert("success update");
        //     this.navCtrl.popTo(EditprofilePage);
        //   },err =>{
        //     alert("error");
        //   });
    };
    EditprofilePage.prototype.uploadProfileImage = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.storage.get('userId').then(function (userId) {
            if (userId != null) {
                _this.loading.present();
                _this.Profiledata = _this.profileprovider.uploadProfilePic(userId, _this.profilePic).subscribe(function (data) {
                    _this.loading.dismiss();
                    console.log(data.json());
                    if (data.json().msg == "success") {
                        _this.showToast(data.json().msg_details, "true");
                    }
                    if (data.json().msg == "error") {
                        _this.showToast(data.json().msg_details, "false");
                    }
                }, function (err) {
                    _this.loading.dismiss();
                    console.log(err);
                });
            }
            else {
                console.log("device id not saved");
            }
        });
    };
    /*
     Function to display toast
     msg:contain message title
    */
    EditprofilePage.prototype.showToast = function (msg, goBack) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
            if (goBack == "true") {
                _this.navCtrl.popTo(EditprofilePage_1);
            }
        });
        toast.present();
    };
    EditprofilePage.prototype.showDevelopment = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.present();
    };
    EditprofilePage = EditprofilePage_1 = __decorate([
        Component({
            selector: 'page-editprofile',
            templateUrl: 'editprofile.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ProfileProvider,
            Camera,
            LoadingController,
            ToastController,
            Device,
            Storage])
    ], EditprofilePage);
    return EditprofilePage;
    var EditprofilePage_1;
}());
export { EditprofilePage };
//# sourceMappingURL=editprofile.js.map