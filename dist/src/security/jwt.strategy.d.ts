import { Strategy } from 'passport-jwt';
import { UserRepository } from 'src/repositories/user.repository';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: any): Promise<import("../repositories/entities/user.entity").User>;
}
export {};
