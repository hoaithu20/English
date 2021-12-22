import { LoginRequest } from 'src/requests/login.request';
import { SignupRequest } from 'src/requests/signup.request';
import { AuthService } from 'src/services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(request: SignupRequest): Promise<{
        token: string;
    }>;
    login(request: LoginRequest): Promise<{
        token: string;
    }>;
}
