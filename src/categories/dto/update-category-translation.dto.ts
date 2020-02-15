import { IsEnum, IsInt, IsOptional, Length } from 'class-validator';
import { LangEnum } from '../../types/lang.enum';
import { Transform } from 'class-transformer';

export class UpdateCategoryTranslationDto {
    @IsOptional()
    @IsInt()
    @Transform(Number)
    id?: number;

    @IsOptional()
    @IsInt()
    @Transform(Number)
    categoryId?: number;

    @IsOptional()
    @IsEnum(LangEnum)
    lang?: LangEnum;

    @IsOptional()
    @Length(1, 255)
    name?: string;
}
