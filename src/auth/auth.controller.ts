import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) params: SignUpDto): Promise<void> {
        return this.authService.signUp(params);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) params: SignUpDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(params);
    }
}
