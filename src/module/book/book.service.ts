import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'prisma/Prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId:number,createBookDto: CreateBookDto) {
    return await this.prismaService.book.create({
      data: {
        ...createBookDto,
        userId
      }
    });
  }

  async findAll() {
    return await this.prismaService.book.findMany();
  }

  async findAllbook() {
    return await this.prismaService.books.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.books.findUnique({
      where: { Id: id },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.prismaService.book.update({
      where: { ISBN: id },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.book.delete({
      where: { ISBN: id },
    });
  }
}
