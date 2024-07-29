import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
   @IsString()
   @ApiProperty()
   @IsNotEmpty()
   title:string

   @IsString()
   @ApiProperty()
   @IsNotEmpty()
   author:string
   
   @IsNumber()
   @ApiProperty()
   @IsNotEmpty()
   yearOfPublication:number

   @IsNumber()
   @ApiProperty()
   @IsNotEmpty()
   price:number

   @IsString()
   @ApiProperty()
   @IsOptional()
   @IsNotEmpty()
   url:string
}
