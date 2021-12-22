"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_controller_1 = require("../controllers/auth.controller");
const user_repository_1 = require("../repositories/user.repository");
const jwt_strategy_1 = require("../security/jwt.strategy");
const local_strategy_1 = require("../security/local.strategy");
const auth_service_1 = require("../services/auth.service");
const questions_module_1 = require("./questions.module");
const packages_module_1 = require("./packages.module");
const mail_module_1 = require("../mail/mail.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository]),
            jwt_1.JwtModule.register({
                secret: 'yoona',
                signOptions: {
                    expiresIn: '3600s',
                }
            }),
            config_1.ConfigModule,
            questions_module_1.QuestionsModule,
            passport_1.PassportModule,
            packages_module_1.PackagesModule,
            mail_module_1.MailModule,
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map