import { CreateProductTranslationDto } from './create-product-translation.dto';
import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductCategoryDto } from './create-product-category.dto';

export class CreateProductDto {
    @IsInt()
    price: number;

    @IsOptional()
    @IsInt()
    oldPrice?: number;

    @IsInt()
    inStock: number;

    @ValidateNested()
    @Type(() => CreateProductCategoryDto)
    category: CreateProductCategoryDto;

    @ValidateNested({
        each: true
    })
    @Type(() => CreateProductTranslationDto)
    translations: CreateProductTranslationDto[];
}
