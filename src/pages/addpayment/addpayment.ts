import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController,ToastController, Toast  } from 'ionic-angular';
import { PaymentProvider } from '../../providers/payment/payment';
import { PaypalPage } from '../paypal/paypal';
import { CreditPage } from '../credit/credit';
import { Profile } from '../profile/profile';
import { PayPage } from '../stripe/pay/pay';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AddpaymentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addpayment',
  templateUrl: 'addpayment.html'
})
export class AddpaymentPage {

	private credit=CreditPage;
  private paypal=PaypalPage;
  private profile=Profile;
  private stripe=PayPage;
  private cards:Array<any>;
  private userId:any;
  private primaryCard:any;
  private deleteOptionStatus:boolean=false;
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl:ToastController,
    private storage:Storage,
    private events:Events,
    private loadingCtrl:LoadingController,
    private paymentprovider: PaymentProvider,) {
    this.cards=[];
    this.primaryCard=5;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpaymentPagePage');
  }

  ionViewDidEnter(){
    this.cards=[]; 
    this.getListOfAttachedCard();
  }

  goToPrevious(){
    this.navCtrl.push('PaymentSettingPage');
  }
  /**
   * Method to get list of attached cards
   */
  getListOfAttachedCard(){
 
    this.storage.get('userId').then(
      (userId)=>{
        this.userId=userId;
        this.paymentprovider.getListofCards(userId).subscribe(
          data=>{
            console.log(data);
             if(data.json().msg == "success"){
               this.events.publish('CARDSTATUS',1);
               this.storage.set("CARD_STATUS",1);
               this.cards=data.json().data;
               this.deleteOptionStatus = data.json().RentedStatus == 'success' ? false:true;

               for(let card of this.cards){
                  if(card.PrimaryCard == 0){
                     this.primaryCard=card.id;
                  }
               }
             }else{
              this.events.publish('CARDSTATUS',0);
              this.cards=[]; 
             }
          },
          err=>{
             this.cards=[];
          }
        );
       });

  }
  /**
   * Method to update the primary card id
   * @param cardId contain card Id
   */
  updatePrimaryCard(cardId){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.paymentprovider.updatePrimaryCard(cardId,this.userId).subscribe(
      data=>{
        console.log(data.json());
        loading.dismiss();
        if(data.json().msg == "success"){  
           this.presentToast("Primary card has been set");
         }else{
           this.presentToast("Please try again later");
         }
      },
      err=>{
        loading.dismiss();
        console.log(err);
      }
    );

  }
  /**
   * Method to delete card
   * @param cardId contain cardId 
   */
  deleteCard(cardId,index){   
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Do you want to delete this card ?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('delete operation has been cancelled');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.paymentprovider.deleteCard(cardId,this.userId).subscribe(
                data=>{
                  console.log(data.json());
                  
                  if(data.json().msg == "success"){  
                     this.presentToast("Deleted successfully");
                     this.getListOfAttachedCard();
                    }else{
                     this.presentToast(data.json().msg_details);
                   }
                },
                err=>{
                  this.presentToast("Please try again later");
                  console.log(err);
                }
              );

            }
          }
        ]
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
      console.log('Dismissed toast');
    });

    toast.present();
}


}
