import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
        const product = await this.productRepository.findOne(id, { relations: ['translations'] });
        if (product) {
            return product;
        }
        throw new NotFoundException();
    }
    async createProduct(data: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(data);
    }
    async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
        return this.productRepository.updateProduct(id, data);
    }
    async deleteProduct(id: number): Promise<void> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }
}
