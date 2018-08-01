import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';

@Injectable()
export class ProfileProvider {

  apiUrl = this.appSettings.getApiURL();

  constructor(public http: Http, public appSettings: AppSetting) {
  	this.http=http;
    console.log('Hello PaymentProvider Provider');
  }

  public ChangeProfile(email, phonenumber, pasword, firstname, lastname, photourl, postalcode,userId,lat,lng,location){
     let body={
       action:'ProfileUpdate',
       id:userId,
       email:email,
       firstName:firstname,
       lastName:lastname,
       postalCode:postalcode,
       lat:lat,
       lng:lng,
       location:location
     }
     return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /*
    Function to get user details based on userId
  */
  public Getprofile(userId){

    let body={
      action:'GetUserDetails',
      userId:userId
    }    
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /*
    Function to update profile image
  */
  public uploadProfilePic(userId,profilePic){

    let body={
      action:'PorfilePicUpload',
      UserId:userId,
      image:JSON.stringify(profilePic)
    }

    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }


  /**
   *Function to send verifcation code to update mobile number
   */
  public getVerificationCode(phoneNumber,id){
    //{"action":"SendSMSVerificationForPhoneUpdate","phoneNumber":"+919417349947","id":"16"}
    let body={
      action:'SendSMSVerificationForPhoneUpdate',
      phoneNumber:phoneNumber,
      id:id
    }
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  
 /**
   *Function to send verifcation code to update mobile number
   */
  public updateMobileNumber(phoneNumber,id,code){
    //{"action":"smsverifyForPhoneUpdate","phoneNumber":"+919417349947","id":"16","code":"4686"}
    let body={
      action:'smsverifyForPhoneUpdate',
      phoneNumber:phoneNumber,
      id:id,
      code:code
    }
    console.log(JSON.stringify(body));
    return this.http.post(this.apiUrl,JSON.stringify(body));
  }

  public Appfeedback(rate, leavemessage){
    console.log(" leavt", leavemessage);
    return this.http.post(this.apiUrl + "profile/feedback", {'rate': rate, 'leavemessage': leavemessage});
  }

  public Aboutinfo(uid){
    return this.http.post(this.apiUrl + "profile/about", {uid: uid});
  }

  public moneyindividual(uid){
    return this.http.post(this.apiUrl + "profil/moneyindivide" , {uid: uid});
  }

  public moneyinmonth(uid){
    return this.http.post(this.apiUrl + "profil/moneyinmonth" , {uid: uid});
  }

  public moneyinquratly(uid){
    return this.http.post(this.apiUrl + "profil/moneyinquartly" , {uid: uid});
  }

  public moneyinyear(uid){
    return this.http.post(this.apiUrl + "profil/moneyinyear" , {uid: uid});
  }

  public moneyoutindividual(uid){
    return this.http.post(this.apiUrl + "profil/moneyoutindividual" , {uid: uid});
  }

  public moneyoutmonth(uid){
    return this.http.post(this.apiUrl + "profil/moneyoutmonth" , {uid: uid});
  }

  public moneyoutquartly(uid){
    return this.http.post(this.apiUrl + "profil/moneyoutquartly" , {uid: uid});
  }

  public moneyoutyear(uid){
    return this.http.post(this.apiUrl + "profil/moneyoutyear" , {uid: uid});
  }

  public giveFeedback(UserId,PostId,FeedbackRating,FeedbackComment){
    //{"action":"FinalFeedbackOnPost","UserId":"45","PostId":"182","FeedbackRating":"2","FeedbackComment":"test"}
    let body={
      action:'FinalFeedbackOnPost',
      UserId:UserId,
      PostId:PostId,
      FeedbackRating:FeedbackRating,
      FeedbackComment:FeedbackComment
    }
    return this.http.post(this.apiUrl,JSON.stringify(body));
 }

 public getRating(UserId){
   //{"action":"GetOverallFeedbackRating","UserId":"50"}
   let body={
    action:'GetOverallFeedbackRating',
    UserId:UserId,
  }
  // let body={
  //   action:'GetOverallFeedbackRatingForRated',
  //   UserId:UserId,
  // }
  console.log(JSON.stringify(body));
  return this.http.post(this.apiUrl,JSON.stringify(body));
 }  



}