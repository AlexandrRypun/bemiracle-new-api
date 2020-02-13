import { IsInt, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { FindCategoryTranslationDto } from './find-category-translation.dto';

export class FindCategoriesDto {
    @IsOptional()
    @IsInt()
    @Transform(Number)
    id?: number;

    @IsOptional()
    @IsInt()
    @Transform(Number)
    parentId?: number;

    @IsOptional()
    @IsInt()
    @Transform(Number)
    take?: number;

    @IsOptional()
    @IsInt()
    @Transform(Number)
    skip?: number;

    @IsOptional()
    @Length(1, 20)
    search?: string;

    @IsOptional()
    @IsString()
    select?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => FindCategoryTranslationDto)
    translation?: FindCategoryTranslationDto;
}
