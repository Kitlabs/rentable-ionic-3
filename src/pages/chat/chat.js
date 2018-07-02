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
import { NavController, NavParams, Events } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { ChatdetailPage } from '../chatdetail/chatdetail';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
import { RentPage } from '../../pages/rent/rent';
import { Storage } from '@ionic/storage';
var ChatPage = /** @class */ (function () {
    function ChatPage(navCtrl, navParams, itemprovider, authprovider, chatprovider, af, ev, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemprovider = itemprovider;
        this.authprovider = authprovider;
        this.chatprovider = chatprovider;
        this.af = af;
        this.ev = ev;
        this.storage = storage;
        this.chatdetails = ChatdetailPage;
        this.own_rent = "own";
        this.rentalRequestList = [];
        /* this.onelist =
         [
             {img: 'assets/img/11.png', title: 'John', item_title:'house', history:'2 days ago'},
             {img: 'assets/img/22.png', title: 'sizza', item_title:'apple', history:'3 days ago'},
             {img: 'assets/img/33.png', title: 'jonathan', item_title:'nut', history:'3 days ago'},
             {img: 'assets/img/11.png', title: 'Josh', item_title:'pear', history:'5 days ago'},
             {img: 'assets/img/11.png', title: 'Joseph', item_title:'TV', history:'9 days ago'}
         ]
     
         this.chatlist=[];
     
         this.uid=localStorage.getItem('uid');
         this.chatprovider.getChats()
         .subscribe(chats => {
           this.chatlist = chats.map(users => {
             return users.map(user => {
               user.info = this.af.object(`/users/${user.$key}`);
               console.log(" user infor ",user );
               return user;
             });
           });
         });
     
         this.rentlist =
         [
           {img: 'assets/img/22.png', title: 'John', item_title:'house', history:'2 days ago'},
           {img: 'assets/img/33.png', title: 'Jane', item_title:'apple', history:'4 days ago'},
           {img: 'assets/img/11.png', title: 'Eric', item_title:'nut', history:'6 days ago'},
           {img: 'assets/img/22.png', title: 'Joseph', item_title:'pear', history:'7 days ago'},
           {img: 'assets/img/33.png', title: 'Joans', item_title:'TV', history:'8 days ago'}
         ]
         
         this.itemprovider.Getchatitems(localStorage.getItem('uid')).subscribe(data =>{
           console.log();
         },err=>{
           console.log();
         })
     
         this.itemdelete=false;*/
        this.availableListNotFound = false;
        this.basePath = "http://54.79.124.187/api/uploads/";
    }
    ChatPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.ev.publish("message", "");
        console.log("ionViewDidEnter");
        this.storage.get('userId').then(function (id) {
            _this.uid = id;
            _this.itemprovider.getRentalRequest(id).subscribe(function (data) {
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.rentalRequestList = data.json().PostData;
                }
            }, function (err) {
                console.log("error");
            });
        }); //end of storage
    };
    ChatPage.prototype.goToAcceptRejectPage = function (requesterId, requestedItemId) {
        this.navCtrl.push(RentPage, {
            requesterId: requesterId,
            requestedItemId: requestedItemId
        });
    };
    ChatPage.prototype.delete = function () {
        this.itemdelete = !this.itemdelete;
    };
    ChatPage.prototype.deleteown = function (n) {
        console.log('n ++', n);
        /*for (var i = 0; i <this.onelist.length; i++) {
          if(this.onelist[i]==n){
            this.onelist.splice(i, 1);
          }
        }*/
    };
    ChatPage.prototype.deleterent = function (n) {
        console.log('n ++', n);
        /*for (var i = 0; i <this.rentlist.length; i++) {
          if(this.rentlist[i]==n){
            this.rentlist.splice(i, 1);
          }
        }*/
    };
    ChatPage.prototype.chatdetail = function (key) {
        /*let param = {uid: this.uid, interlocutor: key};
        if (this.itemdelete==false) {
          this.navCtrl.push(ChatdetailPage, param);
        }*/
    };
    ChatPage = __decorate([
        Component({
            selector: 'page-chat',
            templateUrl: 'chat.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemsProvider,
            AuthenticateProvider,
            ChatProvider,
            AngularFireDatabase,
            Events,
            Storage])
    ], ChatPage);
    return ChatPage;
}());
export { ChatPage };
//# sourceMappingURL=chat.js.map