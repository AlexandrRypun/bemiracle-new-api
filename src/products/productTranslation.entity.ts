import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { LangEnum } from '../types/lang.enum';
import { Product } from './product.entity';

@Entity({ name: 'productTranslations' })
export class ProductTranslation extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    productId: number;

    @ManyToOne(
        type => Product,
        product => product.translations,
        { onDelete: 'CASCADE' }
    )
    product: Product;

    @PrimaryColumn({
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
