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
exports.History = void 0;
const typeorm_1 = require("typeorm");
const package_entity_1 = require("./package.entity");
const user_entity_1 = require("./user.entity");
let History = class History extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], History.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], History.prototype, "user", void 0);
__decorate([
    typeorm_1.RelationId((h) => h.user),
    __metadata("design:type", Number)
], History.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => package_entity_1.Package),
    typeorm_1.JoinColumn({ name: 'package_id' }),
    __metadata("design:type", package_entity_1.Package)
], History.prototype, "package", void 0);
__decorate([
    typeorm_1.RelationId((h) => h.package),
    __metadata("design:type", Number)
], History.prototype, "packageId", void 0);
__decorate([
    typeorm_1.Column({ name: 'time' }),
    __metadata("design:type", Number)
], History.prototype, "time", void 0);
__decorate([
    typeorm_1.Column({ name: 'point', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", String)
], History.prototype, "point", void 0);
__decorate([
    typeorm_1.Column({}),
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], History.prototype, "createdAt", void 0);
History = __decorate([
    typeorm_1.Entity('history')
], History);
exports.History = History;
//# sourceMappingURL=history.entity.js.map