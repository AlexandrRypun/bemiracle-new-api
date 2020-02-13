import { LangEnum } from '../../types/lang.enum';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductTranslationDto {
    @IsEnum(LangEnum)
    lang: LangEnum;

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
