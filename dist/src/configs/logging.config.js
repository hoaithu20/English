"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingConfig = void 0;
const nest_winston_1 = require("nest-winston");
const winston = __importStar(require("winston"));
const errorStackTracerFormat = winston.format((info) => {
    if (info instanceof Error) {
        return Object.assign({}, info, {
            stack: info.stack,
            message: info.message,
        });
    }
    return info;
});
const LoggingConfig = () => {
    return nest_winston_1.WinstonModule.createLogger({
        format: winston.format.combine(winston.format.splat(), errorStackTracerFormat(), winston.format.simple()),
        transports: [
            new winston.transports.File({
                filename: 'application-error.log',
                level: 'error',
            }),
            new winston.transports.File({
                filename: 'application-debug.log',
                level: 'debug',
            }),
            new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
            }),
        ],
    });
};
exports.LoggingConfig = LoggingConfig;
//# sourceMappingURL=logging.config.js.map