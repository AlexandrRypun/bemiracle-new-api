import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        MyConfigModule.register(),
        TypeOrmModule.forRootAsync({
            imports: [MyConfigModule],
            useFactory: (configService: ConfigService) => configService.get('database'),
            inject: [ConfigService]
        }),
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
