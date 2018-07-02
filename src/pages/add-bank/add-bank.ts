import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { PaymentProvider } from '../../providers/payment/payment' 
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-add-bank',
  templateUrl: 'add-bank.html',
})
export class AddBankPage {

  userId:any;
  searchStatus:boolean;
  accountHolderName:any;
  accountBsb:any; 
  accountNumber:any;
  account_type="individual";
  alphabetRegex=/^[A-Za-z ]*$/;
  bankData:any;
  bankSavedData:any;
  bankAttachedStatus:boolean;
  status:boolean=false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public paymentProvider:PaymentProvider,
    public storage:Storage,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController) {
    this.searchStatus=false;
    this.bankData=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBankPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad CreditPagePage');
    this.bankAttachedStatus=false;
    this.storage.get('userId').then(
    (userId)=>{
        this.userId=userId;
        this.getBankDetails(userId);
    });
}


 getBankDetails(userId){

  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  
  this.paymentProvider.getBankAccount(userId).subscribe( 
    data=>{
        console.log(data);
        loading.dismiss();

        if(data.json().msg=="success"){ 
          this.bankAttachedStatus=true;
          this.status=true;
          this.bankSavedData=data.json().data[0];
          console.log(this.bankSavedData);
        }

        if(data.json().msg=="error"){
          this.status=false;
          this.bankAttachedStatus=false;
        }
    },
    err=>{
        loading.dismiss();
        this.presentToast("Please try again later",1);
    }
  );

 }

 deleteBankAccount(bankId){

    this.presentConfirm('Confirm',"You cannot delete a linked bank account,please add another account to deleting this one");
  
  // let loading = this.loadingCtrl.create({
  //   content: 'Please wait...'
  // });
  // loading.present();
  
  // this.paymentProvider.deleteBankAccount(this.userId,bankId).subscribe( 
  //   data=>{
  //       console.log(data);
  //       loading.dismiss();
  //       if(data.json().msg=="success"){ 
  //         this.bankAttachedStatus=false;
  //       }

  //       if(data.json().msg=="error"){
  //         this.bankAttachedStatus=true;
  //       }
  //   },
  //   err=>{
  //       loading.dismiss();
  //       this.presentToast("Please try again later",1);
  //   }
  // );

 }

  /**
   * Method trigger if user start typing on form and validation will be check here
   */
  change(){
  
    if(!this.accountHolderName.match(this.alphabetRegex) || this.accountHolderName=="" || 
      !this.checkAccountBsb(this.accountBsb) || this.accountBsb=="" || 
      !this.checkAccountNumber(this.accountNumber) || this.accountNumber==""
    ){
      this.searchStatus=false;//disable the buttion
    }else{
      this.searchStatus=true;
    }
  }

  /**
   * BSB (6 Characters)
   */
  checkAccountBsb(number):boolean{
    let regex = new RegExp("^[0-9]{6}$"); 
    if(number){
      if(regex.test(number)){
        console.log("bsb number true");
        return true;
      }else{
        console.log("bsb number false");
        return false;
      }
    }
  } 

  /**
   * Account Number (6-10 characters)
   */
  checkAccountNumber(number):boolean{
    let regex = new RegExp("^[0-9]{6,10}$");
    if(number){
      if(regex.test(number)){
        console.log("account number true");
        return true;
      }else{
        console.log("account number false");
        return false;
      }
      
    } 
    
  }

  removeAccountHolderName(){
    this.accountHolderName="";
  }

  removeBsb(){
    this.accountBsb="";
  }

  removeAccountNumber(){
    this.accountNumber="";
  }


  /**
   * Method used to add bank account 
   */
  addBank(){

    this.bankData.accHolderName=this.accountHolderName;
    this.bankData.accBsbNumber=this.accountBsb;
    this.bankData.accNumber=this.accountNumber;
    this.bankData.accType=this.account_type;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.paymentProvider.addBankAccount(this.bankData,this.userId).subscribe( 
      data=>{
          console.log(data);
          loading.dismiss();
          if(data.json().msg=="success"){ 
              this.presentToast("Bank has been added successfully",0);
          }

          if(data.json().msg=="error"){
            this.presentAlert(data.json().msg_details);
          }
      },
      err=>{
          console.log(err);
          this.presentToast("Invalid card details",1);
          loading.dismiss();
      }
  );
  }
 
  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(msg,id) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
        if(id==0){
            this.navCtrl.pop();
        }else{

        }
    });
    toast.present();
  }

  presentConfirm(title,msg) {
    //You cannot delete a linked bank account,please add another account to deleting this one
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add New',
          handler: () => {
            this.bankAttachedStatus=false;
          }
        }
      ]
    });
    alert.present();
  }
}
