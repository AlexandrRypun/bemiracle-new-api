import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCategoryTranslationDto } from './create-category-translation.dto';
import { CreateCategoryParentDto } from './create-category-parent.dto';

export class CreateCategoryDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateCategoryParentDto)
    parent?: CreateCategoryParentDto;

    @ValidateNested({
        each: true
    })
    @Type(() => CreateCategoryTranslationDto)
    translations: CreateCategoryTranslationDto[];
}
