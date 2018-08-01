import { Component, ViewChild } from '@angular/core';
import { NavController,IonicPage, NavParams, ModalController, Navbar,ToastController,LoadingController,AlertController, Alert } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PaymentProvider } from '../../providers/payment/payment';
import { ProfileProvider } from '../../providers/payment/profile';
import { Home } from '../home/home';
import { RejectPage } from '../reject/reject';
import { AcceptPage } from '../accept/accept';
import { Details } from '../details/details';
import { Filter } from '../filter/filter';
import { ItemsProvider } from '../../providers/items/items';
import { ChatProvider } from '../../providers/chat/chat'
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-review-pick-return',
  templateUrl: 'review-pick-return.html',
})
export class ReviewPickReturnPage {
  @ViewChild(Navbar) navBar: Navbar;

  home = Home;
  accept = AcceptPage;
  rentreject=RejectPage;
  detail=Details;
  condition:number[] = [0, 1, 2, 3, 4];
  goodcondition:any;
  Product: any;
  renter:any;
  userId:any;
  requesterId:any;
  requestedItemId:any;
  rentalRequestDetails:any;
  msgKey:any;
  chatRef:any;
  basePath:any;
  userRatingPos:any;
  userRatingNeg:any;
  renterItemRatingPos:any;
  renterItemRatingNeg:any;
  ownerItemRatingPos:any;
  ownerItemRatingNeg:any;
  toolTip:any;
  fromDate:any;
  toDate:any;
  loading:any;
  pickOrReturn:any;
  title:any;

  
  pickUpRatingPos:any;
  pickUpRatingNeg:any;
  pickUpRatingTitle:any;
  returnRatingPos:any;
  returnRatingNeg:any;

