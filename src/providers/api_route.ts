import { Injectable } from '@angular/core';

const CONFIG = {
	//apiUrl: 'http://112.196.92.142/patrick-app/api.php'
	apiUrl:'http://54.79.124.187/api/api.php',
	paymentUrl:'http://54.79.124.187/api/payment.php'
};

@Injectable()
export class AppSetting {
	
	//paypal credentials
	static paypalEnvironmentSandbox='AQbVviq54HBosTdOE0IQcc2ZXTmTK5MXiINj2TtCBfGbBmWCyjvGSbkitDwtIFAhx-rPmuhmjlgKkD_W';
	static paypalEnvironmentProduction='';

	constructor() {
		// code...
	
	}
	
	public getPaymentApiUrl(){
		return CONFIG.paymentUrl;
	}
	public getApiURL(){
		return CONFIG.apiUrl;
	}
}