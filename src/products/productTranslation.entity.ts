import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProductLangEnum } from './product-lang.enum';
import { Product } from './product.entity';

@Entity({ name: 'productTranslations' })
export class ProductTranslation extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    productId: number;

    @ManyToOne(type => Product, product => product.translations )
    product: Product;

    @PrimaryColumn({
        type: 'enum',
        enum: ProductLangEnum,
        default: ProductLangEnum.UA
    })
    lang: ProductLangEnum;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    description?: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    shortDescription?: string;
}
