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
exports.User = void 0;
const user_role_enum_1 = require("../../constants/user-role.enum");
const typeorm_1 = require("typeorm");
const user_status_enum_1 = require("../../constants/user-status.enum");
const history_entity_1 = require("./history.entity");
const package_entity_1 = require("./package.entity");
const question_entity_1 = require("./question.entity");
const user_profile_entity_1 = require("./user-profile.entity");
const user_token_entity_1 = require("./user-token.entity");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        name: 'status',
        nullable: false,
        default: user_status_enum_1.UserStatus.VERIFING,
    }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ default: user_role_enum_1.UserRole.USER }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_profile_entity_1.Profile),
    typeorm_1.JoinColumn({ name: 'profile_id' }),
    __metadata("design:type", user_profile_entity_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_token_entity_1.UserToken, (ut) => ut.user),
    __metadata("design:type", Array)
], User.prototype, "userTokens", void 0);
__decorate([
    typeorm_1.OneToMany(() => question_entity_1.Question, (q) => q.user),
    __metadata("design:type", Array)
], User.prototype, "questions", void 0);
__decorate([
    typeorm_1.OneToMany(() => package_entity_1.Package, (p) => p.user),
    __metadata("design:type", Array)
], User.prototype, "packages", void 0);
__decorate([
    typeorm_1.OneToMany(() => history_entity_1.History, (h) => h.user),
    __metadata("design:type", Array)
], User.prototype, "histories", void 0);
User = __decorate([
    typeorm_1.Entity('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map