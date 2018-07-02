import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/payment/profile';
import { Storage } from '@ionic/storage';
import { Profile } from '../profile/profile';
import { ChatProvider } from '../../providers/chat/chat'
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

	profile=Profile;
  goodcondition:any;
  loading:any;
  condition:number[] = [0,1, 2, 3, 4];
  titlenumber:any;
  feedbacktext:any;
  appfeedback:any;
  submitBtnStatus:boolean;
  
  itemId:any;
  itemOwnerId:any;
  msgKey:any;
  chatRef:any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private profileprovider: ProfileProvider,
    private storage:Storage,
    private af:AngularFireDatabase, 
    private chatProvider:ChatProvider,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) {

    this.goodcondition=[];
    this.titlenumber=300;
    this.submitBtnStatus=false;
	  for (var i = 0; i < 5; ++i) {
	    this.goodcondition[i]=false;
	  }

    this.itemId=this.navParams.get("requestedItemId");
    this.msgKey=this.navParams.get("msgKey");
    this.chatRef=this.navParams.get("chatRef");
    this.itemOwnerId=this.navParams.get("itemOwnerId");

    this.showLog(this.itemId);
    this.showLog(this.itemOwnerId);
  }

  showLog(msg){
    console.log(msg);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  changecondition(i){
    console.log(i);
    for (var j = 0; j <= i; ++j) {
      this.goodcondition[j]=true;
    }
    for (var l = i+1; l <= 5; ++l) {
      this.goodcondition[l]=false;
    }
    this.appfeedback=i+1;
    this.submitBtnStatus= this.appfeedback>0?true:false;
  }

  number(){
    var n=this.feedbacktext.length;
    this.titlenumber=300-n;
  }


  //serId,PostId,FeedbackRating,FeedbackComment)
  submit(){

    this.loading=this.loadingCtrl.create({
      spinner:'bubbles',
      content:`Please wait..`
    });
    this.loading.present();


    this.storage.get('userId').then((id)=>{  
      
        this.profileprovider.giveFeedback(id,this.itemId,this.appfeedback,this.feedbacktext).subscribe(
        data =>{

          this.loading.dismiss();
          if(data.json().msg=="success"){
            this.af.list(this.chatRef).update(this.msgKey,{ 
              type: "feedback_hide"
            });

            this.chatProvider.sendMessageRental(id,this.itemOwnerId,this.itemId,"feedback_response",this.appfeedback+" rating given as feedback ","Feedback submitted");
            this.presentToast("Feedback submitted successfully");
            this.navCtrl.pop();  
          
          }else{
            this.presentToast("Please try again later");
          }

        },
        err=> {
          this.loading.dismiss();
          this.presentToast("Please try again later");        
        });

    });
  
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
