"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalError = void 0;
const base_response_1 = require("../responses/base.response");
const errorcode_constant_1 = require("../constants/errorcode.constant");
const normalError = (errors) => {
    const response = new base_response_1.BaseResponse();
    const constraints = errors[0].constraints;
    let message = errorcode_constant_1.ErrorCode.BAD_REQUEST;
    if (constraints) {
        for (const k of Object.keys(constraints)) {
            message = constraints[k];
            break;
        }
    }
    response.code = message;
    return response;
};
exports.normalError = normalError;
//# sourceMappingURL=exception.util.js.map