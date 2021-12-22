"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["GENERAL_ERROR"] = "99";
    ErrorCode["BAD_REQUEST"] = "400";
    ErrorCode["SUCCESS"] = "00";
    ErrorCode["UNSUCCESS"] = "01";
    ErrorCode["PAGE_INDEX_NOT_INTEGER"] = "02";
    ErrorCode["PAGE_INDEX_MIN_ONE"] = "03";
    ErrorCode["PAGE_SIZE_NOT_INTEGER"] = "04";
    ErrorCode["PAGE_SIZE_MIN_ONE"] = "05";
    ErrorCode["USER_EXISTED"] = "06";
    ErrorCode["USERNAME_EXISTED"] = "07";
    ErrorCode["SIGNUP_FAILED"] = "08";
    ErrorCode["USER_NOT_EXIST"] = "09";
    ErrorCode["INCORRECT_PASSWORD"] = "10";
    ErrorCode["NOT_FOUND_PACKAGE"] = "11";
    ErrorCode["PASSWORD_NOT_MATCH"] = "12";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
//# sourceMappingURL=errorcode.constant.js.map