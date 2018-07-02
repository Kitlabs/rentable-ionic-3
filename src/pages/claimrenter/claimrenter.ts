import { Component } from '@angular/core';
import { NavController,IonicPage, NavParams, ModalController, Navbar,ToastController,LoadingController,AlertController, Alert } from 'ionic-angular';
import {ClaimownerPage } from '../claimowner/claimowner';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { Details } from '../details/details';

import { PaymentProvider } from '../../providers/payment/payment';
import { Storage } from '@ionic/storage';
import { ItemsProvider } from '../../providers/items/items';
import { ChatProvider } from '../../providers/chat/chat'
import { ChatPage } from '../chat/chat';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-claimrenter',
  templateUrl: 'claimrenter.html',
})
export class ClaimrenterPage {

  renter:any;
  Product:any;
  agree:any;
  claimowner=ClaimownerPage;
  otherprofile=OtherprofilePage;
  detail=Details;
  active_flag:any;
  basePath:any;
  userId:any;

  data:any;
  submitBtnStatus:boolean=false;
  yesStatus:any;
  noStatus:any;
  
  userRatingPos:any;
  userRatingNeg:any;
  pickUpRatingPos:any;
  pickUpRatingNeg:any;
  pickUpRatingTitle:any;
  returnRatingPos:any;
  returnRatingNeg:any;
  returnRatingTitle:any;
  i:number=0;
  j:number=0;

