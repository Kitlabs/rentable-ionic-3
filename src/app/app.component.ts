import { Component } from '@angular/core';
import { Platform,NavController,Events,ToastController,AlertController} from 'ionic-angular';
import { StatusBar  } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Keyboard } from 'ionic-native';
import {FCM, NotificationData} from "@ionic-native/fcm";
import { Storage } from '@ionic/storage';
import { TabPage } from '../pages/tab/tab';
import { LandingPage } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import { ForgetpassswordPage } from '../pages/forgetpasssword/forgetpasssword';
import { FinishsignPage } from '../pages/finishsign/finishsign';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { ChatPage } from '../pages/chat/chat';
import { Badge } from '@ionic-native/badge';
declare var window: any;
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  //rootPage:any = TabsPage;
  //rootPage: any = LandingPage;
  rootPage:any;
  token:any;
  notificationTitle:any;
  notificationBody:any;
  notificationBadge:any;
  constructor(private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private storage:Storage,
    private authProvider:AuthenticateProvider,
    private toastCtrl:ToastController,
    private events:Events,
    private alertCtrl:AlertController,
    private fcm: FCM,
    private ev:Events,
    private badge:Badge) {
    //alert('Welcome back dude latest!');

    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    function keyboardShowHandler(e){
      this.keyboard.show();
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      statusBar.backgroundColorByHexString('#002039');
      Keyboard.hideKeyboardAccessoryBar(false);   
      this.badge.clear();
      this.registerNotification();
      this.showLogInOrWalkScreen();
    });

  }

   showLogInOrWalkScreen(){

      this.checkWheatherUserLogInOrNot().then(
        id=>{
            if(id!=null){
                this.authProvider.getUserDetail(id).subscribe(
                  data=>{
                   if(data.json().msg== 'success'){
                      this.storage.set("CARD_STATUS",data.json().cardstatus);
                      this.storage.set("USER_CHATTING_STATUS",0);
                      this.events.publish('CARDSTATUS',data.json().cardstatus);
                      this.rootPage=TabPage;
                    }else{
                     this.sendFcmToken(id);
                     this.setWalkThrouhgh();
                   }
                  },
                  err=>{
                     this.setWalkThrouhgh();
                  },
                  );
            }else{
              this.setWalkThrouhgh();
            }
          }
        );
  }

  setWalkThrouhgh(){
    // /this.rootPage='WalkthroughPage';
    

    this.getWalkthroughStatus().then(
      data=>{
        if(data!=null){
          //dont show walk through
          this.rootPage=LandingPage;      
        }else{
          //show walkthrough
          this.rootPage='WalkthroughPage';
        }
      }
    )
  }


  /*
  Method to check whether user log in or not
  */
  checkWheatherUserLogInOrNot():any{
    return this.storage.get('userId').then((data)=>{
      if(data!=null){
        return data;
      }else{
        return data;
      }
    });
  }

/*
  Method to check whether to show walk through or not
  */
 getWalkthroughStatus():any{
  return this.storage.get('walkthrough').then((data)=>{
    return data;
    });
  }


  /*
   Method to register and handling the firebase push notification
  */
  registerNotification(){
    if (this.platform.is('cordova')) {
      this.fcm.onNotification().subscribe(data=>{
       //this.presentConfirm("Test","test");
       // alert(JSON.stringify(data));
       // alert('Post id==='+data.PostId);
       console.log('Notification triggered');
         console.log('datat'+data);
        if(data.wasTapped == true){
          // alert('Tapped')
          console.log("Received in background");
          if(data.PostId){
                // alert('found postid');
                //this.events.publish('redirection',data.PostId);
                localStorage.setItem('redirection',data.PostId);
          }else{
            localStorage.removeItem('redirection');
          }
          this.storage.get('counter').then((data)=>{
              
            if(data!=null){
              let count=data+1;
              this.storage.set('counter',count);
            }else{
              this.storage.set('counter',1);
            }
          });
        }else {
          console.log("Received in foreground");
          //alert(JSON.stringify(data));
           // this.presentConfirm("d",data);
           this.events.publish('messageCount',0);
           this.events.publish('rentalCount',0);
            this.badge.clear();
          if(data.aps.alert.title=="Message!"){
            
            this.presentConfirm(data.aps.alert.title,data.aps.alert.body);
          }else{
            
            this.presentConfirm(data.aps.alert.title,data.aps.alert.body);  
          }
        };

      },(error)=>{
        console.error(error);
      });

   }
  }

  async getBadges() {

    try {
      let badgeAmount = await this.badge.get();
      console.log(badgeAmount);
      //this.increaseBadges(badgeAmount);
      this.badge.set(10);
    } 
    catch (e) {
      console.error(e);
    }
  }


  async increaseBadges(badgeNumber: string) {
    try {
      //let badge = await this.badge.increase(Number(badgeNumber));
      this.badge.set(Number(badgeNumber)+1);
     // console.log(badge);
    } catch (e) {
      console.error(e);
    }
  }

  /*
  Function to register token with user Id and device type
  */
  sendFcmToken(userId:string){

    if (this.platform.is('cordova')) {
          // You are on a device, cordova plugins are accessible
          this.fcm.getToken().then(token=>{
            this.authProvider.updateDeviceToken(userId,token);
            this.storage.set("fcmtoken",token);
        });

        this.fcm.onTokenRefresh().subscribe(token=>{
          this.checkWheatherUserLogInOrNot().then(
            data=>{
                this.storage.set("fcmtoken",token);
                this.authProvider.updateDeviceToken(data,token);
              }
            );
        });

    } else {
      // Cordova not accessible, add mock data if necessary
      console.log("On Browser");
    }
      
  }

  displayNotifcation(){
    //{"someId":"111","aps":{"badge":1,"alert":{"title":"Congratulations!","body":"Your request for the item has been approved by the item owner."}},"gcm.message_id":"0:1522336713699987%7899633578996335"}
      

     // if (this.platform.is('cordova')) {

      console.log(this.notificationTitle);
      console.log(this.notificationBody);
      this.ev.publish('message',1);
      
       // Schedule a single notification
      // this.localNotification.schedule({
      //   id: 1,
      //   title:this.notificationTitle,  
      //   text: this.notificationBody,
      // });


    //   //code to handle when user click on local notification
    //   this.localNotification.on('click',(notification,state)=>{
    //   /*
    //     $title = "Congratulations!";
    //     $title = "Reject!";
    //     $title = "Cancel!";
    //     $title = "PickUp!";
    //     $title = "Return!";*/
    //     $title = "PickedUp Status!"
    //     switch (notification.title) {
    //       case "Congratulations!":
    //         this.ev.publish('message',1);
    //         break;
    //       case "Reject!":
    //         this.ev.publish('message',1);
    //         break;
    //         case "Cancel!":
    //         this.ev.publish('message',1);
    //         break;
    //         case "PickUp!":
    //         this.ev.publish('message',1);
    //         break;
    //         case "Return!":
    //         this.ev.publish('message',1);
    //         break;
    //       default:
    //         // code...
    //         break;
    //     }

    //  });

  }


presentConfirm(title,message) {
  var titleKey=title;
  let alert = this.alertCtrl.create({
    title: title,
    message: message,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
             
        }
      }
  ]
  });
  alert.present();
}

  /*
    Method to display toast message to user
  */
  displayToast(msg){
      //var msg=msg.aps.alert.body
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 6000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
  }

}