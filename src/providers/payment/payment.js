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
var PaymentProvider = /** @class */ (function () {
    function PaymentProvider(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
        this.apiUrl = this.appSettings.getApiURL();
        this.http = http;
        console.log('Hello PaymentProvider Provider');
    }
    PaymentProvider.prototype.addpayment = function (paymentinfo) {
        return this.http.post(this.apiUrl + 'user/payment', { 'paymentinfo': paymentinfo });
    };
    PaymentProvider.prototype.addPayment = function (paymentInfo) {
        //{"action":"AddPaymentDetails", "UserId":"9","CardName":"Mohit Goyal", "CardNumber":"1234567890123456", "ExpiryDate":"02-2020","CVV":"345","CountryName":"India"}
        var body = {
            action: 'AddPaymentDetails',
            UserId: paymentInfo.userId,
            CardName: paymentInfo.name,
            CardNumber: paymentInfo.number,
            ExpiryDate: paymentInfo.day,
            CVV: paymentInfo.password,
            CountryName: paymentInfo.country
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    PaymentProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AppSetting])
    ], PaymentProvider);
    return PaymentProvider;
}());
export { PaymentProvider };
//# sourceMappingURL=payment.js.map