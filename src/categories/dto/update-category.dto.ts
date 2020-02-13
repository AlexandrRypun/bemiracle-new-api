import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UpdateCategoryTranslationDto } from './update-category-translation.dto';

export class UpdateCategoryDto {
    @IsOptional()
    @IsInt()
    @Transform(Number)
    parentId?: number;

    @IsOptional()
    @ValidateNested({
        each: true
    })
    @Type(() => UpdateCategoryTranslationDto)
    translations: UpdateCategoryTranslationDto[];
}
