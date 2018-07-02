import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { RentPage } from '../rent/rent';
import { ChatPage } from '../chat/chat';

import { ChatProvider } from '../../providers/chat/chat'
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-reject',
  templateUrl: 'reject.html'
})
export class RejectPage {

  rent=RentPage;
  isremove:boolean;
	tracks: Array<{name: string, isChecked: boolean}> = [];
  rejectreason:Array<any>;
  rejectimage:Array<any>;
  reject:any;
  loading:any;
  submitBtnStatus:boolean=false;
  requesterId:any;
  requestedItemId:any;
  removeStatus:any;
  msgKey:any;
  chatRef:any;  
  userId:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public itemProvider: ItemsProvider,
    public loadingCtrl:LoadingController,
    public af:AngularFireDatabase, 
    public toastCtrl:ToastController,
    public chatProvider:ChatProvider) {

    this.isremove=false;
    this.rejectreason = [{reason: 'I am away', icon: 'ios-bug-outline'}, {reason: 'item is broken', icon: 'ios-plane-outline'}, {reason: 'Item being fixed', icon: 'ios-plane-outline'}, {reason: 'item unavailable', icon: 'ios-plane-outline'}]
    this.rejectimage = [{img: 'assets/icon/reject-imaway.png', activeimg: 'assets/icon/reject-imaway-active.png'}, {img: 'assets/icon/reject-itembroken.png', activeimg: 'assets/icon/reject-itembroken-active.png'}, {img: 'assets/icon/reject-itemfixed.png', activeimg: 'assets/icon/reject-itemfixed-active.png'}, {img: 'assets/icon/reject-itemunavailable.png', activeimg: 'assets/icon/reject-itemunavailable-active.png'}]

    this.requesterId=this.navParams.get("requesterId");
    this.requestedItemId=this.navParams.get("requestedItemId");
    this.msgKey=this.navParams.get("msgKey");
    this.chatRef=this.navParams.get("chatRef");
    this.userId=this.navParams.get("userId");
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RejectPagePage');
  }

  myFunction(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var element = event.srcElement;
    var parent = event.srcElement.parentElement;
    var preparent = parent.parentElement;
    var children = preparent.children;
    var count = children.length;
    
    for (var i = 0; i < count; ++i) {
      if(parent==children[i]){
        var image=this.rejectimage[i].activeimg;
        this.reject=this.rejectreason[i].reason;
        console.log(this.reject);
        children[i].getElementsByTagName('img')[0].setAttribute("src", image);
        this.submitBtnStatus=true;
      }
      else{

        var inactiveimage=this.rejectimage[i].img;
        console.log(children[i].getElementsByTagName('img')[0] + "children");
        children[i].getElementsByTagName('img')[0].setAttribute("src", inactiveimage);
      }
    }



  }

  gorequest(){
    this.navCtrl.pop();
  }


  Rejectsubmit(){


    if(this.reject!=null){  

        if(this.isremove==true){
          this.removeStatus=1;
        }
        if(this.isremove==false){
          this.removeStatus=0;
        }

      this.itemProvider.rejectRentalRequest(this.requesterId,this.requestedItemId, this.reject,this.removeStatus).subscribe(
        data=>{

              console.log(data.json());

              if(data.json().msg=="success"){
                this.af.list(this.chatRef).update(this.msgKey,{ 
                  type: "rental_request_hide"
                });
                this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"rental_request_response","Rental request has been rejected","Rental request has been rejected because -"+this.reject)
                this.markMessageAsUnRead();
                this.presentToast(data.json().msg_details,1);
              }
        }
        )
    }else{
      this.presentToast("Please choose your rejection option",0);
    }
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

  presentToast(msg,id) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    if(id==1){
       this.navCtrl.setRoot(ChatPage)
    }else{

    }
  });

  toast.present();

}

}
