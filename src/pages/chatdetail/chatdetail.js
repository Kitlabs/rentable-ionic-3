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
import { NavController, NavParams, Navbar, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Details } from '../details/details';
import { ChatPage } from '../chat/chat';
/*
  Generated class for the ChatdetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ChatdetailPage = /** @class */ (function () {
    function ChatdetailPage(navCtrl, navParams, af, chatprovider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.chatprovider = chatprovider;
        this.otherprofile = OtherprofilePage;
        this.details = Details;
        this.chat = ChatPage;
        this.Chatdetail = {
            img: 'assets/img/11.png', ownerimage: 'assets/img/profile-img.png', item_title: 'house', price: '25'
        };
        var uid = this.navParams.get('uid');
        // chatprovider.getChatRef(this.uid, this.interlocutor)
        // .then((chatRef:any)=>{
        //   this.chats = this.af.list(chatRef);
        // });
    }
    ChatdetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ChatdetailPagePage');
        this.navBar.backButtonClick = function () {
            _this.navCtrl.setRoot(ChatPage);
        };
    };
    ChatdetailPage.prototype.ionViewDidEnter = function () {
        this.content.scrollToBottom();
    };
    ChatdetailPage.prototype.sendMessage = function () {
        if (this.message) {
            var chat = {
                from: this.uid,
                message: this.message,
                type: 'message',
                time: Date()
            };
            this.chats.push(chat);
            this.message = "";
        }
    };
    ;
    ChatdetailPage.prototype.switchEmojiPicker = function () {
    };
    ChatdetailPage.prototype.onFocus = function () {
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], ChatdetailPage.prototype, "navBar", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ChatdetailPage.prototype, "content", void 0);
    ChatdetailPage = __decorate([
        Component({
            selector: 'page-chatdetail',
            templateUrl: 'chatdetail.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AngularFireDatabase, ChatProvider])
    ], ChatdetailPage);
    return ChatdetailPage;
}());
export { ChatdetailPage };
//# sourceMappingURL=chatdetail.js.map