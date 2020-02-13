import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryTranslation } from './categoryTranslation.entity';
import { Product } from '../products/product.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => Category,
        category => category.children,
        {
            onDelete: 'SET NULL'
        }
    )
    parent: Category;

    @Column({
        type: 'int',
        nullable: true
    })
    parentId?: number;

    @OneToMany(
        type => Category,
        category => category.parent,
        {
            cascade: true
        }
    )
    children: Category[];

    @OneToMany(
        type => Product,
        product => product.category,
        {
            cascade: true
        }
    )
    products: Product[];

    @OneToMany(
        type => CategoryTranslation,
        categoryTranslation => categoryTranslation.category,
        {
            cascade: true
        }
    )
    translations: CategoryTranslation[];
}
