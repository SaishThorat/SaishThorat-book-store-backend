import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
   @IsString()
   @IsNotEmpty()
   title:string

   @IsString()
   @IsNotEmpty()
   author:string
   
   @IsNumber()
   @IsNotEmpty()
   yearOfPublication:number

   @IsNumber()
   @IsNotEmpty()
   price:number

   @IsString()
   @IsOptional()
   @IsNotEmpty()
   url:string
}
