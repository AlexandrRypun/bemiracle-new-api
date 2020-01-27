import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('/signin')
    signIn(@Body() params): Promise<{ accessToken: string }> {
        return this.authService.signInUser(params.email, params.password);
    }

    @Post('/signup')
    signUp(@Body() params): Promise<void> {
        return this.authService.signUpUser(params.email, params.password);
    }
}
