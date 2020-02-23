import { Brackets, EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { FindCategoriesDto } from './dto/find-categories.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async getAllCategories(filters: FindCategoriesDto): Promise<Category[]> {
        const { select } = filters;
        delete filters.select;
        const query = this.createQueryBuilder('category').innerJoinAndSelect('category.translations', 'translation');
        if (filters.search) {
            query.andWhere('translation.name LIKE :search', { search: filters.search });
            delete filters.search;
        }
        if (filters.take) {
            query.take(filters.take);
            delete filters.take;
        }
        if (filters.skip) {
            query.skip(filters.skip);
            delete filters.skip;
        }
        if (filters.translation) {
            Object.entries(filters.translation).forEach(([key, value], i) => {
                const val = `translation_value_${i}`;
                if (Array.isArray(value)) {
                    query.andWhere(new Brackets(qb => {
                        value.forEach(v => {
                            const orVal = `translation_${key}_value_${i}`;
                            qb.orWhere(`translation.${key} = :${orVal}`, { [orVal]: v });
                        });
                    }));

                } else {
                    query.andWhere(`translation.${key} = :${val}`, { [val]: value });
                }
            });
            delete filters.translation;
        }
        Object.entries(filters).forEach(([key, value], i) => {
            const val = `cat_value_${i}`;
            query.andWhere(`category.${key} = :${val}`, { [val]: value });
        });
        query.select([
            'category.id'
        ]);
        const catIds = await query.getMany();

        if (catIds.length > 0) {
            const query2 = await this.createQueryBuilder('category');
            query2
                .innerJoinAndSelect('category.translations', 'translation')
                .where('category.id IN (:...catIds)', { catIds: catIds.map(({ id }) => id) });
            if (select) {
                query2.select(select.split(','));
            }

            const [categories] = await query2.getManyAndCount();
            return categories;
        }
        return [];
    }

    async createCategory(data: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        Category.merge(category, data);
        return category.save();
    }

    async updateCategory(id: number, data: UpdateCategoryDto): Promise<Category> {
        const category = await this.findOne(id);
        if (!category) {
            throw new NotFoundException();
        }
        Category.merge(category, data);
        await category.save();
        return this.findOne(id, { relations: ['translations'] });
    }
}
