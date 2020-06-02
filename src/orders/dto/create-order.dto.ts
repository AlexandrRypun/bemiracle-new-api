import { ArrayNotEmpty, IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { CreateOrderProductDto } from './create-order-product.dto';
import { User } from '../../users/user.entity';
import { PAYMENT_METHOD } from '../order.entity';

export class CreateOrderDto {
    @IsEnum(PAYMENT_METHOD)
    paymentMethod: PAYMENT_METHOD;

    @IsString()
    @MaxLength(50)
    customerName: string;

    @IsString()
    @MaxLength(50)
    customerSurname: string;

    @IsString()
    @MaxLength(13)
    customerPhone: string;

    @IsOptional()
    @Transform(val => val || null)
    @IsEmail()
    @MaxLength(320)
    customerEmail?: string;

    @IsString()
    customerCity: string;

    @IsInt()
    @Transform(Number)
    customerNovaPoshtaDep: number;

    @IsOptional()
    @IsString()
    comments?: string;

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderProductDto)
    products: CreateOrderProductDto[];

    @Type(() => User)
    user: User;
}
