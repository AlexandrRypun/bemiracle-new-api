import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './order.repository';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderRepository]),
        UsersModule,
        ProductsModule
    ],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
