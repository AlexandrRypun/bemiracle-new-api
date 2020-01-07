import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(params: SignUpDto): Promise<void> {
        const { username, password } = params;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (Number(error.code) === 23505) {
                throw new ConflictException('username exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(params: SignUpDto): Promise<User> {
        const { username, password } = params;

        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user;
        }

        throw new UnauthorizedException('Invalid credentials');
    }
}
