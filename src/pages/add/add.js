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
import { NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { PostdetailPage } from '../postdetail/postdetail';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { Postitemprovider } from '../../providers/items/postitem';
import { Storage } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64';
import { ImageResizer } from '@ionic-native/image-resizer';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
var AddPage = /** @class */ (function () {
    function AddPage(navCtrl, navParams, imagepicker, cropservice, camera, alertCtrl, storage, loadingCtrl, authProvider, base64, postitemprovider, imageResizer, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.imagepicker = imagepicker;
        this.cropservice = cropservice;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.authProvider = authProvider;
        this.base64 = base64;
        this.postitemprovider = postitemprovider;
        this.imageResizer = imageResizer;
        this.app = app;
        this.postdetail = PostdetailPage;
        //select image from gallery
        this.imageurlfrompicker = "";
        this.imageurlfromresizer = "";
        this.imagebase64 = "";
        this.testImage = "";
        //not used
        this.categorygrid = [
            { img: 'assets/icon/camera.png', title: 'apartment', icon: 'ios-home-outline', price: '20', favourity: '21' },
            { img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie-outline', price: '12', favourity: '11' },
            { img: 'assets/img/03.png', title: 'shop', icon: 'ios-shirt-outline', price: '12', favourity: '34' },
            { img: 'assets/img/04.png', title: 'rent', icon: 'ios-headset-outline', price: '32', favourity: '21' },
            { img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home', price: '31', favourity: '15' },
            { img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie', price: '34', favourity: '65' },
            { img: 'assets/img/03.png', title: 'shop', icon: 'md-cart', price: '42', favourity: '23' },
            { img: 'assets/img/04.png', title: 'rent', icon: 'md-headset', price: '20', favourity: '21' },
            { img: 'assets/img/01.png', title: 'apartment', icon: 'ios-home', price: '20', favourity: '21' },
            { img: 'assets/img/02.png', title: 'wedding hall', icon: 'ios-bowtie', price: '20', favourity: '21' },
            { img: 'assets/img/03.png', title: 'shop', icon: 'md-cart', price: '20', favourity: '21' },
            { img: 'assets/img/04.png', title: 'rent', icon: 'md-headset', price: '20', favourity: '21' }
        ];
        this.categorylist = [
            { active_img: 'assets/icon/cat-electronics-red.png', title: 'Electronics', inactive_img: 'assets/icon/cat-electronics-grey.png', value: 'electronicss', radionumber: 'postradio2', titleSecond: 'a' },
            { active_img: 'assets/icon/cat-cars-red.png', title: 'Cars and motors', inactive_img: 'assets/icon/cat-cars-grey.png', value: 'carss', radionumber: 'postradio3', titleSecond: 'b' },
            { active_img: 'assets/icon/cat-sports-red.png', title: 'Sports and leisure', inactive_img: 'assets/icon/cat-sports-grey.png', value: 'sports', radionumber: 'postradio4', titleSecond: 'c' },
            { active_img: 'assets/icon/cat-home-red.png', title: 'Home and garden', inactive_img: 'assets/icon/cat-home-grey.png', value: 'homes', radionumber: 'postradio5', titleSecond: 'd' },
            { active_img: 'assets/icon/cat-movies-red.png', title: 'Movies and music', inactive_img: 'assets/icon/cat-movies-grey.png', value: 'moviess', radionumber: 'postradio6', titleSecond: 'e' },
            { active_img: 'assets/icon/cat-fashion-red.png', title: 'Fashion and accessories', inactive_img: 'assets/icon/cat-fashion-grey.png', value: 'fashion', radionumber: 'postradio7', titleSecond: 'f' },
            { active_img: 'assets/icon/cat-baby-red.png', title: 'Baby and child', inactive_img: 'assets/icon/cat-baby-grey.png', value: 'babys', radionumber: 'postradio8', titleSecond: 'g' },
            { active_img: 'assets/icon/cat-tools-red.png', title: 'Tools and machines', inactive_img: 'assets/icon/cat-tools-grey.png', value: 'toolss', radionumber: 'postradio9', titleSecond: 'h' },
            { active_img: 'assets/icon/cat-party-red.png', title: 'Party and Events', inactive_img: 'assets/icon/cat-party-grey.png', value: 'partys', radionumber: 'postradio10', titleSecond: 'i' },
            { active_img: 'assets/icon/cat-other-red.png', title: 'Other', inactive_img: 'assets/icon/cat-other-grey.png', value: 'others', radionumber: 'postradio11', titleSecond: 'j' }
        ];
    }
    /*
    Function to take image from camera
    */
    AddPage.prototype.takephoto = function () {
        var _this = this;
        var options = {
            quality: 40,
            targetHeight: 1280,
            targetWidth: 1280,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
            _this.imagelist.push(_this.base64Image);
            _this.imagelist.reverse();
            _this.photos.push(imageData);
            document.getElementById("next").style.color = "#ffffff";
        });
    };
    /*
    function to get image from gallery using camera picker
    */
    AddPage.prototype.getImageFromGalleryUsingCamera = function () {
        var _this = this;
        var options = {
            quality: 40,
            targetHeight: 1280,
            targetWidth: 1280,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
            _this.imagelist.push(_this.base64Image);
            _this.imagelist.reverse();
            _this.photos.push(imageData);
            document.getElementById("next").style.color = "#ffffff";
        });
    };
    /*
    Function to get image from gallery
    */
    AddPage.prototype.getimage = function () {
        var _this = this;
        this.options = {
            maximumImagesCount: 5,
            quality: 50,
            width: 800,
            height: 800,
            outputType: 1
        };
        this.imagepicker.getPictures(this.options).then(function (imageData) {
            console.log(imageData.length);
            for (var i = 0; i < imageData.length; i++) {
                console.log('here is base64 string: ', imageData);
                //encoded base64 string
                _this.testImage = imageData;
                _this.imagelist.push(imageData);
                _this.imagelist.reverse();
                _this.photos.push(imageData);
                document.getElementById("next").style.color = "#ffffff";
            }
        }, function (err) { return console.log('uh oh'); });
        //new try
    };
    //26feb 
    AddPage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 5,
            quality: 50,
            width: 800,
            height: 800,
        };
        this.photos = new Array();
        this.imagepicker.getPictures(options)
            .then(function (results) {
            _this.reduceImagess(results).then(function () {
                console.log('all images cropped!!');
            });
        }, function (err) { console.log(err); });
    };
    AddPage.prototype.reduceImagess = function (selected_pictures) {
        /*let options = {
             uri: selected_pictures,
             quality: 50,
             width: 800,
             height: 800
            } as ImageResizerOptions;*/
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                /*return this.imageResizer.resize(options).then((filePath:string)=>{
        
                        this.base64.encodeFile(filePath)
                                .then(base64File => {
                                    this.testImage=base64File;
                                    this.imagelist.push(base64File);
                                    this.imagelist.reverse();
                                    var strImage = base64File.replace(/^data:image\/[a-z]+;base64,/, "");
                                    this.photos.push(strImage);
                                    document.getElementById("next").style.color = "#ffffff";
                            })
        
        
                  });*/
                return _this.cropservice.crop(item)
                    .then(function (filePath) {
                    _this.base64.encodeFile(filePath)
                        .then(function (base64File) {
                        _this.testImage = base64File;
                        _this.imagelist.push(base64File);
                        _this.imagelist.reverse();
                        var strImage = base64File.replace(/^data:image\/[a-z]+;base64,/, "");
                        _this.photos.push(strImage);
                        document.getElementById("next").style.color = "#ffffff";
                    });
                });
            });
        }, Promise.resolve());
    };
    AddPage.prototype.saveUserImageFromGallery = function () {
        var _this = this;
        this.options = {
            maximumImagesCount: 5,
            quality: 50,
            width: 800,
            height: 800,
            outputType: 0
        };
        this.imagepicker.getPictures(this.options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.resizeAndSave(results[i]);
            }
        });
        // return this.imagepicker.getPictures(this.options)
        //     .then((results) => {
        //         return this.resizeAndSave(results[0]);
        //     }, () => {
        //         console.log('Error picking image');
        //     });
    };
    AddPage.prototype.resizeAndSave = function (imageUri) {
        var _this = this;
        this.cropservice.crop(imageUri)
            .then(function (filePath) {
            console.log('new image path is: ' + filePath);
            _this.base64.encodeFile(filePath)
                .then(function (base64File) {
                console.log('here is base64 string: ', base64File);
                //encoded base64 string
                _this.testImage = base64File;
                _this.imagelist.push(base64File);
                _this.imagelist.reverse();
                _this.photos.push(base64File);
            });
        }, function (error) { return console.error('Error cropping image', error); });
        // this.cropservice.crop(imageUri).then((croppedUri) => {
        //          this.imageResizer
        //             .resize({
        //                 folderName: 'image',
        //                 uri: croppedUri,
        //                 quality: 50,
        //                 width: 300,
        //                 height: 300,
        //                 fileName: Date.now() + '.jpg'
        //             })
        //             .then((filePath: string) => {
        //                  this.base64.encodeFile(filePath)
        //                     .then(base64File => {
        //                         console.log('here is base64 string: ', base64File);
        //                         //encoded base64 string
        //                         this.testImage=base64File;
        //                         this.imagelist.push(base64File);
        // this.imagelist.reverse();
        // this.photos.push(base64File);
        //                     })
        //             })
        //             .catch(() => {
        //                 console.log('Error resizing image');
        //             });
        //     },
        //     () => {
        //          console.log('Error cropping image');
        //     })
    };
    //Not used
    AddPage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropservice.crop(item)
                    .then(function (cropped_image) { return _this.imagelist.push(cropped_image); });
            });
        }, Promise.resolve());
    };
    AddPage.prototype.gopostdetail = function () {
        console.log("go to post details");
        if (this.photos.length > 0) {
            this.storage.set('image', this.photos);
            this.navCtrl.setRoot(PostdetailPage);
        }
        else {
            //this.navCtrl.setRoot(PostdetailPage); 
            //this.presentAlert("Atleast 1 photo is required");
        }
    };
    AddPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.imagelist = [];
        this.photos = [];
        // this.base64Image = "data:image/jpeg;base64," + this.test;
        // this.imagelist.push(this.base64Image);
        // this.photos.push(this.test);
        // this.base64Image = "data:image/jpeg;base64," + this.test;
        // this.imagelist.push(this.base64Image);
        // this.photos.push(this.test);
        if (this.navParams.get("type") == "edit") {
            this.getPostDetails(this.navParams.get("itemId"));
            this.editStatus = true;
        }
        else {
            this.storage.get('postid').then(function (id) {
                if (id) {
                    _this.editStatus = true;
                    _this.getPostDetails(id);
                }
                else {
                    _this.getSavedImages();
                }
            });
        }
    };
    AddPage.prototype.getPostDetails = function (postid) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "Please wait.."
        });
        this.loading.present();
        this.postitemprovider.getPostDetail(postid).subscribe(function (data) {
            console.log(data);
            _this.loading.dismiss();
            if (data.json().msg == "success") {
                console.log("LENGTH==", data.json().data[0].image.image.length);
                //ADD POST IMAGE
                for (var i = 0; i < data.json().data[0].image.image.length; i++) {
                    _this.base64Image = "data:image/jpeg;base64," + data.json().data[0].image.image[i];
                    _this.imagelist.push(_this.base64Image);
                    _this.imagelist.reverse();
                    _this.photos.push(data.json().data[0].image.image[i]);
                }
                //ADD POST DETAILS
                _this.storage.set("status", "true");
                _this.storage.set("postid", data.json().data[0].id);
                _this.storage.set("itemTitle", data.json().data[0].title);
                _this.storage.set("itemCategory", data.json().data[0].category);
                _this.storage.set("itemConditionMark", data.json().data[0].currentcondition);
                _this.storage.set("itemConditionTitle", data.json().data[0].details);
                //CATEGORY DETAILS
                for (var i = 0; i < _this.categorylist.length; ++i) {
                    if (_this.categorylist[i].title == data.json().data[0].category) {
                        console.log("MATCHED");
                        var selected = {
                            "catStatus": "true",
                            "catTitle": _this.categorylist[i].titleSecond,
                            "catValue": _this.categorylist[i].value,
                            "catId": i
                        };
                        console.log("SELECTED_CATEGORY=", selected);
                        _this.storage.set("categorySelectedd", selected);
                    }
                    else {
                        console.log("DIDN'T MATCH");
                    }
                }
                //ADD POST COST
                _this.storage.set("dailyPrice", Math.floor(data.json().data[0].dailyrentalPrice));
                _this.storage.set("fairPrice", Math.floor(data.json().data[0].securityDeposit));
                _this.storage.set("distance", Math.floor(data.json().data[0].distance));
                document.getElementById("next").style.color = "#ffffff";
            }
            else {
                _this.presentAlert("Please try again later");
            }
        }, function (err) {
            _this.loading.dismiss();
            _this.presentAlert("Please check your internet connection");
            console.log(err);
        }, function () {
            console.log("complete");
        });
    };
    AddPage.prototype.getSavedImages = function () {
        var _this = this;
        console.log("Call is received to get saved images");
        document.getElementById("next").style.color = "#ffffff66";
        this.nextDisabled = false;
        //GETTING PREVOUSLY SAVE IMAGE
        this.storage.get('image').then(function (data) {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    _this.base64Image = "data:image/jpeg;base64," + data[i];
                    _this.imagelist.push(_this.base64Image);
                    _this.imagelist.reverse();
                    _this.photos.push(data[i]);
                }
                document.getElementById("next").style.color = "#ffffff";
                _this.storage.set('image', null);
            }
            else {
                document.getElementById("next").style.color = "#ffffff66";
            }
        });
        //GETTING USER ID
        this.storage.get('userId').then(function (id) {
            _this.authProvider.getUserDetail(id).subscribe(function (data) {
                //TO PROCEED FURTHER, USER NEED TO BANK ACCOUNT TO RECEIVE MONEY			 	
                if (data.json().msg == 'success' && data.json().bankstatus == 0) {
                    _this.presentBankAttachPrompt("You need to add a bank account to your profile so you can receive rental payments. Please add this before posting an item for rent");
                    console.log("bank not  attached");
                }
                else {
                    console.log("bank attached");
                }
            }, function (err) {
                _this.presentBankAttachPrompt("Please try again later");
            });
        });
    };
    AddPage.prototype.presentBankAttachPrompt = function (subTitle) {
        var _this = this;
        console.log("Call is received to show bank attach prompt");
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        _this.app.getRootNav().getActiveChildNav().select(0);
                    }
                }
            ]
        });
        alert.present();
    };
    AddPage.prototype.ionViewWillLeave = function () {
        console.log("ionViewWillLeave");
    };
    /*
    Method to delete image
    */
    AddPage.prototype.deleteImage = function (index) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: "Sure you want to delete this photo? There is NO undo!",
            message: "",
            buttons: [
                {
                    text: "No",
                    handler: function () {
                        console.log("Disagree clicked");
                    }
                },
                {
                    text: "Yes",
                    handler: function () {
                        console.log("Agree clicked");
                        _this.imagelist.splice(index, 1);
                        _this.photos.splice(index, 1);
                        console.log("DeleteCount=", _this.imagelist.length);
                        if (_this.imagelist.length > 0) {
                            console.log("greater");
                            document.getElementById("next").style.color = "#ffffff";
                        }
                        else {
                            console.log("lower");
                            document.getElementById("next").style.color = "#ffffff66";
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    AddPage.prototype.closeScreen = function () {
        console.log("Call is received to close ");
        if (this.editStatus) {
            this.closeEditPrompt();
        }
        else {
            this.closeNewPostPrompt();
        }
    };
    AddPage.prototype.closeEditPrompt = function () {
        var _this = this;
        if (this.photos.length > 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Confirm',
                message: 'Do you want to discontinue and information will not saved',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: function () {
                            console.log("clicked cancel");
                            //this.storage.set('image',null);
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            console.log("clicked yes");
                            _this.storage.set('image', null);
                            _this.app.getRootNav().getActiveChildNav().select(1);
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            this.app.getRootNav().getActiveChildNav().select(0);
            //this.navCtrl.setRoot(Home);
        }
    };
    AddPage.prototype.closeNewPostPrompt = function () {
        var _this = this;
        if (this.photos.length > 0) {
            var alert_2 = this.alertCtrl.create({
                title: 'Confirm',
                message: 'Do you want to save your information before closing?',
                buttons: [
                    {
                        text: 'No',
                        handler: function () {
                            console.log("clicked cancel");
                            _this.storage.set('image', null);
                            _this.app.getRootNav().getActiveChildNav().select(0);
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            console.log("clicked yes");
                            _this.storage.set('image', _this.photos);
                            _this.app.getRootNav().getActiveChildNav().select(0);
                        }
                    }
                ]
            });
            alert_2.present();
        }
        else {
            this.app.getRootNav().getActiveChildNav().select(0);
            //this.navCtrl.setRoot(Home);
        }
    };
    //method used to present alert to user
    AddPage.prototype.presentAlert = function (subTitle) {
        var alert = this.alertCtrl.create({
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    };
    AddPage = __decorate([
        Component({
            selector: 'page-add',
            templateUrl: 'add.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ImagePicker,
            Crop,
            Camera,
            AlertController,
            Storage,
            LoadingController,
            AuthenticateProvider,
            Base64,
            Postitemprovider,
            ImageResizer,
            App])
    ], AddPage);
    return AddPage;
}());
export { AddPage };
//# sourceMappingURL=add.js.map