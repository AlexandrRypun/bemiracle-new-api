import { LangEnum } from '../../types/lang.enum';
import { IsEnum, IsOptional, Length } from 'class-validator';

export class FindCategoryTranslationDto {
    @IsEnum(LangEnum)
    lang: LangEnum;

    @IsOptional()
    @Length(1, 255)
    name?: string;
}
