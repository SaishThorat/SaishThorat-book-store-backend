import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'prisma/Prisma.service';

@Injectable()
export class BookService {

  constructor(private readonly prismaService :PrismaService){}

  create(createBookDto: CreateBookDto) {
    return  {
      title:"sham chi aai",
      author:'s',
      yearOfPublication:2024,
      price:19,
      url:"s",
      status:'true',
    };
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
