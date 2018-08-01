var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { FCM } from "@ionic-native/fcm";
import { Device } from '@ionic-native/device';
var AuthenticateProvider = /** @class */ (function () {
    function AuthenticateProvider(http, appSettings, platform, local, fcm, device) {
        this.http = http;
        this.appSettings = appSettings;
        this.platform = platform;
        this.local = local;
        this.fcm = fcm;
        this.device = device;
        this.apiUrl = this.appSettings.getApiURL();
        this.paymentApiUrl = this.appSettings.getPaymentApiUrl();
        this.http = http;
        // code...
    }
    /*
      Method to send verification code
      input=
    */
    AuthenticateProvider.prototype.Sendsms = function (smsnumber) {
        console.log(smsnumber);
        // let urlSearchParams = new URLSearchParams();
        // urlSearchParams.append('action', 'SendSMSVerification');
        // urlSearchParams.append('PhoneNumber', smsnumber);
        var body = {
            action: 'SendSMSVerification',
            phoneNumber: smsnumber
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
    Method to verify registered number with otp code
    input=
  */
    AuthenticateProvider.prototype.smsverify = function (smsnumber, otpcode) {
        console.log("auth sms verify");
        console.log(smsnumber);
        /*    let urlSearchParams = new URLSearchParams();
            urlSearchParams.append('action', 'smsverify');
            urlSearchParams.append('phoneNumber', smsnumber);
            urlSearchParams.append('code',otpcode);*/
        var body = {
            action: 'smsverify',
            phoneNumber: smsnumber,
            code: otpcode
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
        //return this.http.post(this.apiUrl, {'action':'smsverify','phoneNumber': smsnumber, 'code':digitcode});
    };
    /*
     Method to register notification token
    */
    AuthenticateProvider.prototype.sendtoken = function (uid, token) {
        var body = {
            action: '',
            userId: uid,
            token: token
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
     Method to update notification token
    */
    AuthenticateProvider.prototype.updateToken = function (uid, token) {
        var body = {
            action: '',
            userId: uid,
            token: token
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    AuthenticateProvider.prototype.getalluser = function () {
        return this.http.get(this.apiUrl + 'user/all');
    };
    /*
    User sign up
    Input=finishsign.ts
    */
    AuthenticateProvider.prototype.signup = function (Usersignup) {
        var body = {
            action: 'CreateAccountOnStripe',
            email: Usersignup.email,
            emailVerified: "false",
            phoneNumber: Usersignup.phonenumber,
            password: Usersignup.password,
            firstName: Usersignup.firstname,
            lastName: Usersignup.lastname,
            postalCode: Usersignup.postalcode,
            deviceToken: Usersignup.fcmToken,
            location: Usersignup.location,
            lat: Usersignup.lat,
            lng: Usersignup.lng,
            deviceType: this.device.platform,
            fbId: Usersignup.fbId,
            Country: Usersignup.Country,
            City: Usersignup.City,
            day: Usersignup.day,
            month: Usersignup.month,
            year: Usersignup.year
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.paymentApiUrl, JSON.stringify(body));
    };
    /*
    Check phone number exist or not
    Inputs=landing.ts
    */
    AuthenticateProvider.prototype.phoneverify = function (phonenumber) {
        console.log("phone verify");
        console.log(phonenumber);
        // let urlSearchParams = new URLSearchParams();
        // urlSearchParams.append('action', 'GetUserByPhone');
        // urlSearchParams.append('PhoneNumber', JSON.stringify(body));
        var body = {
            action: 'GetUserByPhone',
            phoneNumber: phonenumber
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Login with number and password
      Call:login.ts
    */
    AuthenticateProvider.prototype.login = function (phonenumber, password) {
        var body = {
            action: 'SignIn',
            phoneNumber: phonenumber,
            password: password
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Send forget password code
      Call:login.ts
      params:email
    */
    AuthenticateProvider.prototype.sendForgetCode = function (email) {
        console.log("SendCode=" + email);
        var body = {
            action: 'ForgotPassword',
            email: email
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    AuthenticateProvider.prototype.resetForgetPassword = function (email, code, newpass, conpass) {
        /*let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('action', 'VerifyForgetCode');
        urlSearchParams.append('email', email);
        urlSearchParams.append('code', code);
        urlSearchParams.append('new_password', newpass);
        urlSearchParams.append('confirm_password', conpass);*/
        var body = {
            action: 'VerifyForgetCode',
            email: email,
            code: code,
            new_password: newpass,
            confirm_password: conpass
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, body);
    };
    /*
    Function to get user details based on userId
    */
    AuthenticateProvider.prototype.getUserDetail = function (userId) {
        var body = {
            action: 'GetUserDetails',
            userId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Function to change password
      call:change-password.ts
    */
    AuthenticateProvider.prototype.changePassword = function (userId, oldPassword, newPassword) {
        //{"password":"123456","oldPassword":"td000000","action":"PorfilePasswordUpdate","id":"16"}
        var body = {
            action: 'PorfilePasswordUpdate',
            id: userId,
            oldPassword: oldPassword,
            password: newPassword
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      function to get address from postal code
    */
    AuthenticateProvider.prototype.getAddressFromPostalCode = function (postalcode) {
        //var url='https://maps.googleapis.com/maps/api/geocode/json?address='+postalcode+'&key=AIzaSyCTSsYgSHTpb9d6-o5qYQm8yQ9b8O81MYc';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?components=country:Au&address=' + postalcode + '&key=AIzaSyCTSsYgSHTpb9d6-o5qYQm8yQ9b8O81MYc';
        console.log(url);
        return this.http.get(url);
    };
    /*
     function to update device token
    */
    AuthenticateProvider.prototype.updateDeviceToken = function (userId, token) {
        //{"action":"ProfileUpdate","id":"11","deviceToken":"dfsdfsdfssdfsdfsdfsdfsdfsdfsdfsdf"} 
        var body = {
            action: 'ProfileUpdate',
            id: userId,
            deviceToken: token
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    AuthenticateProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            AppSetting,
            Platform,
            Storage,
            FCM,
            Device])
    ], AuthenticateProvider);
    return AuthenticateProvider;
}());
export { AuthenticateProvider };
//# sourceMappingURL=authenticate.js.map