import { Component } from '@angular/core';
import { NavController,IonicPage, NavParams, ModalController, Navbar,ToastController,LoadingController } from 'ionic-angular';

import { ClaimrenterPage } from '../claimrenter/claimrenter';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
import { ItemsProvider } from '../../providers/items/items';
import { ChatProvider } from '../../providers/chat/chat'
import { ChatPage } from '../chat/chat';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-claimowner',
  templateUrl: 'claimowner.html',
})
export class ClaimownerPage {

	itemtitle:any;
	titlenumber:any;
	detail=Details;
  claimrenter=ClaimrenterPage;

  userId:any;
  requesterId:any;
  requestedItemId:any;
  rentalRequestDetails:any;
  msgKey:any;
  chatRef:any;
  basePath:any;
  userRatingPos:any;
  userRatingNeg:any;
  pickUpRatingPos:any;
  pickUpRatingNeg:any;
  pickUpRatingTitle:any;
  returnRatingPos:any;
  returnRatingNeg:any;
  returnRatingTitle:any;
  submitBtnStatus:boolean=false;
  bondToClaimAmount:any;
  securityDeposit:any;
  comment:any;
  loading:any;
  bothPartyDidntAgreeStatus:boolean=false;
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private storage:Storage,
    private itemprovider:ItemsProvider,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,
    private af:AngularFireDatabase, 
    private chatProvider:ChatProvider) {

    this.titlenumber=350;
    this.rentalRequestDetails=[];
    //overall rating given to user
    this.userRatingNeg=[];
    this.userRatingPos=[];
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClaimownerPage');

    this.storage.get('userId').then((id)=>{  
      this.userId=id;
  
      this.itemprovider.getClaimDetails(this.requesterId,this.requestedItemId).subscribe(
        data =>{
         
        console.log(data.json());
       if(data.json().msg=="success"){
        this.rentalRequestDetails=data.json().PostData[0];      
        this.basePath=this.rentalRequestDetails.base_path;
        this.securityDeposit=this.rentalRequestDetails.securityDeposit;
        this.bothPartyDidntAgreeStatus=this.rentalRequestDetails.ReturnBothPartyAgree == 1 ? true : false;
        this.setPickUpRatingTitle(this.rentalRequestDetails.PickupRating);
        this.setReturnRatingTitle(this.rentalRequestDetails.ReturnRating);
        this.setPickRating();
        this.setReturnRating();
       }
      },
      err=>{
        console.log("error");
      });
  
      });//end of storage
  }

  setReturnRating(){
    if(this.rentalRequestDetails.Status == "ReturnedPending" || this.rentalRequestDetails.Status == "Returned")
    {
    for (var i=0; i < this.rentalRequestDetails.ReturnRating;  i++) {
        this.returnRatingPos[i]=i;
      }  

      for (var j=0; j < 5-this.rentalRequestDetails.ReturnRating;  j++) {
          this.returnRatingNeg[j]=j;
        }
    }
         
  }

  setPickRating(){
    //Pick up time rating
    for (var i=0; i < this.rentalRequestDetails.PickupRating;  i++) {
          this.pickUpRatingPos[i]=i;
      }  

    for (var j=0; j < 5-this.rentalRequestDetails.PickupRating;  j++) {
          this.pickUpRatingNeg[j]=j;
      }
  }

  checker(){


    let isNumeric= /^\d+$/.test(this.bondToClaimAmount);

    if(!isNumeric){
      document.getElementById('claimamount').style.color="#FF0000";
    }else{
      document.getElementById('claimamount').style.color="#000000";
    }

    if(parseFloat(this.bondToClaimAmount) >0.0 && parseFloat(this.bondToClaimAmount) <= parseFloat(this.securityDeposit)){    
      this.submitBtnStatus= this.bondToClaimAmount && this.securityDeposit ? true:false;
    }else{
      this.submitBtnStatus=false;
    }
  
  }

  setPickUpRatingTitle(rating:number){

    if(rating<=1)
     {
       this.pickUpRatingTitle = "POOR";
     }
     if(rating==2)
     {
       this.pickUpRatingTitle = "FAIR";
     }
     if(rating==3)
     {
       this.pickUpRatingTitle = "GOOD";
     }
     if(rating==4)
     {
       this.pickUpRatingTitle = "VERY GOOD";
     }
     if(rating==5)
     {
       this.pickUpRatingTitle = "EXCELLENT";
     }

 }
 
 setReturnRatingTitle(rating:number){

  if(rating<=1)
   {
     this.returnRatingTitle = "POOR";
   }
   if(rating==2)
   {
     this.returnRatingTitle = "FAIR";
   }
   if(rating==3)
   {
     this.returnRatingTitle = "GOOD";
   }
   if(rating==4)
   {
     this.returnRatingTitle = "VERY GOOD";
   }
   if(rating==5)
   {
     this.returnRatingTitle = "EXCELLENT";
   }

}

sendData(){

  this.loading=this.loadingCtrl.create({
    spinner:'bubbles',
    content:`Please wait..`
  });

  let msgRenter="The owner is claiming $"+this.bondToClaimAmount+" amount from your security deposit. Please click here to review."
  let msgOwner="You are claiming $"+this.bondToClaimAmount+" from the security deposit";
  this.loading.present();
  this.itemprovider.acceptRejectReturnRating(this.requesterId,this.requestedItemId,2,this.bondToClaimAmount,this.securityDeposit,this.comment).subscribe(
    data=>{
        this.loading.dismiss();
        console.log(data);
        if(data.json().msg=="success"){
          this.af.list(this.chatRef).update(this.msgKey,{ 
              type: "return_request_response_claim_hide"
            });
          this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"claim_by_owner_show",msgOwner,msgRenter);
          this.markMessageAsUnRead();
          this.presentToast("Claim has been submitted successfully");
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


  number(){
    var n=this.comment.length;
    this.titlenumber=350-n;
  }

  back(){
    this.navCtrl.pop();
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
