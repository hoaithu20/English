"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddware = void 0;
class LoggerMiddware {
    use(req, res, next) {
        console.log(`Request....`);
        next();
    }
}
exports.LoggerMiddware = LoggerMiddware;
//# sourceMappingURL=logger.middleware.js.map