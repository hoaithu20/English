import { UserService } from 'src/services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(): Promise<string>;
}