  titleOne:any;
  titleTwo:any;
  pickReturnRatingStatus:boolean;
  renterComment:any;
  commentFromRenterStatus:boolean=false;
  ownermsg:any;
  rentermsg:any;
  returnSectionStatus:boolean=true;
  info:any;
  chargeData:any;
  authData:any;
  /**to differential between whether item is picked or returned 
   * true:PickedUp
   * false:Returned
  */ 
  status:boolean;
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private storage:Storage,
    private itemprovider:ItemsProvider,
    private toastCtrl:ToastController,
    private profileProvider:ProfileProvider,
    private paymentProvider:PaymentProvider,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private af:AngularFireDatabase, 
    private chatProvider:ChatProvider) {

    this.goodcondition=[];
    this.chargeData=[];

    for (var i = 0; i < 3; ++i) {
      this.goodcondition[i]=true;
    }

    for (var i = 3; i < 5; ++i) {
      this.goodcondition[i]=false;
    }

  	this.Product ={
      img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', ownername: 'John', item_title:'house', price:'25', description:'this is good rentalable book', selectdate:'19/7/2017', total_cost:'100'
    }

    this.renter = {
      img: 'assets/img/profile-img.png', name: 'John', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    }

    this.rentalRequestDetails=[];
    this.authData=[];
    //overall rating given to user
    this.userRatingNeg=[];
    this.userRatingPos=[];
    //pick up rating
    this.renterItemRatingNeg=[];
    this.renterItemRatingPos=[];
    //rating given by owner
    this.ownerItemRatingPos=[];
    this.ownerItemRatingNeg=[];

    //pick up rating
    this.pickUpRatingPos=[];
    this.pickUpRatingNeg=[];
    //return rating
    this.returnRatingPos=[];
    this.returnRatingNeg=[];
    
    this.requesterId=this.navParams.get("requesterId")
    this.requestedItemId=this.navParams.get("requestedItemId");
    this.msgKey=this.navParams.get("msgKey");
    this.chatRef=this.navParams.get("chatRef");
    this.pickOrReturn=this.navParams.get("pickOrReturn");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPickReturnPage');
   
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.getUserRating(this.requesterId);
    this.storage.get('userId').then((id)=>{  
      this.userId=id;
  
      this.itemprovider.getPickUpAndReturnRating(this.requesterId,this.requestedItemId).subscribe(
        data =>{
        console.log(data.json());
        loading.dismiss();
        if(data.json().msg == "success"){
        
        this.rentalRequestDetails=data.json().data[0];
        console.log(this.rentalRequestDetails);
        let fromDateStr = this.rentalRequestDetails.FromDate;
        let toDateStr = this.rentalRequestDetails.ToDate;
        let fromDateRes = fromDateStr.split("-");
        let toDateRes = toDateStr.split("-");
        this.fromDate=fromDateRes[2]+"/"+fromDateRes[1]+"/"+fromDateRes[0].slice(2);
        this.toDate=toDateRes[2]+"/"+toDateRes[1]+"/"+toDateRes[0].slice(2);
        this.basePath=this.rentalRequestDetails.base_path;
        this.priceBreakDown();
         //Rating given by owner to item while posting
        for (var i=0; i < this.rentalRequestDetails.currentcondition;  i++) {
            this.ownerItemRatingPos[i]=i;
        }  

        for (var j=0; j < 5-this.rentalRequestDetails.currentcondition;  j++) {
            this.ownerItemRatingNeg[j]=j;
          }
         //Rating given by renter during picked
        if(this.rentalRequestDetails.Status == "PickedUpPending"){
            this.status=true;
            this.titleOne="THIS IS THE ITEMS CONDITION WHEN POSTED";
            this.titleTwo="THIS IS THE ITEMS CONDITION WHEN PICKED UP";  
            this.title="pick up";
            this.returnSectionStatus=true;
            this.setPickUpRating();
            if(this.rentalRequestDetails.PickupComment){
                this.commentFromRenterStatus=true;
                this.renterComment=this.rentalRequestDetails.PickupComment;
            }
         }

         //Rating given by renter during returned
         if(this.rentalRequestDetails.Status == "ReturnedPending")
         {
            this.status=false;
            this.titleOne="THIS IS THE ITEMS CONDITION WHEN RENTED";
            this.titleTwo="THIS IS THE ITEMS CONDITION WHEN RETURNED"
            this.title="return";
            this.pickReturnRatingStatus=this.rentalRequestDetails.PickupRating==this.rentalRequestDetails.ReturnRating? true:false;

            this.setPickUpAndReturnRating();
            //Both party didn't agree
            if(this.rentalRequestDetails.ReturnBothPartyAgree==1){
              this.returnSectionStatus=false;
              this.info="Both parties did not agree with the product conditions.";
            }else{
              this.info=this.pickReturnRatingStatus ? "stars conditions are the same" : "stars conditions are NOT the same";
            } 
            
            if(this.rentalRequestDetails.ReturnComment){
              console.log("comment has given by renter");
              this.commentFromRenterStatus=true;
              this.renterComment=this.rentalRequestDetails.ReturnComment; 
            }else{  
              console.log("comment not given by renter");
            }
         }
       }else{
         this.navCtrl.pop();
       }
      },
  
      err=>{
        loading.dismiss();
        this.navCtrl.pop();
        console.log("error");
      });
  
      });//end of storage
  }




  /**
   * Function to set pick up rating only
   */
  setPickUpRating(){
    for (var i=0; i < this.rentalRequestDetails.PickupRating;  i++) {
      this.renterItemRatingPos[i]=i;
   }  

  for (var j=0; j < 5-this.rentalRequestDetails.PickupRating;  j++) {
      this.renterItemRatingNeg[j]=j;
    }

  }
  /**
   * Function to set pick and return rating
   */
  setPickUpAndReturnRating(){

    for (var i=0; i < this.rentalRequestDetails.PickupRating;  i++) {
      this.pickUpRatingPos[i]=i;
    }  

  for (var j=0; j < 5-this.rentalRequestDetails.PickupRating;  j++) {
      this.pickUpRatingNeg[j]=j;
     }

    for (var i=0; i < this.rentalRequestDetails.ReturnRating;  i++) {
     this.returnRatingPos[i]=i;
    }  

    for (var j=0; j < 5- this.rentalRequestDetails.ReturnRating;  j++) {
        this.returnRatingNeg[j]=j;
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


  backdetail(){
    this.navCtrl.pop();
  }

  
  priceBreakDown(){

    //delivery fee not applied
    if(this.rentalRequestDetails.needDelivery==0){
        this.toolTip="Rental Cost = $"+this.rentalRequestDetails.rentalCostWithoutFee+ " Service Fee = $"+this.rentalRequestDetails.rentableServiceFee;
    }else{
      //delivery fee applied
       this.toolTip="Rental Cost = $"+this.rentalRequestDetails.rentalCostWithoutFee+ " Service Fee = $"+this.rentalRequestDetails.rentableServiceFee+" Delivery Fee = $"+this.rentalRequestDetails.deliveryfee;
    }
    
  }

  /*
    navigate to reject request page
  */
 goToRejectRequest(){

    if(this.status==true){
          this.rejectPickupRequest();
      }
      
      if(this.status==false){
          this.rejectReturnRequest();
      }

}




  /*
    navigate to accept request page
    true:pick
    false:return
  */
 goToAcceptRequest(){

  if(this.status==true){
      this.acceptPickRequest();
  }

  if(this.status==false){
    this.acceptReturnRequest();
  }
}


/** 
 * ACCEPT RETURN REQUEST
*/
acceptReturnRequest(){
  let ownerMsg,renterMsg;
   
  //both parties cannot agree with the product conditions
  if(this.rentalRequestDetails.ReturnBothPartyAgree==1){
    console.log("Both party didn't agreee");
    ownerMsg="Both parties did not agree with the product conditions. To make a claim click here.";
    renterMsg="Product Returned. Both parties did not agree with the product conditions.";
    this.authorizeSecurityDepositAndAcceptReturnRequest(ownerMsg,renterMsg);
  }else{
    //stars conditions are the same
    if(this.pickReturnRatingStatus){
      ownerMsg="Product returned";
      renterMsg="Product returned";
      this.acceptReturnRequestWithoutAuthorizeSecurityDeposit(ownerMsg,renterMsg);
    }else{
      //stars conditions are NOT the same
      ownerMsg="Product returned in different conditions when rented. To make a claim click here";
      renterMsg="Product returned in different conditions when rented";
      this.authorizeSecurityDepositAndAcceptReturnRequest(ownerMsg,renterMsg);
    }

  }

  
}

/**
 * Accept return request without authorizing the security deposit
 * @param ownerMsg contain message for item owner
 * @param renterMsg contain message for item renter
 */
acceptReturnRequestWithoutAuthorizeSecurityDeposit(ownerMsg,renterMsg){
 
  this.loading=this.loadingCtrl.create({
    spinner:'bubbles',
    content:`Please wait..`
  });

  this.loading.present();

  this.itemprovider.acceptRejectReturnRating(this.requesterId,this.requestedItemId,3).subscribe(
    data=>{
        this.loading.dismiss();
        console.log(data);
        if(data.json().msg=="success"){
          //updating previous chat
          this.af.list(this.chatRef).update(this.msgKey,{ 
              type: "return_request_hide"
            });

            if(this.pickReturnRatingStatus){
              this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"return_request_response",ownerMsg,renterMsg);
              this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"feedback_show","Give Feedback","Give feedback");
            }else{
              this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"return_request_response_claim",ownerMsg,renterMsg);
              this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"feedback_show","Give Feedback","Give feedback");
            }
            this.markMessageAsUnRead();
            this.presentToast("Return request has been accepting successfully");
            this.navCtrl.pop();  
        }
        if(data.json().msg=="error"){
            this.presentToast("Request already accepted ");
            this.navCtrl.pop();
        }
      },
      err=>{
        this.loading.dismiss();
        this.presentToast("Please try again later");
      }); 
}

