"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoPackageRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Questions {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Questions.prototype, "questionId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Number)
], Questions.prototype, "answerId", void 0);
class DoPackageRequest {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], DoPackageRequest.prototype, "packageId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], DoPackageRequest.prototype, "time", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], DoPackageRequest.prototype, "questions", void 0);
exports.DoPackageRequest = DoPackageRequest;
//# sourceMappingURL=todo-package.request.js.map