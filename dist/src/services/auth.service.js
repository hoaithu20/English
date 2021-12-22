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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const errorcode_constant_1 = require("../constants/errorcode.constant");
const user_repository_1 = require("../repositories/user.repository");
const signup_request_1 = require("../requests/signup.request");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
const change_password_requesr_1 = require("../requests/change-password.requesr");
let AuthService = class AuthService {
    constructor(userRepository, connection, configService, jwtService, mailService) {
        this.userRepository = userRepository;
        this.connection = connection;
        this.configService = configService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async validate(username, password) {
        throw new Error('Method not implemented.');
    }
    async signup(request) {
        console.log(request);
        const user = await this.userRepository.find({ email: request.email });
        if (user.length != 0) {
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.USER_EXISTED,
            });
        }
        const _user = await this.userRepository.find({
            username: request.username,
        });
        if (_user.length != 0) {
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.USERNAME_EXISTED,
            });
        }
        try {
            await this.connection.transaction(async (manager) => {
                const hash = await bcrypt.hash(request.password, this.configService.get('authConfig').saltOrRounds);
                const newUser = await this.userRepository.create({
                    email: request.email,
                    username: request.username,
                    password: hash,
                });
                await manager.save(newUser);
            });
            return this.login(request.username, request.password);
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.SIGNUP_FAILED,
            });
        }
    }
    async login(username, password) {
        const user = await this.userRepository.findOne({
            where: [{ email: username }, { username }],
        });
        if (!user) {
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.USER_NOT_EXIST,
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.INCORRECT_PASSWORD,
            });
        }
        const payload = { id: user.id };
        const token = this.jwtService.sign(payload);
        return { token: token };
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.USER_NOT_EXIST
            });
        }
        const obj = {
            to: email,
            otp: '123456',
        };
        await this.mailService.sendMailForgotPassword(obj);
    }
    async resetPassword(request) {
        if (request.newPassword !== request.confirmPassword) {
            throw new common_1.BadRequestException({
                code: errorcode_constant_1.ErrorCode.PASSWORD_NOT_MATCH
            });
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        typeorm_1.Connection,
        config_1.ConfigService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map