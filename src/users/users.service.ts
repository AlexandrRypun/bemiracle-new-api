import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserGroup } from './userGroup.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @InjectRepository(UserGroup)
        private readonly userGroupRepository: Repository<UserGroup>
    ) {}
    async signUp(params: CreateUserDto): Promise<void> {
        const user = new User();
        User.merge(user, params);
        const userGroup = await this.userGroupRepository.findOne(this.configService.get('app.userRole.user'));
        user.groups = [userGroup];
        await user.save();
    }
    async signIn(email: string, password: string): Promise<User> {
        const query = this.userRepository.createQueryBuilder('user').innerJoinAndSelect('user.groups', 'groups');
        query.addSelect('password', 'user_password');
        query.where({ email });
        const user = await query.getOne();
        if (user && await compare(password, user.password)) {
            return user;
        }

        throw new UnauthorizedException('Invalid credentials');
    }
    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ id });
        if (user) {
            return user;
        }

        throw new NotFoundException();
    }

    async updateUser(id: number, params: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }
        User.merge(user, params);
        await this.userRepository.save(user, { reload: true });
        return user;
    }
}
