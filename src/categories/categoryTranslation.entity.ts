import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { LangEnum } from '../types/lang.enum';
import { Category } from './category.entity';

@Unique(['category', 'lang'])
@Entity({ name: 'categoryTranslations' })
export class CategoryTranslation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => Category,
        category => category.translations,
        { onDelete: 'CASCADE' }
    )
    category: Category;

    @Column({
        type: 'enum',
        enum: LangEnum,
        default: LangEnum.UA
    })
    lang: LangEnum;

    @Column( { type: 'varchar' })
    name: string;
}
