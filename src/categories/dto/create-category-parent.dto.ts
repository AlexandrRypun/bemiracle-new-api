import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryParentDto {
    @IsInt()
    @Transform(Number)
    id: number;
}
