"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeTwoFAStatus = exports.EmailVerifiedStatus = exports.PhoneNumberVerifiedStatus = void 0;
var PhoneNumberVerifiedStatus;
(function (PhoneNumberVerifiedStatus) {
    PhoneNumberVerifiedStatus[PhoneNumberVerifiedStatus["VERIFIED"] = 1] = "VERIFIED";
    PhoneNumberVerifiedStatus[PhoneNumberVerifiedStatus["UN_VERIFIED"] = 0] = "UN_VERIFIED";
})(PhoneNumberVerifiedStatus = exports.PhoneNumberVerifiedStatus || (exports.PhoneNumberVerifiedStatus = {}));
var EmailVerifiedStatus;
(function (EmailVerifiedStatus) {
    EmailVerifiedStatus[EmailVerifiedStatus["VERIFIED"] = 1] = "VERIFIED";
    EmailVerifiedStatus[EmailVerifiedStatus["UN_VERIFIED"] = 0] = "UN_VERIFIED";
})(EmailVerifiedStatus = exports.EmailVerifiedStatus || (exports.EmailVerifiedStatus = {}));
var TypeTwoFAStatus;
(function (TypeTwoFAStatus) {
    TypeTwoFAStatus[TypeTwoFAStatus["NO_SETTING"] = 0] = "NO_SETTING";
    TypeTwoFAStatus[TypeTwoFAStatus["OTP_SETTING"] = 1] = "OTP_SETTING";
    TypeTwoFAStatus[TypeTwoFAStatus["EMAIL_SETTING"] = 2] = "EMAIL_SETTING";
    TypeTwoFAStatus[TypeTwoFAStatus["PHONE_NUMBER_SETTING"] = 3] = "PHONE_NUMBER_SETTING";
})(TypeTwoFAStatus = exports.TypeTwoFAStatus || (exports.TypeTwoFAStatus = {}));
//# sourceMappingURL=user-security-status.enum.js.map