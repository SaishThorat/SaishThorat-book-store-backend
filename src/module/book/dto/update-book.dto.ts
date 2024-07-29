import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsString()
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty()
    author?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty()
    yearOfPublication?: number;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    price?: number;

    @IsString()
    @IsOptional()  @ApiProperty()
    @IsNotEmpty()
    url?: string;
}
