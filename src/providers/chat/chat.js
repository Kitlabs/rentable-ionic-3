var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var ChatProvider = /** @class */ (function () {
    function ChatProvider(http, af) {
        this.http = http;
        this.af = af;
        console.log('Hello ChatProvider Provider');
    }
    ChatProvider.prototype.getChats = function () {
        var uid = localStorage.getItem(uid);
        var chats = this.af.list("/users/" + uid + "/chats");
        return chats;
    };
    // Add Chat References to Both users
    ChatProvider.prototype.addChats = function (uid, interlocutor) {
        // First User
        var endpoint = this.af.object("/users/" + uid + "/chats/" + interlocutor);
        endpoint.set(true);
        // Second User
        var endpoint2 = this.af.object("/users/" + interlocutor + "/chats/" + uid);
        endpoint2.set(true);
    };
    ChatProvider.prototype.getChatRef = function (uid, interlocutor) {
        var _this = this;
        console.log(interlocutor + " interlocutor");
        var firstRef = this.af.object("/chats/" + uid + "," + interlocutor, { preserveSnapshot: true });
        var promise = new Promise(function (resolve, reject) {
            firstRef.subscribe(function (snapshot) {
                var a = snapshot.exists();
                if (a) {
                    resolve("/chats/" + uid + "," + interlocutor);
                }
                else {
                    var secondRef = _this.af.object("/chats/" + interlocutor + "," + uid, { preserveSnapshot: true });
                    secondRef.subscribe(function (snapshot) {
                        var b = snapshot.exists();
                        if (!b) {
                            _this.addChats(uid, interlocutor);
                        }
                    });
                    resolve("/chats/" + interlocutor + "," + uid);
                }
            });
        });
        return promise;
    };
    ChatProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireDatabase])
    ], ChatProvider);
    return ChatProvider;
}());
export { ChatProvider };
//# sourceMappingURL=chat.js.map