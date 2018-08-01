import { Component, OnInit, ElementRef,ViewChild , NgZone  } from '@angular/core';
import { IonicPage,NavController, ModalController, NavParams, Content, ViewController,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { MapModal } from '../modal-page/modal-page';
import { ShareModal } from '../share-modal/share-modal';
import { Home } from '../home/home';
import { ItemsProvider } from '../../providers/items/items';
import { Geolocation} from 'ionic-native';
import { ChatProvider } from '../../providers/chat/chat';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate'
import { SocialSharing } from '@ionic-native/social-sharing';
import { ProfileProvider } from '../../providers/payment/profile';
import { AcceptPage } from '../accept/accept';
import { PickupPage } from '../pickup/pickup';
import { ClaimrenterPage } from '../claimrenter/claimrenter';
import { ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { ChatdetailPage } from '../chatdetail/chatdetail';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { PaymentProvider } from '../../providers/payment/payment';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
declare var google:any;

/**
 *It will show the details of items rent by me
 */

@IonicPage()
@Component({
  selector: 'page-details-rent',
  templateUrl: 'details-rent.html',
})

export class DetailsRentPage {

  @ViewChild(Content) content: Content;
  @ViewChild("contentRef") contentHandle: Content;
  @ViewChild('map') mapElement: ElementRef;

  showFooter= false;
  rentPage = RentPage;
  home=Home;
  claim=ClaimownerPage;
  pickupPage=PickupPage;
  otherprofile=OtherprofilePage;
  topOrBottom: String;
  contentBox;
  tabBarHeight;
  like: any;
  Product:any;
  descriptionstatus: boolean = true;
  rentalstatus: boolean = false;
  locationstatus: boolean = false;
  rent=RentPage;
  returnPage=AcceptPage;  //return process
  messagenumber:any;
  messagetext:any;
  itemId:any;
  itemconditiontext:any;
  itemgoodcondition:any;
  itembadcondition:any;
  goodcondition:any;
  badcondition:any;
  price:any;
  uid:any;
  fullname:any;
  date:any;
  itemowner:any;
  map: any;
  loading:any;
  sliderImages:any;
  productDailyRentalPrice:any;
  productDailyRentalPriceSecond:any;
  dailyPrice:any;
  userId:any;
  postedLocationLat:any;
  postedLocationLng:any;
  favourite:boolean;
  userRatingPos:any;
  userRatingNeg:any;
  //sharing info through facebook or twitter
  sharingInfo:any;
  productTitle:string;
  productDescription:string;
  productDailyRentalCost:any;
  totalRentCost:any;
  productImage:string;
  profilePic:string;
  basePath:string;

  //pick up and return date
  pickUpDate:any;
  returnDate:any;
  toolTip:any;
  //hide show button
  btnSendRentalReq:boolean=false;
  btnPickUp:boolean=false;
  btnReturn:boolean=false;
  btnCancel:boolean=false;
  btnDateSelection:boolean=false;
  pickReturnDateStatus:boolean=false;
  testDate:any;

  pAmount:any;
  pRentleCostWithoutFee:any;
  pRentableServiceFee:any;
  pItemOwnerFee:any;
  pFromDate:any;
  pToDate:any;
  pStatus:any;
  nItemRating:any;
  itemOwnerId;
  //product owner id
  productOwnerId:any;
  pNeedDelivery:any;
  pDeliveryFee:any;

  todayDate:any;
  todayMonth:any;
  todayYear:any;
  chargeCancelFeeStatus:boolean;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public myElement: ElementRef,
    public modalCtrl: ModalController,
    public zone:NgZone,
    public viewCtrl: ViewController,
    public itemprovider: ItemsProvider,
    public chatProvider: ChatProvider,
    public loadingCtrl:LoadingController,
    public storage:Storage,
    public af:AngularFireDatabase,  
    public chatprovider: ChatProvider,
    public authProvider:AuthenticateProvider,
    public paymentProvider:PaymentProvider,
    public toastCtrl:ToastController,
    public alertCtrl:AlertController,
    public socialSharing: SocialSharing,
    public profileProvider:ProfileProvider) {

    this.Product=[];
    this.messagetext="";
    this.messagenumber=350;
    this.itemgoodcondition=[];
    this.itembadcondition=[];
    this.userRatingNeg=[];
    this.userRatingPos=[];

  }

  ionViewDidLoad(){
    console.log("details renta page");
    this.itemId=this.navParams.get("itemId");
    this.pAmount=this.navParams.get("amount");
    this.pStatus=this.navParams.get("status");
    this.pRentleCostWithoutFee=this.navParams.get("rentalCostWithoutFee");
    this.pRentableServiceFee=this.navParams.get("rentableServiceFee");
    this.pItemOwnerFee=this.navParams.get("itemOwnerFee");
    this.getItemDetails();
    this.goto();
  }

  number(){
    var n=this.messagetext.length;
    this.messagenumber=350-n;
  }


	ActiveFavourite(){
	this.favourite=true;
	this.itemprovider.addRemoveFavourite(this.userId,this.itemId,1).subscribe(
	  data=>{
	   },
    );
    
	}

   DeactiveFavourite(){
    this.favourite=false;
    this.itemprovider.addRemoveFavourite(this.userId,this.itemId,0).subscribe(
      data=>{
      },
    );

  }

									  
  /*
  Function to get item details 
  */
  getItemDetails(){
    console.log('rahul');
    this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });

      
    this.loading.present();
       
    //data contain userid
    this.storage.get('userId').then((uid)=>{      
      console.log("DetailsId="+uid);
      this.userId=uid;
      this.itemprovider.getItemDetailWithBookedDates(this.itemId,uid).subscribe(
      data=>{

          this.loading.dismiss();  
          console.log(data.json());
         if(data.json().msg=="success"){
           this.Product=data.json().PostData[0];
            console.log(this.userId+','+this.Product.userId+','+this.Product.id)
           
           //splitting images to array
           this.sliderImages=this.Product.image.split('|');
           this.productDailyRentalPrice=this.Product.dailyrentalPrice.split('.');
           //Info to share via facebook or twitter
           this.productTitle=this.Product.title;
           this.productDescription=this.Product.details;
           this.productDailyRentalCost=this.Product.dailyrentalPrice;
           this.productDailyRentalPriceSecond=this.Product.dailyrentalPrice;
           this.productImage=this.Product.image_single;
           this.postedLocationLat=this.Product.lat;
           this.postedLocationLng=this.Product.lng;
           this.basePath=data.json().base_path;
           //favourite or not
           this.favourite=this.Product.favourite==0?false:true;
           //username
           this.fullname=this.Product.user_details.firstName+" "+this.Product.user_details.lastName;
           //base url
           this.profilePic=this.basePath+this.Product.user_details.photoURL;
           this.nItemRating=this.Product.currentcondition;
            //product owner id
           this.productOwnerId=this.Product.user_details.id;
           this.pNeedDelivery=this.Product.needDelivery;
           this.pDeliveryFee=this.Product.deliveryfee; 

           if(this.productDailyRentalPrice[1]=="00"){
             this.dailyPrice=this.productDailyRentalPrice[0];
           }else{
             this.dailyPrice=this.Product.dailyrentalPrice;
           }

         this.setUserRating(this.Product.userId);
         this.setItemRating(this.Product.currentcondition);
         //this.hideOrShowOptionBasedOnItemStatus(this.Product.status);
         this.hideOrShowOptionBasedOnItemStatus(this.pStatus);
        //from and to date
        var fromDateStr = this.navParams.get("fromDate");
        var toDateStr = this.navParams.get("toDate");
        var fromDateRes = fromDateStr.split("-");
        var toDateRes = toDateStr.split("-");
        this.pFromDate=fromDateRes[2]+"/"+fromDateRes[1]+"/"+fromDateRes[0].slice(2);
        this.pToDate=toDateRes[2]+"/"+toDateRes[1]+"/"+toDateRes[0].slice(2);
         
        //date format month/day/year
        var fromDateSecond=fromDateRes[1]+"/"+fromDateRes[2]+"/"+fromDateRes[0].slice(2)
        this.checkCancelOption(fromDateSecond);
      }

      },
      err=>{
        this.showToast("Unable to fetch data, please try again later");
        this.loading.dismiss();
        this.navCtrl.pop();
          console.log();
      },
      ()=>{
      }

      );

    });//end of storage

  }

  /**
   * Function to cancellation period, if user cance within 48 hours then there will be a cancellation fee
   */
  checkCancelOption(fromDatee){
    console.log('FromDatee--->'+fromDatee);
    this.todayDate = new Date();
    var dd = this.todayDate.getDate();
    var mm = this.todayDate.getMonth()+1; //January is 0!
    var yyyy = this.todayDate.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    this.todayDate = mm + '/' + dd + '/' + yyyy;
    var d1 = new Date(this.todayDate);
    var d2 = new Date(fromDatee);
    var timeDiff = d2.getTime() - d1.getTime();
    var DaysDiff = timeDiff / (1000 * 3600 * 24);
    this.chargeCancelFeeStatus=DaysDiff <=2  && this.pStatus!='Pending' ? true : false;  

  }

  /*
  Function to set item rating
  */
  setItemRating(rating){
    //product rating
    for (var i=0; i < rating;  i++) {
        this.itemgoodcondition[i]=i;
    }  

    for (var j=0; j < 5-this.Product.currentcondition;  j++) {
      this.itembadcondition[j]=j;
    }
  }

  /*
  Function to set user rating
  */
  setUserRating(userId){

    let rating:any ;
    //product rating
     this.profileProvider.getRating(userId).subscribe(
       (data)=>{
         rating=data.json().AverageRating;
         console.log(rating);
       if(data.json().msg=="success"){
 
         if(rating>0 && rating<1)
         {
           rating=0
         }
         if(rating>=1 && rating<2)
         {
           rating=1;
         }
         if(rating>=2 && rating<3)
         {
           rating=2;
         }
         if(rating>=3 && rating<4)
         {
           rating=3;
         }
         if(rating>=4 && rating<5)
         {
           rating=4;
         }
         if(rating>=5)
         {
           rating=5;
         }
 
 
         console.log("Rating=",rating);
         for (var i=0; i < rating;  i++) {
                  this.userRatingPos[i]=i;
              }  
    
          for (var j=0; j < 5-rating;  j++) {
            this.userRatingNeg[j]=j;
          } 
       }
       },
     err=>{
 
     }
     );
 
    
    //  for (var i=0; i < rating;  i++) {
    //           this.userRatingPos[i]=i;
    //       }  

    //   for (var j=0; j < 5-this.Product.rating;  j++) {
    //     this.userRatingNeg[j]=j;
    //   } 
  
  }


  /*
   Method to hide or show option based on item status
   below are the possibility of having item status
   1.available(not handle in this page)
   2.pending
   3.rented
   4.picked up
   5.returned
  */
  hideOrShowOptionBasedOnItemStatus(status){

    console.log("DETAIL-RENT-STATUS=",status);
  	switch (status) {
  		case "Pending":
			/*
			1 - Send rental request button must be disabled
			2 - "Pick Up" button is disabled
			3 - Return button is disabled
			4 - Cancel button is enabled
			5 - Dates selection button is disabled
			*/	  			
			this.btnSendRentalReq=false;
			this.btnPickUp=false;
			this.btnReturn=false;
			this.btnCancel=true;
      this.btnDateSelection=false;
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
  		this.btnSendRentalReq=false;
			this.btnPickUp=true;
			this.btnReturn=false;
			this.btnCancel=true;
      this.btnDateSelection=false;
      this.setToolTipInfo();
  		break;
      case "PickedUp":
  		/*
			1 - Send rental request button text is now "Extend Rental" and it must be disabled
			2 - "Pick Up" button is disabled
			3 - Return button is enabled
			4 - Cancel button is disabled
  		*/
      console.log("pickedUp")
      this.btnSendRentalReq=false;
      this.btnPickUp=false;
      this.btnReturn=true;
      this.btnCancel=false;
      this.btnDateSelection=false;
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

  }

  setToolTipInfo(){
    console.log("setToolTipInfo");
    if(this.pNeedDelivery==1){
      this.toolTip="Rental Cost = $"+this.pRentleCostWithoutFee+" Service Fee = $"+this.pRentableServiceFee+" Delivery Fee = $"+this.pDeliveryFee;
    }else{
      this.toolTip="Rental Cost = $"+this.pRentleCostWithoutFee+" Service Fee = $"+this.pRentableServiceFee;
    }
  }

	goToPickUpScreen(){
    this.navCtrl.push(this.pickupPage,{
      itemId:this.itemId,
      itemRating:this.nItemRating,
      itemOwnerId:this.productOwnerId
    });
	}

	goToReturnScreen(){
    console.log(this.Product.PickupRating);
    this.navCtrl.push(this.returnPage,{
      itemId:this.itemId,
      itemRating:this.Product.PickupRating,
      itemOwnerId:this.productOwnerId      
    });
	}
  	
  goToCancelScreen(){
    console.log("Go to cancel screen");
    if(this.chargeCancelFeeStatus){
      //we need to charge cancellation fee from user
      this.presentCancelRequestPrompt("There will be a 1 day fee for the cancellation",0);
    }else{
      // no need to charge the cancellation fee
      this.presentCancelRequestPrompt("Are you sure you want to cancel the rental request",1);
    }

    // if(this.pStatus== "Rented"){
    //   this.presentCancelRequestPrompt("There will be a 1 day fee for the cancellation");
    // }else{
    //   this.presentCancelRequestPrompt("Are you sure you want to cancel the rental request");
    // }
    
  }

  goToOtherProfile(){
    console.log();
    this.navCtrl.push(OtherprofilePage,{
      userId:this.productOwnerId,
      itemId:this.itemId
    })
  }

  backicon(){
    this.navCtrl.pop();
    
  }

  checker(){
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


      
      if(diffDays!=null){

          if(diffDays==0){
              this.productDailyRentalCost=this.productDailyRentalPriceSecond;
          }else{
             this.btnSendRentalReq=true;
             this.productDailyRentalCost=this.productDailyRentalCost*diffDays;    
          }
        
      }else{
        this.btnSendRentalReq=false;
      }


  }


  sendmessage(){

    if(this.messagetext){
      console.log("true msg");
      this.messagetext="";
      //{"msg":"success","inserted_id":12}
      //{"msg":"error","data":"already added!"}

        this.chatProvider.getChatRef(this.userId,this.productOwnerId,this.itemId)
              .then((chatRef:any)=>{
                console.log(chatRef);
                
                this.af.list(chatRef).push({
                  from: this.userId,
                  message: this.messagetext,
                  type: "normal",
                  time: Date()
                }).then( () => {
                  console.log("message sent successfully");
                  this.showToast("Message sent")
                  
                  // message is sent
                }).catch( () => {
                // some error. maybe firebase is unreachable
                console.log("firebase unreachable");
              });
    
            }); 
    }
    
  }


  sendCommonMessage(){
    console.log("Call is received to send message");
    if(this.messagetext){
      this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Sending...`
      }); 
      this.loading.present();
      this.itemprovider.insertChatList(this.userId, this.productOwnerId,this.itemId)
      .subscribe(data =>{
        //{"msg":"success","inserted_id":12}
        //{"msg":"error","data":"already added!"}
        console.log(data.json());
        if(data.json().msg=="success" || data.json().msg=="error"){

          this.chatprovider.getChatRef(this.userId,this.productOwnerId,this.itemId)
                .then((chatRef:any)=>{
                  console.log(chatRef);
                  this.af.list(chatRef).push({
                    from: this.userId,
                    message: this.messagetext,
                    type: "normal",
                    time: Date()
                  }).then( () => {
                    this.messagetext="";
                    this.loading.dismiss();
                    this.notifyReceiver();
                    this.showToastSimple("Message sent");
                    // message is sent
                  }).catch( () => {
                  // some error. maybe firebase is unreachable
                  this.loading.dismiss();
                  console.log("firebase unreachable");
                });
      
              }); 
           }else{
            this.loading.dismiss();
           }
  
      }, 
      );
  
      }else{
        console.log("false msg");
      }
    }


     /**
   * Method to used send notifcation
   */
  notifyReceiver(){
    console.log("Call is received to send message notification to user");
    this.chatprovider.sendMessageNotification(this.userId, this.productOwnerId).subscribe(
      data=>{
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    )
  }

  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = "<h4>Information!</h4>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }



  goto(){
    this.content.scrollToBottom(300);//300ms animation speed
  }




  presentModal() {
    let modal = this.modalCtrl.create(MapModal);
    modal.present();
  }

  presentShare() {

    // let Share = this.modalCtrl.create(ShareModal,{
    //   productTitle:this.productTitle,
    //   productDescription:this.productDescription,
    //   productDailyRentalCost:this.productDailyRentalCost,
    //   productImage:this.productImage});
    //  Share.present();

    let message=this.productDescription+" and daily rental price is $"+this.productDailyRentalCost;
    let subject=this.productTitle;
    this.socialSharing.share(message,subject,this.basePath+this.productImage, this.basePath+this.productImage).
    then(() => {
      //this.showToast("Sharing success");
    }).catch(() => {
      //Error!
      //this.showToast("Share failed");
    });
  }

  ActiveLike(){
    this.like = !this.like;
  }

  itemSelected(){
    console.log("hidden");
    this.descriptionstatus = false;
  }
  stopPlayback(){
    console.log("show");
    this.descriptionstatus = true
  }

  rentalhide(){
    console.log("hidden");
    this.rentalstatus = false;
  }
  rentalshow(){
    console.log("show");
    this.rentalstatus = true
  }

  locationhide(){
    console.log("hidden");
    this.locationstatus = false;
  }


  locationshow(){
    console.log("show");
    this.locationstatus = true

     console.log(this.postedLocationLng);


     Geolocation.getCurrentPosition().then((position) => {

      var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: {lat: parseFloat(this.postedLocationLat),  lng: parseFloat(this.postedLocationLng)},
      mapTypeId: 'terrain'
    });


      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {lat: parseFloat(this.postedLocationLat) , lng: parseFloat(this.postedLocationLng)},
        radius: 400
      });

       }, (err) => {
      console.log(err);
    });

  }

  sendCancelRequest(){
    console.log("item id="+this.itemId);
    console.log("user id="+this.userId);


     this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });

    this.loading.present();
    this.itemprovider.cancelItemRequest(this.userId, this.itemId ,"renter")
    .subscribe(data =>{
        this.loading.dismiss();

       if(data.json().msg=="success"){
            this.showToast("Request has been cancel successfully");
            // this.chatProvider.sendMessage(this.userId,this.productOwnerId,this.itemId,"Rental request to the item has been cancelled","cancel")
            this.chatProvider.sendMessageRental(this.userId,this.productOwnerId,this.itemId,"cancel_req_by_renter","The rental request has been cancelled by the renter","You have cancelled the rental");
            this.markMessageAsUnRead();
          }else{
           this.showToast("You are not able send request again");
       }
    }, 
    err =>{
      this.loading.dismiss();
      this.showToast("Please try again later");
    });


  }

  markMessageAsUnRead(){
    console.log("markMessageAsUnRead");
    this.chatprovider.markMessageAsUnread(this.userId,this.productOwnerId,this.itemId).subscribe(
      data=>{
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    )
  }

  showToast(msg:string) {
       const toast = this.toastCtrl.create({
        message: msg,
        position:"top",
        duration:2000
      });

      toast.onDidDismiss(()=>{
        this.navCtrl.pop();
       });

      toast.present();
   }

   showToastSimple(msg:string) {
    const toast = this.toastCtrl.create({
     message: msg,
     position:"top",
     duration:2000
   });

   toast.onDidDismiss(()=>{
    
    });

   toast.present();
}


  presentCancelRequestPrompt(msg,id){
     let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: msg,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            if(id==0){
               // console.log(this.userId+','+this.Product.userId+','+this.Product.id);
                // this.chatprovider.getChatRef(this.userId, this.Product.userId,this.Product.id)
                //       .then((chatRef:any)=>{
                //         console.log(chatRef);
                //         this.chatprovider.DeleteAllChatItems(chatRef);
                // });
              //cancellation fee applied
               this.cancelRequestWithCancellationFee();
            }else{
               //console.log(this.userId+','+this.Product.userId+','+this.Product.id);
                // this.chatprovider.getChatRef(this.userId, this.Product.userId,this.Product.id)
                //       .then((chatRef:any)=>{
                //         console.log(chatRef);
                //         this.chatprovider.DeleteAllChatItems(chatRef);
                // });
              //no cancellation fee applied
              this.sendCancelRequest();
            }
          }
        }
      ]
    });
    alert.present();
    }


    cancelRequestWithCancellationFee(){


    this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
    });

    this.loading.present();
    this.paymentProvider.captureCancellationAmount(this.userId, this.itemId,this.dailyPrice)
    .subscribe(data =>{
      this.loading.dismiss();
      console.log(data.json());
      if(data.json().msg=="succeeded"){
        this.sendCancelRequest();
      }else{
        this.showToast(data.json().msg_details);
      }
    }, 
    err =>{
      this.loading.dismiss();
      this.showToast("Please try again later");
    });

    }
}
