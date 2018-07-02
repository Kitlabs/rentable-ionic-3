import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl  } from '@angular/forms';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

import { Home } from '../home/home';
import { SignupPage } from '../signup/signup';
import { FinishsignPage } from '../finishsign/finishsign';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthenticateProvider]
})
export class Register {

  signup = SignupPage;
  finishsign=FinishsignPage;
  digitcode:AbstractControl;
  Usersignup:any;
  formgroup: FormGroup;
  phonenumber:any;
  tabBarElement:any;
  loading:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public Authprovider: AuthenticateProvider,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    public storage:Storage
    ) {

    

  	this.formgroup = formBuilder.group({
        digitcode: ['', Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(4) ])]
    });
    
    this.Usersignup=[];
    this.digitcode=this.formgroup.controls['digitcode'];
    this.phonenumber=navParams.get("pnumber");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
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

  numberfill(){
    var n=this.digitcode.value.length;
    if (n>4) {
      //document.getElementById("code").style.backgroundColor = "red";
      document.getElementById("code").style.color = "red";
     
    }else{
      document.getElementById("code").style.color="white";
    }

  }
  gosignup(){

    /*this.Usersignup.phonenumber = this.phonenumber;
    this.Authprovider.smsverify(this.phonenumber,this.digitcode.value).subscribe(data => {
      let res = data.json().success;
      console.log('hehe', res);
      
      if(!res)
        alert('Please reenter your sms code');
      else
        this.navCtrl.push(SignupPage,{
          user: this.Usersignup
        });
    });*/
    
    
    this.initLoader();
    this.loading.present();
    this.Usersignup.phonenumber=this.phonenumber;
    console.log("Sign up clicked")
    console.log(this.phonenumber);
    console.log(this.digitcode.value);
  
    this.Authprovider.smsverify(this.phonenumber,this.digitcode.value).subscribe(
      data=>{

        
        
        if(data.json().msg=="success"){
           this.navCtrl.push(SignupPage,{
             user:this.Usersignup
           })
        }
        
        if(data.json().msg=="error"){
          this.showToastWithCloseButton("Invalid verification code used, please try again");
          document.getElementById("code").style.color = "red";
        }


      },

      err=>{
          this.loading.dismiss();
          this.showToast("Please check your internet connection");
      },

      ()=>{
          this.loading.dismiss();
      }

      );

  
    
  }

  /*
  function to send otp again
  */
  sendOtp(){
    console.log("send otp again");
    
    this.initLoader();
    this.loading.present();
    //send otp to number 
    this.Authprovider.Sendsms(this.phonenumber).subscribe(data=>{
      console.log(data.json());
      

      if(data.json().msg=="success"){ 
        this.showToast("A code has been sent to your phone");
      }
      
      if(data.json().msg=="error"){
         this.showToast("Please try again later");
      }

    },
     err=>{
        console.log(err);
        this.loading.dismiss();
        this.showToast("Please try again later");
     },

     ()=>{
       this.loading.dismiss();
     }

    );

  }

  initLoader(){
    //to show loader
    this.loading=this.loadingCtrl.create({
        spinner:'bubbles',
        content:`Please wait..`
      });

  }
  showToastWithCloseButton(msg:string) {
     const toast = this.toastCtrl.create({
      message: msg,
      position: "top",
      showCloseButton:true,
      closeButtonText:"OK"
    });
    toast.present();
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
