import { CreateProductTranslationDto } from './create-product-translation.dto';
import { IsInstance, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsInt()
    price: number;

    @IsOptional()
    @IsInt()
    oldPrice?: number;

    @IsInt()
    categoryId: number;

    @ValidateNested({
        each: true
    })
    @Type(() => CreateProductTranslationDto)
    translations: CreateProductTranslationDto[];
}
