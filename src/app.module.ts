import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        MyConfigModule.register(),
        TypeOrmModule.forRootAsync({
            imports: [MyConfigModule],
            useFactory: (configService: ConfigService) => configService.get('database'),
            inject: [ConfigService]
        }),
        AuthModule,
        UsersModule,
        ProductsModule,
        CategoriesModule,
        FilesModule,
        OrdersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