  //Data from chat 
  itemId:any;
  msgKey:any;
  chatRef:any;
  itemOwnerId:any;
  agreeSectionStatus:boolean=false;
  loading:any;
  bothPartyDidntAgreeStatus:boolean=false;
  claimOwnerCommentStatus:boolean=false;
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private storage:Storage,
    private itemprovider:ItemsProvider,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,
    private af:AngularFireDatabase, 
    private alertCtrl:AlertController,
    private paymentProvider:PaymentProvider,
    private chatProvider:ChatProvider) {

  	// this.Product ={
    //   img: 'assets/img/11.png', ownerimage:'assets/img/profile-img.png', ownername: 'John', item_title:'house', price:'25', description:'this is good rentalable book', selectdate:'19/7/2017', total_cost:'100'
    // }

  	// this.renter = {
    //   img: 'assets/img/profile-img.png', name: 'John', address:'Sydney Australia', rate:'4.5', rent_nuber: '10', owner_number: '20'
    // }  

    this.data=[];
    //overall rating given to user
    this.userRatingNeg=[];
    this.userRatingPos=[];
    //pick up rating
    this.pickUpRatingPos=[];
    this.pickUpRatingNeg=[];
    //return rating
    this.returnRatingPos=[];
    this.returnRatingNeg=[];
    
    //data from chat
    this.itemId=this.navParams.get("requestedItemId");
    this.msgKey=this.navParams.get("msgKey");
    this.chatRef=this.navParams.get("chatRef");
    this.itemOwnerId=this.navParams.get("itemOwnerId");
    
    console.log(this.itemOwnerId);
    this.active_flag=true;
    this.yesStatus="assets/icon/no_tick.png";
    this.noStatus="assets/icon/no_tick.png";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClaimrenterPage');

    this.storage.get('userId').then((id)=>{  
      this.userId=id;
      this.itemprovider.getClaimDetails(id,this.itemId).subscribe(
        data =>{
        console.log(data);
       if(data.json().msg=="success"){
        this.data=data.json().PostData[0];      
        this.basePath=data.json().base_path;
        this.bothPartyDidntAgreeStatus=this.data.ReturnBothPartyAgree == 1 ? true : false;
        this.claimOwnerCommentStatus=this.data.ClaimComment ? true:false;
        this.setPickUpRatingTitle(this.data.PickupRating);
        this.setReturnRatingTitle(this.data.ReturnRating);
        this.setPickUpRating();
        this.setReturnRating();
        this.hideShowAgreeSection();
      }
    },
  
      err=>{
        console.log("error");
        this.presentToast("Please try again later");
        this.navCtrl.pop();
      
      });
  
      });//end of storage

  }

  /**
   * ReturnBothPartyAgree
   * 1 = didn't agree (Both parties do not agree on the return conditions – the renter can accept or reject the claim made by the owner)
   * 0/null = agree
   */
  hideShowAgreeSection(){

    if(this.data.ReturnBothPartyAgree=="1"){
      //both party didn't agree
      this.agree="No";
      this.submitBtnStatus=false;
      this.agreeSectionStatus=true;
    }else{
      this.agree="Yes";
      this.submitBtnStatus=true;
      this.agreeSectionStatus=false;
    }
  }

  setReturnRating(){
  if(this.data.Status == "ReturnedPending" || this.data.Status == "Returned" )
  {

  for (var i=0; i < this.data.ReturnRating;  i++) {
      this.returnRatingPos[i]=i;
    }  

    for (var j=0; j < 5-this.data.ReturnRating;  j++) {
        this.returnRatingNeg[j]=j;
      }
  }
  }

  setPickUpRating(){
    for (var i=0; i < this.data.PickupRating;  i++) {
          this.pickUpRatingPos[i]=i;
      }  

      for (var j=0; j < 5-this.data.PickupRating;  j++) {
          this.pickUpRatingNeg[j]=j;
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


  radioChecked(){
    if (this.agree=="No") {
      this.active_flag=true;
    }
    else {
      this.active_flag=false;
    }
  }

  back(){ 
    this.navCtrl.pop();
  }

  yesChange(){
    if(this.i==0){
      this.yesStatus="assets/icon/yes_tick.png";
      this.noStatus="assets/icon/no_tick.png"; 
      this.agree="Yes";
      this.submitBtnStatus=true;
      this.i=1;
      this.j=0;
    }else{
      this.yesStatus="assets/icon/no_tick.png"; 
      this.agree="Yes";
      this.submitBtnStatus=false;
      this.i=0;
      this.j=0; 
    }
}

noChange(){
  if(this.j==0){
    this.noStatus="assets/icon/yes_tick.png";
    this.yesStatus="assets/icon/no_tick.png";
    this.agree="No";
    this.j=1;
    this.i=0;
    this.submitBtnStatus=true;
  }else{
    this.noStatus="assets/icon/no_tick.png";  
    this.agree="No";
    this.j=0;
    this.i=0; 
    this.submitBtnStatus=false;
  }
}

submit(){

  let msgOwner,msgRenter;

 

  if(this.agree=="Yes"){
    msgRenter="You have accepted the claim and $"+ this.data.ClaimBondAmount +" will be deducted from the security deposit";
    msgOwner="The renter accepted your claim";
    this.hitApiWithCaptureAuth(msgOwner,msgRenter,this.data.ClaimBondAmount);
  }
  if(this.agree=="No"){
    msgRenter="You have rejected the claim; the owner might contact Rentable team to solve this claim";
    msgOwner="The renter rejected your claim. If you are not satisfied with this action please lodge a claim with us, claim@rentableapp.com";
    this.hitApiWithoutCaptureAuth(msgOwner,msgRenter);
  }

 
  
}

hitApiWithCaptureAuth(msgOwner,msgRenter,captureBondAmount){
  console.log("hitApiWithCaptureAuth");
  this.loading=this.loadingCtrl.create({
    spinner:'bubbles',
    content:`Please wait..`
  });
  this.loading.present();
  this.paymentProvider.captureSecurityDeposit(this.userId,this.itemId,captureBondAmount).subscribe(
    data=>{
      console.log("CAPTURE_PAYMENT=",data);
      if(data.json().msg=="succeeded" || data.json().msg=="pending"){
        this.itemprovider.replyToClaim(this.userId,this.itemId,this.agree).subscribe(
          data=>{      
              this.loading.dismiss();
              if(data.json().msg=="success"){
                this.af.list(this.chatRef).update(this.msgKey,{ 
                    type: "claim_by_owner_hide"
                  });
                  this.chatProvider.sendMessageRental(this.userId,this.itemOwnerId,this.itemId,"claim_by_owner_response",msgOwner,msgRenter);
                  this.chatProvider.sendMessageRental(this.userId,this.itemOwnerId,this.itemId,"feedback_show","Give Feedback","Give feedback");
                  this.markMessageAsUnRead();
                  this.presentToast("Sent Successfully");
                  this.navCtrl.pop();  
              }
              if(data.json().msg=="error"){
                this.presentToast("Try again later");
                this.navCtrl.pop();
              }
            },
          err=>{
            this.loading.dismiss();
            this.navCtrl.pop();
          });
      }else{
        this.loading.dismiss();
        if(data.json().msg=="failed" || data.json().msg=="error"){
          this.presentAlert(data.json().msg_details);
        }
      }

    },
    err=>{
      this.loading.dismiss();
      this.presentToast("Please try again later");
    }
  )

}

hitApiWithoutCaptureAuth(msgOwner,msgRenter){
  console.log("hitApiWithoutCaptureAuth");
  this.loading=this.loadingCtrl.create({
    spinner:'bubbles',
    content:`Please wait..`
  });
  this.loading.present();
  
  this.itemprovider.replyToClaim(this.userId,this.itemId,this.agree).subscribe(
    data=>{
        this.loading.dismiss();
        console.log(data);
        if(data.json().msg=="success"){
          this.af.list(this.chatRef).update(this.msgKey,{ 
              type: "claim_by_owner_hide"
            });
            this.chatProvider.sendMessageRental(this.userId,this.itemOwnerId,this.itemId,"claim_by_owner_response",msgOwner,msgRenter);
            this.chatProvider.sendMessageRental(this.userId,this.itemOwnerId,this.itemId,"feedback_show","Give Feedback","Give feedback");
            this.markMessageAsUnRead();
            this.presentToast("Sent Successfully");
            this.navCtrl.pop();  
        }
        if(data.json().msg=="error"){
          this.presentToast("Try again later");
          this.navCtrl.pop();
        }
    },
    err=>{
      this.loading.dismiss();
      this.navCtrl.pop();
    });

}

markMessageAsUnRead(){
  console.log("markMessageAsUnRead");
  this.chatProvider.markMessageAsUnread(this.userId,this.itemOwnerId,this.itemId).subscribe(
    data=>{
      console.log(data);
    },
    err=>{
      console.log(err);
    }
  )
}

presentAlert(msg) {
  let alert = this.alertCtrl.create({
    title: 'Message',
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
