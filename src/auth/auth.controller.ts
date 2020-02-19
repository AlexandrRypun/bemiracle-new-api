import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
    @UsePipes(ValidationPipe)
    signUp(@Body() params: CreateUserDto): Promise<void> {
        return this.authService.signUpUser(params);
    }
}
