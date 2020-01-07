import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {
    }

    async signUp(params: SignUpDto): Promise<void> {
        return this.userRepository.signUp(params);
    }

    async signIn(params: SignUpDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.signIn(params);

        delete user.password;
        delete user.salt;

        const accessToken = await this.jwtService.sign({ ...user });
        return { accessToken };
    }
}
