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
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Keyboard } from 'ionic-native';
import { FCM } from "@ionic-native/fcm";
import { Storage } from '@ionic/storage';
import { TabPage } from '../pages/tab/tab';
import { LandingPage } from '../pages/landing/landing';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, storage, authProvider, fcm, ev) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this.storage = storage;
        this.authProvider = authProvider;
        this.fcm = fcm;
        this.ev = ev;
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        function keyboardShowHandler(e) {
            this.keyboard.show();
        }
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            Keyboard.hideKeyboardAccessoryBar(false);
            _this.showLogInOrHomeScreen();
            //this.rootPage=TabPage;
        });
    }
    MyApp.prototype.showLogInOrHomeScreen = function () {
        var _this = this;
        this.storage.get('userId').then(function (data) {
            if (data != null) {
                console.log("event registered");
                _this.ev.publish("message", "5");
                _this.rootPage = TabPage;
                _this.registerFcmToken(data);
            }
            else {
                _this.rootPage = LandingPage;
                //this.networkMonitoring();
            }
        });
    };
    /*
    Function to register token with user Id and device type
    */
    MyApp.prototype.registerFcmToken = function (userId) {
        var _this = this;
        if (this.platform.is('cordova')) {
            // You are on a device, cordova plugins are accessible
            this.fcm.getToken().then(function (token) {
                _this.authProvider.updateDeviceToken(userId, token);
            });
            this.fcm.onNotification().subscribe(function (data) {
                if (data.wasTapped) {
                    console.log("Received in background ");
                    //this.navCtrl.push(ChatPage);
                    _this.rootPage = TabPage;
                }
                else {
                    console.log("Received in foreground ");
                    //this.navCtrl.push(ChatPage);
                    _this.rootPage = TabPage;
                }
                ;
            });
            this.fcm.onTokenRefresh().subscribe(function (token) {
                _this.authProvider.updateDeviceToken(userId, token);
            });
        }
        else {
            // Cordova not accessible, add mock data if necessary
            console.log("On Browser");
        }
    };
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            AngularFireAuth,
            Storage,
            AuthenticateProvider,
            FCM,
            Events])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map