import { Brackets, EntityRepository, OrderByCondition, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetManyResponse } from '../common/interfaces';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async createProduct(data: CreateProductDto): Promise<Product> {
        const product = new Product();
        Product.merge(product, data);
        return product.save();
    }
    async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException();
        }
        Product.merge(product, data);
        await this.save(product, { reload: true });
        return product;
    }

    async findProducts(filters: FindProductsDto): Promise<GetManyResponse<Product>> {
        const { select } = filters;
        delete filters.select;
        const query = this.createQueryBuilder('product').innerJoinAndSelect('product.translations', 'translation');
        if (filters.search) {
            query.andWhere(new Brackets(qb => {
                qb.where('translation.name LIKE :search', { search: filters.search })
                    .orWhere('translation.description LIKE :search', { search: filters.search })
                    .orWhere('translation.shortDescription LIKE :search', { search: filters.search });
            }));
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
        let orderBy: OrderByCondition = { 'product.id': 'ASC' };
        if (filters.orderBy) {
            let field = filters.orderBy;
            let direction: ('ASC' | 'DESC') = 'ASC';
            if (filters.orderBy.startsWith('-')) {
                field = field.slice(1);
                direction = 'DESC';
            }
            orderBy = {
                [field.indexOf('.') === -1 ? `product.${field}` : field]: direction
            };
            delete filters.orderBy;
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
            const val = `prod_value_${i}`;
            query.andWhere(`product.${key} = :${val}`, { [val]: value });
        });
        query.select([
            'product.id'
        ]);
        const [prodIds, total] = await query.getManyAndCount();

        if (prodIds.length > 0) {
            const query2 = await this.createQueryBuilder('product');
            query2
                .innerJoinAndSelect('product.translations', 'translation')
                .leftJoinAndSelect('product.images', 'image')
                .where('product.id IN (:...prodIds)', { prodIds: prodIds.map(({ id }) => id) });
            if (select) {
                query2.select(select.split(','));
            }
            query2.orderBy(orderBy);
            if (orderBy['product.id'] === undefined) {
                query2.addOrderBy('product.id');
            }

            const data = await query2.getMany();
            return { data, total };
        }
        return { data: [], total };
    }
}
