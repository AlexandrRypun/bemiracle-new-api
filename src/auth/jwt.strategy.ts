import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('app.jwtSecret')
        });
    }

    async validate(payload: { id: number, refreshToken?: boolean }): Promise<User | null> {
        if (payload.refreshToken) {
            throw new UnauthorizedException('refreshToken can\'t be used as accessToken');
        }
        const user = await this.userService.getUserById(payload.id);
        if (user) {
            delete user.password;
            return user;
        }
        return null;
    }
}
