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
import { ShareModal } from '../share-modal/share-modal';
import { Home } from '../home/home';
import { ItemsProvider } from '../../providers/items/items';
import { Geolocation } from 'ionic-native';
import { ChatProvider } from '../../providers/chat/chat';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { AcceptPage } from '../accept/accept';
import { PickupPage } from '../pickup/pickup';
import { ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Storage } from '@ionic/storage';
import { CalendarModal } from "ion2-calendar";
/**
 *It will show the details of items rent by me
 */
var DetailsRentPage = /** @class */ (function () {
    function DetailsRentPage(navCtrl, navParams, myElement, modalCtrl, zone, viewCtrl, itemprovider, chatprovider, loadingCtrl, storage, authProvider, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myElement = myElement;
        this.modalCtrl = modalCtrl;
        this.zone = zone;
        this.viewCtrl = viewCtrl;
        this.itemprovider = itemprovider;
        this.chatprovider = chatprovider;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.authProvider = authProvider;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
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
    DetailsRentPage.prototype.ionViewDidEnter = function () {
        console.log("details renta page");
        this.itemId = this.navParams.get("itemId");
        this.pAmount = this.navParams.get("amount");
        this.pFromDate = this.navParams.get("fromDate");
        this.pToDate = this.navParams.get("toDate");
        this.pStatus = this.navParams.get("status");
        this.getItemDetails();
        this.goto();
    };
    DetailsRentPage.prototype.openCalendar = function () {
        var _this = this;
        var options = {
            pickMode: 'range',
            title: 'Select Date',
            color: 'dark'
        };
        var myCalendar = this.modalCtrl.create(CalendarModal, {
            options: options
        });
        myCalendar.present();
        myCalendar.onDidDismiss(function (date, type) {
            if (type == 'done') {
                _this.pickUpDate = date.from.string;
                _this.returnDate = date.to.string;
                var date1 = new Date(date.from.string);
                var date2 = new Date(date.to.string);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                console.log(diffDays);
                if (diffDays != null) {
                    _this.pickReturnDateStatus = true;
                    if (diffDays == 0) {
                        _this.productDailyRentalCost = _this.productDailyRentalPriceSecond;
                        _this.btnSendRentalReq = false;
                    }
                    else {
                        _this.btnSendRentalReq = true;
                        _this.productDailyRentalCost = _this.productDailyRentalPriceSecond * diffDays;
                        console.log(_this.productDailyRentalCost);
                    }
                }
                else {
                    _this.productDailyRentalCost = _this.productDailyRentalPriceSecond;
                    _this.pickReturnDateStatus = false;
                    _this.btnSendRentalReq = false;
                }
            }
            else {
                //no
                _this.pickReturnDateStatus = false;
                _this.btnSendRentalReq = false;
            }
        });
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
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //data contain userid
        this.storage.get('userId').then(function (uid) {
            console.log("DetailsId=" + uid);
            _this.userId = uid;
            _this.itemprovider.getItemDetail(_this.itemId, uid).subscribe(function (data) {
                _this.loading.dismiss();
                console.log(data.json());
                if (data.json().msg == "success") {
                    _this.Product = data.json().data[0];
                    //splitting images to array
                    _this.sliderImages = data.json().data[0].image.split('|');
                    _this.productDailyRentalPrice = _this.Product.dailyrentalPrice.split('.');
                    //Info to share via facebook or twitter
                    _this.productTitle = _this.Product.title;
                    _this.productDescription = _this.Product.details;
                    _this.productDailyRentalCost = _this.Product.dailyrentalPrice;
                    _this.productDailyRentalPriceSecond = _this.Product.dailyrentalPrice;
                    _this.productImage = _this.Product.image_single;
                    _this.postedLocationLat = _this.Product.lat;
                    _this.postedLocationLng = _this.Product.lng;
                    _this.basePath = _this.Product.base_path;
                    //favourite or not
                    _this.favourite = _this.Product.favourites == 0 ? false : true;
                    //username
                    _this.fullname = _this.Product.user_details.firstName + " " + _this.Product.user_details.lastName;
                    //base url
                    _this.profilePic = _this.Product.base_path + _this.Product.user_details.photoURL;
                    _this.nItemRating = _this.Product.currentcondition;
                    if (_this.productDailyRentalPrice[1] == "00") {
                        _this.dailyPrice = _this.productDailyRentalPrice[0];
                    }
                    else {
                        _this.dailyPrice = _this.Product.dailyrentalPrice;
                    }
                    _this.setUserRating(_this.Product.rating);
                    _this.setItemRating(_this.Product.currentcondition);
                    //this.hideOrShowOptionBasedOnItemStatus(this.Product.status);
                    _this.hideOrShowOptionBasedOnItemStatus(_this.pStatus);
                }
            }, function (err) {
                _this.loading.dismiss();
                console.log();
            }, function () {
            });
        }); //end of storage
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
    DetailsRentPage.prototype.setUserRating = function (rating) {
        for (var i = 0; i < rating; i++) {
            this.userRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - this.Product.rating; j++) {
            this.userRatingNeg[j] = j;
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
    DetailsRentPage.prototype.hideOrShowOptionBasedOnItemStatus = function (status) {
        console.log(status);
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
                this.pickReturnDateStatus = false;
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
                break;
            case "returned":
                break;
            default:
                console.log("default");
                // code...
                break;
        }
    };
    DetailsRentPage.prototype.goToPickUpScreen = function () {
        console.log("Go to pick up screen=" + this.nItemRating);
        this.navCtrl.push(this.pickupPage, {
            itemId: this.itemId,
            itemRating: this.nItemRating
        });
    };
    DetailsRentPage.prototype.goToReturnScreen = function () {
        console.log("Go to return screen");
        this.navCtrl.push(this.returnPage, {
            itemId: this.itemId,
            itemRating: this.nItemRating
        });
    };
    DetailsRentPage.prototype.goToCancelScreen = function () {
        console.log("Go to cancel screen");
        this.presentCancelRequestPrompt();
    };
    DetailsRentPage.prototype.goToOtherProfile = function () {
        this.navCtrl.push(OtherprofilePage, {
            userId: this.userId,
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
    DetailsRentPage.prototype.sendrental = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.itemprovider.sendRentalRequest(this.userId, this.itemId, this.pickUpDate, this.returnDate, this.productDailyRentalCost)
            .subscribe(function (data) {
            _this.loading.dismiss();
            if (data.json().msg == "success") {
                _this.showToast("Request has been sent successfully");
            }
            else {
                _this.showToast("You are not able send request again");
            }
        }, function (err) {
        });
    };
    DetailsRentPage.prototype.sendmessage = function () {
        // this.chatprovider.addChats(this.uid, this.itemowner._id);
        // console.log('id-----',this.itemowner._id);
        // let param = {uid: this.uid, interlocutor: this.itemowner._id, message: this.messagetext};
        // this.navCtrl.push(ChatdetailPage,param);
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
        var Share = this.modalCtrl.create(ShareModal, {
            productTitle: this.productTitle,
            productDescription: this.productDescription,
            productDailyRentalCost: this.productDailyRentalCost,
            productImage: this.productImage
        });
        Share.present();
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
        this.itemprovider.cancelItemRequest(this.userId, this.itemId)
            .subscribe(function (data) {
            _this.loading.dismiss();
            if (data.json().msg == "success") {
                _this.showToast("Request has been cancel successfully");
            }
            else {
                _this.showToast("You are not able send request again");
            }
        }, function (err) {
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
    DetailsRentPage.prototype.presentCancelRequestPrompt = function () {
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
            AuthenticateProvider,
            ToastController,
            AlertController])
    ], DetailsRentPage);
    return DetailsRentPage;
}());
export { DetailsRentPage };
//# sourceMappingURL=details-rent.js.map