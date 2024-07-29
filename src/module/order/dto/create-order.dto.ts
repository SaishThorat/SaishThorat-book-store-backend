import { ApiProperty } from "@nestjs/swagger";
import { OrderTypeEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsEnum({OrderTypeEnum})
    @IsNotEmpty()
    orderType:OrderTypeEnum
    
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    bookId :number
}
