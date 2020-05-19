import { IsInt, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { FindProductsTranslationDto } from './find-products-translation.dto';

export class FindProductsDto {
    @IsOptional()
    @IsInt()
    @Transform(Number)
    price?: number;

    @IsOptional()
    @IsInt()
    @Transform(Number)
    categoryId?: number;

    @IsOptional()
    @IsInt()
    @Transform(Number)
    take?: number;

    @IsOptional()
    @IsInt()
    @Transform(Number)
    skip?: number;

    @IsOptional()
    @IsString()
    orderBy?: string;

    @IsOptional()
    @Length(1, 20)
    search?: string;

    @IsOptional()
    @IsString()
    select?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => FindProductsTranslationDto)
    translation?: FindProductsTranslationDto;
}
