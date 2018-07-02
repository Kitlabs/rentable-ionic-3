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
import { NavController, ModalController, NavParams, Content, ViewController, LoadingController, ToastController } from 'ionic-angular';
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
var Details = /** @class */ (function () {
    function Details(navCtrl, navParams, myElement, modalCtrl, zone, viewCtrl, itemprovider, chatprovider, loadingCtrl, storage, authProvider, toastCtrl) {
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
        this.myDate = "Select Pick Date";
        /*this.itemprovider.Getitemdetail(this.detailitem ).subscribe(data=>{
          this.Product=data.json().result.item;
          this.itemowner=data.json().result.user;
          this.uid = this.itemowner._id;
          //this.fullname = data.json().result.user.firstName + " " + data.json().result.user.lastName;
          this.fullname="john bell";
          console.log('owner',this.itemowner);
          for (var i=0; i < this.Product.condition;  i++) {
            this.itemgoodcondition[i]=i;
          }
          for (var j=0; j < 5-this.Product.condition;  j++) {
            this.itembadcondition[j]=j;
          }
          if(this.Product.condition<=1)
          {
            this.itemconditiontext = "POOR";
          }
          if(this.Product.condition==2)
          {
            this.itemconditiontext = "FAIR";
          }
          if(this.Product.condition==3)
          {
            this.itemconditiontext = "GOOD";
          }
          if(this.Product.condition==4)
          {
            this.itemconditiontext = "VERY GOOD";
          }
          if(this.Product.condition==5)
          {
            this.itemconditiontext = "EXCELLENT";
          }
    
        },
        err =>{
          console.log(err);
        });*/
        //getting current date
        this.myDate = new Date().toISOString();
        //set button status to false
        this.btnSendRentalReq = false;
        this.btnPickUp = true;
        this.btnReturn = true;
        this.btnCancel = true;
        this.pickReturnDateStatus = false;
    }
    Details.prototype.ionViewDidLoad = function () {
        this.getItemDetails();
        this.addItemViewOrLike();
    };
    Details.prototype.openCalendar = function () {
        var _this = this;
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
                _this.pickUpDate = date.from.date + "-" + date.from.months + "-" + date.from.years;
                _this.returnDate = date.to.date + "-" + date.to.months + "-" + date.to.years;
                ;
                var date1 = new Date(date.from.string);
                var date2 = new Date(date.to.string);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
                console.log(diffDays);
                if (diffDays != null) {
                    _this.pickReturnDateStatus = true;
                    if (diffDays == 0) {
                        _this.productDailyRentalCost = _this.productDailyRentalPriceSecond;
                        _this.btnSendRentalReq = false;
                    }
                    else {
                        _this.btnSendRentalReq = true;
                        //this.productDailyRentalCost=this.productDailyRentalPriceSecond*diffDays;
                        _this.calculateTotalCost(_this.productDailyRentalPriceSecond);
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
    Details.prototype.calculateTotalCost = function (totalCost) {
        var _this = this;
        this.itemprovider.getTotalRentalCost(totalCost, "0").subscribe(function (data) {
            _this.productDailyRentalCost = data.json().Renter.Total;
            console.log(_this.productDailyRentalCost);
            _this.toolTip = "Rental Cost = " + data.json().Renter.RentalCost + "           Rentable Service Fee = " + data.json().Renter.ServiceFee;
        });
    };
    Details.prototype.getReturnDate = function () {
        // this.datePicker.show({
        //   date: new Date(),
        //   mode: 'date'
        // }).then(
        //   date =>this.returnDate=date,
        //   err => console.log('Error occurred while getting date: ', err)
        // );
    };
    Details.prototype.getPickUpDate = function () {
        // this.datePicker.show({
        //   date: new Date(),
        //   mode: 'date'
        // }).then(
        //   date =>this.pickUpDate=date,
        //   err => console.log('Error occurred while getting date: ', err)
        // );
    };
    Details.prototype.ionViewLoaded = function () {
        this.loadMap();
    };
    Details.prototype.loadMap = function () {
    };
    Details.prototype.number = function () {
        var n = this.messagetext.length;
        this.messagenumber = 350 - n;
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
                    if (_this.productDailyRentalPrice[1] == "00") {
                        _this.dailyPrice = _this.productDailyRentalPrice[0];
                    }
                    else {
                        _this.dailyPrice = _this.Product.dailyrentalPrice;
                    }
                    _this.setUserRating(_this.Product.rating);
                    _this.setItemRating(_this.Product.currentcondition);
                    if (_this.Product.currentcondition <= 1) {
                        _this.itemconditiontext = "POOR";
                    }
                    if (_this.Product.currentcondition == 2) {
                        _this.itemconditiontext = "FAIR";
                    }
                    if (_this.Product.currentcondition == 3) {
                        _this.itemconditiontext = "GOOD";
                    }
                    if (_this.Product.currentcondition == 4) {
                        _this.itemconditiontext = "VERY GOOD";
                    }
                    if (_this.Product.currentcondition == 5) {
                        _this.itemconditiontext = "EXCELLENT";
                    }
                }
                else {
                    //no response
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
    Details.prototype.setItemRating = function (rating) {
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
    Details.prototype.setUserRating = function (rating) {
        for (var i = 0; i < rating; i++) {
            this.userRatingPos[i] = i;
        }
        for (var j = 0; j < 5 - this.Product.rating; j++) {
            this.userRatingNeg[j] = j;
        }
    };
    Details.prototype.goToOtherProfile = function () {
        this.navCtrl.push(OtherprofilePage, {
            userId: this.userId,
            itemId: this.itemId
        });
    };
    Details.prototype.backicon = function () {
        this.navCtrl.pop();
    };
    Details.prototype.checker = function () {
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
    Details.prototype.sendrental = function () {
        var _this = this;
        console.log("send rental request");
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        //sendRentalRequest(userId,postId,pickUpDate,returnDate,amount) 
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
    Details.prototype.sendmessage = function () {
        // this.chatprovider.addChats(this.uid, this.itemowner._id);
        // console.log('id-----',this.itemowner._id);
        // let param = {uid: this.uid, interlocutor: this.itemowner._id, message: this.messagetext};
        // this.navCtrl.push(ChatdetailPage,param);
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
        var Share = this.modalCtrl.create(ShareModal, {
            productTitle: this.productTitle,
            productDescription: this.productDescription,
            productDailyRentalCost: this.productDailyRentalCost,
            productImage: this.productImage
        });
        Share.present();
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
    Details.prototype.showToast = function (msg) {
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
            ToastController])
    ], Details);
    return Details;
}());
export { Details };
//# sourceMappingURL=details.js.map