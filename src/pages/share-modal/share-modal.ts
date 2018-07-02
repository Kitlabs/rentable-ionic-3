import { Component } from '@angular/core';
import { NavController, NavParams, Platform , ViewController, ModalController,AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';



@Component({
  selector: 'page-share-modal',
  templateUrl: 'share-modal.html'
})
export class ShareModal {

  public sendTo   : any;
  public subject  : string = 'Message from Rentable Application';
  public message  : string = 'Take your app development skills to the next level with Mastering Ionic 2 - the definitive guide';
  public image    : string	= 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
  public uri      : string	= 'https://www.jadecreative.co.nz';

  public rootUrl:string='54.79.124.187/api/uploads/'
  //sharing info from details
  public productTitle:string;
  public productDescription:string;
  public productDailyRentalCost:string;
  public productImage:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform : Platform, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public socialSharing:SocialSharing,
    public alertCtrl:AlertController) {

  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad ShareModalPage');
    this.productTitle=this.navParams.get('productTitle');
    this.productDescription=this.navParams.get('productDescription');
    this.productDailyRentalCost=this.navParams.get('productDailyRentalCost');
    this.image=this.navParams.get('productImage');
    this.message="Title="+this.productTitle+" , "+"Description="+this.productDescription+" , "+"Daily rental cost="+"$"+this.productDailyRentalCost;
    
    console.log(this.image);
  }

  
    shareViaFacebook()
    {  
      console.log("facebook share");
      this.platform.ready()
      .then(() =>
      {
            this.socialSharing.shareViaFacebook(this.message, this.image, this.image)
            .then((data) =>
            {
                this.presentAlert('Shared via Facebook');
            })
            .catch((err) =>
            {
                this.presentAlert('Was not shared via Facebook');
            });

          })
          .catch((err) =>
          {
            this.presentAlert('Not able to be shared via Facebook');
          });

      // });

    }

shareViaTwitter()
  {
      this.platform.ready()
      .then(() =>
      {
        this.socialSharing.shareViaTwitter(this.message, this.image, this.image)
        .then((data) =>
        {
            this.presentAlert('Shared via Twitter');
        })
        .catch((err) =>
        {
            this.presentAlert('Was not shared via Twitter');
        });
      });

  }

  shareViaWhatsapp(){
    this.platform.ready()
    .then(() =>
    {      
       this.socialSharing.shareViaWhatsApp(this.message, this.image, this.image)
      .then((data) =>
      {
          this.presentAlert('Shared via Whatsapp');
      })
      .catch((err) =>
      {
          this.presentAlert('Was not shared via Whatsapp');
      });
    });

  }

  closeShareDialog(){
     this.viewCtrl.dismiss();
  }

   //  shareViaInstagram(){
   //    this.platform.ready()
   //    .then(() =>
   //    {

   //       SocialSharing.shareViaInstagram(this.message, this.image)
   //       .then((data) =>
   //       {
   //          console.log('Shared via shareViaInstagram');
   //       })
   //       .catch((err) =>
   //       {
   //          console.log('Was not shared via Instagram');
   //       });

   //    });
   // }



   shareViaEmail()
   {
      this.platform.ready()
      .then(() =>
      {
         this.socialSharing.canShareViaEmail()
         .then(() =>
         {
            this.socialSharing.shareViaEmail(this.message, this.subject, this.sendTo)
            .then((data) =>
            {
               console.log('Shared via Email');
            })
            .catch((err) =>
            {
               console.log('Not able to be shared via Email');
            });
         })
         .catch((err) =>
         {
            console.log('Sharing via Email NOT enabled');
         });
      });
   }

   presentAlert(subTitle:any){
    let alert = this.alertCtrl.create({
    subTitle: subTitle,
    buttons: ['OK']
    });
    alert.present();
  
  }

   close() {
    this.viewCtrl.dismiss(); // This works fine
  }        



}
