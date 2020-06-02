import { IsInt, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { CreateOrderProductProductDto } from './create-order-product-product.dto';

export class CreateOrderProductDto {
    @IsInt()
    @Transform(Number)
    quantity: number;

    @ValidateNested()
    @Type(() => CreateOrderProductProductDto)
    product: CreateOrderProductProductDto;
}
