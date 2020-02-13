import { IsEnum, Length } from 'class-validator';
import { LangEnum } from '../../types/lang.enum';

export class CreateCategoryTranslationDto {
    @IsEnum(LangEnum)
    lang: LangEnum;

    @Length(1, 255)
    name: string;
}
