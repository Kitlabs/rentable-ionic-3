import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController,ToastController  } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { FinishsignPage } from '../finishsign/finishsign';
import { Register } from '../register/register';
import { TabPage } from '../tab/tab';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

	finishsign=FinishsignPage;
  register=Register;
  email: any;
  password: any;
  confirmpassword:any;
  registerForm:FormGroup;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  Usersignup:any;
  uuid:any;
  tabBarElement:any;
  showFb:boolean;
  //fb test
  users:any;
  firstName:any;
  lastName:any;
  fbEmail:any;
  fbId:any;
  userInfo:any;
  id:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Authprovider: AuthenticateProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private device: Device,
    private fb: Facebook,
    private toastCtrl:ToastController,
    public storage:Storage,
  ) {
    
    console.log("inside constructor");    
    //let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let EMAIL_REGEXP=/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let PASSWORD_REGEXP=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;

    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP),Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.minLength(6),Validators.maxLength(20) ,Validators.required,Validators.pattern(PASSWORD_REGEXP)])],
      confirmpassword: ['',Validators.required],
    },{validator:this.matchingPasswords('password','confirmpassword')});
    
    this.Usersignup=navParams.get("user");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.showFb=false;
    this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPagePage');
    this.email=this.registerForm.controls['email'];
    this.password=this.registerForm.controls['password'];
    this.confirmpassword=this.registerForm.controls['confirmpassword'];

   

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

  elementChanged(input){
    let field = input.inputControl;
    this[field + "Changed"] = true;
  }

  facebook(){

  }

  doRegister(){
    this.Usersignup.email=this.email.value;
    this.Usersignup.password=this.password.value;
    
    this.navCtrl.push(FinishsignPage,{
      user:this.Usersignup
    });
  }

  //Method to register with facebook 
  doRegisterWithFb(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res=>{
         if(res.status=="connected"){
           this.showFb=true;
           this.getUserDetail(res.authResponse.userID);
         }
      })
      .catch(e => console.log('Error logging into Facebook', e));
      this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }


getUserDetail(userid) {

  this.fb.api("/"+userid+"/?fields=id,email,name,first_name,last_name,picture,gender",["public_profile"])
    .then(res => {
    this.users=res;
    this.Usersignup.id=1;
    this.Usersignup.email=this.users.email;
    this.Usersignup.password=this.password.value;
    this.Usersignup.firstName=this.users.first_name;
    this.Usersignup.lastName=this.users.last_name;
    this.fbEmail=this.users.email;   
    this.registerForm.get('email').setValue(this.users.email);
      
    })
    .catch(e => {
      console.log(e);
    });
}


matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }


  showToastWithCloseButton(msg:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      duration:2000,
      position: "top"
    });

    toast.onDidDismiss(()=>{
        this.navCtrl.setRoot(TabPage);
    });
    toast.present();
  }
}
