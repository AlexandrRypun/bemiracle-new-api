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
    Query, Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImageSizeEnum } from './image-size.enum';
import { GetManyResponse } from '../common/interfaces';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Get()
    @UsePipes(ValidationPipe)
    getAllProducts(@Query() filters: FindProductsDto): Promise<GetManyResponse<Product>> {
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

    @Post('/:id/upload')
    @AllowedRoles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: ParameterDecorator
    ): Promise<void>  {
        return this.productsService.uploadImage(id, file);
    }

    @Get('/image/:id')
    async getImageContent(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
        @Query('size') size?: ImageSizeEnum
    ) {
        const stream = await this.productsService.getImageContent(id, size);
        res.set({
            'Content-Type': 'image/*'
        });
        stream.pipe(res);
    }
}
