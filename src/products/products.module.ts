import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
