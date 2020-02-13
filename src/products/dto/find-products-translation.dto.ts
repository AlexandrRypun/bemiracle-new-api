import { LangEnum } from '../../types/lang.enum';
import { IsEnum, IsOptional, Length } from 'class-validator';

export class FindProductsTranslationDto {
    @IsOptional()
    @IsEnum(LangEnum)
    lang?: LangEnum;

    @IsOptional()
    @Length(1, 20, {
        each: true
    })
    name?: string | string[];
}
