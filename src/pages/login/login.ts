import { Component } from '@angular/core';
import { NavController, AlertController,NavParams,ToastController,LoadingController,ModalController,Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Device } from '@ionic-native/device';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import {FCM, NotificationData} from "@ionic-native/fcm";

import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Register } from '../register/register';
import { Home } from '../home/home';
import { TabPage } from '../tab/tab';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  loginForm:FormGroup;
  expanded: Boolean;
  register = Register ;
  name:String;
  password:any;
  email:any;
  tabBarElement:any;
  type:any;
  token:any;
  phonenumber:any;
  loading:any;
  userInfo:any;
  lengthExceed:boolean;
  userId:any;
  constructor
  (
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams:NavParams,
    public afAuth: AngularFireAuth,
    private device: Device,
    public formBuilder: FormBuilder,
    public authporvider: AuthenticateProvider,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public storage:Storage,
    public modalCtrl:ModalController,
    public fcm:FCM,
    public platform:Platform
  ) {

    

    this.expanded = true;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.phonenumber=navParams.get("pnumber");
    this.name=navParams.get("pname");

    this.loginForm=formBuilder.group({
      password:['',Validators.compose([Validators.required,Validators.maxLength(20)])]
    });
    
    this.password=this.loginForm.controls['password'];

     

    // this.fcm.getToken()
    //   .then((token:string)=>{
    //     this.token=token;
    //   })
    //   .catch(error=>{
    //     //ocurrió un error al procesar el token
    //     console.error(error);
    //   });
  }


 ionViewDidLoad(){
   this.password=this.loginForm.controls['password'];
 }
  ionViewWillEnter() {
    if(this.tabBarElement){
      this.tabBarElement.style.display = 'none';
    }
  }
 
  ionViewWillLeave() {
    if(this.tabBarElement){
      this.tabBarElement.style.display = 'flex';
    }
  }

  //method to count input length
  numberfill(){
    
    var n=this.password.value.length;
    if (n>20) {
      this.lengthExceed=true;     
    }else{
      this.lengthExceed=false;
    }

  }
  /*
  method to log in user
  */
  login(){

      this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });


      this.storage.set("phone",this.phonenumber);

      if(this.password.value==null){

       this.storage.get('phone').then((data)=>{
        this.phonenumber=data;
      });
       
      }

      this.password=this.password.value;
      
      this.loading.present();

      this.authporvider.login(this.phonenumber,this.password).subscribe(
        data=>{
           
          console.log(data);

          console.log(data.json().user_details);
          this.userInfo=data.json().user_details;

          if(data.json().msg=="success"){
            this.storage.set("userId",this.userInfo[0].id);
            this.userId=this.userInfo[0].id;
            //uncomment when not running on browser
            this.sendToken(this.userInfo[0].id);
            //store user location into storage
            let location={lat: parseFloat(this.userInfo[0].lat), lng: parseFloat(this.userInfo[0].lng),address:this.userInfo[0].location};
            this.storage.set('location',location);
            this.navCtrl.setRoot(TabPage);
            
          }

          if(data.json().msg=="error"){
            this.ionViewDidLoad();
            this.showToast("Invalid login details");
          }

      },
      err=>{
          this.loading.dismiss();
          this.showToast("Please try again later");
          //error
      },
      ()=>{
        this.loading.dismiss();
      }

      );

  }


  /*
    Method to update device token
  */
  sendToken(userId){
    
    if (this.platform.is('cordova')) {
      
    this.fcm.getToken().then(token => {
      this.authporvider.updateDeviceToken(userId,token).subscribe(
        data=>{
            console.log(data);
        },
        err=>{
          this.sendToken(this.userId);
        }
      )
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.authporvider.updateDeviceToken(userId,token).subscribe(
        data=>{
            console.log(data);
        },
        err=>{
          this.sendToken(this.userId);
        }
      )
     });
     
     
    }
  }
  /*
  old method to login with firebase
  */
  loginOld() {
    this.navCtrl.setRoot(TabPage);
    this.type = this.device.platform;
    console.log('device type  ',this.type);
    console.log(this.email);
    // this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(data => {
    //   localStorage.clear();
    //   localStorage.setItem('uid', data.uid);
    //   this.authporvider.sendtoken(data.uid, this.token, this.device).subscribe(data =>{
    //     this.navCtrl.setRoot(TabPage);
    //   });
    // }, err => {
    //   console.log('login Error =--', err);
    // });
  }


  forgotPassword() {

    let modal=this.modalCtrl.create("ForgetPasswordPromptPage",{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

   showToast(msg:string) {
     let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });

    toast.present(toast);
  }

}
