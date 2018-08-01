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
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { AngularFireAuth } from 'angularfire2/auth';
import { EditprofilePage } from '../editprofile/editprofile';
import { Home } from '../home/home';
import { About } from '../about/about';
import { FeedbackPage } from '../feedback/feedback';
import { LandingPage } from '../landing/landing';
import { MyStats } from '../myitem/myitem';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
import { TcPage } from '../tc/tc';
import { ContactPage } from '../contact/contact';
import { AppRate } from '@ionic-native/app-rate';
var Profile = /** @class */ (function () {
    function Profile(navCtrl, navParams, afAuth, authprovier, loadingCtrl, storage, plt, appRate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.authprovier = authprovier;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.plt = plt;
        this.appRate = appRate;
        //addpayment=AddpaymentPage;
        this.addpayment = 'PaymentSettingPage';
        this.editprofile = EditprofilePage;
        this.contactPage = ContactPage;
        this.home = Home;
        this.about = About;
        this.feedback = FeedbackPage;
        this.logout = LandingPage;
        this.mystats = MyStats;
        console.log("it is constructor");
        this.profile = {
            img: 'assets/img/profile-img.png', name: 'John Doe', address: 'Sydney Australia', rate: '4.5', rent_nuber: '10', owner_number: '20'
        };
        this.tc = TcPage;
        this.helpSupportPage = 'HelpSupportPage';
    }
    Profile.prototype.ionViewDidLoad = function () {
        this.getUserDetails();
    };
    Profile.prototype.goToWalkThrough = function () {
        this.navCtrl.push('WalkthroughPage', {
            type: 'profile'
        });
    };
    //method to get user details
    Profile.prototype.getUserDetails = function () {
        // this.loading=this.loadingCtrl.create({
        //    spinner:'bubbles',
        //    content:`Please wait..`
        //  });
        var _this = this;
        //  this.loading.present();
        console.log("get user details");
        this.storage.get('userId').then(function (data) {
            _this.userId = data;
            _this.authprovier.getUserDetail(_this.userId).subscribe(function (data) {
                console.log(data.json());
                _this.userInfo = data.json().userDetails;
                _this.name = _this.userInfo[0].firstName + " " + _this.userInfo[0].lastName;
                _this.profilePic = data.json().base_path + _this.userInfo[0].photoURL;
                console.log(_this.profilePic);
            }, function (err) {
                // this.loading.dismiss();
                console.log();
            }, function () {
                // this.loading.dismiss();
            });
        }); //end of storage
    };
    Profile.prototype.focusInput = function (input) {
        input.disabled = !input.disabled;
        if (!input.disabled) {
            input.setFocus();
            Keyboard.show(); // Android Mobiles
        }
    };
    Profile.prototype.gohome = function () {
        this.navCtrl.setRoot(Home);
    };
    Profile.prototype.gologout = function () {
        //this.afAuth.auth.signOut();
        //TabPage.exit();
        this.storage.set("userId", null);
        this.navCtrl.setRoot(LandingPage);
    };
    Profile.prototype.RateApp = function () {
        if (this.plt.is('cordova')) {
            if (this.plt.is('android')) {
                this.appRate.preferences = {
                    storeAppURL: {
                        android: 'market://details?id=com.patrick.rental2',
                    }
                };
            }
            else {
                this.appRate.preferences = {
                    storeAppURL: {
                        ios: '123456',
                    }
                };
            }
            if (this.appRate.preferences != null) {
                this.appRate.promptForRating(true);
            }
        }
    };
    Profile = __decorate([
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireAuth,
            AuthenticateProvider,
            LoadingController,
            Storage,
            Platform,
            AppRate])
    ], Profile);
    return Profile;
}());
export { Profile };
//# sourceMappingURL=profile.js.map