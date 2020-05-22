import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { LangEnum } from '../types/lang.enum';
import { Product } from './product.entity';

@Unique(['product', 'lang'])
@Entity({ name: 'productTranslations' })
export class ProductTranslation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => Product,
        product => product.translations,
        { onDelete: 'CASCADE' }
    )
    product: Product;

    @Column({
        type: 'enum',
        enum: LangEnum,
        default: LangEnum.UA
    })
    lang: LangEnum;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'text',
        nullable: true
    })
    shortDescription: string;

    @Column({
        type: 'text',
        nullable: true
    })
    ingredients: string;
}