/**
 * This method first authorize the payment and then on success accept the return request
 * @param ownerMsg contain message for item owner
 * @param renterMsg contain message for item renter
 */
authorizeSecurityDepositAndAcceptReturnRequest(ownerMsg,renterMsg){
  this.loading=this.loadingCtrl.create({
    spinner:'bubbles',
    content:`Please wait..`
  });
  this.loading.present();

  //first we need to authorize the security deposit then accepte/reject item return request
  this.paymentProvider.authorizeSecurityDeposit(this.requesterId,this.requestedItemId,this.rentalRequestDetails.securityDeposit).subscribe(
    data=>{
        console.log(data.json());
      if(data.json().msg=="succeeded" || data.json().msg=="pending"){

        this.itemprovider.acceptRejectReturnRating(this.requesterId,this.requestedItemId,0).subscribe(
          data=>{
              this.loading.dismiss();
              console.log(data);
              if(data.json().msg=="success"){
                //updating previous chat
                this.af.list(this.chatRef).update(this.msgKey,{ 
                    type: "return_request_hide"
                  });

                  if(this.pickReturnRatingStatus){
                    this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"return_request_response",ownerMsg,renterMsg);
                    this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"feedback_show","Give Feedback","Give feedback");
                  }else{
                    this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"return_request_response_claim",ownerMsg,renterMsg);
                    //this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"feedback_show","Give Feedback","Give feedback");
                  }
                  this.markMessageAsUnRead();
                  this.presentToast("Return request has been accepting successfully");
                  this.navCtrl.pop();  
              }
              if(data.json().msg=="error"){
                  this.presentToast("Request already accepted ");
                  this.navCtrl.pop();
              }
           },
            err=>{
              this.loading.dismiss();
              this.presentToast("Please try again later");
            }); 
      }
      // called when there is payment related issue
      if(data.json().msg=="failed" || data.json().msg=="error"){
        this.loading.dismiss();
        this.presentAlert(data.json().msg_details);
      }
    },
    err=>{
      this.loading.dismiss();
    }
  );
}

