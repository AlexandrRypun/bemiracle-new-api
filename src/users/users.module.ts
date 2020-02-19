import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { UserGroup } from './userGroup.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserGroup]),
        forwardRef(() => AuthModule)
    ],
    providers: [UsersService, ConfigService],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {
}
