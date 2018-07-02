import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSetting } from '../api_route';

@Injectable()
export class PaymentProvider {

	apiUrl = this.appSettings.getPaymentApiUrl();

  constructor(public http: Http, public appSettings: AppSetting) {
  	this.http=http;
    console.log('Hello PaymentProvider Provider');
  }

  public addpayment(paymentinfo){
    return this.http.post(this.apiUrl+'user/payment', {'paymentinfo': paymentinfo});
  }

  public addCardInfo(cardInfo){
  	//old {"action":"AddPaymentDetails", "UserId":"9","CardName":"Mohit Goyal", "CardNumber":"1234567890123456", "ExpiryDate":"02-2020","CVV":"345","CountryName":"India"}
		//new {"action":"AddPaymentDetails", "UserId":"58","CardName":"Mohit Goyal", "CardNumber":"4111111111111111",
		// "ExpiryMonth":"11","ExpiryYear":"20","CVV":"123","CountryName":"India"}
		let body={
  		action:'AddPaymentDetails',
  		UserId:cardInfo.userId,
  		CardName:cardInfo.nameOnCard,
  		CardNumber:cardInfo.cardNumber,
		ExpiryMonth:cardInfo.cardExpiryMonth,
		ExpiryYear:cardInfo.cardExpiryYear,
  		CVV:cardInfo.cardSecurityCode,
  		CountryName:cardInfo.cardCountry
		}
		console.log(JSON.stringify(body));
		return this.http.post(this.apiUrl,JSON.stringify(body));
    }

	/**
	 * Method to get list of card attached by user
	 * @param userId contain the userId
	 * {"action":"GetAllcardsDetail","userId":"60"} 
	 */
	public getListofCards(userId){
		let body={
  		action:'GetAllcardsDetail',
  		userId:userId,
		}
		console.log(JSON.stringify(body));
		return this.http.post(this.apiUrl,JSON.stringify(body));
	}
	
	
	/**
	 * Method to delete attached card by cardId and userId
	 * @param cardId contain the cardId
	 * {"action":"DeleteACard","UserId":"60","cardid":"card_1CWiOrG06Munz7Mzmn3nWYbb"} 
	 */
	public deleteCard(cardId,userId){
		let body={
  		action:'DeleteACard',
			cardid:cardId,
			UserId:userId
		}
		console.log(JSON.stringify(body));
		return this.http.post(this.apiUrl,JSON.stringify(body));
	}	

	/**
	 * Method to update primary card 
	 * @param cardId contain the cardId 
	 * {"action":"SetDefaultPaymentDetails","UserId":"60","cardid":"card_1CWiOrG06Munz7Mzmn3nWYbb"}
	 */
	public updatePrimaryCard(cardId,userId){
		  let body={
				action:'SetDefaultPaymentDetails',
				cardid:cardId,
				UserId:userId,
			}
		  return this.http.post(this.apiUrl,JSON.stringify(body));
	  }
	 
	/**
	 * Method to add bank account
	 * @param bankData contain the bank information
	 * @param userId contain the user id
	 * {"action":"AddBankDetails","UserId":"78","AccHolderName":"Demo","AccType":"individual",
	 * "RoutingNumber":"110000000","AccountNumber":"000123456789","BankCountry":"US",
	 * "Currency":"USD","BankName":"STRIPE TEST BANK"}
	 */
	public addBankAccount(bankData,userId){
		let body={
			  action:'AddBankDetails',
			  UserId:userId,
			  AccHolderName:bankData.accHolderName,
			  AccType:bankData.accType,
			  RoutingNumber:bankData.accBsbNumber,
			  AccountNumber:bankData.accNumber,
			  BankCountry:'AU',
			  Currency:'AUD',
		}

		console.log(JSON.stringify(body));
		return this.http.post(this.apiUrl,JSON.stringify(body));
	}

	/**
	 * Method to get bank attached details
	 * {"action":"GetBankDetails","UserId":"71"}
	 */
	public getBankAccount(userId){
		let body={
			action:'GetBankDetails',
			UserId:userId
	  }
		console.log(JSON.stringify(body));
		return this.http.post(this.apiUrl,JSON.stringify(body));
	}
	

	/**
	 * Method to get details of bank account linked by user
	 */
	public deleteBankAccount(userId,bankId){
		let body={
			  action:'DeleteBankDetails',
			  UserId:userId,
			  SbankId:bankId
		}
		console.log(JSON.stringify(body));
		return this.http.post(this.apiUrl,JSON.stringify(body));
	}

	/**
	 * Method to charge the payment
	 * Post param
	 * {"action":"ChargePayment","postId":"235","amount":"49","itemOwnerFee":"40","securityDeposit":"5","renterId":"60"}
	 */
	public chargePayment(data){
		let body={
			action:'ChargePayment',
			UserId:data.userId,
			postId:data.postId,
			amount:data.amountToCharge,
			itemOwnerFee:data.itemOwnerFee,
			securityDeposit:data.securityDeposit,
			renterId:data.renterId,
	  }
	  console.log(JSON.stringify(body));
	  return this.http.post(this.apiUrl,JSON.stringify(body));
	}
	
	/**
	 * Method to authorize the security amount
	 * {"action":"SecurityChargeAuth","postId":"251","securityDeposit":"10","renterId":"61"}
	 */
	public authorizeSecurityDeposit(renterId,postId,authorizeAmount){
		let body={
			action:'SecurityChargeAuth',
			postId:postId,
			securityDeposit:authorizeAmount,
			renterId:renterId,
	  }
	  console.log(JSON.stringify(body));
	  return this.http.post(this.apiUrl,JSON.stringify(body));
	}

	/**
	 * Method to capture the authorize security deposit
	 * {"action":"SecurityChargeRetrieve","postId":"251","renterId":"61"}
	 */
	public captureSecurityDeposit(renterId,postId,captureBondAmount){
		let body={
			action:'SecurityChargeRetrieve',
			postId:postId,
			renterId:renterId,
			securityDeposit:captureBondAmount
	  }
	  console.log(JSON.stringify(body));
	  return this.http.post(this.apiUrl,JSON.stringify(body));
	}

	/**
	 * Function to captured the cancellation fee
	 * {"action":"ChargePaymentWhenCancel","postId":"19","amount":"10","renterId":"3"}
	 */
	public captureCancellationAmount(renterId,postId,amount){
		let body={
			action:'ChargePaymentWhenCancel',
			postId:postId,
			amount:amount,
			renterId:renterId
	  }
	  console.log(JSON.stringify(body));
	  return this.http.post(this.apiUrl,JSON.stringify(body));
	}
	
}
