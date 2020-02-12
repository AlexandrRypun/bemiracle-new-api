import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProductTranslation } from './productTranslation.entity';

@Unique(['id'])
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
        type: 'int'
    })
    categoryId: number;

    @OneToMany(
        type => ProductTranslation,
        productTranslation => productTranslation.product,
        {
            cascade: true
        }
    )
    translations: ProductTranslation[];
}
