
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { OrderTypeEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto  {
    @IsEnum({OrderTypeEnum})
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    orderType:OrderTypeEnum

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    bookId :string
}
