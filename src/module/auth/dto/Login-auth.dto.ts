import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto { 
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password:string
  
}
