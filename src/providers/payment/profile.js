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
var ProfileProvider = /** @class */ (function () {
    function ProfileProvider(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
        this.apiUrl = this.appSettings.getApiURL();
        this.http = http;
        console.log('Hello PaymentProvider Provider');
    }
    ProfileProvider.prototype.ChangeProfile = function (email, phonenumber, pasword, firstname, lastname, photourl, postalcode, userId, lat, lng, location) {
        var body = {
            action: 'ProfileUpdate',
            id: userId,
            email: email,
            firstName: firstname,
            lastName: lastname,
            postalCode: postalcode,
            lat: lat,
            lng: lng,
            location: location
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Function to get user details based on userId
    */
    ProfileProvider.prototype.Getprofile = function (userId) {
        var body = {
            action: 'GetUserDetails',
            userId: userId
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /*
      Function to update profile image
    */
    ProfileProvider.prototype.uploadProfilePic = function (userId, profilePic) {
        var body = {
            action: 'PorfilePicUpload',
            UserId: userId,
            image: JSON.stringify(profilePic)
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     *Function to send verifcation code to update mobile number
     */
    ProfileProvider.prototype.getVerificationCode = function (phoneNumber, id) {
        //{"action":"SendSMSVerificationForPhoneUpdate","phoneNumber":"+919417349947","id":"16"}
        var body = {
            action: 'SendSMSVerificationForPhoneUpdate',
            phoneNumber: phoneNumber,
            id: id
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
      *Function to send verifcation code to update mobile number
      */
    ProfileProvider.prototype.updateMobileNumber = function (phoneNumber, id, code) {
        //{"action":"smsverifyForPhoneUpdate","phoneNumber":"+919417349947","id":"16","code":"4686"}
        var body = {
            action: 'smsverifyForPhoneUpdate',
            phoneNumber: phoneNumber,
            id: id,
            code: code
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    ProfileProvider.prototype.Appfeedback = function (rate, leavemessage) {
        console.log(" leavt", leavemessage);
        return this.http.post(this.apiUrl + "profile/feedback", { 'rate': rate, 'leavemessage': leavemessage });
    };
    ProfileProvider.prototype.Aboutinfo = function (uid) {
        return this.http.post(this.apiUrl + "profile/about", { uid: uid });
    };
    ProfileProvider.prototype.moneyindividual = function (uid) {
        return this.http.post(this.apiUrl + "profil/moneyindivide", { uid: uid });
    };
    ProfileProvider.prototype.moneyinmonth = function (uid) {
        return this.http.post(this.apiUrl + "profil/moneyinmonth", { uid: uid });
    };
    ProfileProvider.prototype.moneyinquratly = function (uid) {
        return this.http.post(this.apiUrl + "profil/moneyinquartly", { uid: uid });
    };
    ProfileProvider.prototype.moneyinyear = function (uid) {
        return this.http.post(this.apiUrl + "profil/moneyinyear", { uid: uid });
    };
    ProfileProvider.prototype.moneyoutindividual = function (uid) {
        return this.http.post(this.apiUrl + "profil/moneyoutindividual", { uid: uid });
    };
    ProfileProvider.prototype.moneyoutmonth = function (uid) {
        return this.http.post(this.apiUrl + "profil/moneyoutmonth", { uid: uid });
    };
    ProfileProvider.prototype.moneyoutquartly = function (uid) {
        return this.http.post(this.apiUrl + "profil/moneyoutquartly", { uid: uid });
    };
    ProfileProvider.prototype.moneyoutyear = function (uid) {
        return this.http.post(this.apiUrl + "profil/moneyoutyear", { uid: uid });
    };
    ProfileProvider.prototype.giveFeedback = function (UserId, PostId, FeedbackRating, FeedbackComment) {
        //{"action":"FinalFeedbackOnPost","UserId":"45","PostId":"182","FeedbackRating":"2","FeedbackComment":"test"}
        var body = {
            action: 'FinalFeedbackOnPost',
            UserId: UserId,
            PostId: PostId,
            FeedbackRating: FeedbackRating,
            FeedbackComment: FeedbackComment
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    ProfileProvider.prototype.getRating = function (UserId) {
        //{"action":"GetOverallFeedbackRating","UserId":"50"}
        var body = {
            action: 'GetOverallFeedbackRating',
            UserId: UserId,
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    ProfileProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AppSetting])
    ], ProfileProvider);
    return ProfileProvider;
}());
export { ProfileProvider };
//# sourceMappingURL=profile.js.map