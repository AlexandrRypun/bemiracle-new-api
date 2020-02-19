import { IsEmail, IsInt, IsOptional, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { Unique } from 'typeorm';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(6, 50)
    password: string;

    @Length(1, 50)
    name: string;

    @Length(1, 50)
    surname: string;

    @IsOptional()
    @Matches(/^\+\d{12}$/)
    phone?: string;

    @IsOptional()
    @Length(1, 50)
    city?: string;

    @IsOptional()
    @Transform(Number)
    @IsInt()
    novaPoshtaDep?: number;
}
