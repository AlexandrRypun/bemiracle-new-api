import { CreateProductTranslationDto } from './create-product-translation.dto';
import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductTranslationDto } from './update-product-translation.dto';

export class UpdateProductDto {
    @IsOptional()
    @IsInt()
    price?: number;

    @IsOptional()
    @IsInt()
    oldPrice?: number;

    @IsOptional()
    @IsInt()
    categoryId?: number;

    @IsOptional()
    @ValidateNested({
        each: true
    })
    @Type(() => UpdateProductTranslationDto)
    translations: UpdateProductTranslationDto[];
}
