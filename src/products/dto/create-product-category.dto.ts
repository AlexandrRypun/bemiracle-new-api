import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductCategoryDto {
    @IsInt()
    @Transform(Number)
    id: number;
}
