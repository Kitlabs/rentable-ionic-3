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
        this.apiUrl = this.appSettings.getPaymentApiUrl();
        this.http = http;
        console.log('Hello PaymentProvider Provider');
    }
    PaymentProvider.prototype.addpayment = function (paymentinfo) {
        return this.http.post(this.apiUrl + 'user/payment', { 'paymentinfo': paymentinfo });
    };
    PaymentProvider.prototype.addCardInfo = function (cardInfo) {
        //old {"action":"AddPaymentDetails", "UserId":"9","CardName":"Mohit Goyal", "CardNumber":"1234567890123456", "ExpiryDate":"02-2020","CVV":"345","CountryName":"India"}
        //new {"action":"AddPaymentDetails", "UserId":"58","CardName":"Mohit Goyal", "CardNumber":"4111111111111111",
        // "ExpiryMonth":"11","ExpiryYear":"20","CVV":"123","CountryName":"India"}
        var body = {
            action: 'AddPaymentDetails',
            UserId: cardInfo.userId,
            CardName: cardInfo.nameOnCard,
            CardNumber: cardInfo.cardNumber,
            ExpiryMonth: cardInfo.cardExpiryMonth,
            ExpiryYear: cardInfo.cardExpiryYear,
            CVV: cardInfo.cardSecurityCode,
            CountryName: cardInfo.cardCountry
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to get list of card attached by user
     * @param userId contain the userId
     * {"action":"GetAllcardsDetail","userId":"60"}
     */
    PaymentProvider.prototype.getListofCards = function (userId) {
        var body = {
            action: 'GetAllcardsDetail',
            userId: userId,
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to delete attached card by cardId and userId
     * @param cardId contain the cardId
     * {"action":"DeleteACard","UserId":"60","cardid":"card_1CWiOrG06Munz7Mzmn3nWYbb"}
     */
    PaymentProvider.prototype.deleteCard = function (cardId, userId) {
        var body = {
            action: 'DeleteACard',
            cardid: cardId,
            UserId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to update primary card
     * @param cardId contain the cardId
     * {"action":"SetDefaultPaymentDetails","UserId":"60","cardid":"card_1CWiOrG06Munz7Mzmn3nWYbb"}
     */
    PaymentProvider.prototype.updatePrimaryCard = function (cardId, userId) {
        var body = {
            action: 'SetDefaultPaymentDetails',
            cardid: cardId,
            UserId: userId,
        };
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to add bank account
     * @param bankData contain the bank information
     * @param userId contain the user id
     * {"action":"AddBankDetails","UserId":"78","AccHolderName":"Demo","AccType":"individual",
     * "RoutingNumber":"110000000","AccountNumber":"000123456789","BankCountry":"US",
     * "Currency":"USD","BankName":"STRIPE TEST BANK"}
     */
    PaymentProvider.prototype.addBankAccount = function (bankData, userId) {
        var body = {
            action: 'AddBankDetails',
            UserId: userId,
            AccHolderName: bankData.accHolderName,
            AccType: bankData.accType,
            RoutingNumber: bankData.accBsbNumber,
            AccountNumber: bankData.accNumber,
            BankCountry: 'AU',
            Currency: 'AUD',
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to get bank attached details
     * {"action":"GetBankDetails","UserId":"71"}
     */
    PaymentProvider.prototype.getBankAccount = function (userId) {
        var body = {
            action: 'GetBankDetails',
            UserId: userId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to get details of bank account linked by user
     */
    PaymentProvider.prototype.deleteBankAccount = function (userId, bankId) {
        var body = {
            action: 'DeleteBankDetails',
            UserId: userId,
            SbankId: bankId
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to charge the payment
     * Post param
     * {"action":"ChargePayment","postId":"235","amount":"49","itemOwnerFee":"40","securityDeposit":"5","renterId":"60"}
     */
    PaymentProvider.prototype.chargePayment = function (data) {
        var body = {
            action: 'ChargePayment',
            UserId: data.userId,
            postId: data.postId,
            amount: data.amountToCharge,
            itemOwnerFee: data.itemOwnerFee,
            securityDeposit: data.securityDeposit,
            renterId: data.renterId,
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to authorize the security amount
     * {"action":"SecurityChargeAuth","postId":"251","securityDeposit":"10","renterId":"61"}
     */
    PaymentProvider.prototype.authorizeSecurityDeposit = function (renterId, postId, authorizeAmount) {
        var body = {
            action: 'SecurityChargeAuth',
            postId: postId,
            securityDeposit: authorizeAmount,
            renterId: renterId,
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Method to capture the authorize security deposit
     * {"action":"SecurityChargeRetrieve","postId":"251","renterId":"61"}
     */
    PaymentProvider.prototype.captureSecurityDeposit = function (renterId, postId, captureBondAmount) {
        var body = {
            action: 'SecurityChargeRetrieve',
            postId: postId,
            renterId: renterId,
            securityDeposit: captureBondAmount
        };
        console.log(JSON.stringify(body));
        return this.http.post(this.apiUrl, JSON.stringify(body));
    };
    /**
     * Function to captured the cancellation fee
     * {"action":"ChargePaymentWhenCancel","postId":"19","amount":"10","renterId":"3"}
     */
    PaymentProvider.prototype.captureCancellationAmount = function (renterId, postId, amount) {
        var body = {
            action: 'ChargePaymentWhenCancel',
            postId: postId,
            amount: amount,
            renterId: renterId
        };
        console.log(JSON.stringify(body));
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