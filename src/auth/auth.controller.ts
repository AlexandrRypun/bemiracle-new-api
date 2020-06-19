import { Controller, Post, Body, UsePipes, ValidationPipe, Headers, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IJwtTokens } from './jwt-tokens.interface';
import { TransformPipe } from '../users/pipes/transform.pipe';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('/signin')
    signIn(@Body() params): Promise<IJwtTokens> {
        return this.authService.signInUser(params.email, params.password);
    }

    @Post('/signup')
    @UsePipes(TransformPipe, ValidationPipe)
    signUp(@Body() params: CreateUserDto): Promise<void> {
        return this.authService.signUpUser(params);
    }

    @Put('/refreshtokens')
    refreshTokens(@Headers('refreshtoken') refreshToken: string): Promise<IJwtTokens> {
        return this.authService.refreshTokens(refreshToken);
    }
}
