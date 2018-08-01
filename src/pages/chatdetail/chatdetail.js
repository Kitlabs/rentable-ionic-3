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
import { NavController, NavParams, Navbar, Content, Events, ToastController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Details } from '../details/details';
import { ChatPage } from '../chat/chat';
import { RentPage } from '../../pages/rent/rent';
import { Storage } from '@ionic/storage';
var ChatdetailPage = /** @class */ (function () {
    function ChatdetailPage(navCtrl, navParams, af, chatprovider, storage, ev, toastCtrl) {
        // this.Chatdetail ={
        //   img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', item_title:'house', price:'25'};
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.chatprovider = chatprovider;
        this.storage = storage;
        this.ev = ev;
        this.toastCtrl = toastCtrl;
        this.otherprofile = OtherprofilePage;
        this.details = Details;
        this.chat = ChatPage;
        this.interlocutor = "22";
        this.messages = [];
        this.btnSendMessage = false;
        this.chatDetail = JSON.parse(this.navParams.get('param'));
        console.log("chat details");
        console.log(this.chatDetail);
        this.uid = this.chatDetail.uid;
        this.reqUserId = this.chatDetail.reqUserId;
        this.itemId = this.chatDetail.itemId;
        this.oItemStatus = this.chatDetail.oItemStatus;
        this.rItemStatus = this.chatDetail.rItemStatus;
        this.status = this.chatDetail.status == "iown" ? true : false;
        this.req = "request";
    }
    ChatdetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("ionViewDidEnter Chat Page");
        this.storage.set("USER_CHATTING_STATUS", 1);
        this.markAllMessageAsRead();
        this.chatprovider.getChatRef(this.uid, this.reqUserId, this.itemId)
            .then(function (chatRef) {
            console.log(chatRef);
            _this.chatRef = chatRef;
            _this.chats = _this.af.list(chatRef).subscribe(function (data) {
                _this.messages = data;
                console.log(data);
                if (data.length > 0) {
                    //old
                    // if(data[data.length-1].from!=this.uid){
                    //   this.ev.publish("messageCount",1)  
                    // }
                }
            });
        });
    };
    ChatdetailPage.prototype.ionViewDidLeave = function () {
        this.storage.set("USER_CHATTING_STATUS", 0);
    };
    ChatdetailPage.prototype.sendMessage = function () {
        var _this = this;
        if (this.message) {
            this.af.list(this.chatRef).push({
                from: this.uid,
                message: this.message,
                type: 'normal',
                time: Date()
            }).then(function () {
                // message is sent
                _this.markMessageAsUnRead();
                _this.notifyReceiver();
            }).catch(function () {
                // some error. maybe firebase is unreachable
            });
            this.message = "";
        }
    };
    /**
     * Method to add message status as unread
     */
    ChatdetailPage.prototype.markMessageAsUnRead = function () {
        console.log("markMessageAsUnRead");
        this.chatprovider.markMessageAsUnread(this.uid, this.reqUserId, this.itemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     * Method to update chat as read
     */
    ChatdetailPage.prototype.markAllMessageAsRead = function () {
        console.log("Mark all messages as read");
        this.chatprovider.markReadMessage(this.reqUserId, this.uid, this.itemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     * Method to used send notifcation
     */
    ChatdetailPage.prototype.notifyReceiver = function () {
        console.log("Call is received to send message notification to user");
        this.chatprovider.sendMessageNotification(this.uid, this.reqUserId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     *
     * @param msgKey contain message Id
     * @param id  can be
     * 0: rental request
     * 1: pick request
     * 2: return request
     */
    ChatdetailPage.prototype.goToAcceptRejectPage = function (msgKey, id, msg) {
        switch (id) {
            case 0:
                this.navCtrl.push(RentPage, {
                    requesterId: this.reqUserId,
                    requestedItemId: this.itemId,
                    msgKey: msgKey,
                    chatRef: this.chatRef
                });
                break;
            case 1:
                this.navCtrl.push("ReviewPickReturnPage", {
                    requesterId: this.reqUserId,
                    requestedItemId: this.itemId,
                    msgKey: msgKey,
                    chatRef: this.chatRef,
                });
                break;
            case 2:
                var str = msg;
                if (str.includes("claim")) {
                    //open claim page ClaimownerPage
                    console.log("CLAIM PAGE");
                    this.navCtrl.push("ClaimownerPage", {
                        requesterId: this.reqUserId,
                        requestedItemId: this.itemId,
                        msgKey: msgKey,
                        chatRef: this.chatRef
                    });
                }
                else {
                    //open return review page 
                    console.log("RETURN REVIEW PAGE");
                    this.navCtrl.push("ReviewPickReturnPage", {
                        requesterId: this.reqUserId,
                        requestedItemId: this.itemId,
                        msgKey: msgKey,
                        chatRef: this.chatRef
                    });
                }
                break;
            default:
                break;
        }
    };
    /**
     * Go to the feedback screen
     * @param msgKey contain the msg unique key
     */
    ChatdetailPage.prototype.goToFeedbackScreen = function (msgKey) {
        this.navCtrl.push("FeedbackPage", {
            requestedItemId: this.itemId,
            itemOwnerId: this.reqUserId,
            msgKey: msgKey,
            chatRef: this.chatRef
        });
    };
    /**
     * reqUserId contain item owner id(in case of i rent)
     * uid contain renter id
     */
    ChatdetailPage.prototype.respondToClaim = function (msgKey, id, msg) {
        this.navCtrl.push("ClaimrenterPage", {
            requestedItemId: this.itemId,
            itemOwnerId: this.reqUserId,
            msgKey: msgKey,
            chatRef: this.chatRef
        });
    };
    ChatdetailPage.prototype.number = function () {
        if (this.message) {
            console.log("non empty");
            this.btnSendMessage = true;
        }
        else {
            console.log("empty");
            this.btnSendMessage = false;
        }
    };
    /**
     * if status true then iown
     * if status false then irent
     */
    ChatdetailPage.prototype.goToItemDetail = function () {
        if (this.status == true) {
            if (this.oItemStatus == "available") {
                if (this.rItemStatus) {
                    this.navCtrl.push("OwnPostDetailPage", {
                        itemId: this.chatDetail.itemId,
                        renterId: this.chatDetail.reqUserId,
                        amount: this.chatDetail.amount,
                        rentalCostWithoutFee: this.chatDetail.rentalCostWithoutFee,
                        rentableServiceFee: this.chatDetail.rentableServiceFee,
                        itemOwnerFee: this.chatDetail.itemOwnerFee,
                        fromDate: this.chatDetail.fromDate,
                        toDate: this.chatDetail.toDate,
                        status: this.chatDetail.rItemStatus
                    });
                }
                else {
                    console.log("item status null");
                    this.navCtrl.push("OwnPostDetailPage", {
                        status: 'Available',
                        itemId: this.itemId,
                    });
                }
            }
            if (this.oItemStatus == "Deleted") {
                //item has been deleted by owner
                this.showToast("Item doesn't exist");
            }
        }
        if (this.status == false) {
            console.log("I RENT");
            if (this.oItemStatus == "available") {
                if (this.rItemStatus) {
                    console.log("data=" + this.rItemStatus);
                    if (this.rItemStatus == 'Pending' || this.rItemStatus == 'Rented' || this.rItemStatus == 'PickedUp' || this.rItemStatus == 'Returned') {
                        this.navCtrl.push("DetailsRentPage", {
                            itemId: this.chatDetail.itemId,
                            amount: this.chatDetail.amount,
                            rentalCostWithoutFee: this.chatDetail.rentalCostWithoutFee,
                            rentableServiceFee: this.chatDetail.rentableServiceFee,
                            itemOwnerFee: this.chatDetail.itemOwnerFee,
                            fromDate: this.chatDetail.fromDate,
                            toDate: this.chatDetail.toDate,
                            status: this.chatDetail.rItemStatus
                        });
                    }
                    else {
                        //in cancel and rejected case open the details screen
                        this.navCtrl.push(Details, {
                            itemId: this.chatDetail.itemId
                        });
                    }
                }
                else {
                    console.log("item status null");
                    this.navCtrl.push(Details, {
                        itemId: this.chatDetail.itemId
                    });
                }
            }
            if (this.oItemStatus == "Deleted") {
                //item has been deleted by owner
                this.showToast("Item doesn't exist");
            }
        }
    };
    ChatdetailPage.prototype.goToUserDetail = function () {
        this.navCtrl.push(OtherprofilePage, {
            userId: this.reqUserId
        });
    };
    ChatdetailPage.prototype.switchEmojiPicker = function () {
    };
    ChatdetailPage.prototype.scrollToBottom = function () {
        console.log("SCROLL TO BOTTOM");
        this.content.scrollToBottom(); //300ms animation speed
    };
    ChatdetailPage.prototype.onFocus = function () {
    };
    ChatdetailPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: "top"
        });
        toast.present(toast);
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
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFireDatabase,
            ChatProvider,
            Storage,
            Events,
            ToastController])
    ], ChatdetailPage);
    return ChatdetailPage;
}());
export { ChatdetailPage };
//# sourceMappingURL=chatdetail.js.map