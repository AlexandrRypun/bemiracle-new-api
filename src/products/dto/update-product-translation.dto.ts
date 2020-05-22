import { LangEnum } from '../../types/lang.enum';
import { IsEnum, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductTranslationDto {
    @IsOptional()
    @IsInt()
    @Transform(Number)
    id?: number;

    @IsOptional()
    @IsEnum(LangEnum)
    lang?: LangEnum;

    @IsOptional()
    @Length(1, 255)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    shortDescription?: string;

    @IsOptional()
    @IsString()
    ingredients?: string;
}
