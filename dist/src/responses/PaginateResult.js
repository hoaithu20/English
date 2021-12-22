"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateResult = void 0;
class PaginateResult {
    constructor(items, count) {
        this.items = items;
        this.count = count;
    }
    static init(items, count) {
        return new PaginateResult(items, count);
    }
}
exports.PaginateResult = PaginateResult;
//# sourceMappingURL=PaginateResult.js.map