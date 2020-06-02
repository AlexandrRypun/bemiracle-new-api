import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { ProductImageRepository } from './productImage.repository';

@Module({
  imports: [
      TypeOrmModule.forFeature([ProductRepository, ProductImageRepository]),
      FilesModule
  ],
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
