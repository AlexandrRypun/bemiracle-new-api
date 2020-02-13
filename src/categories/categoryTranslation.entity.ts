import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { LangEnum } from '../types/lang.enum';
import { Product } from '../products/product.entity';
import { Category } from './category.entity';

@Entity({ name: 'categoryTranslations' })
export class CategoryTranslation extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    categoryId: number;

    @ManyToOne(
        type => Category,
        category => category.translations,
        { onDelete: 'CASCADE' }
    )
    category: Category;

    @PrimaryColumn({
        type: 'enum',
        enum: LangEnum,
        default: LangEnum.UA
    })
    lang: LangEnum;

    @Column( { type: 'varchar' })
    name: string;
}
