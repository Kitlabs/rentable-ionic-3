import { Component, OnInit, ElementRef,ViewChild , NgZone  } from '@angular/core';
import { IonicPage,NavController, ModalController, NavParams,App, Content, ViewController,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { MapModal } from '../modal-page/modal-page';
import { ShareModal } from '../share-modal/share-modal';
import { Home } from '../home/home';
import { ItemsProvider } from '../../providers/items/items';
import { Geolocation} from 'ionic-native';
import { ChatProvider } from '../../providers/chat/chat';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate'
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
import { SocialSharing } from '@ionic-native/social-sharing';
import { AddPage } from '../add/add';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
declare var google:any;

@IonicPage()
@Component({
  selector: 'page-own-post-detail',
  templateUrl: 'own-post-detail.html',
})
export class OwnPostDetailPage {

  @ViewChild(Content) content: Content;
  @ViewChild("contentRef") contentHandle: Content;
  @ViewChild('map') mapElement: ElementRef;

  showFooter= false;
  topOrBottom: String;
  contentBox;
  tabBarHeight;
  like: any;
  Product:any;
  descriptionstatus: boolean = true;
  rentalstatus: boolean = false;
  locationstatus: boolean = false;
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
  productImage:string;
  profilePic:string;
  basePath:string;
  toolTip:any;
  //pick up and return date
  pickUpDate:any;
  returnDate:any;
  RenterId:any
  //hide show button
  btnSendRentalReq:boolean=false;
  btnPickUp:boolean=false;
  btnReturn:boolean=false;
  btnCancel:boolean=false;
  btnDateSelection:boolean=false;
  pickReturnDateStatus:boolean=false;
  rentelDetailStatus:boolean=true;
  notAvailableStatus:boolean=false;
  testDate:any;

  pAmount:any;
  pRentleCostWithoutFee:any;
  pRentableServiceFee:any;
  pItemOwnerFee:any;
  pFromDate:any;
  pToDate:any;
  pStatus:any;
  nItemRating:any;
  //product owner id
  productOwnerId:any;

  pNeedDelivery:any;
  pDeliveryFee:any;
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
    public authProvider:AuthenticateProvider,
    public toastCtrl:ToastController,
    public socialSharing: SocialSharing,
    public app:App,
    public alertCtrl:AlertController,
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
    this.pAmount=this.navParams.get("amount");//11
    this.pStatus=this.navParams.get("status");
    this.RenterId=this.navParams.get("renterId");
    this.pRentleCostWithoutFee=this.navParams.get("rentalCostWithoutFee");//10
    this.pRentableServiceFee=this.navParams.get("rentableServiceFee");//1
    this.pItemOwnerFee=this.navParams.get("itemOwnerFee");
    
    this.getItemDetails();
    this.goto();
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


  editPost(){
    console.log("Call is received to edit post ");
    this.navCtrl.push(AddPage,{
      type:'edit',
      itemId:this.itemId
    })
 
  }
									  
  /*
  Function to get item details 
  */
  getItemDetails(){

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
         this.hideOrShowOptionBasedOnItemStatus(this.pStatus);

        if(this.pStatus!="Available"){  
          //from and to date
          var fromDateStr = this.navParams.get("fromDate");
          var toDateStr = this.navParams.get("toDate");
          var fromDateRes = fromDateStr.split("-");
          var toDateRes = toDateStr.split("-");

          this.pFromDate=fromDateRes[2]+"/"+fromDateRes[1]+"/"+fromDateRes[0].slice(2);
          this.pToDate=toDateRes[2]+"/"+toDateRes[1]+"/"+toDateRes[0].slice(2);

          
        }
      }

      },
      err=>{
        this.loading.dismiss();
        this.showToast("Unable to fetch data, please try again later");
        this.navCtrl.pop();
          console.log();
      },
      ()=>{
          
      }

      );

    });//end of storage


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

  }

  setToolTipInfo(){
    console.log("setToolTipInfo");
    //this.toolTip="Rental Cost = $"+this.pRentleCostWithoutFee+" Service Fee = $"+this.pRentableServiceFee;

    console.log("NEED DELIVERY=",this.pNeedDelivery);
    if(this.pNeedDelivery==1){
      this.toolTip="Rental Cost = $"+this.pRentleCostWithoutFee+" Service Fee = $"+this.pRentableServiceFee+" Delivery Fee = $"+this.pDeliveryFee;
    }else{
      this.toolTip="Rental Cost = $"+this.pRentleCostWithoutFee+" Service Fee = $"+this.pRentableServiceFee;
    }
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
    
    console.log("OWN-POST-DETAIL-STATUS=",status);
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
      this.btnSendRentalReq=false;
			this.btnPickUp=false;
			this.btnReturn=false;
			this.btnCancel=false;
			this.btnDateSelection=false;
      this.pickReturnDateStatus=false;
      this.rentelDetailStatus=false;
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
			this.btnSendRentalReq=false;
			this.btnPickUp=false;
			this.btnReturn=false;
			this.btnCancel=true;
			this.btnDateSelection=false;
      this.pickReturnDateStatus=false;
      this.rentelDetailStatus=true;
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
  		this.btnSendRentalReq=false;
			this.btnPickUp=false;
			this.btnReturn=false;
			this.btnCancel=true;
			this.btnDateSelection=false;
      this.rentelDetailStatus=true;
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
      console.log("pickedUp")
      this.btnSendRentalReq=false;
      this.btnPickUp=false;
      this.btnReturn=false;
      this.btnCancel=false;
      this.btnDateSelection=false;
      this.rentelDetailStatus=true;
      this.setToolTipInfo();
  		break;

      case "PickedUpPending":
      case "ReturnedPending":
  		case "returned":	
      this.btnSendRentalReq=false;
      this.btnPickUp=false;
      this.btnReturn=false;
      this.btnCancel=false;
      this.btnDateSelection=false;
      this.rentelDetailStatus=true;
      this.setToolTipInfo();
  		break;
  			
  		default:
        console.log("default");
  			// code...
  		break;
  	}

  }


  	
  goToCancelScreen(){
  	console.log("Go to cancel screen");
    this.presentCancelRequestPrompt();
  }


  backicon(){
    this.navCtrl.pop();
    
  }



  sendmessage(){
    
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
   // this.content.scrollToBottom(300);//300ms animation speed
  }





  presentShare() {

    //   let Share = this.modalCtrl.create(ShareModal,{
    //   productTitle:this.productTitle,
    //   productDescription:this.productDescription,
    //   productDailyRentalCost:this.productDailyRentalCost,
    //   productImage:this.basePath+this.productImage});
    //   Share.present();
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
     this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });

    this.loading.present();
    this.itemprovider.cancelItemRequest(this.RenterId,this.itemId,"vendor")
    .subscribe(data =>{
      this.loading.dismiss();
       if(data.json().msg=="success"){
            this.showToast("Request has been cancel successfully");
            //this.chatProvider.sendMessage(this.userId,this.productOwnerId,this.itemId,"Rental request to the item has been cancelled","cancel");
            this.chatProvider.sendMessageRental(this.userId,this.RenterId,this.itemId,"cancel_req_by_owner","You have cancelled the rental","The rental request has been cancelled by the owner")
       }else{
           this.showToast("You are not able send request again");
       }
    }, 

    err =>{

    });


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


  presentCancelRequestPrompt(){

     let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to cancel this rental ?',
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
            this.sendCancelRequest();
          }
        }
      ]
    });
    alert.present();
    }

}
