import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async signInUser(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.userService.signIn(email, password);
        const accessToken = await this.jwtService.sign({ ...user });
        return { accessToken };
    }

    async signUpUser(email: string, password: string): Promise<void> {
        const user = new User();
        user.email = email;
        user.password = await hash(password, 10);
        await user.save();
    }
}
