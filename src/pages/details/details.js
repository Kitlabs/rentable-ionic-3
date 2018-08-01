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
import { NavController, ModalController, NavParams, Content, ViewController, LoadingController, ToastController, Events } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { MapModal } from '../modal-page/modal-page';
import { Home } from '../home/home';
import { ItemsProvider } from '../../providers/items/items';
import { ProfileProvider } from '../../providers/payment/profile';
import { Geolocation } from 'ionic-native';
import { ChatProvider } from '../../providers/chat/chat';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { AngularFireDatabase } from 'angularfire2/database';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AcceptPage } from '../accept/accept';
import { PickupPage } from '../pickup/pickup';
import { ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Storage } from '@ionic/storage';
import { CalendarModal } from "ion2-calendar";
import { ImageViewerController } from 'ionic-img-viewer';
import { DatePipe } from '@angular/common';
var now = new Date(), today = new Date(new Date().setDate(new Date().getDate()));
var Details = /** @class */ (function () {
    function Details(navCtrl, navParams, myElement, modalCtrl, zone, viewCtrl, itemprovider, chatprovider, loadingCtrl, storage, authProvider, toastCtrl, events, af, ivc, profileProvider, socialSharing) {
        // this.Product ={
        //   img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', ownername: 'John', item_title:'house', price:'25', description:'this is good rentalable book please use this Thanks', selectdate:'', total_cost:'100'}
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
        this.events = events;
        this.af = af;
        this.ivc = ivc;
        this.profileProvider = profileProvider;
        this.socialSharing = socialSharing;
        this.showFooter = false;
        this.rentPage = RentPage;
        this.home = Home;
        this.claim = ClaimownerPage;
        this.pickup = PickupPage;
        this.otherprofile = OtherprofilePage;
        this.descriptionstatus = true;
        this.rentalstatus = false;
        this.locationstatus = false;
        this.rent = RentPage;
        this.return = AcceptPage; //return process
        this.productDailyRentalCost = null;
        this.itemId = navParams.get("itemId");
        console.log(this.itemId);
        this.Product = [];
        this.ionViewLoaded();
        this.messagetext = "";
        this.messagenumber = 350;
        this.itemgoodcondition = [];
        this.itembadcondition = [];
        this.userRatingNeg = [];
        this.userRatingPos = [];
        this.bookedDates = [];
        this.myDate = "Select Pick Date";
        //getting current date
        this.myDate = new Date().toISOString();
        //set button status to false
        this.btnSendRentalReq = false;
        this.btnPickUp = true;
        this.btnReturn = true;
        this.btnCancel = true;
        this.pickReturnDateStatus = false;
        this.isDelivery = false;
        this.deliveryStatus = false;
        this.btnSendMessage = false;
    }
    Details.prototype.ionViewDidLoad = function () {
        console.log("Detail Page");
        this.getItemDetails();
        this.addItemViewOrLike();
    };
    Details.prototype.testImage = function (img) {
        console.log(img);
    };
    Details.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log("Detail Page ionViewDidEnter");
        this.storage.get('CARD_STATUS').then(function (data) {
            _this.cardStatus = data;
        });
    };
    /**
     * Not Used
     */
    Details.prototype.openCalendar = function () {
        var _this = this;
        this.isDelivery = false;
        var options = {
            pickMode: 'range',
            title: 'Select Date',
            color: 'dark'
        };
        var myCalendar = this.modalCtrl.create(CalendarModal, {
            options: options,
            format: 'DD-MM-YYYY'
        });
        myCalendar.present();
        myCalendar.onDidDismiss(function (date, type) {
            console.log(date);
            if (type == 'done') {
                //d-m-y
                _this.pickUpDate = date.from.years + "-" + date.from.months + "-" + date.from.date;
                _this.returnDate = date.to.years + "-" + date.to.months + "-" + date.to.date;
                var fromMonth = date.from.months > 9 ? date.from.months : "0" + date.from.months;
                var toMonth = date.to.months > 9 ? date.to.months : "0" + date.to.months;
                //to show on ui
                _this.pickUpDateUi = date.from.date + "/" + fromMonth + "/" + date.from.years;
                _this.returnDateUi = date.to.date + "/" + toMonth + "/" + date.to.years;
                var date1 = new Date(date.from.string);
                var date2 = new Date(date.to.string);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
                if (diffDays != null) {
                    _this.pickReturnDateStatus = true;
                    if (diffDays == 0) {
                        _this.productDailyRentalCost = _this.productDailyRentalPriceSecond;
                        _this.btnSendRentalReq = false;
                    }
                    else {
                        _this.btnSendRentalReq = true;
                        _this.productDailyRentalCost = _this.productDailyRentalPriceSecond * diffDays;
                        _this.productRentCost = _this.productDailyRentalCost;
                        _this.calculateTotalCost(0);
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
    Details.prototype.calculateTotalCost = function (withOrWithoutDelivery) {
        var _this = this;
        //calculateTotalCost :: cost,Isdelivery,DeliveryPickUpFee
        //this.favourite=this.Product.favourites==0?false:true;
        //this.deliveryFee=withOrWithoutDelivery==1?this.deliveryFee:0;
        this.itemprovider.getTotalRentalCost(this.productRentCost, withOrWithoutDelivery, withOrWithoutDelivery == 1 ? this.deliveryFee : 0).subscribe(function (data) {
            _this.productDailyRentalCost = data.json().Renter.Total;
            console.log(_this.productDailyRentalCost);
            _this.btnSendRentalReq = true;
            _this.itemOwnerFee = data.json().Owner.Total;
            _this.AdminFee = data.json().Admin.ServiceFee;
            _this.rentableServiceFee = data.json().Renter.RenterServiceFee;
            _this.productRentalCostWithoutFee = data.json().Renter.RentalCost;
            if (withOrWithoutDelivery == 1) {
                //include delivery fee
                _this.toolTip = "Rental Cost = $" + data.json().Renter.RentalCost + "                    Service Fee = $" + data.json().Renter.RenterServiceFee + "                    Delivery Fee = $" + data.json().Renter.DeliveryPickUpFee;
            }
            else {
                _this.toolTip = "Rental Cost = $" + data.json().Renter.RentalCost + "  Service Fee = $" + data.json().Renter.RenterServiceFee;
            }
        });
    };
    Details.prototype.ionViewLoaded = function () {
        this.loadMap();
    };
    Details.prototype.loadMap = function () {
    };
    /**
     * cardStatus
     * 1 user added the card and sending message functionality available to user
     * 0 user didn't attached the card and message functionality not available to user
     */
    Details.prototype.number = function () {
        if (this.cardStatus == 1) {
            var n = this.messagetext.length;
            if (n > 0) {
                this.messagenumber = 350 - n;
                this.btnSendMessage = true;
            }
            else {
                this.btnSendMessage = false;
            }
        }
    };
    /*
    function to check whether user need delivery of product from user or not
    case:1 add delivery amount
    case:0 no include delivery amount
    */
    Details.prototype.needDelivery = function () {
        if (this.isDelivery) {
            this.calculateTotalCost(1);
        }
        else {
            this.calculateTotalCost(0);
        }
    };
    /*
    function to add view or likes
    */
    Details.prototype.addItemViewOrLike = function () {
        var _this = this;
        this.storage.get('userId').then(function (id) {
            _this.itemprovider.addItemViewOrLikes(_this.itemId, "views").subscribe(function (data) {
                console.log(data.json());
            });
        }); //end of storage
    };
    Details.prototype.ActiveFavourite = function () {
        this.favourite = true;
        this.itemprovider.addRemoveFavourite(this.userId, this.itemId, 1).subscribe(function (data) {
        });
    };
    Details.prototype.DeactiveFavourite = function () {
        this.favourite = false;
        this.itemprovider.addRemoveFavourite(this.userId, this.itemId, 0).subscribe(function (data) {
        });
    };
    /*
    Function to get item details
    */
    Details.prototype.getItemDetails = function () {
        var _this = this;
        console.log("ItemId=" + this.itemId);
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
                if (data.json().msg == "success") {
                    _this.Product = data.json().PostData[0];
                    //splitting images to array
                    _this.sliderImages = data.json().PostData[0].image.split('|');
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
                    //delivery
                    _this.ownerProvideDelivery = _this.Product.delivery == 1 ? true : false;
                    _this.deliveryDistance = _this.Product.distance;
                    _this.deliveryFee = _this.Product.deliveryfee;
                    //favourite or not
                    _this.favourite = _this.Product.favourite == 0 ? false : true;
                    //username
                    _this.fullname = _this.Product.user_details.firstName + " " + _this.Product.user_details.lastName;
                    //base url
                    _this.profilePic = _this.basePath + _this.Product.user_details.photoURL;
                    // //product owner id
                    _this.productOwnerId = _this.Product.user_details.id;
                    //security deposit text
                    _this.securityDepositText = "Security deposit for this item is :$" + _this.Product.securityDeposit;
                    _this.securityDepositText2 = " DON'T WORRY, your money won't be touched unless the owner makes a claim, in case there's a problem when the item is returned. But you will be asked for confirmation first";
                    if (_this.productDailyRentalPrice[1] == "00") {
                        _this.dailyPrice = _this.productDailyRentalPrice[0];
                    }
                    else {
                        _this.dailyPrice = _this.Product.dailyrentalPrice;
                    }
                    _this.getUserRating(_this.Product.userId);
                    _this.setItemRating(_this.Product.currentcondition);
                    _this.hideShowDeliveryOption(_this.postedLocationLat, _this.postedLocationLng);
                    //this.disableBookedDates(this.Product.BookingDate);
                    //var str=this.Product;
                    if (_this.Product.hasOwnProperty('BookingDate')) {
                        _this.disableBookedDates(_this.Product.BookingDate);
                    }
                    else {
                        _this.displayWithoutBookedDates();
                    }
                }
                else {
                    //no response
                    _this.showToast("Unable to fetch data, please try again later");
                    _this.navCtrl.pop();
                    _this.loading.dismiss();
                }
            }, function (err) {
                _this.showToast("Unable to fetch data, please try again later");
                _this.navCtrl.pop();
                _this.loading.dismiss();
                console.log();
            }, function () {
            });
        }); //end of storage
    };
    Details.prototype.displayWithoutBookedDates = function () {
        console.log("Display without booked dates");
        var self = this;
        this.daterangeSettings = {
            min: today,
            theme: 'range-custom-rentable',
            layout: 'liquid',
            animate: 'flip',
            fromText: 'Pick Up Date',
            toText: 'Return Date',
            onSet: function (event, inst) {
                /**
                 * Index contain
                 * 0=month
                 * 1=day
                 * 2=year
                 */
                var fromDateAr, toDateAr;
                var data = event.valueText.split('-');
                fromDateAr = data[0].split('/');
                toDateAr = data[1].split('/');
                //format to send to server
                self.pickUpDate = (fromDateAr[2] + "-" + fromDateAr[0] + "-" + fromDateAr[1]).replace(/\s+/, "");
                self.returnDate = (toDateAr[2] + "-" + toDateAr[0] + "-" + toDateAr[1]).replace(/\s+/, "");
                //format to show on ui
                self.pickUpDateUi = (fromDateAr[1] + "/" + fromDateAr[0] + "/" + fromDateAr[2].slice(2)).replace(/\s+/, "");
                self.returnDateUi = (toDateAr[1] + "/" + toDateAr[0] + "/" + toDateAr[2].slice(2)).replace(/\s+/, "");
                var date1 = new Date(data[0]);
                var date2 = new Date(data[1]);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
                if (diffDays != null) {
                    self.pickReturnDateStatus = true;
                    if (diffDays == 0) {
                        self.productDailyRentalCost = self.productDailyRentalPriceSecond;
                        self.btnSendRentalReq = false;
                    }
                    else {
                        if (self.cardStatus == 1) {
                            self.btnSendRentalReq = true;
                        }
                        else {
                            self.btnSendRentalReq = false;
                        }
                        self.productDailyRentalCost = self.productDailyRentalPriceSecond * diffDays;
                        self.productRentCost = self.productDailyRentalCost;
                        self.calculateTotalCost(0);
                    }
                }
                else {
                    self.productDailyRentalCost = self.productDailyRentalPriceSecond;
                    self.pickReturnDateStatus = false;
                    self.btnSendRentalReq = false;
                }
            },
        };
    };
    Details.prototype.disableBookedDates = function (bookedDates) {
        var self = this;
        for (var index in bookedDates) {
            var arrayData = { start: bookedDates[index].start, end: bookedDates[index].end, text: 'Booked Dates' };
            this.bookedDates.push(arrayData);
        }
        console.log("BOOKED==", this.bookedDates);
        console.log("TODAY=", today);
        this.daterangeSettings = {
            invalid: this.bookedDates,
            min: today,
            theme: 'range-custom-rentable',
            layout: 'liquid',
            animate: 'flip',
            fromText: 'Pick Up Date',
            toText: 'Return Date',
            onDayChange: function (event, inst) {
                if (event.active == "start") {
                    self.dateSelectedFrom = new DatePipe('en-US').transform(event.date, 'yyyy-MM-dd');
                }
                if (event.active == "end") {
                    self.dateSelectedTo = new DatePipe('en-US').transform(event.date, 'yyyy-MM-dd');
                    if (Date.parse(self.dateSelectedFrom) < Date.parse(self.dateSelectedTo)) {
                    }
                    else {
                        return false;
                    }
                    for (var i in self.bookedDates) {
                        if (self.dateCheck(self.dateSelectedFrom, self.dateSelectedTo, self.bookedDates[i].start)) {
                            return false;
                        }
                        else {
                        }
                    }
                }
                //return false;
            },
            onSet: function (event, inst) {
                /**
                 * Index contain
                 * 0=month
                 * 1=day
                 * 2=year
                 */
                var fromDateAr, toDateAr;
                var data = event.valueText.split('-');
                fromDateAr = data[0].split('/');
                toDateAr = data[1].split('/');
                //format to send to server
                self.pickUpDate = (fromDateAr[2] + "-" + fromDateAr[0] + "-" + fromDateAr[1]).replace(/\s+/, "");
                self.returnDate = (toDateAr[2] + "-" + toDateAr[0] + "-" + toDateAr[1]).replace(/\s+/, "");
                //format to show on ui
                self.pickUpDateUi = (fromDateAr[1] + "/" + fromDateAr[0] + "/" + fromDateAr[2].slice(2)).replace(/\s+/, "");
                self.returnDateUi = (toDateAr[1] + "/" + toDateAr[0] + "/" + toDateAr[2].slice(2)).replace(/\s+/, "");
                var date1 = new Date(data[0]);
                var date2 = new Date(data[1]);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
                if (diffDays != null) {
                    self.pickReturnDateStatus = true;
                    if (diffDays == 0) {
                        self.productDailyRentalCost = self.productDailyRentalPriceSecond;
                        self.btnSendRentalReq = false;
                    }
                    else {
                        if (self.cardStatus == 1) {
                            self.btnSendRentalReq = true;
                        }
                        else {
                            self.btnSendRentalReq = false;
                        }
                        self.productDailyRentalCost = self.productDailyRentalPriceSecond * diffDays;
                        self.productRentCost = self.productDailyRentalCost;
                        self.calculateTotalCost(0);
                    }
                }
                else {
                    self.productDailyRentalCost = self.productDailyRentalPriceSecond;
                    self.pickReturnDateStatus = false;
                    self.btnSendRentalReq = false;
                }
            },
        };
    };
    Details.prototype.demo = function () {
        console.log("Hey this is demo");
    };
    Details.prototype.dateCheck = function (from, to, check) {
        var fDate, lDate, cDate;
        fDate = Date.parse(from);
        lDate = Date.parse(to);
        cDate = Date.parse(check);
        if ((cDate <= lDate && cDate >= fDate)) {
            return true;
        }
        return false;
    };
    Details.prototype.bookedDateSet = function (ev) {
        console.log("booked dates");
    };
    Details.prototype.hideShowDeliveryOption = function (lat1, lng1) {
        //deliveryStatus
        //ownerProvideDelivery
        //deliveryDistance
        var _this = this;
        //true, means owner of product providing the delivery pickup
        if (this.ownerProvideDelivery) {
            this.storage.get('location').then(function (location) {
                if (_this.calculateDistance(lat1, lng1, location.lat, location.lng) <= _this.deliveryDistance) {
                    _this.deliveryStatus = true; //show delivery option
                }
                else {
                    _this.deliveryStatus = false; //hide delivery option
                }
            });
        }
        else {
            console.log("else ownerProvideDelivery");
        }
    };
    /*
    Function to set item rating
    */
    Details.prototype.setItemRating = function (rating) {
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
    Details.prototype.getUserRating = function (userId) {
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
    /**
     * Function to take user to other user profile page
    */
    Details.prototype.goToOtherProfile = function () {
        this.navCtrl.push(OtherprofilePage, {
            userId: this.productOwnerId,
            itemId: this.itemId
        });
    };
    Details.prototype.backicon = function () {
        this.navCtrl.pop();
    };
    Details.prototype.checker = function () {
        console.log('checker');
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
        console.log(diffDays);
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
    /**
     * function to send rental request
     */
    Details.prototype.sendrental = function () {
        var _this = this;
        console.log("send rental request");
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //sendRentalRequest(userId,postId,pickUpDate,returnDate,amount,itemOwnerFee,AdminFee,needDelivery,rentableServiceFee)
        this.itemprovider.sendRentalRequest(this.userId, this.itemId, this.pickUpDate, this.returnDate, this.productDailyRentalCost, this.itemOwnerFee, this.AdminFee, this.isDelivery == true ? 1 : 0, this.rentableServiceFee, this.productRentalCostWithoutFee)
            .subscribe(function (data) {
            _this.loading.dismiss();
            if (data.json().msg == "success") {
                _this.sendmessage();
                _this.markMessageAsUnRead();
                _this.showToast("Request has been sent successfully");
            }
            else {
                _this.showToast("You can rent this product again, once you return it");
            }
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    /**
     * Method to add message status as unread
     */
    Details.prototype.markMessageAsUnRead = function () {
        console.log("markMessageAsUnRead");
        this.chatprovider.markMessageAsUnread(this.userId, this.productOwnerId, this.itemId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    Details.prototype.sendmessage = function () {
        var _this = this;
        this.itemprovider.insertChatList(this.userId, this.productOwnerId, this.itemId)
            .subscribe(function (data) {
            //{"msg":"success","inserted_id":12}
            //{"msg":"error","data":"already added!"}
            console.log(data);
            if (data.json().msg == "success" || data.json().msg == "error") {
                _this.chatprovider.getChatRef(_this.userId, _this.productOwnerId, _this.itemId)
                    .then(function (chatRef) {
                    console.log(chatRef);
                    _this.af.list(chatRef).push({
                        from: _this.userId,
                        ownermsg: "Please confirm rental request, click here",
                        rentermsg: "Rental request pending approval",
                        type: "rental_request_show",
                        time: Date()
                    }).then(function () {
                        console.log("message sent successfully");
                        _this.navCtrl.pop();
                        // message is sent
                    }).catch(function () {
                        // some error. maybe firebase is unreachable
                        console.log("firebase unreachable");
                        _this.navCtrl.pop();
                    });
                });
            }
        });
    };
    Details.prototype.sendCommonMessage = function () {
        var _this = this;
        if (this.messagetext) {
            this.loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: "Sending..."
            });
            this.loading.present();
            this.itemprovider.insertChatList(this.userId, this.productOwnerId, this.itemId)
                .subscribe(function (data) {
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
                            console.log("message sent successfully");
                            _this.loading.dismiss();
                            _this.showToast("Message sent");
                            _this.notifyReceiver();
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
    Details.prototype.notifyReceiver = function () {
        console.log("Call is received to send message notification to user");
        this.chatprovider.sendMessageNotification(this.userId, this.productOwnerId).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    /**
     * This method used on following case:
     * 1.Sending rental request
     * 2.Sending message
     * uid represent fromId
     * productOwnerId represent toId
     * itemId represent itemId
     */
    Details.prototype.addChatList = function () {
        this.itemprovider.insertChatList(this.userId, this.productOwnerId, this.itemId)
            .subscribe(function (data) {
            if (data.json().msg == "success") {
                return true;
            }
            if (data.json().msg == "error") {
                return true;
            }
        });
        return false;
    };
    Details.prototype.addMarker = function () {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        var content = "<h4>Information!</h4>";
        this.addInfoWindow(marker, content);
    };
    Details.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    Details.prototype.ngOnInit = function () {
        this.toggle_footer(false);
    };
    Details.prototype.toggle_footer = function (show) {
        var _this = this;
        console.log('toggling');
        if (show) {
            document.querySelector(".detFooter")['style'].display = 'block';
            document.querySelector("page-details .scroll-content")['style'].marginBottom = 0;
            document.querySelector("page-details .fixed-content")['style'].marginBottom = 0;
            this.zone.run(function () {
                _this.showFooter = true;
            });
        }
        else {
            document.querySelector(".detFooter")['style'].display = 'none';
            document.querySelector("page-details .scroll-content")['style'].marginBottom = 0;
            document.querySelector("page-details .fixed-content")['style'].marginBottom = 0;
            this.zone.run(function () {
                _this.showFooter = false;
            });
        }
    };
    Details.prototype.MyCtrl = function ($scope, $ionicSlideBoxDelegate) {
        $scope.nextSlide = function () {
            $ionicSlideBoxDelegate.next();
        };
    };
    Details.prototype.goto = function () {
        this.content.scrollToBottom(300); //300ms animation speed
    };
    Details.prototype.detect_position = function () {
        if (this.content.scrollTop > document.querySelector('body').offsetHeight - 100) {
            return true;
        }
        else
            return false;
    };
    Details.prototype.scrollingFun = function (e) {
        if (e.scrollTop > this.contentHandle.getContentDimensions().contentHeight - 200) {
            this.toggle_footer(true);
        }
        else {
            this.toggle_footer(false);
        }
    };
    Details.prototype.presentModal = function () {
        var modal = this.modalCtrl.create(MapModal);
        modal.present();
    };
    Details.prototype.presentShare = function () {
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
    Details.prototype.ActiveLike = function () {
        this.like = !this.like;
    };
    Details.prototype.itemSelected = function () {
        console.log("hidden");
        this.descriptionstatus = false;
    };
    Details.prototype.stopPlayback = function () {
        console.log("show");
        this.descriptionstatus = true;
    };
    Details.prototype.rentalhide = function () {
        console.log("hidden");
        this.rentalstatus = false;
    };
    Details.prototype.rentalshow = function () {
        console.log("show");
        this.rentalstatus = true;
    };
    Details.prototype.locationhide = function () {
        console.log("hidden");
        this.locationstatus = false;
    };
    Details.prototype.locationshow = function () {
        var _this = this;
        console.log("show");
        this.locationstatus = true;
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
        //old code
        // Geolocation.getCurrentPosition().then((position) => {
        //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //   console.log(position.coords.latitude+","+position.coords.longitude);
        //   // var image = {
        //   //   url: 'assets/icon/location-place.png', // image is 256 x 256
        //   //   scaledSize : new google.maps.Size(60, 60),
        //   // };
        //   // let mapOptions = {
        //   //   center: latLng,
        //   //   zoom: 15,
        //   //   icon:image,
        //   //   mapTypeId: google.maps.MapTypeId.ROADMAP
        //   // }
        //   // //this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        //   // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        //   //  let infoWindow = new google.maps.InfoWindow({
        //   // });
        //   // let marker = new google.maps.Marker({
        //   //   position: latLng,
        //   //   map: this.map
        //   // });
        //   // //infoWindow.open(this.map,marker);
        //   //  marker.setMap(this.map);
        //    //testing
        //    var map = new google.maps.Map(document.getElementById('map'), {
        //       zoom: 15,
        //       center: {lat: position.coords.latitude, lng: position.coords.longitude},
        //       mapTypeId: 'terrain'
        //     });
        //       var cityCircle = new google.maps.Circle({
        //         strokeColor: '#FF0000',
        //         strokeOpacity: 0.8,
        //         strokeWeight: 2,
        //         fillColor: '#FF0000',
        //         fillOpacity: 0.35,
        //         map: map,
        //         center: {lat: position.coords.latitude, lng: position.coords.longitude},
        //         radius: 400
        //       });
        // }, (err) => {
        //   console.log(err);
        // });
    };
    /*
     This function takes in latitude and longitude of two location and returns the distance between them
    */
    Details.prototype.calculateDistance = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        var lat1 = this.toRad(lat1);
        var lat2 = this.toRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    //Converts numeric degrees to radians
    Details.prototype.toRad = function (Value) {
        return Value * Math.PI / 180;
    };
    Details.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: "top",
            duration: 2000
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], Details.prototype, "content", void 0);
    __decorate([
        ViewChild("contentRef"),
        __metadata("design:type", Content)
    ], Details.prototype, "contentHandle", void 0);
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], Details.prototype, "mapElement", void 0);
    Details = __decorate([
        Component({
            selector: 'page-details',
            templateUrl: 'details.html'
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
            Events,
            AngularFireDatabase,
            ImageViewerController,
            ProfileProvider,
            SocialSharing])
    ], Details);
    return Details;
}());
export { Details };
//# sourceMappingURL=details.js.map