import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTranslation } from './productTranslation.entity';
import { Category } from '../categories/category.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int'
    })
    price: number;

    @Column({
        type: 'int',
        nullable: true
    })
    oldPrice?: number;

    @Column({
        type: 'int',
        nullable: true
    })
    categoryId?: number;

    @ManyToOne(
        type => Category,
        category => category.products,
        { onDelete: 'SET NULL' }
        )
    category: Category;

    @OneToMany(
        type => ProductTranslation,
        productTranslation => productTranslation.product,
        {
            cascade: true
        }
    )
    translations: ProductTranslation[];
}
