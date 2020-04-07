import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../configuration/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';

@Global()
@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: resolve('files', 'tmp'),
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                }
            })
        })
    ],
    providers: [ConfigService],
    exports: [ConfigService, MulterModule]
})
export class MyConfigModule extends ConfigModule {
    static register(): DynamicModule {
        return super.forRoot({
            envFilePath: `./src/configuration/.${process.env.NODE_ENV || 'development'}.env`,
            load: [config]
        });
    }
}
