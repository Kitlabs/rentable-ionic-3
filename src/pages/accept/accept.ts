import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController  } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';
import { Myrent } from '../myrent/myrent';
import { ChatProvider } from '../../providers/chat/chat'
@Component({
  selector: 'page-accept',
  templateUrl: 'accept.html'
})
export class AcceptPage {
  active_flag:any;
	details=Details;
  agree:any;

  loading:any;
  togglevalue1:any;
  condition:number[] = [0,1, 2, 3, 4];
  
  goodcondition:any;
  itemRatingPos:any;
  itemRatingNeg:any;

  newItemRating:any;
  pItemId:any;
  pItemRating:any;
  comment:any;
  userAgree:any;
  itemOwnerId:any;

  itemconditiontext:any;

  preRatingCondtion:any;
  newRatingCondition:any;

  message:any;
  submitBtnStatus:boolean=false;
  yesStatus:any;
  noStatus:any;
  i:number=0;
  j:number=0;
  agreewith:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemProvider:ItemsProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public chatProvider:ChatProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad PickupPage');
    this.active_flag=false;
    this.agree="yes";
    this.newItemRating=0;
    this.goodcondition=[];
    this.comment="";
    this.itemRatingPos=[];
    this.itemRatingNeg=[];

    for (var i = 0; i < 5; ++i) {
      this.goodcondition[i]=false;
    }

    this.pItemId=this.navParams.get("itemId");
    this.pItemRating=this.navParams.get("itemRating");
    this.itemOwnerId=this.navParams.get("itemOwnerId");
    console.log("PickUpRating=",this.pItemRating);
    this.message="IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
    this.yesStatus="assets/icon/no_tick.png";
    this.noStatus="assets/icon/no_tick.png";
    
    this.getPickUpRating();

  }



  getPickUpRating(){
    this.storage.get('userId').then((uid)=>{
      
      this.itemProvider.getPickUpAndReturnRating(uid,this.pItemId).subscribe(
        data=>{
          if(data.json().msg=="success"){
            this.pItemRating=data.json().data[0].PickupRating;
            this.setUserRating(this.pItemRating);
            //this.setOldRating(this.pItemRating);
            console.log(this.pItemRating);

          }
      },
      err=>{
        this.navCtrl.pop();
      }
    );

    });
  }

  setOldRating(rating){

     if(rating<=1)
      {
        this.preRatingCondtion = "POOR";
      }
      if(rating==2)
      {
        this.preRatingCondtion = "FAIR";
      }
      if(rating==3)
      {
        this.preRatingCondtion = "GOOD";
      }
      if(rating==4)
      {
        this.preRatingCondtion = "VERY GOOD";
      }
      if(rating==5)
      {
        this.preRatingCondtion = "EXCELLENT";
      }
  }

  changecondition(i){

    for (var j = 0; j <= i; ++j) {
      this.goodcondition[j]=true;
    }

    for (var l = i+1; l <= 5; ++l) {
      this.goodcondition[l]=false;
    }
    this.newItemRating=i+1;
    this.setNewRatingCondition(this.newItemRating);
    this.submitBtnStatus=true;
  }

  setNewRatingCondition(rating){

     if(rating<=1)
      {
        this.newRatingCondition = "POOR";
      }
      if(rating==2)
      {
        this.newRatingCondition = "FAIR";
      }
      if(rating==3)
      {
        this.newRatingCondition = "GOOD";
      }
      if(rating==4)
      {
        this.newRatingCondition = "VERY GOOD";
      }
      if(rating==5)
      {
        this.newRatingCondition = "EXCELLENT";
      }
  }

  godetail(){
    this.navCtrl.pop();
  }

  radioChecked(){
    if (this.agree=="no") {
      this.active_flag=true;
    }
    else {
      this.active_flag=false;
    }
  }

  toggleChange(){
    console.log(this.agreewith);
    if(this.agreewith){
      this.submitBtnStatus=true;
      this.yesStatus="assets/icon/yes_tick.png";
      this.noStatus="assets/icon/no_tick.png"; 
      this.message="IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
      this.agree="yes";
      this.i=1;
      this.j=0;
    }else{
      this.submitBtnStatus=false;
      this.yesStatus="assets/icon/yes_tick.png";
      this.noStatus="assets/icon/no_tick.png"; 
      this.message="IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
      this.agree="yes";
      this.i=1;
      this.j=0;
    }
  }

 /*
  function to set rating given by owner 
  */
  setUserRating(rating){
      console.log("Rating="+rating);
     for (var i=0; i < rating;  i++) {
              this.itemRatingPos[i]=i;
          }  

     for (var j=0; j < 5-rating;  j++) {
            this.itemRatingNeg[j]=j;
      }

  }


  yesChange(){
    if(this.i==0){
      this.yesStatus="assets/icon/yes_tick.png";
      this.noStatus="assets/icon/no_tick.png"; 
      this.message="IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
      this.agree="yes";
      this.submitBtnStatus=true;
      this.i=1;
      this.j=0;
    }else{
      this.yesStatus="assets/icon/no_tick.png"; 
      this.agree="yes";
      this.submitBtnStatus=false;
      this.message="IS THE ITEM IN THE SAME CONDITION AS WHEN YOU RENTED IT ?";
      this.i=0;
      this.j=0; 
    }
}

