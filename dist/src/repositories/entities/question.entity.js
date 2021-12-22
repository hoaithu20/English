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
exports.Question = void 0;
const level_enum_1 = require("../../constants/level.enum");
const question_status_enum_1 = require("../../constants/question-status.enum");
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("./answer.entity");
const user_entity_1 = require("./user.entity");
let Question = class Question extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Question.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ default: question_status_enum_1.QuestionStatus.PRIVATE }),
    __metadata("design:type", Number)
], Question.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ default: level_enum_1.Level.EASY }),
    __metadata("design:type", Number)
], Question.prototype, "level", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Question.prototype, "isHidden", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Question.prototype, "like", void 0);
__decorate([
    typeorm_1.Column({ name: 'total_answer' }),
    __metadata("design:type", Number)
], Question.prototype, "totalAnswer", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (u) => u.questions),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Question.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => answer_entity_1.Answer, (a) => a.question),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    typeorm_1.Column({ name: 'correct_answer' }),
    __metadata("design:type", Number)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Question.prototype, "updatedAt", void 0);
Question = __decorate([
    typeorm_1.Entity('question')
], Question);
exports.Question = Question;
//# sourceMappingURL=question.entity.js.map