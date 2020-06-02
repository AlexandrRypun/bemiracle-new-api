import { IsInt, IsOptional } from 'class-validator';

export class FindOrdersDto {
    @IsOptional()
    @IsInt()
    userId?: number;
}
