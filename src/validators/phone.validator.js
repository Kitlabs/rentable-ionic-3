import libphonenumber from 'google-libphonenumber';
var PhoneValidator = /** @class */ (function () {
    function PhoneValidator() {
    }
    // Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
    PhoneValidator.validCountryPhone = function (countryControl) {
        var subscribe = false;
        return function (phoneControl) {
            if (!subscribe) {
                subscribe = true;
                countryControl.valueChanges.subscribe(function () {
                    phoneControl.updateValueAndValidity();
                });
            }
            if (phoneControl.value !== "") {
                try {
                    var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
                    var phoneNumber = "" + phoneControl.value + "", region = countryControl.value.iso, number = phoneUtil.parse(phoneNumber, region), isValidNumber = phoneUtil.isValidNumber(number);
                    if (isValidNumber) {
                        return null;
                    }
                }
                catch (e) {
                    // console.log(e);
                    return {
                        validCountryPhone: true
                    };
                }
                return {
                    validCountryPhone: true
                };
            }
            else {
                return null;
            }
        };
    };
    return PhoneValidator;
}());
export { PhoneValidator };
//# sourceMappingURL=phone.validator.js.map