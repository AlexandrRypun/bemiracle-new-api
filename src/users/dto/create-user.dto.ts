import { IsEmail, IsInt, IsOptional, Length, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsEmailUsed } from '../decorators/is-email-used.decorator';

export class CreateUserDto {
    @IsEmail()
    @MaxLength(320)
    @IsEmailUsed()
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
    @MaxLength(50)
    city?: string;

    @IsOptional()
    @Transform(Number)
    @IsInt()
    novaPoshtaDep?: number;
}
