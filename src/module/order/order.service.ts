import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'prisma/Prisma.service';
import { OrderStatus, OrderTypeEnum } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService:PrismaService){}
  async create(createOrderDto: CreateOrderDto,userId: number) {
    return await this.prismaService.order.create({
      data:{...createOrderDto,userId,status:OrderStatus.PENDING,unit:1}
    });
  }

  async findAll() {
    return await this.prismaService.order.findMany();
  }

  async findOne(id: number) {
    return  await this.prismaService.order.findUnique({where:{id}});
  }

  async findMe(id: number) {
    return  await this.prismaService.order.findMany({where:{userId:id, NOT:{status:OrderStatus.ADDTOCART}},});
  }

 async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.prismaService.order.update({where:{id},data:{...updateOrderDto}});
  }

  async remove(id: number) {
    return await this.prismaService.order.delete({where:{id}});
  }

  async addToCart( productId: string,userId:number) {

    const entry=await this.prismaService.order.findFirst({where:{userId,newBookID:productId}})

    
    if(!entry){
      await this.prismaService.order.create({data:{status:OrderStatus.ADDTOCART,unit:1,userId,newBookID:productId,orderType:OrderTypeEnum.ONLINE}})
    }

    if(entry && entry.status===OrderStatus.ADDTOCART){
      await this.prismaService.order.update({where:{id:entry.id},data:{unit:entry.unit+1,status:OrderStatus.ADDTOCART}})
    }
   
   }

   async myCart(userId:number) {
      return await this.prismaService.order.findMany({where:{userId},select:{id:true,unit:true,user:{select:{name:true,id:true}},Book:{select:{Title:true,Price:true,Image:true,authors:true,}}}})
    }

    async removeCart(orderId: number,userId:number) {
       return await this.prismaService.order.delete({where:{id:orderId,userId,status:OrderStatus.ADDTOCART}});
     }
}
