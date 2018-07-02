var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
export var COUNTRY_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return CountryValidator; }),
    multi: true
};
var CountryValidator = /** @class */ (function () {
    function CountryValidator() {
    }
    CountryValidator.prototype.validate = function (c) {
        // self value
        // let country = c.value;
        var phone = c.root.get(this.validateCountry);
        phone.updateValueAndValidity();
        return null;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CountryValidator.prototype, "validateCountry", void 0);
    CountryValidator = __decorate([
        Directive({
            selector: '[validateCountry][formControlName],[validateCountry][formControl],[validateCountry][ngModel]',
            providers: [COUNTRY_VALIDATOR]
        })
    ], CountryValidator);
    return CountryValidator;
}());
export { CountryValidator };
//# sourceMappingURL=country.validator.js.map