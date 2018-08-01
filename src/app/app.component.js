var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { Platform, Events, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Keyboard } from 'ionic-native';
import { FCM } from "@ionic-native/fcm";
import { Storage } from '@ionic/storage';
import { TabPage } from '../pages/tab/tab';
import { LandingPage } from '../pages/landing/landing';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { Badge } from '@ionic-native/badge';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, storage, authProvider, toastCtrl, events, alertCtrl, fcm, ev, badge) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this.storage = storage;
        this.authProvider = authProvider;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.ev = ev;
        this.badge = badge;
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        function keyboardShowHandler(e) {
            this.keyboard.show();
        }
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            statusBar.backgroundColorByHexString('#002039');
            Keyboard.hideKeyboardAccessoryBar(false);
            _this.badge.clear();
            _this.registerNotification();
            _this.showLogInOrWalkScreen();
        });
    }
    MyApp.prototype.showLogInOrWalkScreen = function () {
        var _this = this;
        this.checkWheatherUserLogInOrNot().then(function (id) {
            if (id != null) {
                _this.authProvider.getUserDetail(id).subscribe(function (data) {
                    if (data.json().msg == 'success') {
                        _this.storage.set("CARD_STATUS", data.json().cardstatus);
                        _this.storage.set("USER_CHATTING_STATUS", 0);
                        _this.events.publish('CARDSTATUS', data.json().cardstatus);
                        _this.rootPage = TabPage;
                    }
                    else {
                        _this.sendFcmToken(id);
                        _this.setWalkThrouhgh();
                    }
                }, function (err) {
                    _this.setWalkThrouhgh();
                });
            }
            else {
                _this.setWalkThrouhgh();
            }
        });
    };
    MyApp.prototype.setWalkThrouhgh = function () {
        // /this.rootPage='WalkthroughPage';
        var _this = this;
        this.getWalkthroughStatus().then(function (data) {
            if (data != null) {
                //dont show walk through
                _this.rootPage = LandingPage;
            }
            else {
                //show walkthrough
                _this.rootPage = 'WalkthroughPage';
            }
        });
    };
    /*
    Method to check whether user log in or not
    */
    MyApp.prototype.checkWheatherUserLogInOrNot = function () {
        return this.storage.get('userId').then(function (data) {
            if (data != null) {
                return data;
            }
            else {
                return data;
            }
        });
    };
    /*
      Method to check whether to show walk through or not
      */
    MyApp.prototype.getWalkthroughStatus = function () {
        return this.storage.get('walkthrough').then(function (data) {
            return data;
        });
    };
    /*
     Method to register and handling the firebase push notification
    */
    MyApp.prototype.registerNotification = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.fcm.onNotification().subscribe(function (data) {
                // this.displayToast("message outside");  
                alert(JSON.stringify(data));
                console.log('datat' + data);
                if (data.wasTapped) {
                    console.log("Received in background");
                    _this.storage.get('counter').then(function (data) {
                        if (data != null) {
                            var count = data + 1;
                            _this.storage.set('counter', count);
                        }
                        else {
                            _this.storage.set('counter', 1);
                        }
                    });
                }
                else {
                    console.log("Received in foreground");
                    alert(JSON.stringify(data));
                    // this.presentConfirm("d",data);
                    _this.badge.clear();
                    if (data.aps.alert.title == "Message!") {
                        _this.events.publish('messageCount', 0);
                    }
                    else {
                        _this.events.publish('rentalCount', 0);
                        _this.presentConfirm(data.aps.alert.title, data.aps.alert.body);
                    }
                }
                ;
            });
        }
    };
    MyApp.prototype.getBadges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var badgeAmount, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.badge.get()];
                    case 1:
                        badgeAmount = _a.sent();
                        console.log(badgeAmount);
                        //this.increaseBadges(badgeAmount);
                        this.badge.set(10);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.increaseBadges = function (badgeNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    //let badge = await this.badge.increase(Number(badgeNumber));
                    this.badge.set(Number(badgeNumber) + 1);
                    // console.log(badge);
                }
                catch (e) {
                    console.error(e);
                }
                return [2 /*return*/];
            });
        });
    };
    /*
    Function to register token with user Id and device type
    */
    MyApp.prototype.sendFcmToken = function (userId) {
        var _this = this;
        if (this.platform.is('cordova')) {
            // You are on a device, cordova plugins are accessible
            this.fcm.getToken().then(function (token) {
                _this.authProvider.updateDeviceToken(userId, token);
                _this.storage.set("fcmtoken", token);
            });
            this.fcm.onTokenRefresh().subscribe(function (token) {
                _this.checkWheatherUserLogInOrNot().then(function (data) {
                    _this.storage.set("fcmtoken", token);
                    _this.authProvider.updateDeviceToken(data, token);
                });
            });
        }
        else {
            // Cordova not accessible, add mock data if necessary
            console.log("On Browser");
        }
    };
    MyApp.prototype.displayNotifcation = function () {
        //{"someId":"111","aps":{"badge":1,"alert":{"title":"Congratulations!","body":"Your request for the item has been approved by the item owner."}},"gcm.message_id":"0:1522336713699987%7899633578996335"}
        // if (this.platform.is('cordova')) {
        console.log(this.notificationTitle);
        console.log(this.notificationBody);
        this.ev.publish('message', 1);
        // Schedule a single notification
        // this.localNotification.schedule({
        //   id: 1,
        //   title:this.notificationTitle,  
        //   text: this.notificationBody,
        // });
        //   //code to handle when user click on local notification
        //   this.localNotification.on('click',(notification,state)=>{
        //   /*
        //     $title = "Congratulations!";
        //     $title = "Reject!";
        //     $title = "Cancel!";
        //     $title = "PickUp!";
        //     $title = "Return!";*/
        //     $title = "PickedUp Status!"
        //     switch (notification.title) {
        //       case "Congratulations!":
        //         this.ev.publish('message',1);
        //         break;
        //       case "Reject!":
        //         this.ev.publish('message',1);
        //         break;
        //         case "Cancel!":
        //         this.ev.publish('message',1);
        //         break;
        //         case "PickUp!":
        //         this.ev.publish('message',1);
        //         break;
        //         case "Return!":
        //         this.ev.publish('message',1);
        //         break;
        //       default:
        //         // code...
        //         break;
        //     }
        //  });
    };
    MyApp.prototype.presentConfirm = function (title, message) {
        var titleKey = title;
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    /*
      Method to display toast message to user
    */
    MyApp.prototype.displayToast = function (msg) {
        //var msg=msg.aps.alert.body
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 6000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
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
            ToastController,
            Events,
            AlertController,
            FCM,
            Events,
            Badge])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map