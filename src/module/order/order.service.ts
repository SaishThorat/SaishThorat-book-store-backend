import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/Prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService:PrismaService){}
  async create(createOrderDto: CreateOrderDto,userId: number) {
    return await this.prismaService.order.create({
      data:{...createOrderDto,userId}
    });
  }

  async findAll() {
    return await this.prismaService.order.findMany();
  }

  async findOne(id: number) {
    return  await this.prismaService.order.findUnique({where:{id}});
  }

  async findMe(id: number) {
    return  await this.prismaService.order.findMany({where:{userId:id}});
  }

 async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.prismaService.order.update({where:{id},data:{...updateOrderDto}});
  }

  async remove(id: number) {
    return await this.prismaService.order.delete({where:{id}});
  }
}
