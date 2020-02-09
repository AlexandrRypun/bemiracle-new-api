import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Get()
    @UsePipes(ValidationPipe)
    async getAllProducts(@Query() filters: FindProductsDto): Promise<Product[]> {
        return this.productsService.getAllProducts(filters);
    }

    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createProduct(@Body() data: CreateProductDto): Promise<Product> {
        return this.productsService.createProduct(data);
    }
}
