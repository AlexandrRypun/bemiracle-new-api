import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MyConfigModule } from '../config/config.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.registerAsync({
            imports: [MyConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('app.jwtSecret'),
                    signOptions: { expiresIn: configService.get('app.jwtExpiresIn') }
                };
            }
        })
    ],
    providers: [AuthService, JwtStrategy, ConfigService],
    controllers: [AuthController],
    exports: [JwtStrategy]
})
export class AuthModule {
}
