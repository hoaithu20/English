"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserScope = void 0;
const common_1 = require("@nestjs/common");
exports.UserScope = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=user.scope.js.map