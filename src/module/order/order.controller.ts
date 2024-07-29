import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags("order")
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService,private readonly jwtService:JwtService) {}

  @Post()
 async create(@Body() createOrderDto: CreateOrderDto,@GetCurrentUser('token') token : string) {
  const user=await this.jwtService.decode(token);
    return await this.orderService.create(createOrderDto,user.sub);
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id',ParseIntPipe) id: number) {
    return await this.orderService.findOne(id);
  }

  @Get('myorder')
  async findMe(@GetCurrentUser('token') token : string) {
    const user=await this.jwtService.decode(token);
     return await this.orderService.findMe(user.sub);
   }

  @Patch(':id')
 async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
 async remove(@Param('id',ParseIntPipe) id: number) {
    return await this.orderService.remove(id);
  }
}
