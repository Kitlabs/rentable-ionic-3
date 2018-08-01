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
import { AppSetting } from '../api_route';
var ChatProvider = /** @class */ (function () {
    function ChatProvider(http, af, appsetting) {
        this.http = http;
        this.af = af;
        this.appsetting = appsetting;
        this.apiUrl = this.appsetting.getApiURL();
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
    /**
     * method used to delete chat
    */
    ChatProvider.prototype.deleteChats = function (uId, reqId, itemId) {
        console.log("Call is received to delete chat");
        var deleteId = uId + "," + itemId + "," + reqId;
        console.log("Call is received to delete chat=", deleteId);
        this.af.object('chats/' + deleteId).remove();
    };
    ChatProvider.prototype.getChatRef = function (uId, reqId, itemId) {
        var _this = this;
        console.log(reqId + " reqId");
        var firstRef = this.af.object("/chats/" + uId + "," + itemId + "," + reqId, { preserveSnapshot: true });
        var promise = new Promise(function (resolve, reject) {
            firstRef.subscribe(function (snapshot) {
                var a = snapshot.exists();
                if (a) {
                    resolve("/chats/" + uId + "," + itemId + "," + reqId);
                }
                else {
                    var secondRef = _this.af.object("/chats/" + reqId + "," + itemId + "," + uId, { preserveSnapshot: true });
                    secondRef.subscribe(function (snapshot) {
                        var b = snapshot.exists();
                        if (!b) {
                            //no need 
                            //this.addChats(uid,interlocutor);
                        }
                    });
                    resolve("/chats/" + reqId + "," + itemId + "," + uId);
                }
            });
        });
        /* let firstRef = this.af.object(`/chats/${uid},${interlocutor}`, {preserveSnapshot:true});
         let promise = new Promise((resolve, reject) => {
           firstRef.subscribe(snapshot => {
             let a = snapshot.exists();
             if(a) {
                 resolve(`/chats/${uid},${interlocutor}`);
             } else {
               let secondRef = this.af.object(`/chats/${interlocutor},${uid}`, {preserveSnapshot:true});
               secondRef.subscribe(snapshot => {
                 let b = snapshot.exists();
                 if(!b) {
                     //no need
                      //this.addChats(uid,interlocutor);
                 }
               });
               resolve(`/chats/${interlocutor},${uid}`);
             }
             });
         });*/
        return promise;
    };
    //for normal messages
    ChatProvider.prototype.sendMessage = function (uid, interlocutor, itemid, message, type) {
        var _this = this;
        console.log("sending messages");
        this.getChatRef(uid, interlocutor, itemid)
            .then(function (chatRef) {
            console.log(chatRef);
            _this.af.list(chatRef).push({
                from: uid,
                message: message,
                type: type,
                time: Date()
            }).then(function () {
                // message is sent
                console.log("message has been sent successfully");
            }).catch(function () {
                // some error. maybe firebase is unreachable
                console.log("firebase unrechable");
            });
        });
    };
    //for normal messages
    ChatProvider.prototype.sendMessageRental = function (uid, interlocutor, itemid, type, ownermsg, rentermsg) {
        var _this = this;
        console.log("sending messages");
        this.getChatRef(uid, interlocutor, itemid)
            .then(function (chatRef) {
            console.log(chatRef);
            _this.af.list(chatRef).push({
                from: uid,
                ownermsg: ownermsg,
                rentermsg: rentermsg,
                type: type,
                time: Date()
            }).then(function () {
                // message is sent
                console.log("message has been sent successfully");
            }).catch(function () {
                // some error. maybe firebase is unreachable
                console.log("firebase unrechable");
            });
        });
    };
    /**
     * Method to send notifcation on message success
     * {"action":"UserListPushNotifications","FromId":"93","ToId":"91"}
     */
    ChatProvider.prototype.sendMessageNotification = function (fromId, toId) {
        var body = {
            action: 'UserListPushNotifications',
            FromId: fromId,
            ToId: toId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to update message as read
     * {"action":"UpdateChatIsRead","FromId":"93","ToId":"91","PostId":"268","IsRead":"1"}
     */
    ChatProvider.prototype.markReadMessage = function (fromId, toId, postId) {
        console.log("Mark all messages as read");
        var body = {
            action: 'UpdateChatIsRead',
            FromId: fromId,
            ToId: toId,
            PostId: postId,
            IsRead: "1"
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to mark message as unread
     * {"action":"InsertChatIsRead","FromId":"93","ToId":"91","PostId":"268","IsRead":"0"}
     */
    ChatProvider.prototype.markMessageAsUnread = function (fromId, toId, postId) {
        var body = {
            action: 'InsertChatIsRead',
            FromId: fromId,
            ToId: toId,
            PostId: postId,
            IsRead: "0"
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    ChatProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireDatabase, AppSetting])
    ], ChatProvider);
    return ChatProvider;
}());
export { ChatProvider };
//# sourceMappingURL=chat.js.map