import { Injectable, Inject } from '@angular/core';
import { Http,Headers,RequestOptions,URLSearchParams, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { FCM } from "@ionic-native/fcm";
import { Device } from '@ionic-native/device';
@Injectable()
export class AuthenticateProvider {

  apiUrl = this.appSettings.getApiURL();
  paymentApiUrl=this.appSettings.getPaymentApiUrl();

  constructor(public http: Http, 
    public appSettings: AppSetting,
    public platform:Platform, 
    public local: Storage,
    public fcm: FCM,
    public device:Device) {
    this.http = http;
    // code...
  }


  /*
    Method to send verification code
    input=
  */
  public Sendsms(smsnumber) {

    console.log(smsnumber);
    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('action', 'SendSMSVerification');
    // urlSearchParams.append('PhoneNumber', smsnumber);

    let body={
      action:'SendSMSVerification',
      phoneNumber:smsnumber
    }

    console.log(JSON.stringify(body))

    return this.http.post(this.apiUrl,JSON.stringify(body));

  }

    /*
    Method to verify registered number with otp code
    input=
  */
  public smsverify(smsnumber, otpcode){
    console.log("auth sms verify");
    console.log(smsnumber);

/*    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', 'smsverify');
    urlSearchParams.append('phoneNumber', smsnumber);
    urlSearchParams.append('code',otpcode);*/

    let body={
      action:'smsverify',
      phoneNumber:smsnumber,
      code:otpcode
    }

    return this.http.post(this.apiUrl,JSON.stringify(body));

    //return this.http.post(this.apiUrl, {'action':'smsverify','phoneNumber': smsnumber, 'code':digitcode});

  }

  /*
   Method to register notification token
  */
  public sendtoken(uid, token ){

    let body={
        action:'',
        userId:uid,
        token:token  
    }

    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
   Method to update notification token
  */
  public updateToken(uid,token){
       let body={
        action:'',
        userId:uid,
        token:token  
    }

    return this.http.post(this.apiUrl,JSON.stringify(body));
  
  }


  public getalluser() {
    return this.http.get(this.apiUrl+'user/all');
  }

  /*
  User sign up
  Input=finishsign.ts
  */
  public signup(Usersignup){

    let body={
        action:'CreateAccountOnStripe',
        email:Usersignup.email,
        emailVerified:"false",
        phoneNumber:Usersignup.phonenumber,
        password:Usersignup.password,
        firstName:Usersignup.firstname,
        lastName:Usersignup.lastname,
        postalCode:Usersignup.postalcode,
        deviceToken:Usersignup.fcmToken,
        location:Usersignup.location,
        lat:Usersignup.lat,
        lng:Usersignup.lng,
        deviceType:this.device.platform,
        fbId:Usersignup.fbId,
        Country:Usersignup.Country,
        City:Usersignup.City,
        day:Usersignup.day,
        month:Usersignup.month,
        year:Usersignup.year
      }

      console.log(JSON.stringify(body));
      return this.http.post(this.paymentApiUrl,JSON.stringify(body));
  }


  /*
  Check phone number exist or not
  Inputs=landing.ts
  */
  public phoneverify(phonenumber){
     console.log("phone verify");
     console.log(phonenumber);

    // let urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('action', 'GetUserByPhone');
    // urlSearchParams.append('PhoneNumber', JSON.stringify(body));

     let body={
       action:'GetUserByPhone',
       phoneNumber:phonenumber
     }

      console.log(JSON.stringify(body));

    return this.http.post(this.apiUrl,JSON.stringify(body));

  }

  /*
    Login with number and password
    Call:login.ts
  */
  public login(phonenumber,password){


    let body={
      action:'SignIn',
      phoneNumber:phonenumber,
      password:password
    }

    console.log(JSON.stringify(body));

    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  /*
    Send forget password code
    Call:login.ts
    params:email
  */
 public sendForgetCode(email){

    console.log("SendCode="+email);
    let body={
      action:'ForgotPassword',
      email:email
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  public resetForgetPassword(email,code,newpass,conpass){

    /*let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('action', 'VerifyForgetCode');
    urlSearchParams.append('email', email);
    urlSearchParams.append('code', code);
    urlSearchParams.append('new_password', newpass);
    urlSearchParams.append('confirm_password', conpass);*/

    let body={
      action:'VerifyForgetCode',
      email:email,
      code:code,
      new_password:newpass,
      confirm_password:conpass
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,body);

  }

  /*
  Function to get user details based on userId
  */
  public  getUserDetail(userId){
    
    let body={
      action:'GetUserDetails',
      userId:userId
    } 
    
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));

  }

  /*
    Function to change password
    call:change-password.ts
  */

  public  changePassword(userId,oldPassword,newPassword){
      //{"password":"123456","oldPassword":"td000000","action":"PorfilePasswordUpdate","id":"16"}

    let body={
      action:'PorfilePasswordUpdate',
      id:userId,
      oldPassword:oldPassword,
      password:newPassword
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));

  }

  /*
    function to get address from postal code
  */
  public getAddressFromPostalCode(postalcode){

     //var url='https://maps.googleapis.com/maps/api/geocode/json?address='+postalcode+'&key=AIzaSyCTSsYgSHTpb9d6-o5qYQm8yQ9b8O81MYc';
     var url='https://maps.googleapis.com/maps/api/geocode/json?components=country:Au&address='+postalcode+'&key=AIzaSyCTSsYgSHTpb9d6-o5qYQm8yQ9b8O81MYc';
     console.log(url);
     return this.http.get(url);
   }

   /*
    function to update device token
   */
  public updateDeviceToken(userId,token){
    //{"action":"ProfileUpdate","id":"11","deviceToken":"dfsdfsdfssdfsdfsdfsdfsdfsdfsdfsdf"} 
     let body={
       action:'ProfileUpdate',
       id:userId,
       deviceToken:token
     }
     console.log(JSON.stringify(body));
     return this.http.post(this.apiUrl,JSON.stringify(body));
   }

}