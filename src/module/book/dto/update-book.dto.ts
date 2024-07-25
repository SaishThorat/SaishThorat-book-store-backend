import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    author?: string;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    yearOfPublication?: number;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    price?: number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    url?: string;
}
