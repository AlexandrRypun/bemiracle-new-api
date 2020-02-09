import { ProductLangEnum } from '../product-lang.enum';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateProductTranslationDto {
    @IsEnum(ProductLangEnum)
    lang: ProductLangEnum;

    @Length(1, 255)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    shortDescription?: string;
}
