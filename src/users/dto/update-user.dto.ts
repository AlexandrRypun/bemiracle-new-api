import { IsEmail, IsInt, IsOptional, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @Length(6, 50)
    password?: string;

    @IsOptional()
    @Length(1, 50)
    name?: string;

    @IsOptional()
    @Length(1, 50)
    surname?: string;

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
