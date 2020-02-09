import { ProductLangEnum } from '../product-lang.enum';
import { IsEnum, IsOptional, Length } from 'class-validator';

export class FindProductsTranslationDto {
    @IsOptional()
    @IsEnum(ProductLangEnum)
    lang?: ProductLangEnum;

    @IsOptional()
    @Length(1, 20, {
        each: true
    })
    name?: string | string[];
}
