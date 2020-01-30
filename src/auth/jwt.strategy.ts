import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('app.jwtSecret')
        });
    }

    async validate(payload: { id: number }): Promise<User> {
        const user = await this.userService.getUserById(payload.id);
        if (user) {
            delete user.password;
            return user;
        }
        throw new NotFoundException();
    }
}
