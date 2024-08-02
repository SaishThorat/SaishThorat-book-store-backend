import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utilities/contants';

@Controller('order')
@ApiTags("order")
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService,private readonly jwtService:JwtService) {}

  @Post()
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
 async create(@Body() createOrderDto: CreateOrderDto,@GetCurrentUser('token') token : string) {
  const user=await this.jwtService.decode(token);
    return await this.orderService.create(createOrderDto,user.sub);
  }

  
  @Get('/mycart')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  async myCart(@GetCurrentUser('token') token : string) {
   const user=await this.jwtService.decode(token);
   console.log(token)
     return await this.orderService.myCart(user.sub);
   }


  @Get('/myorder')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  async findMe(@GetCurrentUser('token') token : string) {
    const user=await this.jwtService.decode(token);
     return await this.orderService.findMe(user.sub);
   }

  @Get()
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
 async findOne(@Param('id') id: number) {
    return await this.orderService.findOne(id);
  }

 

  @Patch(':id')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
 async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Post(':id')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
 async addToCart(@Param('id') productId: string,@GetCurrentUser('token') token : string) {
  const user=await this.jwtService.decode(token);
    return await this.orderService.addToCart(productId,user.sub);
  }

  @Delete('/removeCart/:id')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })  
  async removeCart(@Param('id',ParseIntPipe,) orderId: number,@GetCurrentUser('token') token : string) {
    const user=await this.jwtService.decode(token);
     return await this.orderService.removeCart(orderId,user.sub);
   }
 
}
