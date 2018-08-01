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
import { NavController, IonicPage, NavParams, Navbar, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PaymentProvider } from '../../providers/payment/payment';
import { ProfileProvider } from '../../providers/payment/profile';
import { Home } from '../home/home';
import { RejectPage } from '../reject/reject';
import { AcceptPage } from '../accept/accept';
import { Details } from '../details/details';
import { ItemsProvider } from '../../providers/items/items';
import { ChatProvider } from '../../providers/chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
var ReviewPickReturnPage = /** @class */ (function () {
    function ReviewPickReturnPage(navCtrl, navParams, storage, itemprovider, toastCtrl, profileProvider, paymentProvider, loadingCtrl, alertCtrl, af, chatProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.itemprovider = itemprovider;
        this.toastCtrl = toastCtrl;
        this.profileProvider = profileProvider;
        this.paymentProvider = paymentProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.af = af;
        this.chatProvider = chatProvider;
        this.home = Home;
        this.accept = AcceptPage;
        this.rentreject = RejectPage;
        this.detail = Details;
        this.condition = [0, 1, 2, 3, 4];
        this.commentFromRenterStatus = false;
        this.returnSectionStatus = true;
        this.goodcondition = [];
        this.chargeData = [];
        for (var i = 0; i < 3; ++i) {
            this.goodcondition[i] = true;
        }
        for (var i = 3; i < 5; ++i) {
            this.goodcondition[i] = false;
        }
        this.Product = {
            img: 'assets/img/11.png', ownerimage: 'assets/img/profile-img.png', ownername: 'John', item_title: 'house', price: '25', description: 'this is good rentalable book', selectdate: '19/7/2017', total_cost: '100'
        };
        this.renter = {
            img: 'assets/img/profile-img.png', name: 'John', address: 'Sydney Australia', rate: '4.5', rent_nuber: '10', owner_number: '20'
        };
        this.rentalRequestDetails = [];
        this.authData = [];
        //overall rating given to user
        this.userRatingNeg = [];
        this.userRatingPos = [];
        //pick up rating
        this.renterItemRatingNeg = [];
        this.renterItemRatingPos = [];
        //rating given by owner
        this.ownerItemRatingPos = [];
        this.ownerItemRatingNeg = [];
        //pick up rating
        this.pickUpRatingPos = [];
        this.pickUpRatingNeg = [];
        //return rating
        this.returnRatingPos = [];
        this.returnRatingNeg = [];
        this.requesterId = this.navParams.get("requesterId");
        this.requestedItemId = this.navParams.get("requestedItemId");
        this.msgKey = this.navParams.get("msgKey");
        this.chatRef = this.navParams.get("chatRef");
        this.pickOrReturn = this.navParams.get("pickOrReturn");
    }
    ReviewPickReturnPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ReviewPickReturnPage');
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.getUserRating(this.requesterId);
        this.storage.get('userId').then(function (id) {
            _this.userId = id;
            _this.itemprovider.getPickUpAndReturnRating(_this.requesterId, _this.requestedItemId).subscribe(function (data) {
                console.log(data.json());
                loading.dismiss();
                if (data.json().msg == "success") {
                    _this.rentalRequestDetails = data.json().data[0];
                    var fromDateStr = _this.rentalRequestDetails.FromDate;
                    var toDateStr = _this.rentalRequestDetails.ToDate;
                    var fromDateRes = fromDateStr.split("-");
                    var toDateRes = toDateStr.split("-");
                    _this.fromDate = fromDateRes[2] + "/" + fromDateRes[1] + "/" + fromDateRes[0].slice(2);
                    _this.toDate = toDateRes[2] + "/" + toDateRes[1] + "/" + toDateRes[0].slice(2);
                    _this.basePath = _this.rentalRequestDetails.base_path;
                    _this.priceBreakDown();
                    //Rating given by owner to item while posting
                    for (var i = 0; i < _this.rentalRequestDetails.currentcondition; i++) {
                        _this.ownerItemRatingPos[i] = i;
                    }
                    for (var j = 0; j < 5 - _this.rentalRequestDetails.currentcondition; j++) {
                        _this.ownerItemRatingNeg[j] = j;
                    }
                    //Rating given by renter during picked
                    if (_this.rentalRequestDetails.Status == "PickedUpPending") {
                        _this.status = true;
                        _this.titleOne = "THIS IS THE ITEMS CONDITION WHEN POSTED";
                        _this.titleTwo = "THIS IS THE ITEMS CONDITION WHEN PICKED UP";
                        _this.title = "pick up";
                        _this.returnSectionStatus = true;
                        _this.setPickUpRating();
                        if (_this.rentalRequestDetails.PickupComment) {
                            _this.commentFromRenterStatus = true;
                            _this.renterComment = _this.rentalRequestDetails.PickupComment;
                        }
                    }
                    //Rating given by renter during returned
                    if (_this.rentalRequestDetails.Status == "ReturnedPending") {
                        _this.status = false;
                        _this.titleOne = "THIS IS THE ITEMS CONDITION WHEN RENTED";
                        _this.titleTwo = "THIS IS THE ITEMS CONDITION WHEN RETURNED";
                        _this.title = "return";
                        _this.pickReturnRatingStatus = _this.rentalRequestDetails.PickupRating == _this.rentalRequestDetails.ReturnRating ? true : false;
                        _this.setPickUpAndReturnRating();
                        //Both party didn't agree
                        if (_this.rentalRequestDetails.ReturnBothPartyAgree == 1) {
                            _this.returnSectionStatus = false;
                            _this.info = "Both parties did not agree with the product conditions.";
                        }
                        else {
                            _this.info = _this.pickReturnRatingStatus ? "stars conditions are the same" : "stars conditions are NOT the same";
                        }
                        if (_this.rentalRequestDetails.ReturnComment) {
                            console.log("comment has given by renter");
                            _this.commentFromRenterStatus = true;
                            _this.renterComment = _this.rentalRequestDetails.ReturnComment;
                        }
                        else {
                            console.log("comment not given by renter");
                        }
                    }
                }
                else {
                    _this.navCtrl.pop();
                }
            }, function (err) {
                loading.dismiss();
                _this.navCtrl.pop();
                console.log("error");
            });
        }); //end of storage
    };
    /**
     * Function to set pick up rating only
     */
    ReviewPickReturnPage.prototype.setPickUpRating = function () {
        for (var i = 0; i < this.rentalRequestDetails.PickupRating; i++) {
            this.renterItemRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - this.rentalRequestDetails.PickupRating; j++) {
            this.renterItemRatingNeg[j] = j;
        }
    };
    /**
     * Function to set pick and return rating
     */
    ReviewPickReturnPage.prototype.setPickUpAndReturnRating = function () {
        for (var i = 0; i < this.rentalRequestDetails.PickupRating; i++) {
            this.pickUpRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - this.rentalRequestDetails.PickupRating; j++) {
            this.pickUpRatingNeg[j] = j;
        }
        for (var i = 0; i < this.rentalRequestDetails.ReturnRating; i++) {
            this.returnRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - this.rentalRequestDetails.ReturnRating; j++) {
            this.returnRatingNeg[j] = j;
        }
    };
    /*
    Function to set user rating
    */
    ReviewPickReturnPage.prototype.getUserRating = function (userId) {
        var _this = this;
        var rating;
        //product rating
        this.profileProvider.getRating(userId).subscribe(function (data) {
            rating = data.json().AverageRating;
            console.log(rating);
            if (data.json().msg == "success") {
                if (rating > 0 && rating < 1) {
                    rating = 0;
                }
                if (rating >= 1 && rating < 2) {
                    rating = 1;
                }
                if (rating >= 2 && rating < 3) {
                    rating = 2;
                }
                if (rating >= 3 && rating < 4) {
                    rating = 3;
                }
                if (rating >= 4 && rating < 5) {
                    rating = 4;
                }
                if (rating >= 5) {
                    rating = 5;
                }
                console.log("Rating=", rating);
                for (var i = 0; i < rating; i++) {
                    _this.userRatingPos[i] = i;
                }
                for (var j = 0; j < 5 - rating; j++) {
                    _this.userRatingNeg[j] = j;
                }
            }
        }, function (err) {
        });
    };
    ReviewPickReturnPage.prototype.backdetail = function () {
        this.navCtrl.pop();
    };
    ReviewPickReturnPage.prototype.priceBreakDown = function () {
        //delivery fee not applied
        if (this.rentalRequestDetails.needDelivery == 0) {
            this.toolTip = "Rental Cost = $" + this.rentalRequestDetails.rentalCostWithoutFee + "                   Service Fee = $" + this.rentalRequestDetails.rentableServiceFee;
        }
        else {
            //delivery fee applied
            this.toolTip = "Rental Cost = $" + this.rentalRequestDetails.rentalCostWithoutFee + "                    Service Fee = $" + this.rentalRequestDetails.rentableServiceFee + "                      Delivery Fee = $" + this.rentalRequestDetails.deliveryfee;
        }
    };
    /*
      navigate to reject request page
    */
    ReviewPickReturnPage.prototype.goToRejectRequest = function () {
        if (this.status == true) {
            this.rejectPickupRequest();
        }
        if (this.status == false) {
            this.rejectReturnRequest();
        }
    };
    /*
      navigate to accept request page
      true:pick
      false:return
    */
    ReviewPickReturnPage.prototype.goToAcceptRequest = function () {
        if (this.status == true) {
            this.acceptPickRequest();
        }
        if (this.status == false) {
            this.acceptReturnRequest();
        }
    };
    /**
     * ACCEPT RETURN REQUEST
    */
    ReviewPickReturnPage.prototype.acceptReturnRequest = function () {
        var ownerMsg, renterMsg;
        //both parties cannot agree with the product conditions
        if (this.rentalRequestDetails.ReturnBothPartyAgree == 1) {
            console.log("Both party didn't agreee");
            ownerMsg = "Both parties did not agree with the product conditions. To make a claim click here.";
            renterMsg = "Product Returned. Both parties did not agree with the product conditions.";
            this.authorizeSecurityDepositAndAcceptReturnRequest(ownerMsg, renterMsg);
        }
        else {
            //stars conditions are the same
            if (this.pickReturnRatingStatus) {
                ownerMsg = "Product returned";
                renterMsg = "Product returned";
                this.acceptReturnRequestWithoutAuthorizeSecurityDeposit(ownerMsg, renterMsg);
            }
            else {
                //stars conditions are NOT the same
                ownerMsg = "Product returned in different conditions when rented. To make a claim click here";
                renterMsg = "Product returned in different conditions when rented";
                this.authorizeSecurityDepositAndAcceptReturnRequest(ownerMsg, renterMsg);
            }
        }
    };
    /**
     * Accept return request without authorizing the security deposit
     * @param ownerMsg contain message for item owner
     * @param renterMsg contain message for item renter
     */
    ReviewPickReturnPage.prototype.acceptReturnRequestWithoutAuthorizeSecurityDeposit = function (ownerMsg, renterMsg) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.itemprovider.acceptRejectReturnRating(this.requesterId, this.requestedItemId, 3).subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data);
            if (data.json().msg == "success") {
                //updating previous chat
                _this.af.list(_this.chatRef).update(_this.msgKey, {
                    type: "return_request_hide"
                });
                if (_this.pickReturnRatingStatus) {
                    _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "return_request_response", ownerMsg, renterMsg);
                    _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "feedback_show", "Give Feedback", "Give feedback");
                }
                else {
                    _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "return_request_response_claim", ownerMsg, renterMsg);
                    _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "feedback_show", "Give Feedback", "Give feedback");
                }
                _this.markMessageAsUnRead();
                _this.presentToast("Return request has been accepting successfully");
                _this.navCtrl.pop();
            }
            if (data.json().msg == "error") {
                _this.presentToast("Request already accepted ");
                _this.navCtrl.pop();
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.presentToast("Please try again later");
        });
    };
    /**
     * This method first authorize the payment and then on success accept the return request
     * @param ownerMsg contain message for item owner
     * @param renterMsg contain message for item renter
     */
    ReviewPickReturnPage.prototype.authorizeSecurityDepositAndAcceptReturnRequest = function (ownerMsg, renterMsg) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //first we need to authorize the security deposit then accepte/reject item return request
        this.paymentProvider.authorizeSecurityDeposit(this.requesterId, this.requestedItemId, this.rentalRequestDetails.securityDeposit).subscribe(function (data) {
            console.log(data.json());
            if (data.json().msg == "succeeded" || data.json().msg == "pending") {
                _this.itemprovider.acceptRejectReturnRating(_this.requesterId, _this.requestedItemId, 0).subscribe(function (data) {
                    _this.loading.dismiss();
                    console.log(data);
                    if (data.json().msg == "success") {
                        //updating previous chat
                        _this.af.list(_this.chatRef).update(_this.msgKey, {
                            type: "return_request_hide"
                        });
                        if (_this.pickReturnRatingStatus) {
                            _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "return_request_response", ownerMsg, renterMsg);
                            _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "feedback_show", "Give Feedback", "Give feedback");
                        }
                        else {
                            _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "return_request_response_claim", ownerMsg, renterMsg);
                            //this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"feedback_show","Give Feedback","Give feedback");
                        }
                        _this.markMessageAsUnRead();
                        _this.presentToast("Return request has been accepting successfully");
                        _this.navCtrl.pop();
                    }
                    if (data.json().msg == "error") {
                        _this.presentToast("Request already accepted ");
                        _this.navCtrl.pop();
                    }
                }, function (err) {
                    _this.loading.dismiss();
                    _this.presentToast("Please try again later");
                });
            }
            // called when there is payment related issue
            if (data.json().msg == "failed" || data.json().msg == "error") {
                _this.loading.dismiss();
                _this.presentAlert(data.json().msg_details);
            }
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    /**
     * REJECT RETURN REQUEST
    */
    ReviewPickReturnPage.prototype.rejectReturnRequest = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.itemprovider.acceptRejectReturnRating(this.requesterId, this.requestedItemId, 1).subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data);
            if (data.json().msg == "success") {
                _this.af.list(_this.chatRef).update(_this.msgKey, {
                    type: "return_request_hide"
                });
                _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "return_request_response", "Return request has been rejected", "Return request has been rejected");
                _this.markMessageAsUnRead();
                _this.presentToast("Return request has been rejected successfully");
                _this.navCtrl.pop();
            }
            if (data.json().msg == "error") {
                _this.presentToast("Request already accepted ");
                _this.navCtrl.pop();
            }
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    /**
     * Here we need to first charge the payment and then accept the request
    */
    ReviewPickReturnPage.prototype.acceptPickRequest = function () {
        //below field are involve in charging the payment
        //{"action":"ChargePayment","postId":"235","amount":"49","itemOwnerFee":"40","securityDeposit":"5","renterId":"60"}
        var _this = this;
        this.chargeData.postId = this.requestedItemId;
        this.chargeData.renterId = this.requesterId;
        this.chargeData.amountToCharge = this.rentalRequestDetails.Amount;
        this.chargeData.itemOwnerFee = this.rentalRequestDetails.itemOwnerFee;
        this.chargeData.securityDeposit = this.rentalRequestDetails.securityDeposit;
        this.chargeData.userId = this.userId;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //first we need to charge the payment
        this.paymentProvider.chargePayment(this.chargeData).subscribe(function (data) {
            console.log(data);
            if (data.json().msg == "succeeded" || data.json().msg == "pending") {
                //on success , call the product picked up api
                _this.itemprovider.acceptPickUpRequest(_this.requesterId, _this.requestedItemId, 0).subscribe(function (data) {
                    _this.loading.dismiss();
                    console.log(data.json());
                    if (data.json().msg == "success") {
                        _this.af.list(_this.chatRef).update(_this.msgKey, {
                            type: "pickup_request_hide"
                        });
                        //this.chatProvider.sendMessage(this.userId,this.requesterId,this.requestedItemId,"Pick request has been accepted successfully","normal")
                        _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "pickup_request_response", "Product picked up", "Product picked up");
                        _this.markMessageAsUnRead();
                        _this.presentToast("Request has been accepted successfully");
                        _this.navCtrl.pop();
                    }
                    if (data.json().msg == "error") {
                        _this.presentToast("Request already accepted");
                        _this.navCtrl.pop();
                    }
                }, function (err) {
                    _this.loading.dismiss();
                });
            }
            // called when there is payment related issue
            if (data.json().msg == "failed" || data.json().msg == "error") {
                _this.loading.dismiss();
                _this.presentAlert(data.json().msg_details);
            }
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    /**
       * Method to add message status as unread
       */
    ReviewPickReturnPage.prototype.markMessageAsUnRead = function () {
        console.log("markMessageAsUnRead");
        this.chatProvider.markMessageAsUnread(this.userId, this.requesterId, this.requestedItemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     * REJECT PICK UP REQUEST
    */
    ReviewPickReturnPage.prototype.rejectPickupRequest = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.itemprovider.acceptRejectPickUpRating(this.requesterId, this.requestedItemId, 1).subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data);
            if (data.json().msg == "success") {
                _this.af.list(_this.chatRef).update(_this.msgKey, {
                    type: "pickup_request_hide"
                });
                //this.chatProvider.sendMessage(this.userId,this.requesterId,this.requestedItemId,"Pick request has been accepted successfully","normal")
                _this.chatProvider.sendMessageRental(_this.userId, _this.requesterId, _this.requestedItemId, "pickup_request_response", "Pick up request has been rejected", "The owner didn’t agree with your pick up conditions");
                _this.markMessageAsUnRead();
                _this.presentToast("Request has been rejected successfully");
                _this.navCtrl.pop();
            }
            if (data.json().msg == "error") {
                _this.presentToast("Request already accepted ");
                _this.navCtrl.pop();
            }
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    ReviewPickReturnPage.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    ReviewPickReturnPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed Toast');
        });
        toast.present();
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], ReviewPickReturnPage.prototype, "navBar", void 0);
    ReviewPickReturnPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-review-pick-return',
            templateUrl: 'review-pick-return.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Storage,
            ItemsProvider,
            ToastController,
            ProfileProvider,
            PaymentProvider,
            LoadingController,
            AlertController,
            AngularFireDatabase,
            ChatProvider])
    ], ReviewPickReturnPage);
    return ReviewPickReturnPage;
}());
export { ReviewPickReturnPage };
//# sourceMappingURL=review-pick-return.js.map