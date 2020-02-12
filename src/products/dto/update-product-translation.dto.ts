import { ProductLangEnum } from '../product-lang.enum';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductTranslationDto {
    @IsEnum(ProductLangEnum)
    lang: ProductLangEnum;

    @IsOptional()
    @Length(1, 255)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    shortDescription?: string;
}
