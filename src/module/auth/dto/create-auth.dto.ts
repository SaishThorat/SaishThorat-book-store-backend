import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phoneNumber:string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    roleId:number
  
}
