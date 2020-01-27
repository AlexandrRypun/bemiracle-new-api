import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}
    async signIn(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ email });
        if (user && await compare(password, user.password)) {
            return user;
        }

        throw new UnauthorizedException('Invalid credentials');
    }
}
