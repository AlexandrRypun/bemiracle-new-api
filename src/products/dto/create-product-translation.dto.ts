import { LangEnum } from '../../types/lang.enum';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateProductTranslationDto {
    @IsEnum(LangEnum)
    lang: LangEnum;

    @Length(1, 255)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    shortDescription?: string;

    @IsString()
    @IsOptional()
    ingredients?: string;
}
