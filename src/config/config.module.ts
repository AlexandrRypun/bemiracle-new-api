import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../configuration/config';

@Module({
    providers: [ConfigService],
    exports: [ConfigService]
})
export class MyConfigModule extends ConfigModule {
    static register(): DynamicModule {
        return super.forRoot({
            envFilePath: `./src/configuration/.${process.env.NODE_ENV || 'development'}.env`,
            load: [config],
            isGlobal: true
        });
    }
}
