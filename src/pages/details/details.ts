import { Component, OnInit, ElementRef,ViewChild , NgZone  } from '@angular/core';
import { NavController, ModalController, NavParams, Content, ViewController,LoadingController,ToastController,Events } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { MapModal } from '../modal-page/modal-page';
import { ShareModal } from '../share-modal/share-modal';
import { Home } from '../home/home';
import { ItemsProvider } from '../../providers/items/items';
import { ProfileProvider } from '../../providers/payment/profile';
import { Geolocation} from 'ionic-native';
import { ChatProvider } from '../../providers/chat/chat';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate'
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AcceptPage } from '../accept/accept';
import { PickupPage } from '../pickup/pickup';
import { ClaimrenterPage } from '../claimrenter/claimrenter';
import { ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { ChatdetailPage } from '../chatdetail/chatdetail';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { ImageViewerController } from 'ionic-img-viewer';
import { DatePipe } from '@angular/common';
import { mobiscroll, MbscRangeOptions } from '@mobiscroll/angular';
declare var google:any;

let now = new Date(),
    today = new Date(new Date().setDate(new Date().getDate() ));

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class Details implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild("contentRef") contentHandle: Content;
  @ViewChild('map') mapElement: ElementRef;

  showFooter= false;
  rentPage = RentPage;
  home=Home;
  claim=ClaimownerPage;
  pickup=PickupPage;
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
  return=AcceptPage;  //return process
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
  productRentCost:any;
  productRentalCostWithoutFee:any;
  productImage:string;
  profilePic:string;
  basePath:string;
  //pick up and return date format to send to serve
  pickUpDate:any;
  returnDate:any;
  myDate:string;
  //date to show on ui
  pickUpDateUi:any;
  returnDateUi:any;
  //hide show button
  btnSendRentalReq:boolean;
  btnPickUp:boolean;
  btnReturn:boolean;
  btnCancel:boolean;

  pickReturnDateStatus:boolean;
  testDate:any;
  toolTip:any;
  isDelivery:boolean;

  //delivery related to item
  ownerProvideDelivery:any;
  deliveryDistance:any;
  deliveryFee:any;
  deliveryStatus:boolean;
  productOwnerId:any;
  itemOwnerFee:any;
  AdminFee:any;
  rentableServiceFee:any;
  btnSendMessage:boolean;
  bookedDates:any;
  min: Date;
  daterangeSettings: any;
  dateSelectedFrom:any;
  dateSelectedTo:any;
  cardStatus:any;
  securityDepositText:any;
  securityDepositText2:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public myElement: ElementRef,
    public modalCtrl: ModalController,
    public zone:NgZone,
    public viewCtrl: ViewController,
    public itemprovider: ItemsProvider,
    public chatprovider: ChatProvider,
    public loadingCtrl:LoadingController,
    public storage:Storage,
    public authProvider:AuthenticateProvider,
    public toastCtrl:ToastController,
    public events:Events, 
    public af:AngularFireDatabase,
    public ivc:ImageViewerController,
    public profileProvider:ProfileProvider,
    public socialSharing: SocialSharing
    )  {

    // this.Product ={
    //   img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', ownername: 'John', item_title:'house', price:'25', description:'this is good rentalable book please use this Thanks', selectdate:'', total_cost:'100'}
    
    this.itemId=navParams.get("itemId");
    console.log(this.itemId);
    this.Product=[];
    this.ionViewLoaded();
    this.messagetext="";
    this.messagenumber=350;
    this.itemgoodcondition=[];
    this.itembadcondition=[];
    this.userRatingNeg=[];
    this.userRatingPos=[];
    this.bookedDates=[];

    this.myDate="Select Pick Date";

    //getting current date
    this.myDate = new Date().toISOString();
    //set button status to false
    this.btnSendRentalReq=false;
    this.btnPickUp=true;
    this.btnReturn=true;
    this.btnCancel=true;
    this.pickReturnDateStatus=false;
    this.isDelivery=false;
    this.deliveryStatus=false;
    this.btnSendMessage=false;


  }

  ionViewDidLoad(){
   console.log("Detail Page");
   this.getItemDetails();
   this.addItemViewOrLike();
  }

  testImage(img){
    console.log(img);
  }

  ionViewDidEnter(){
   console.log("Detail Page ionViewDidEnter");
   this.storage.get('CARD_STATUS').then((data)=>{
     this.cardStatus=data;
    });
  }

  /**
   * Not Used
   */
  openCalendar() {

          this.isDelivery=false;
          const options: CalendarModalOptions = {
            pickMode: 'range',
            title: 'Select Date',
            color:'dark'
          };
          let myCalendar = this.modalCtrl.create(CalendarModal, {
            options: options,
            format:'DD-MM-YYYY'  
          });
          myCalendar.present();
          myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {

            console.log(date);
              
            if(type=='done'){

                //d-m-y
                this.pickUpDate=date.from.years+"-"+date.from.months+"-"+date.from.date
                this.returnDate=date.to.years+"-"+date.to.months+"-"+date.to.date;

                var fromMonth=date.from.months>9? date.from.months: "0"+date.from.months;
                var toMonth=date.to.months>9? date.to.months: "0"+date.to.months;
                //to show on ui
                this.pickUpDateUi=date.from.date+"/"+fromMonth+"/"+date.from.years;
                this.returnDateUi=date.to.date+"/"+toMonth+"/"+date.to.years;

                var date1 = new Date(date.from.string);
                var date2 = new Date(date.to.string);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))+1; 
                if(diffDays!=null){
                    this.pickReturnDateStatus=true;
                    if(diffDays==0){
                        this.productDailyRentalCost=this.productDailyRentalPriceSecond;
                        this.btnSendRentalReq=false;
                    }else{
                        
                       this.btnSendRentalReq=true;
                       this.productDailyRentalCost=this.productDailyRentalPriceSecond*diffDays;
                       this.productRentCost=this.productDailyRentalCost;  
                       this.calculateTotalCost(0);    
                    }
                  }else{
                      this.productDailyRentalCost=this.productDailyRentalPriceSecond;
                      this.pickReturnDateStatus=false;
                      this.btnSendRentalReq=false;
                  }
              }else{
                    //no
                    this.pickReturnDateStatus=false;
                    this.btnSendRentalReq=false;
              }
          });

    }


  calculateTotalCost(withOrWithoutDelivery){
    //calculateTotalCost :: cost,Isdelivery,DeliveryPickUpFee
    //this.favourite=this.Product.favourites==0?false:true;
    //this.deliveryFee=withOrWithoutDelivery==1?this.deliveryFee:0;
    this.itemprovider.getTotalRentalCost(this.productRentCost,withOrWithoutDelivery,withOrWithoutDelivery==1?this.deliveryFee:0).subscribe(
      data=>{
          this.productDailyRentalCost=data.json().Renter.Total;
          this.itemOwnerFee=data.json().Owner.Total;
          this.AdminFee=data.json().Admin.ServiceFee;
          this.rentableServiceFee =data.json().Renter.RenterServiceFee;
          this.productRentalCostWithoutFee=data.json().Renter.RentalCost;
         if(withOrWithoutDelivery==1){
           //include delivery fee
           this.toolTip="Rental Cost = $"+data.json().Renter.RentalCost+ "                    Service Fee = $"+data.json().Renter.RenterServiceFee+"                    Delivery Fee = $"+data.json().Renter.DeliveryPickUpFee;
         }else{
          this.toolTip="Rental Cost = $"+data.json().Renter.RentalCost+"  Service Fee = $"+data.json().Renter.RenterServiceFee;
         }
      }
      );
  }  

  ionViewLoaded(){
    this.loadMap();
  }

  loadMap(){

  }

  /**
   * cardStatus 
   * 1 user added the card and sending message functionality available to user
   * 0 user didn't attached the card and message functionality not available to user
   */
  number(){
    if(this.cardStatus==1){  
      var n=this.messagetext.length;
      if(n>0){
        this.messagenumber=350-n;
        this.btnSendMessage=true;
      }else{
        this.btnSendMessage=false;
      }
    }

  }

  /*
  function to check whether user need delivery of product from user or not
  case:1 add delivery amount 
  case:0 no include delivery amount
  */
  needDelivery(){
    if(this.isDelivery){
        this.calculateTotalCost(1);
    }else{
      this.calculateTotalCost(0);
    }
  }

  /*
  function to add view or likes
  */
  addItemViewOrLike(){

    this.storage.get('userId').then((id)=>{      
    this.itemprovider.addItemViewOrLikes(this.itemId,"views").subscribe(
      data=>{
         console.log(data.json());       
      });
    });//end of storage
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

    console.log("ItemId="+this.itemId);
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
         if(data.json().msg=="success"){
           this.Product=data.json().PostData[0];
           //splitting images to array
           this.sliderImages=data.json().PostData[0].image.split('|');
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
           //delivery
           this.ownerProvideDelivery=this.Product.delivery==1?true:false;
           this.deliveryDistance=this.Product.distance;
           this.deliveryFee=this.Product.deliveryfee;
           //favourite or not
           this.favourite=this.Product.favourite==0?false:true;
           //username
           this.fullname=this.Product.user_details.firstName+" "+this.Product.user_details.lastName;
           //base url
           this.profilePic=this.basePath+this.Product.user_details.photoURL;
          // //product owner id
          this.productOwnerId=this.Product.user_details.id
          //security deposit text
          this.securityDepositText="Security deposit for this item is :$"+this.Product.securityDeposit;
          this.securityDepositText2=" DON'T WORRY, your money won't be touched unless the owner makes a claim, in case there's a problem when the item is returned. But you will be asked for confirmation first"
          if(this.productDailyRentalPrice[1]=="00"){
           this.dailyPrice=this.productDailyRentalPrice[0];
         }else{
           this.dailyPrice=this.Product.dailyrentalPrice
         }
         this.getUserRating(this.Product.userId);
         this.setItemRating(this.Product.currentcondition);
         this.hideShowDeliveryOption(this.postedLocationLat,this.postedLocationLng);
         //this.disableBookedDates(this.Product.BookingDate);
         //var str=this.Product;
         if(this.Product.hasOwnProperty('BookingDate')){
            this.disableBookedDates(this.Product.BookingDate);
         }else{
            this.displayWithoutBookedDates();
        }

         }else{
           //no response
           this.showToast("Unable to fetch data, please try again later");
           this.navCtrl.pop();
           this.loading.dismiss();
         }

      },
      err=>{
        this.showToast("Unable to fetch data, please try again later");
        this.navCtrl.pop();
        this.loading.dismiss();
        console.log();
      },
      ()=>{
          
      }

      );

    });//end of storage


  }

  displayWithoutBookedDates(){
    console.log("Display without booked dates");
    let  self=this;
    this.daterangeSettings= {
      min:today,
      theme:'range-custom-rentable',
      layout:'liquid',
      animate:'flip',
      fromText:'Pick Up Date',
      toText:'Return Date',
      onSet: function (event, inst) {
        /**
         * Index contain
         * 0=month
         * 1=day
         * 2=year
         */
        let fromDateAr,toDateAr;
        let data=event.valueText.split('-');
        fromDateAr=data[0].split('/');
        toDateAr=data[1].split('/');

        //format to send to server
        self.pickUpDate=(fromDateAr[2]+"-"+fromDateAr[0]+"-"+fromDateAr[1]).replace(/\s+/, "");
        self.returnDate=(toDateAr[2]+"-"+toDateAr[0]+"-"+toDateAr[1]).replace(/\s+/, "");


        //format to show on ui
        self.pickUpDateUi=(fromDateAr[1]+"/"+fromDateAr[0]+"/"+fromDateAr[2].slice(2)).replace(/\s+/, "");
        self.returnDateUi=(toDateAr[1]+"/"+toDateAr[0]+"/"+toDateAr[2].slice(2)).replace(/\s+/, "");

        var date1 = new Date(data[0]);
        var date2 = new Date(data[1]);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))+1; 
        if(diffDays!=null){
            self.pickReturnDateStatus=true;
            if(diffDays==0){
                self.productDailyRentalCost=self.productDailyRentalPriceSecond;
                self.btnSendRentalReq=false;
            }else{
              if(self.cardStatus==1){
                self.btnSendRentalReq=true;
              }else{
                self.btnSendRentalReq=false;
              }
               self.productDailyRentalCost=self.productDailyRentalPriceSecond*diffDays;
               self.productRentCost=self.productDailyRentalCost;   
               self.calculateTotalCost(0);
            }
          }else{
              self.productDailyRentalCost=self.productDailyRentalPriceSecond;
              self.pickReturnDateStatus=false;
              self.btnSendRentalReq=false;
          }
        
      },
  };
  }

  disableBookedDates(bookedDates){


    let self=this;
     for(let index in bookedDates){
         let arrayData={start:bookedDates[index].start,end:bookedDates[index].end,text:'Booked Dates'}
         this.bookedDates.push(arrayData);
     } 

     console.log("BOOKED==",this.bookedDates);
     console.log("TODAY=",today);
     this.daterangeSettings= {
      invalid:this.bookedDates,
      min:today,
      theme:'range-custom-rentable',
      layout:'liquid',
      animate:'flip',
      fromText:'Pick Up Date',
      toText:'Return Date',
      onDayChange: function(event, inst) {
        
        if(event.active=="start"){
          self.dateSelectedFrom=new DatePipe('en-US').transform(event.date, 'yyyy-MM-dd');
        }

        if(event.active=="end"){
          self.dateSelectedTo=new DatePipe('en-US').transform(event.date, 'yyyy-MM-dd');
          if(Date.parse(self.dateSelectedFrom) < Date.parse(self.dateSelectedTo)){
          }else{
            return false;
          }

          for(let i in self.bookedDates ){
              if(self.dateCheck(self.dateSelectedFrom,self.dateSelectedTo,self.bookedDates[i].start)){
                return false;
              }else{
                
               
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
        let fromDateAr,toDateAr;
        let data=event.valueText.split('-');
        fromDateAr=data[0].split('/');
        toDateAr=data[1].split('/');
        

        //format to send to server
        self.pickUpDate=(fromDateAr[2]+"-"+fromDateAr[0]+"-"+fromDateAr[1]).replace(/\s+/, "");
        self.returnDate=(toDateAr[2]+"-"+toDateAr[0]+"-"+toDateAr[1]).replace(/\s+/, "");

        //format to show on ui
        self.pickUpDateUi=(fromDateAr[1]+"/"+fromDateAr[0]+"/"+fromDateAr[2].slice(2)).replace(/\s+/, "");
        self.returnDateUi=(toDateAr[1]+"/"+toDateAr[0]+"/"+toDateAr[2].slice(2)).replace(/\s+/, "");
        
        var date1 = new Date(data[0]);
        var date2 = new Date(data[1]);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))+1; 

        if(diffDays!=null){
            self.pickReturnDateStatus=true;
            if(diffDays==0){
                self.productDailyRentalCost=self.productDailyRentalPriceSecond;
                self.btnSendRentalReq=false;
            }else{
               if(self.cardStatus==1){
                self.btnSendRentalReq=true; 
              }else{
                self.btnSendRentalReq=false;
              }
               self.productDailyRentalCost=self.productDailyRentalPriceSecond*diffDays;
               self.productRentCost=self.productDailyRentalCost;   
              
               self.calculateTotalCost(0);
            }
          }else{
              self.productDailyRentalCost=self.productDailyRentalPriceSecond;
              self.pickReturnDateStatus=false;
              self.btnSendRentalReq=false;
          }
        
      },
  };
  }

  demo(){
    console.log("Hey this is demo");
  }

  dateCheck(from,to,check) {
    let fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);
    
    if((cDate <= lDate && cDate >= fDate)) {
        
        return true;
    }
    return false;
}

  bookedDateSet(ev){
    console.log("booked dates");
  }

  hideShowDeliveryOption(lat1,lng1){
    //deliveryStatus
    //ownerProvideDelivery
    //deliveryDistance


    //true, means owner of product providing the delivery pickup
    if(this.ownerProvideDelivery){
        this.storage.get('location').then((location) => {
        if(this.calculateDistance(lat1,lng1,location.lat,location.lng)<=this.deliveryDistance){
            this.deliveryStatus=true;//show delivery option
        
        }else{
          this.deliveryStatus=false;//hide delivery option
        }  

      });
    }else{
      console.log("else ownerProvideDelivery");
    }
    }
  /*
  Function to set item rating
  */
  setItemRating(rating){
   

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
  getUserRating(userId){
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

  /** 
   * Function to take user to other user profile page
  */
  goToOtherProfile(){
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

      console.log(diffDays);
      
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

  /**
   * function to send rental request
   */
  sendrental(){
     
     console.log("send rental request");
     this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });

    this.loading.present();
    //sendRentalRequest(userId,postId,pickUpDate,returnDate,amount,itemOwnerFee,AdminFee,needDelivery,rentableServiceFee)
    this.itemprovider.sendRentalRequest(this.userId, this.itemId, this.pickUpDate,this.returnDate, this.productDailyRentalCost,this.itemOwnerFee,this.AdminFee,this.isDelivery==true?1:0,this.rentableServiceFee,this.productRentalCostWithoutFee )
    .subscribe(data =>{
      this.loading.dismiss();
      if(data.json().msg=="success"){
            this.sendmessage();
            this.markMessageAsUnRead(); 
            this.showToast("Request has been sent successfully");
      }else{
           this.showToast("You can rent this product again, once you return it");
      }
    }, 
    err =>{
      this.loading.dismiss();
    });
  }


  /**
   * Method to add message status as unread 
   */
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


  sendmessage(){
    this.itemprovider.insertChatList(this.userId, this.productOwnerId,this.itemId)
    .subscribe(data =>{
      //{"msg":"success","inserted_id":12}
      //{"msg":"error","data":"already added!"}
      console.log(data);
      if(data.json().msg=="success" || data.json().msg=="error"){

        this.chatprovider.getChatRef(this.userId,this.productOwnerId,this.itemId)
              .then((chatRef:any)=>{
                console.log(chatRef);
                this.af.list(chatRef).push({
                  from: this.userId,
                  ownermsg:"Please confirm rental request, click here",
                  rentermsg:"Rental request pending approval",
                  type: "rental_request_show",
                  time: Date()
                }).then( () => {
                  console.log("message sent successfully");
                  this.navCtrl.pop();
                  // message is sent
                }).catch( () => {
                // some error. maybe firebase is unreachable
                console.log("firebase unreachable");
                this.navCtrl.pop();
              });
    
            }); 
         }

    }, 
    );

  
  }

  sendCommonMessage(){
    
  if(this.messagetext){
    this.loading=this.loadingCtrl.create({
      spinner:'bubbles',
      content:`Sending...`
    }); 
    this.loading.present();
    this.itemprovider.insertChatList(this.userId, this.productOwnerId,this.itemId)
    .subscribe(data =>{
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
                  console.log("message sent successfully");
                  this.loading.dismiss();
                  this.showToast("Message sent")
                  this.notifyReceiver();
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


  /**
   * This method used on following case:
   * 1.Sending rental request
   * 2.Sending message 
   * uid represent fromId
   * productOwnerId represent toId
   * itemId represent itemId
   */
  addChatList():any{

    this.itemprovider.insertChatList(this.userId, this.productOwnerId,this.itemId)
    .subscribe(data =>{
      if(data.json().msg=="success"){
        return true;
      }
      if(data.json().msg=="error"){
        return true;
      }
    }, 
    );
    return false;
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

  ngOnInit(){
    this.toggle_footer(false);
  }

  toggle_footer(show){
    console.log('toggling');
    if(show){
    document.querySelector(".detFooter")['style'].display = 'block';
    document.querySelector("page-details .scroll-content")['style'].marginBottom = 0;
    document.querySelector("page-details .fixed-content")['style'].marginBottom = 0;
    this.zone.run(()=>{
      this.showFooter = true;
    })

    }else{
      document.querySelector(".detFooter")['style'].display = 'none';
      document.querySelector("page-details .scroll-content")['style'].marginBottom = 0;
      document.querySelector("page-details .fixed-content")['style'].marginBottom = 0;
      this.zone.run(()=>{
      this.showFooter = false;
      })
    }
  }

  MyCtrl($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }
  }

  goto(){
    this.content.scrollToBottom(300);//300ms animation speed
  }

  detect_position(){
      if(this.content.scrollTop > document.querySelector('body').offsetHeight  -100) {
        return true;
      }
      else return false;
  }

  scrollingFun(e){
      if(e.scrollTop > this.contentHandle.getContentDimensions().contentHeight - 200){
      this.toggle_footer(true);
    } else{
        this.toggle_footer(false);
    }
  }

  presentModal() {
    let modal = this.modalCtrl.create(MapModal);
    modal.present();
  }

  presentShare() {
  
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

  }



  /*
   This function takes in latitude and longitude of two location and returns the distance between them
  */
    calculateDistance(lat1:any, lon1:any, lat2:any, lon2:any):any 
    {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    //Converts numeric degrees to radians
    toRad(Value):any 
    {
        return Value * Math.PI / 180;
    }


  showToast(msg:string) {
       const toast = this.toastCtrl.create({
        message: msg,
        position:"top",
        duration:2000
      });
       toast.onDidDismiss(()=>{
        
       });
      toast.present();
   }
   
}