import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Navbar,ToastController,LoadingController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProfileProvider } from '../../providers/payment/profile';
import { Home } from '../home/home';
import { RejectPage } from '../reject/reject';
import { AcceptPage } from '../accept/accept';
import { Details } from '../details/details';
import { Filter } from '../filter/filter';
import { ItemsProvider } from '../../providers/items/items';
import { ChatProvider } from '../../providers/chat/chat';
import { ChatPage } from '../chat/chat';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html'
})
export class RentPage {
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
  toolTip:any;
  fromDate:any;
  toDate:any;
  loading:any;
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private storage:Storage,
    private itemprovider:ItemsProvider,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,
    private af:AngularFireDatabase, 
    private alertCtrl:AlertController,
    private chatProvider:ChatProvider,
    private profileProvider:ProfileProvider) {

    this.goodcondition=[];
    
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
    this.userRatingNeg=[];
    this.userRatingPos=[];
    this.requesterId=this.navParams.get("requesterId")
    this.requestedItemId=this.navParams.get("requestedItemId");
    this.msgKey=this.navParams.get("msgKey");
    this.chatRef=this.navParams.get("chatRef");
    console.log(this.chatRef);
  }

  backdetail(){
    this.navCtrl.pop();
  }


  ionViewDidLoad() {
    this.storage.get('userId').then((id)=>{  
      this.userId=id;
    });
    this.getRentalReqeustInfo();
    this.getUserRating();
  }

  getRentalReqeustInfo(){
    this.itemprovider.getRentalRequestDetails(this.requesterId,this.requestedItemId).subscribe(
      data =>{
      if(data.json().msg=="success"){

        this.rentalRequestDetails=data.json().PostData[0];
        if(this.rentalRequestDetails.Status=='Cancel'){
          
          this.af.list(this.chatRef).update(this.msgKey,{ 
            type: "rental_request_hide"
          });
          this.showAlertMessage("The rental request has been cancelled");
        }
        let fromDateStr = this.rentalRequestDetails.FromDate;
        let toDateStr = this.rentalRequestDetails.ToDate;
        let fromDateRes = fromDateStr.split("-");
        let toDateRes = toDateStr.split("-");
        this.fromDate=fromDateRes[2]+"/"+fromDateRes[1]+"/"+fromDateRes[0].slice(2);
        this.toDate=toDateRes[2]+"/"+toDateRes[1]+"/"+toDateRes[0].slice(2);
        this.basePath=data.json().base_path;
        this.priceBreakDown();
       }else{
         this.navCtrl.pop();
       }
      },
      err=>{
        console.log("error");
        this.navCtrl.pop();
      });
  }

  priceBreakDown(){
    //delivery fee not applied
    if(this.rentalRequestDetails.needDelivery==0){
      this.toolTip="Rental Cost = $"+this.rentalRequestDetails.rentalCostWithoutFee+ "                    Service Fee = $"+this.rentalRequestDetails.rentableServiceFee;
      console.log(this.toolTip);
    }else{
      //delivery fee applied
      this.toolTip="Rental Cost = $"+this.rentalRequestDetails.rentalCostWithoutFee+ "                     Service Fee = $"+this.rentalRequestDetails.rentableServiceFee+"                      Delivery Fee = $"+this.rentalRequestDetails.deliveryfee;
    }
    
  }

  /*
    navigate to reject request page
  */
  goToRejectRequest(){
     this.navCtrl.push(RejectPage,{
       requesterId:this.requesterId,
       requestedItemId:this.requestedItemId,
       msgKey:this.msgKey,
       chatRef:this.chatRef,
       userId:this.userId
     });

  }


  /*
    navigate to accept request page
  */
  goToAcceptRequest(){

    this.loading=this.loadingCtrl.create({
      spinner:'bubbles',
      content:`Please wait..`
    });
    this.loading.present();
    this.itemprovider.acceptRentalRequest(this.requesterId,this.requestedItemId,"Rented").subscribe(
      data=>{ 
          
          this.loading.dismiss();
          if(data.json().msg=="success"){
            
              this.af.list(this.chatRef).update(this.msgKey,{ 
                type: "rental_request_hide"
              });
              this.presentToast("Request has been accepted successfully");
              //uid,interlocutor,itemid,message,type
              this.markMessageAsUnRead();
              this.chatProvider.sendMessageRental(this.userId,this.requesterId,this.requestedItemId,"rental_request_response","rental request has been approved","rental request has been approved")
              this.navCtrl.pop();  
          }

          if(data.json().msg=="error"){
            this.presentToast("Request already accepted ");
            this.navCtrl.pop();
          }
      },
      err=>{
        this.loading.dismiss();
        this.navCtrl.pop();
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
  
  /*
    Function to set user rating
  */
 getUserRating(){

   let rating:any;
   //product rating
   this.profileProvider.getRating(this.requesterId).subscribe(
     (data)=>{
       rating=data.json().AverageRating;
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

showAlertMessage(subTitle:any){
    let alert = this.alertCtrl.create({
    subTitle: subTitle,
    enableBackdropDismiss:false,
    buttons: [{
      text:'Ok',
      handler:()=>{
        this.navCtrl.pop();
      }
    }]
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
