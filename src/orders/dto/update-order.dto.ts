import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ORDER_STATUS, PAYMENT_METHOD } from '../order.entity';

export class UpdateOrderDto {
    @IsOptional()
    @IsEnum(ORDER_STATUS)
    status?: ORDER_STATUS;

    @IsOptional()
    @IsEnum(PAYMENT_METHOD)
    paymentMethod?: PAYMENT_METHOD;

    @IsOptional()
    @IsString()
    comments?: string;
}