/** 
 * REJECT RETURN REQUEST
*/
rejectReturnRequest(){

  this.loading=this.loadingCtrl.create({
    spinner:'bubbles',
    content:`Please wait..`
  });
     
  this.loading.present();

  this.itemprovider.acceptRejectReturnRating(this.requesterId,this.requestedItemId,1).subscribe(
    data=>{
        this.loading.dismiss();
        console.log(data);
        if(data.json().msg=="success"){
          this.af.list(this.chatRef).update(this.msgKey,{ 
              type: "return_request_hide"
            });
          this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"return_request_response","Return request has been rejected","Return request has been rejected");
          this.markMessageAsUnRead();
          this.presentToast("Return request has been rejected successfully");
          this.navCtrl.pop();  
        }

        if(data.json().msg=="error"){
          this.presentToast("Request already accepted ");
          this.navCtrl.pop();
        }

    },
    err=>{
      this.loading.dismiss();
    }); 
}


 
/** 
 * Here we need to first charge the payment and then accept the request 
*/
acceptPickRequest(){
  //below field are involve in charging the payment
  //{"action":"ChargePayment","postId":"235","amount":"49","itemOwnerFee":"40","securityDeposit":"5","renterId":"60"}
  
  this.chargeData.postId=this.requestedItemId;
  this.chargeData.renterId=this.requesterId;
  this.chargeData.amountToCharge=this.rentalRequestDetails.Amount;
  this.chargeData.itemOwnerFee=this.rentalRequestDetails.itemOwnerFee;
  this.chargeData.securityDeposit=this.rentalRequestDetails.securityDeposit;
  this.chargeData.userId=this.userId;

  this.loading=this.loadingCtrl.create({
    spinner:'bubbles',
    content:`Please wait..`
  });

  this.loading.present();
  //first we need to charge the payment
  this.paymentProvider.chargePayment(this.chargeData).subscribe(
    data=>{
        console.log(data);  
        if(data.json().msg=="succeeded" || data.json().msg=="pending"){
          //on success , call the product picked up api
          this.itemprovider.acceptPickUpRequest(this.requesterId,this.requestedItemId,0).subscribe(
            data=>{
                this.loading.dismiss();
                console.log(data.json());
                if(data.json().msg=="success"){
                  this.af.list(this.chatRef).update(this.msgKey,{ 
                      type: "pickup_request_hide"
                    });
                    //this.chatProvider.sendMessage(this.userId,this.requesterId,this.requestedItemId,"Pick request has been accepted successfully","normal")
                    this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"pickup_request_response","Product picked up","Product picked up");
                    this.markMessageAsUnRead();
                    this.presentToast("Request has been accepted successfully");                
                    this.navCtrl.pop();  
                }
                    if(data.json().msg=="error"){
                      this.presentToast("Request already accepted");
                      this.navCtrl.pop();
                    }
                },
                err=>{
                  this.loading.dismiss();
                });
        }

        // called when there is payment related issue
        if(data.json().msg=="failed" || data.json().msg=="error"){
            this.loading.dismiss();
            this.presentAlert(data.json().msg_details);
        }
        

    },
    err=>{
      this.loading.dismiss();
    });



}


/**
   * Method to add message status as unread 
   */
  markMessageAsUnRead(){
    console.log("markMessageAsUnRead");
    this.chatProvider.markMessageAsUnread(this.userId,this.requesterId,this.requestedItemId).subscribe(
      data=>{
        console.log(data);
      },
      err=>{
        console.log(err);
      }
    )
  }


/** 
 * REJECT PICK UP REQUEST
*/
rejectPickupRequest(){


  this.loading=this.loadingCtrl.create({
    spinner:'bubbles',
    content:`Please wait..`
  });
     
  this.loading.present();

  this.itemprovider.acceptRejectPickUpRating(this.requesterId,this.requestedItemId,1).subscribe(
    data=>{

        this.loading.dismiss();
        console.log(data);
        if(data.json().msg=="success"){
          
          this.af.list(this.chatRef).update(this.msgKey,{ 
            type: "pickup_request_hide"
          });

          //this.chatProvider.sendMessage(this.userId,this.requesterId,this.requestedItemId,"Pick request has been accepted successfully","normal")
          this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"pickup_request_response","Pick up request has been rejected","The owner didn’t agree with your pick up conditions");
          this.markMessageAsUnRead();
          this.presentToast("Request has been rejected successfully");
          this.navCtrl.pop();  

        }

        if(data.json().msg=="error"){
          this.presentToast("Request already accepted ");
          this.navCtrl.pop();
        }

    },
    err=>{
      this.loading.dismiss();
    });
}


presentAlert(msg) {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: msg,
    buttons: ['OK']
  });
  alert.present();
}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed Toast');
  });

  toast.present();

}

}
