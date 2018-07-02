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
var CONFIG = {
    //apiUrl: 'http://112.196.92.142/patrick-app/api.php'
    apiUrl: 'http://54.79.124.187/api/api.php'
};
var AppSetting = /** @class */ (function () {
    function AppSetting() {
        // code...
    }
    AppSetting.prototype.getApiURL = function () {
        return CONFIG.apiUrl;
    };
    //paypal credentials
    AppSetting.paypalEnvironmentSandbox = 'AQbVviq54HBosTdOE0IQcc2ZXTmTK5MXiINj2TtCBfGbBmWCyjvGSbkitDwtIFAhx-rPmuhmjlgKkD_W';
    AppSetting.paypalEnvironmentProduction = '';
    AppSetting = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], AppSetting);
    return AppSetting;
}());
export { AppSetting };
//# sourceMappingURL=api_route.js.map