noChange(){
  if(this.j==0){
    this.noStatus="assets/icon/yes_tick.png";
    this.yesStatus="assets/icon/no_tick.png";
    this.message="SELECT NEW CONDITION OF THE ITEM  ?";
    this.agree="no";
    this.submitBtnStatus= this.newItemRating>0? true:false;
    this.j=1;
    this.i=0;
  }else{
    this.noStatus="assets/icon/no_tick.png";  
    this.agree="yes";
    this.message="DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
    this.j=0;
    this.i=0; 
    this.submitBtnStatus=false;
  }
}

  /**
   * Case 1: Check whether the product rating change or not
   * Case 2: Check whether the both party agree or not
   */
  submit(){

    let ownermsg,rentermsg;
    
    console.log(this.newItemRating);
    console.log(this.pItemRating);
    console.log(this.agree);
    rentermsg="Return request pending approval";
    ownermsg="Please confirm return request, click here";

    if(this.agreewith){
        //both party are not agree with item condition
        //rentermsg="Product Returned. Both parties did not agree with the product conditions.";
        //ownermsg="Both parties did not agree with the product conditions. To make a claim click here";
        this.newItemRating=0;
        this.agree="none";
    }else{
          //Both party  agree then check the product rating
        if(this.agree=="yes"){
            //rentermsg="Return request pending approval";
            //ownermsg="Please confirm return request, click here";
            this.newItemRating=this.pItemRating;
        }else{
          //Not agree with rating
          //rentermsg="Product returned in different conditions when rented";
          //ownermsg="Product returned in different conditions when rented. To make a claim click here";
          this.newItemRating=this.newItemRating;
        }

    }

    this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });


      console.log(this.newItemRating);

    this.loading.present();
    this.storage.get('userId').then((uid)=>{
      this.itemProvider.sendReturnedRequest(uid,this.pItemId,this.comment,this.newItemRating,this.agreewith,this.agree).subscribe(
        data=>{
            this.loading.dismiss();
             console.log(data.json());
            if(data.json().msg=="success"){
                //this.chatProvider.sendMessage(uid,this.itemOwnerId,this.pItemId,"Returned request has been sent succesfully","return");
                this.chatProvider.sendMessageRental(uid,this.itemOwnerId,this.pItemId,"return_request_show",ownermsg,rentermsg);
                this.markMessageAsUnRead(uid);
                this.showToast("Returned request has been sent successfully");
            }
        },

        err=>{
            this.loading.dismiss();
        }

        );

    });


  }

  markMessageAsUnRead(uid){
    console.log("markMessageAsUnRead");
    this.chatProvider.markMessageAsUnread(uid,this.itemOwnerId,this.pItemId).subscribe(
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
        duration:3000
      });

      toast.onDidDismiss(()=>{
        //this.navCtrl.pop();
        this.navCtrl.push(Myrent);
      });

      toast.present();
   }


}
