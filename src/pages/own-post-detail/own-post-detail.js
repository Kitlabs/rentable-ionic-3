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
import { IonicPage, NavController, ModalController, NavParams, App, Content, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Geolocation } from 'ionic-native';
import { ChatProvider } from '../../providers/chat/chat';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { ProfileProvider } from '../../providers/payment/profile';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddPage } from '../add/add';
import { AngularFireDatabase } from 'angularfire2/database';
var OwnPostDetailPage = /** @class */ (function () {
    function OwnPostDetailPage(navCtrl, navParams, myElement, modalCtrl, zone, viewCtrl, itemprovider, chatProvider, loadingCtrl, storage, af, authProvider, toastCtrl, socialSharing, app, alertCtrl, profileProvider) {
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
        this.authProvider = authProvider;
        this.toastCtrl = toastCtrl;
        this.socialSharing = socialSharing;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.profileProvider = profileProvider;
        this.showFooter = false;
        this.descriptionstatus = true;
        this.rentalstatus = false;
        this.locationstatus = false;
        //hide show button
        this.btnSendRentalReq = false;
        this.btnPickUp = false;
        this.btnReturn = false;
        this.btnCancel = false;
        this.btnDateSelection = false;
        this.pickReturnDateStatus = false;
        this.rentelDetailStatus = true;
        this.notAvailableStatus = false;
        this.Product = [];
        this.messagetext = "";
        this.messagenumber = 350;
        this.itemgoodcondition = [];
        this.itembadcondition = [];
        this.userRatingNeg = [];
        this.userRatingPos = [];
    }
    OwnPostDetailPage.prototype.ionViewDidLoad = function () {
        console.log("details renta page");
        this.itemId = this.navParams.get("itemId");
        this.pAmount = this.navParams.get("amount"); //11
        this.pStatus = this.navParams.get("status");
        this.RenterId = this.navParams.get("renterId");
        this.pRentleCostWithoutFee = this.navParams.get("rentalCostWithoutFee"); //10
        this.pRentableServiceFee = this.navParams.get("rentableServiceFee"); //1
        this.pItemOwnerFee = this.navParams.get("itemOwnerFee");
        this.getItemDetails();
        this.goto();
    };
    OwnPostDetailPage.prototype.ActiveFavourite = function () {
        this.favourite = true;
        this.itemprovider.addRemoveFavourite(this.userId, this.itemId, 1).subscribe(function (data) {
        });
    };
    OwnPostDetailPage.prototype.DeactiveFavourite = function () {
        this.favourite = false;
        this.itemprovider.addRemoveFavourite(this.userId, this.itemId, 0).subscribe(function (data) {
        });
    };
    OwnPostDetailPage.prototype.editPost = function () {
        console.log("Call is received to edit post ");
        this.navCtrl.push(AddPage, {
            type: 'edit',
            itemId: this.itemId
        });
    };
    /*
    Function to get item details
    */
    OwnPostDetailPage.prototype.getItemDetails = function () {
        var _this = this;
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
                    _this.hideOrShowOptionBasedOnItemStatus(_this.pStatus);
                    if (_this.pStatus != "Available") {
                        //from and to date
                        var fromDateStr = _this.navParams.get("fromDate");
                        var toDateStr = _this.navParams.get("toDate");
                        var fromDateRes = fromDateStr.split("-");
                        var toDateRes = toDateStr.split("-");
                        _this.pFromDate = fromDateRes[2] + "/" + fromDateRes[1] + "/" + fromDateRes[0].slice(2);
                        _this.pToDate = toDateRes[2] + "/" + toDateRes[1] + "/" + toDateRes[0].slice(2);
                    }
                }
            }, function (err) {
                _this.loading.dismiss();
                _this.showToast("Unable to fetch data, please try again later");
                _this.navCtrl.pop();
                console.log();
            }, function () {
            });
        }); //end of storage
    };
    /*
    Function to set item rating
    */
    OwnPostDetailPage.prototype.setItemRating = function (rating) {
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
    OwnPostDetailPage.prototype.setUserRating = function (userId) {
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
    OwnPostDetailPage.prototype.setToolTipInfo = function () {
        console.log("setToolTipInfo");
        //this.toolTip="Rental Cost = $"+this.pRentleCostWithoutFee+" Service Fee = $"+this.pRentableServiceFee;
        console.log("NEED DELIVERY=", this.pNeedDelivery);
        if (this.pNeedDelivery == 1) {
            this.toolTip = "Rental Cost = $" + this.pRentleCostWithoutFee + " Service Fee = $" + this.pRentableServiceFee + " Delivery Fee = $" + this.pDeliveryFee;
        }
        else {
            this.toolTip = "Rental Cost = $" + this.pRentleCostWithoutFee + " Service Fee = $" + this.pRentableServiceFee;
        }
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
    OwnPostDetailPage.prototype.hideOrShowOptionBasedOnItemStatus = function (status) {
        console.log("OWN-POST-DETAIL-STATUS=", status);
        switch (status) {
            /**
             *1 - Rental details section is not displayed
              2 - Location section is displayed
              3 - < icon is on the top-left corner of image
              4 - share icon is displayed
              5 - fav icon is not displayed
              6 - pencil icon is displayed
             */
            case "Available":
                this.btnSendRentalReq = false;
                this.btnPickUp = false;
                this.btnReturn = false;
                this.btnCancel = false;
                this.btnDateSelection = false;
                this.pickReturnDateStatus = false;
                this.rentelDetailStatus = false;
                break;
            case "Pending":
                /*
                1 - Send rental request button must be disabled
                2 - "Pick Up" button is disabled
                3 - Return button is disabled
                4 - Cancel button is enabled
                5 - Dates selection button is disabled
          */
                console.log("Log");
                this.btnSendRentalReq = false;
                this.btnPickUp = false;
                this.btnReturn = false;
                this.btnCancel = true;
                this.btnDateSelection = false;
                this.pickReturnDateStatus = false;
                this.rentelDetailStatus = true;
                this.setToolTipInfo();
                break;
            case "Rented":
                /*
                1 - Select dates object is not displayed; only the dates range the product has been rented for
                2 - Send rental request button is not displayed
                3 - Send Message section is not displayed
                4 - "Pick Up" button is not displayed
                5 - Return button is not displayed
                6 - Cancel button is displayed and ENABLED
                */
                this.btnSendRentalReq = false;
                this.btnPickUp = false;
                this.btnReturn = false;
                this.btnCancel = true;
                this.btnDateSelection = false;
                this.rentelDetailStatus = true;
                this.setToolTipInfo();
                break;
            case "PickedUp":
                /*
                1 - Select dates object is not displayed; only the dates range the product has been rented for
                2 - Send rental request button is not displayed
                3 - Send Message section is not displayed
                4 - "Pick Up" button is not displayed
                5 - Return button is not displayed
                6 - Cancel button is not displayed
                */
                console.log("pickedUp");
                this.btnSendRentalReq = false;
                this.btnPickUp = false;
                this.btnReturn = false;
                this.btnCancel = false;
                this.btnDateSelection = false;
                this.rentelDetailStatus = true;
                this.setToolTipInfo();
                break;
            case "PickedUpPending":
            case "ReturnedPending":
            case "returned":
                this.btnSendRentalReq = false;
                this.btnPickUp = false;
                this.btnReturn = false;
                this.btnCancel = false;
                this.btnDateSelection = false;
                this.rentelDetailStatus = true;
                this.setToolTipInfo();
                break;
            default:
                console.log("default");
                // code...
                break;
        }
    };
    OwnPostDetailPage.prototype.goToCancelScreen = function () {
        console.log("Go to cancel screen");
        this.presentCancelRequestPrompt();
    };
    OwnPostDetailPage.prototype.backicon = function () {
        this.navCtrl.pop();
    };
    OwnPostDetailPage.prototype.sendmessage = function () {
    };
    OwnPostDetailPage.prototype.addMarker = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        var content = "<h4>Information!</h4>";
        this.addInfoWindow(marker, content);
    };
    OwnPostDetailPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    OwnPostDetailPage.prototype.goto = function () {
        // this.content.scrollToBottom(300);//300ms animation speed
    };
    OwnPostDetailPage.prototype.presentShare = function () {
        //   let Share = this.modalCtrl.create(ShareModal,{
        //   productTitle:this.productTitle,
        //   productDescription:this.productDescription,
        //   productDailyRentalCost:this.productDailyRentalCost,
        //   productImage:this.basePath+this.productImage});
        //   Share.present();
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
    OwnPostDetailPage.prototype.ActiveLike = function () {
        this.like = !this.like;
    };
    OwnPostDetailPage.prototype.itemSelected = function () {
        console.log("hidden");
        this.descriptionstatus = false;
    };
    OwnPostDetailPage.prototype.stopPlayback = function () {
        console.log("show");
        this.descriptionstatus = true;
    };
    OwnPostDetailPage.prototype.rentalhide = function () {
        console.log("hidden");
        this.rentalstatus = false;
    };
    OwnPostDetailPage.prototype.rentalshow = function () {
        console.log("show");
        this.rentalstatus = true;
    };
    OwnPostDetailPage.prototype.locationhide = function () {
        console.log("hidden");
        this.locationstatus = false;
    };
    OwnPostDetailPage.prototype.locationshow = function () {
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
    OwnPostDetailPage.prototype.sendCancelRequest = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.itemprovider.cancelItemRequest(this.RenterId, this.itemId, "vendor")
            .subscribe(function (data) {
            _this.loading.dismiss();
            if (data.json().msg == "success") {
                _this.showToast("Request has been cancel successfully");
                //this.chatProvider.sendMessage(this.userId,this.productOwnerId,this.itemId,"Rental request to the item has been cancelled","cancel");
                _this.chatProvider.sendMessageRental(_this.userId, _this.RenterId, _this.itemId, "cancel_req_by_owner", "You have cancelled the rental", "The rental request has been cancelled by the owner");
            }
            else {
                _this.showToast("You are not able send request again");
            }
        }, function (err) {
        });
    };
    OwnPostDetailPage.prototype.showToast = function (msg) {
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
    OwnPostDetailPage.prototype.presentCancelRequestPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Are you sure you want to cancel this rental ?',
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
                        _this.sendCancelRequest();
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], OwnPostDetailPage.prototype, "content", void 0);
    __decorate([
        ViewChild("contentRef"),
        __metadata("design:type", Content)
    ], OwnPostDetailPage.prototype, "contentHandle", void 0);
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], OwnPostDetailPage.prototype, "mapElement", void 0);
    OwnPostDetailPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-own-post-detail',
            templateUrl: 'own-post-detail.html',
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
            AuthenticateProvider,
            ToastController,
            SocialSharing,
            App,
            AlertController,
            ProfileProvider])
    ], OwnPostDetailPage);
    return OwnPostDetailPage;
}());
export { OwnPostDetailPage };
//# sourceMappingURL=own-post-detail.js.map