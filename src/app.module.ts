import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MyConfigModule.register(),
        TypeOrmModule.forRootAsync({
            imports: [MyConfigModule],
            useFactory: (configService: ConfigService) => configService.get('database'),
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
