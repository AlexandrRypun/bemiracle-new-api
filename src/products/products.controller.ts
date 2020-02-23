import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { AllowedRoles } from '../common/decorators/allowed-roles.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Get()
    @UsePipes(ValidationPipe)
    getAllProducts(@Query() filters: FindProductsDto): Promise<Product[]> {
        return this.productsService.getAllProducts(filters);
    }

    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Post()
    @AllowedRoles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(ValidationPipe)
    createProduct(@Body() data: CreateProductDto): Promise<Product> {
        return this.productsService.createProduct(data);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProductDto
    ): Promise<Product> {
        return this.productsService.updateProduct(id, data);
    }

    @Delete('/:id')
    @HttpCode(204)
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProduct(id);
    }
}
