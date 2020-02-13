import { Injectable, NotFoundException } from '@nestjs/common';
import { FindCategoriesDto } from './dto/find-categories.dto';
import { CategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository
    ) {}
    getAllCategories(filters: FindCategoriesDto): Promise<Category[]> {
        return this.categoryRepository.getAllCategories(filters);
    }
    async getCategoryById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne(id, { relations: ['translations'] });
        if (category) {
            return category;
        }
        throw new NotFoundException();
    }
    createCategory(data: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.createCategory(data);
    }
    updateCategory(id: number, data: UpdateCategoryDto): Promise<Category> {
        return this.categoryRepository.updateCategory(id, data);
    }
    async deleteCategory(id: number): Promise<void> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }
}
