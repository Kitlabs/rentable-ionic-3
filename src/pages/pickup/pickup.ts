import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Details } from '../details/details';
import { Storage } from '@ionic/storage';

import { ChatProvider } from '../../providers/chat/chat'

import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Myrent } from '../myrent/myrent';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-pickup',
  templateUrl: 'pickup.html',
})
export class PickupPage {

  loading:any;
	details=Details;
  agree:any;
  togglevalue1:any;
  active_flag:any;
  condition:number[] = [0,1, 2, 3, 4];

  goodcondition:any;
  itemRatingPos:any;
  itemRatingNeg:any;
  message:any;
  newItemRating:any;
  pItemId:any;
  pItemRating:any;
  comment:any;
  userAgree:any;
  itemOwnerId:any;
  myForm: FormGroup;

  preRatingCondtion:any;
  newRatingCondition:any;
  submitBtnStatus:boolean=false;
  yesNoStatus:boolean=true;
  //message 
  cMesage:any;
  cUserId:any;
  
  checkBox:Array<any>;
  yesStatus:any;
  noStatus:any;
  i:number=0;
  j:number=0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public itemProvider:ItemsProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public af:AngularFireDatabase,
    public chatProvider:ChatProvider,
    public fb: FormBuilder) {
    
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
    console.log("AGEE="+this.agree);

    for (var i = 0; i < 5; ++i) {
      this.goodcondition[i]=false;
    }


    this.pItemId=this.navParams.get("itemId");
    this.pItemRating=this.navParams.get("itemRating");
    this.itemOwnerId=this.navParams.get("itemOwnerId");


    this.setUserRating(this.pItemRating);
    this.setOldRating(this.pItemRating);

    this.message="DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
    this.yesStatus="assets/icon/no_tick.png";
    this.noStatus="assets/icon/no_tick.png";
    
  }

  godetail(){
    this.navCtrl.pop();
  }

  radioChecked(){
    console.log(this.agree);
    if (this.agree=="no") {
      this.active_flag=true;
      this.message="SELECT NEW CONDITION OF THE ITEM  ?";
      this.yesNoStatus=false;
      this.submitBtnStatus=false;
    }
    else {
      this.yesNoStatus=false;
      this.active_flag=false; 
      this.message="DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
      this.submitBtnStatus=true;
    }

  }

  yesChange(){
      if(this.i==0){
        this.yesStatus="assets/icon/yes_tick.png";
        this.noStatus="assets/icon/no_tick.png"; 
        this.message="DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
        this.agree="yes";
        this.submitBtnStatus=true;
        this.i=1;
        this.j=0;
      }else{
        this.yesStatus="assets/icon/no_tick.png"; 
        this.agree="yes";
        this.submitBtnStatus=false;
        this.message="DO YOU AGREE WITH THE CONDITION OF THE ITEM SET SET BY OWNER ?";
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

  changecondition(i){

    for (var j = 0; j <= i; ++j) {
      this.goodcondition[j]=true;
    }

    for (var l = i+1; l <= 5; ++l) {
      this.goodcondition[l]=false;
    }

    // if(this.message.length>0){
    //   this.submitBtnStatus=true;
    // }else{
    //   this.submitBtnStatus=false;
    // }

    this.newItemRating=i+1;
    this.setNewRatingCondition(this.newItemRating);
    this.submitBtnStatus=true;
  
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


 /*
  function to set rating given by owner w
  */
  setUserRating(rating){
    
     for (var i=0; i < rating;  i++) {
              this.itemRatingPos[i]=i;
          }  

     for (var j=0; j < 5-rating;  j++) {
            this.itemRatingNeg[j]=j;
      }

     


  }

  commentAdd(){
    console.log(this.comment);

    // if(this.comment.length){
      
    //   if(this.active_flag==true && this.newItemRating==0 ){
    //     //not agree with the condition of item (new rating of item)
    //       this.submitBtnStatus=false;
    //   }else{
    //     this.submitBtnStatus=true;
    //   }
    
    // }else{
    //   this.submitBtnStatus=false;
    // }



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


  sendData(){
    
    //{"action":"RequestStatusChange", "UserId":"1","PostId":"68","Status":"PickedUp","PickupComment":"Its Newly itemd sdfsd","UserAgree":"1","PickupRating":"5"}
    console.log("STATUS="+this.agree);
    if(this.agree=="no"){
      //not agree with the condition of item (new rating of item)
      this.newItemRating=this.newItemRating;
      this.userAgree=0;
      this.cMesage="Not agreed to pick up the item condition rating "+ this.pItemRating + " and new rating is "+this.newItemRating;

      console.log(this.cMesage);
    }else{
      //agree with condition of item
      this.newItemRating=this.pItemRating
      this.userAgree=1;
      this.cMesage="Agreed with the item condition i.e "+this.pItemRating;
      console.log(this.cMesage);
    }

    this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });

      
    this.loading.present();

    console.log(this.comment);
    console.log(this.userAgree);
    console.log(this.newItemRating);

    this.storage.get('userId').then((uid)=>{
      this.cUserId=uid;
      this.itemProvider.sendPickupRequest(uid,this.pItemId,this.comment,this.userAgree,this.newItemRating).subscribe(
        data=>{
            this.loading.dismiss();
            if(data.json().msg=="success"){
                //this.chatProvider.sendMessage(uid,this.itemOwnerId,this.pItemId,this.cMesage,"pickup");
                this.chatProvider.sendMessageRental(uid,this.itemOwnerId,this.pItemId,"pickup_request_show","Please confirm pick up request, click here","Pick up request pending approval");
                this.markMessageAsUnRead(uid);
                this.showToast("Pickup request has been sent successfully");
            }else{
              this.showToast("Please try again later");
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
        this.navCtrl.push(Myrent);
        //this.navCtrl.pop();

       });

      toast.present();
   }


  }
