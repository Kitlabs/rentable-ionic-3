var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Content, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { MapModal } from '../modal-page/modal-page';
import { Home } from '../home/home';
import { ItemsProvider } from '../../providers/items/items';
import { Geolocation } from 'ionic-native';
import { ChatProvider } from '../../providers/chat/chat';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ProfileProvider } from '../../providers/payment/profile';
import { AcceptPage } from '../accept/accept';
import { PickupPage } from '../pickup/pickup';
import { ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Storage } from '@ionic/storage';
import { PaymentProvider } from '../../providers/payment/payment';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 *It will show the details of items rent by me
 */
var DetailsRentPage = /** @class */ (function () {
    function DetailsRentPage(navCtrl, navParams, myElement, modalCtrl, zone, viewCtrl, itemprovider, chatProvider, loadingCtrl, storage, af, chatprovider, authProvider, paymentProvider, toastCtrl, alertCtrl, socialSharing, profileProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myElement = myElement;
        this.modalCtrl = modalCtrl;
        this.zone = zone;
        this.viewCtrl = viewCtrl;
        this.itemprovider = itemprovider;
        this.chatProvider = chatProvider;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.af = af;
        this.chatprovider = chatprovider;
        this.authProvider = authProvider;
        this.paymentProvider = paymentProvider;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.profileProvider = profileProvider;
        this.showFooter = false;
        this.rentPage = RentPage;
        this.home = Home;
        this.claim = ClaimownerPage;
        this.pickupPage = PickupPage;
        this.otherprofile = OtherprofilePage;
        this.descriptionstatus = true;
        this.rentalstatus = false;
        this.locationstatus = false;
        this.rent = RentPage;
        this.returnPage = AcceptPage; //return process
        //hide show button
        this.btnSendRentalReq = false;
        this.btnPickUp = false;
        this.btnReturn = false;
        this.btnCancel = false;
        this.btnDateSelection = false;
        this.pickReturnDateStatus = false;
        this.Product = [];
        this.messagetext = "";
        this.messagenumber = 350;
        this.itemgoodcondition = [];
        this.itembadcondition = [];
        this.userRatingNeg = [];
        this.userRatingPos = [];
    }
    DetailsRentPage.prototype.ionViewDidLoad = function () {
        console.log("details renta page");
        this.itemId = this.navParams.get("itemId");
        this.pAmount = this.navParams.get("amount");
        this.pStatus = this.navParams.get("status");
        this.pRentleCostWithoutFee = this.navParams.get("rentalCostWithoutFee");
        this.pRentableServiceFee = this.navParams.get("rentableServiceFee");
        this.pItemOwnerFee = this.navParams.get("itemOwnerFee");
        this.getItemDetails();
        this.goto();
    };
    DetailsRentPage.prototype.number = function () {
        var n = this.messagetext.length;
        this.messagenumber = 350 - n;
    };
    DetailsRentPage.prototype.ActiveFavourite = function () {
        this.favourite = true;
        this.itemprovider.addRemoveFavourite(this.userId, this.itemId, 1).subscribe(function (data) {
        });
    };
    DetailsRentPage.prototype.DeactiveFavourite = function () {
        this.favourite = false;
        this.itemprovider.addRemoveFavourite(this.userId, this.itemId, 0).subscribe(function (data) {
        });
    };
    /*
    Function to get item details
    */
    DetailsRentPage.prototype.getItemDetails = function () {
        var _this = this;
        console.log('rahul');
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //data contain userid
        this.storage.get('userId').then(function (uid) {
            console.log("DetailsId=" + uid);
            _this.userId = uid;
            _this.itemprovider.getItemDetailWithBookedDates(_this.itemId, uid).subscribe(function (data) {
                _this.loading.dismiss();
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.Product = data.json().PostData[0];
                    //splitting images to array
                    _this.sliderImages = _this.Product.image.split('|');
                    _this.productDailyRentalPrice = _this.Product.dailyrentalPrice.split('.');
                    //Info to share via facebook or twitter
                    _this.productTitle = _this.Product.title;
                    _this.productDescription = _this.Product.details;
                    _this.productDailyRentalCost = _this.Product.dailyrentalPrice;
                    _this.productDailyRentalPriceSecond = _this.Product.dailyrentalPrice;
                    _this.productImage = _this.Product.image_single;
                    _this.postedLocationLat = _this.Product.lat;
                    _this.postedLocationLng = _this.Product.lng;
                    _this.basePath = data.json().base_path;
                    //favourite or not
                    _this.favourite = _this.Product.favourite == 0 ? false : true;
                    //username
                    _this.fullname = _this.Product.user_details.firstName + " " + _this.Product.user_details.lastName;
                    //base url
                    _this.profilePic = _this.basePath + _this.Product.user_details.photoURL;
                    _this.nItemRating = _this.Product.currentcondition;
                    //product owner id
                    _this.productOwnerId = _this.Product.user_details.id;
                    _this.pNeedDelivery = _this.Product.needDelivery;
                    _this.pDeliveryFee = _this.Product.deliveryfee;
                    if (_this.productDailyRentalPrice[1] == "00") {
                        _this.dailyPrice = _this.productDailyRentalPrice[0];
                    }
                    else {
                        _this.dailyPrice = _this.Product.dailyrentalPrice;
                    }
                    _this.setUserRating(_this.Product.userId);
                    _this.setItemRating(_this.Product.currentcondition);
                    //this.hideOrShowOptionBasedOnItemStatus(this.Product.status);
                    _this.hideOrShowOptionBasedOnItemStatus(_this.pStatus);
                    //from and to date
                    var fromDateStr = _this.navParams.get("fromDate");
                    var toDateStr = _this.navParams.get("toDate");
                    var fromDateRes = fromDateStr.split("-");
                    var toDateRes = toDateStr.split("-");
                    _this.pFromDate = fromDateRes[2] + "/" + fromDateRes[1] + "/" + fromDateRes[0].slice(2);
                    _this.pToDate = toDateRes[2] + "/" + toDateRes[1] + "/" + toDateRes[0].slice(2);
                    //date format month/day/year
                    var fromDateSecond = fromDateRes[1] + "/" + fromDateRes[2] + "/" + fromDateRes[0].slice(2);
                    _this.checkCancelOption(fromDateSecond);
                }
            }, function (err) {
                _this.showToast("Unable to fetch data, please try again later");
                _this.loading.dismiss();
                _this.navCtrl.pop();
                console.log();
            }, function () {
            });
        }); //end of storage
    };
    /**
     * Function to cancellation period, if user cance within 48 hours then there will be a cancellation fee
     */
    DetailsRentPage.prototype.checkCancelOption = function (fromDatee) {
        console.log('FromDatee--->' + fromDatee);
        this.todayDate = new Date();
        var dd = this.todayDate.getDate();
        var mm = this.todayDate.getMonth() + 1; //January is 0!
        var yyyy = this.todayDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        this.todayDate = mm + '/' + dd + '/' + yyyy;
        var d1 = new Date(this.todayDate);
        var d2 = new Date(fromDatee);
        var timeDiff = d2.getTime() - d1.getTime();
        var DaysDiff = timeDiff / (1000 * 3600 * 24);
        this.chargeCancelFeeStatus = DaysDiff <= 2 && this.pStatus != 'Pending' ? true : false;
    };
    /*
    Function to set item rating
    */
    DetailsRentPage.prototype.setItemRating = function (rating) {
        //product rating
        for (var i = 0; i < rating; i++) {
            this.itemgoodcondition[i] = i;
        }
        for (var j = 0; j < 5 - this.Product.currentcondition; j++) {
            this.itembadcondition[j] = j;
        }
    };
    /*
    Function to set user rating
    */
    DetailsRentPage.prototype.setUserRating = function (userId) {
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
        //  for (var i=0; i < rating;  i++) {
        //           this.userRatingPos[i]=i;
        //       }  
        //   for (var j=0; j < 5-this.Product.rating;  j++) {
        //     this.userRatingNeg[j]=j;
        //   } 
    };
    /*
     Method to hide or show option based on item status
     below are the possibility of having item status
     1.available(not handle in this page)
     2.pending
     3.rented
     4.picked up
     5.returned
    */
    DetailsRentPage.prototype.hideOrShowOptionBasedOnItemStatus = function (status) {
        console.log("DETAIL-RENT-STATUS=", status);
        switch (status) {
            case "Pending":
                /*
                1 - Send rental request button must be disabled
                2 - "Pick Up" button is disabled
                3 - Return button is disabled
                4 - Cancel button is enabled
                5 - Dates selection button is disabled
                */
                this.btnSendRentalReq = false;
                this.btnPickUp = false;
                this.btnReturn = false;
                this.btnCancel = true;
                this.btnDateSelection = false;
                this.setToolTipInfo();
                // this.pickReturnDateStatus=false;
                break;
            case "Rented":
                /*
                     1 - Send rental request button text is now "Extend Rental" and it must be disabled
                     2 - "Pick Up" button is enabled
                     3 - Return button is disabled
                     4 - Cancel button is enabled
                */
                this.btnSendRentalReq = false;
                this.btnPickUp = true;
                this.btnReturn = false;
                this.btnCancel = true;
                this.btnDateSelection = false;
                this.setToolTipInfo();
                break;
            case "PickedUp":
                /*
                    1 - Send rental request button text is now "Extend Rental" and it must be disabled
                    2 - "Pick Up" button is disabled
                    3 - Return button is enabled
                    4 - Cancel button is disabled
                */
                console.log("pickedUp");
                this.btnSendRentalReq = false;
                this.btnPickUp = false;
                this.btnReturn = true;
                this.btnCancel = false;
                this.btnDateSelection = false;
                this.setToolTipInfo();
                break;
            case "PickedUpPending":
            case "ReturnedPending":
            case "returned":
                this.setToolTipInfo();
                //by default all option are disable so we dont' need to do anything here with these returned status
                break;
            default:
                console.log("default");
                // code...
                break;
        }
    };
    DetailsRentPage.prototype.setToolTipInfo = function () {
        console.log("setToolTipInfo");
        if (this.pNeedDelivery == 1) {
            this.toolTip = "Rental Cost = $" + this.pRentleCostWithoutFee + " Service Fee = $" + this.pRentableServiceFee + " Delivery Fee = $" + this.pDeliveryFee;
        }
        else {
            this.toolTip = "Rental Cost = $" + this.pRentleCostWithoutFee + " Service Fee = $" + this.pRentableServiceFee;
        }
    };
    DetailsRentPage.prototype.goToPickUpScreen = function () {
        this.navCtrl.push(this.pickupPage, {
            itemId: this.itemId,
            itemRating: this.nItemRating,
            itemOwnerId: this.productOwnerId
        });
    };
    DetailsRentPage.prototype.goToReturnScreen = function () {
        console.log(this.Product.PickupRating);
        this.navCtrl.push(this.returnPage, {
            itemId: this.itemId,
            itemRating: this.Product.PickupRating,
            itemOwnerId: this.productOwnerId
        });
    };
    DetailsRentPage.prototype.goToCancelScreen = function () {
        console.log("Go to cancel screen");
        if (this.chargeCancelFeeStatus) {
            //we need to charge cancellation fee from user
            this.presentCancelRequestPrompt("There will be a 1 day fee for the cancellation", 0);
        }
        else {
            // no need to charge the cancellation fee
            this.presentCancelRequestPrompt("Are you sure you want to cancel the rental request", 1);
        }
        // if(this.pStatus== "Rented"){
        //   this.presentCancelRequestPrompt("There will be a 1 day fee for the cancellation");
        // }else{
        //   this.presentCancelRequestPrompt("Are you sure you want to cancel the rental request");
        // }
    };
    DetailsRentPage.prototype.goToOtherProfile = function () {
        console.log();
        this.navCtrl.push(OtherprofilePage, {
            userId: this.productOwnerId,
            itemId: this.itemId
        });
    };
    DetailsRentPage.prototype.backicon = function () {
        this.navCtrl.pop();
    };
    DetailsRentPage.prototype.checker = function () {
        var date1 = new Date(this.pickUpDate);
        var monthp = date1.getUTCMonth() + 1; //months from 1-12
        var dayp = date1.getUTCDate();
        var yearp = date1.getUTCFullYear();
        var date2 = new Date(this.returnDate);
        var monthr = date1.getUTCMonth() + 1; //months from 1-12
        var dayr = date1.getUTCDate();
        var yearr = date1.getUTCFullYear();
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays != null) {
            if (diffDays == 0) {
                this.productDailyRentalCost = this.productDailyRentalPriceSecond;
            }
            else {
                this.btnSendRentalReq = true;
                this.productDailyRentalCost = this.productDailyRentalCost * diffDays;
            }
        }
        else {
            this.btnSendRentalReq = false;
        }
    };
    DetailsRentPage.prototype.sendmessage = function () {
        var _this = this;
        if (this.messagetext) {
            console.log("true msg");
            this.messagetext = "";
            //{"msg":"success","inserted_id":12}
            //{"msg":"error","data":"already added!"}
            this.chatProvider.getChatRef(this.userId, this.productOwnerId, this.itemId)
                .then(function (chatRef) {
                console.log(chatRef);
                _this.af.list(chatRef).push({
                    from: _this.userId,
                    message: _this.messagetext,
                    type: "normal",
                    time: Date()
                }).then(function () {
                    console.log("message sent successfully");
                    _this.showToast("Message sent");
                    // message is sent
                }).catch(function () {
                    // some error. maybe firebase is unreachable
                    console.log("firebase unreachable");
                });
            });
        }
    };
    DetailsRentPage.prototype.sendCommonMessage = function () {
        var _this = this;
        console.log("Call is received to send message");
        if (this.messagetext) {
            this.loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: "Sending..."
            });
            this.loading.present();
            this.itemprovider.insertChatList(this.userId, this.productOwnerId, this.itemId)
                .subscribe(function (data) {
                //{"msg":"success","inserted_id":12}
                //{"msg":"error","data":"already added!"}
                console.log(data.json());
                if (data.json().msg == "success" || data.json().msg == "error") {
                    _this.chatprovider.getChatRef(_this.userId, _this.productOwnerId, _this.itemId)
                        .then(function (chatRef) {
                        console.log(chatRef);
                        _this.af.list(chatRef).push({
                            from: _this.userId,
                            message: _this.messagetext,
                            type: "normal",
                            time: Date()
                        }).then(function () {
                            _this.messagetext = "";
                            _this.loading.dismiss();
                            _this.notifyReceiver();
                            _this.showToastSimple("Message sent");
                            // message is sent
                        }).catch(function () {
                            // some error. maybe firebase is unreachable
                            _this.loading.dismiss();
                            console.log("firebase unreachable");
                        });
                    });
                }
                else {
                    _this.loading.dismiss();
                }
            });
        }
        else {
            console.log("false msg");
        }
    };
    /**
  * Method to used send notifcation
  */
    DetailsRentPage.prototype.notifyReceiver = function () {
        console.log("Call is received to send message notification to user");
        this.chatprovider.sendMessageNotification(this.userId, this.productOwnerId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    DetailsRentPage.prototype.addMarker = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        var content = "<h4>Information!</h4>";
        this.addInfoWindow(marker, content);
    };
    DetailsRentPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    DetailsRentPage.prototype.goto = function () {
        this.content.scrollToBottom(300); //300ms animation speed
    };
    DetailsRentPage.prototype.presentModal = function () {
        var modal = this.modalCtrl.create(MapModal);
        modal.present();
    };
    DetailsRentPage.prototype.presentShare = function () {
        // let Share = this.modalCtrl.create(ShareModal,{
        //   productTitle:this.productTitle,
        //   productDescription:this.productDescription,
        //   productDailyRentalCost:this.productDailyRentalCost,
        //   productImage:this.productImage});
        //  Share.present();
        var message = this.productDescription + " and daily rental price is $" + this.productDailyRentalCost;
        var subject = this.productTitle;
        this.socialSharing.share(message, subject, this.basePath + this.productImage, this.basePath + this.productImage).
            then(function () {
            //this.showToast("Sharing success");
        }).catch(function () {
            //Error!
            //this.showToast("Share failed");
        });
    };
    DetailsRentPage.prototype.ActiveLike = function () {
        this.like = !this.like;
    };
    DetailsRentPage.prototype.itemSelected = function () {
        console.log("hidden");
        this.descriptionstatus = false;
    };
    DetailsRentPage.prototype.stopPlayback = function () {
        console.log("show");
        this.descriptionstatus = true;
    };
    DetailsRentPage.prototype.rentalhide = function () {
        console.log("hidden");
        this.rentalstatus = false;
    };
    DetailsRentPage.prototype.rentalshow = function () {
        console.log("show");
        this.rentalstatus = true;
    };
    DetailsRentPage.prototype.locationhide = function () {
        console.log("hidden");
        this.locationstatus = false;
    };
    DetailsRentPage.prototype.locationshow = function () {
        var _this = this;
        console.log("show");
        this.locationstatus = true;
        console.log(this.postedLocationLng);
        Geolocation.getCurrentPosition().then(function (position) {
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: { lat: parseFloat(_this.postedLocationLat), lng: parseFloat(_this.postedLocationLng) },
                mapTypeId: 'terrain'
            });
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: { lat: parseFloat(_this.postedLocationLat), lng: parseFloat(_this.postedLocationLng) },
                radius: 400
            });
        }, function (err) {
            console.log(err);
        });
    };
    DetailsRentPage.prototype.sendCancelRequest = function () {
        var _this = this;
        console.log("item id=" + this.itemId);
        console.log("user id=" + this.userId);
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.itemprovider.cancelItemRequest(this.userId, this.itemId, "renter")
            .subscribe(function (data) {
            _this.loading.dismiss();
            if (data.json().msg == "success") {
                _this.showToast("Request has been cancel successfully");
                // this.chatProvider.sendMessage(this.userId,this.productOwnerId,this.itemId,"Rental request to the item has been cancelled","cancel")
                _this.chatProvider.sendMessageRental(_this.userId, _this.productOwnerId, _this.itemId, "cancel_req_by_renter", "The rental request has been cancelled by the renter", "You have cancelled the rental");
                _this.markMessageAsUnRead();
            }
            else {
                _this.showToast("You are not able send request again");
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.showToast("Please try again later");
        });
    };
    DetailsRentPage.prototype.markMessageAsUnRead = function () {
        console.log("markMessageAsUnRead");
        this.chatprovider.markMessageAsUnread(this.userId, this.productOwnerId, this.itemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    DetailsRentPage.prototype.showToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
            _this.navCtrl.pop();
        });
        toast.present();
    };
    DetailsRentPage.prototype.showToastSimple = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    DetailsRentPage.prototype.presentCancelRequestPrompt = function (msg, id) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm',
            message: msg,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        if (id == 0) {
                            //cancellation fee applied
                            _this.cancelRequestWithCancellationFee();
                        }
                        else {
                            //no cancellation fee applied
                            _this.sendCancelRequest();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    DetailsRentPage.prototype.cancelRequestWithCancellationFee = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.paymentProvider.captureCancellationAmount(this.userId, this.itemId, this.dailyPrice)
            .subscribe(function (data) {
            _this.loading.dismiss();
            console.log(data.json());
            if (data.json().msg == "succeeded") {
                _this.sendCancelRequest();
            }
            else {
                _this.showToast(data.json().msg_details);
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.showToast("Please try again later");
        });
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], DetailsRentPage.prototype, "content", void 0);
    __decorate([
        ViewChild("contentRef"),
        __metadata("design:type", Content)
    ], DetailsRentPage.prototype, "contentHandle", void 0);
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], DetailsRentPage.prototype, "mapElement", void 0);
    DetailsRentPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-details-rent',
            templateUrl: 'details-rent.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ElementRef,
            ModalController,
            NgZone,
            ViewController,
            ItemsProvider,
            ChatProvider,
            LoadingController,
            Storage,
            AngularFireDatabase,
            ChatProvider,
            AuthenticateProvider,
            PaymentProvider,
            ToastController,
            AlertController,
            SocialSharing,
            ProfileProvider])
    ], DetailsRentPage);
    return DetailsRentPage;
}());
export { DetailsRentPage };
//# sourceMappingURL=details-rent.js.map