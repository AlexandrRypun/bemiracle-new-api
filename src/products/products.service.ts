import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {
    }
    async getAllProducts(filters: FindProductsDto): Promise<Product[]> {
        return this.productRepository.findProducts(filters);
    }
    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (product) {
            return product;
        }
        throw new NotFoundException();
    }
    async createProduct(data: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(data);
    }
}
