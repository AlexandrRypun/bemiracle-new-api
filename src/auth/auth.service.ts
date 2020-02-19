import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async signInUser(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.userService.signIn(email, password);
        delete user.password;
        const accessToken = await this.jwtService.sign({ ...user });
        return { accessToken };
    }

    signUpUser(params: CreateUserDto): Promise<void> {
        return this.userService.signUp(params);
    }
}
