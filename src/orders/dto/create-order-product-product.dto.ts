import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrderProductProductDto {
    @IsInt()
    @Transform(Number)
    id: number;
}
