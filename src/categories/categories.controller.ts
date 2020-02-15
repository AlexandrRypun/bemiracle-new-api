import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FindCategoriesDto } from './dto/find-categories.dto';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getAllCategories(@Query() filters: FindCategoriesDto): Promise<Category[]> {
        return this.categoriesService.getAllCategories(filters);
    }

    @Get('/:id')
    getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoriesService.getCategoryById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCategory(@Body() data: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.createCategory(data);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateCategoryDto
    ): Promise<Category> {
        return this.categoriesService.updateCategory(id, data);
    }

    @Delete('/:id')
    @HttpCode(204)
    deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.categoriesService.deleteCategory(id);
    }
}
