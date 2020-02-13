import { IsEnum, IsInt, Length } from 'class-validator';
import { LangEnum } from '../../types/lang.enum';
import { Transform } from 'class-transformer';

export class UpdateCategoryTranslationDto {
    @IsInt()
    @Transform(Number)
    categoryId: number;

    @IsEnum(LangEnum)
    lang: LangEnum;

    @Length(1, 255)
    name?: string;
}
