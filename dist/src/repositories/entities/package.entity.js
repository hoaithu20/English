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
exports.Package = void 0;
const level_enum_1 = require("../../constants/level.enum");
const question_status_enum_1 = require("../../constants/question-status.enum");
const typeorm_1 = require("typeorm");
const history_entity_1 = require("./history.entity");
const user_entity_1 = require("./user.entity");
let Package = class Package extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Package.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (u) => u.packages),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Package.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => history_entity_1.History, (h) => h.package),
    __metadata("design:type", Array)
], Package.prototype, "histories", void 0);
__decorate([
    typeorm_1.Column({ default: question_status_enum_1.QuestionStatus.PRIVATE }),
    __metadata("design:type", Number)
], Package.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ name: 'total_question' }),
    __metadata("design:type", Number)
], Package.prototype, "totalQuestion", void 0);
__decorate([
    typeorm_1.Column({ default: level_enum_1.Level.EASY }),
    __metadata("design:type", Number)
], Package.prototype, "level", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Package.prototype, "isHidden", void 0);
__decorate([
    typeorm_1.Column({ name: 'time_out' }),
    __metadata("design:type", Number)
], Package.prototype, "timeOut", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Package.prototype, "like", void 0);
__decorate([
    typeorm_1.Column({}),
    __metadata("design:type", String)
], Package.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'question_ids', type: 'json' }),
    __metadata("design:type", Array)
], Package.prototype, "questionIds", void 0);
Package = __decorate([
    typeorm_1.Entity('package')
], Package);
exports.Package = Package;
//# sourceMappingURL=package.entity.js.map