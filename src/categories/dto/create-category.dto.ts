import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateCategoryTranslationDto } from './create-category-translation.dto';

export class CreateCategoryDto {
    @IsOptional()
    @IsInt()
    @Transform(Number)
    parentId?: number;

    @ValidateNested({
        each: true
    })
    @Type(() => CreateCategoryTranslationDto)
    translations: CreateCategoryTranslationDto[];
}
