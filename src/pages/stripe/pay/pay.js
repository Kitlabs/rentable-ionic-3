var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoodlioPay } from './noodliopay';
var PayPage = /** @class */ (function () {
    function PayPage(navCtrl, NoodlioPay) {
        this.navCtrl = navCtrl;
        this.NoodlioPay = NoodlioPay;
        /**
        * Init
        */
        this.inputForm = {
            currency: 'USD',
            amountCents: 500,
            date: this.todayFormatted(),
            number: 4242424242424242,
            name: "Holder name",
            cvc: 123,
        };
        this.status = {
            message: '',
            loading: false,
            success: null,
        };
    }
    /**
    * fn Charge Card
    */
    PayPage.prototype.charge = function () {
        var _this = this;
        // obtain the exp_month and exp_year
        var split = this.inputForm['date'].split('-');
        this.inputForm['exp_month'] = split[1];
        this.inputForm['exp_year'] = split[0];
        // validate the card details and process the payment
        this.status['message'] = '';
        this.status['loading'] = true;
        this.status['success'] = null;
        this.NoodlioPay.charge(this.inputForm).subscribe(function (data) {
            console.log(data);
            _this.status['message'] = data.message || 'Payment processed!';
            _this.status['loading'] = false;
            if (data.hasOwnProperty('id')) {
                _this.status['success'] = true;
            }
        }, function (error) {
            console.log(error);
            _this.status['message'] = 'Oops... something went wrong.';
            _this.status['loading'] = false;
            _this.status['success'] = false;
        });
    };
    ;
    /*
    * Helper functions
    */
    PayPage.prototype.todayFormatted = function () {
        var d = new Date();
        var m = d.getMonth() + 1;
        var y = d.getFullYear();
        if (m < 10) {
            return y + '-0' + m;
        }
        else {
            return y + '-' + m;
        }
    };
    PayPage = __decorate([
        Component({
            selector: 'page-pay',
            templateUrl: 'pay.html',
            providers: [NoodlioPay]
        }),
        __metadata("design:paramtypes", [NavController, NoodlioPay])
    ], PayPage);
    return PayPage;
}());
export { PayPage };
//# sourceMappingURL=pay.js.map