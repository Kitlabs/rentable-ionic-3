
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class NoodlioPay {

  /**
  * Noodlio Pay Settings
  *
  *   Obtain your 'stripe_account' id by visting (both links):
  *   - https://www.noodl.io/pay/connect
  *   - https://www.noodl.io/pay/connect/test
  *
  *   Obtain your 'mashape_key' by visiting:
  *   - https://noodlio-pay.p.mashape.com (press on get 'Get your API keys and start hacking')
  */
  private stripe_account    = "acct_16bvtBHW84OuTX9V";
  private mashape_key       = "3fEagjJCGAmshMqVnwTR70bVqG3yp1lerJNjsnTzx5ODeOa99V";
  private test              = 'true';

  /**
  * Init other (do not change)
  */
  static get parameters() {return [[Http]];}
  constructor(private http:Http) {}
  URL = 'https://noodlio-pay.p.mashape.com';
  //URL = 'https://m-s-api-sibizavic.c9users.io';
  headers = new Headers({
    'X-Mashape-Key': this.mashape_key,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  });

  /**
  * Main wrapper for charging the client
  * Validates the credit card first (A), and then charges the client using the obtained 'source' (B)
  */
  public charge(data) {
    return Observable.create(observer => {
      // A. Validate Card
      this.validateCard(data).subscribe(resA => {
        if (resA.hasOwnProperty('id')) {
          // B. Charge Card
          var source = resA.id;
          this.chargeCard(source, data).subscribe(resB => {
            observer.next(resB);
          })
        } else {
          // error
          observer.next(resA);
        }
      })
    })
  }

  /**
  * POST /tokens/create
  */
  private validateCard(data) {

    var valUrl      = this.URL + '/tokens/create';
    var options     = new RequestOptions({headers: this.headers});
    var params      = new URLSearchParams();

    params.append('number',     data.number);
    params.append('exp_month',  data.exp_month);
    params.append('exp_year',   data.exp_year);
    params.append('cvc',        data.cvc);
    params.append('test',       this.test);

    return this.http.post(valUrl, params, options)
    .map(res => res.json());
  }

  /**
  * POST /charge/token
  */
  private chargeCard(source, data) {

    var valUrl      = this.URL + '/charge/token';
    var options     = new RequestOptions({headers: this.headers});
    var params      = new URLSearchParams();

    params.append('amount',        data.amountCents);     // In cents
    params.append('currency',      data.currency);
    params.append('description',   data.name);       // or custom description
    params.append('source',        source);
    params.append('stripe_account',this.stripe_account);
    params.append('test',          this.test);

    return this.http
    .post(valUrl, params, options)
    .map(res => res.json());
  }

}
