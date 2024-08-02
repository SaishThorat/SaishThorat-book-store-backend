import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
import { AuthRoles } from 'src/decorators/roles.decorator';
import { Roles } from 'src/utilities/contants';
import { RolesGuards } from '../auth/guard/role.guard';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('book')
@ApiTags("book")
@ApiBearerAuth()
@UseGuards(RolesGuards)
export class BookController {
  constructor(private readonly bookService: BookService,private readonly jwtService:JwtService) {}
  
  @Post()
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  @AuthRoles([Roles.ADMIN,Roles.USER,Roles.PUBLISHER])
  async create(@Body() createBookDto: CreateBookDto,@GetCurrentUser('token') token:string) {
    const user=await this.jwtService.decode(token);
    return await this.bookService.create(user.sub,createBookDto);
  }
  
  @Get()
  @Public()
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  async findAll() {
    try {
      return await this.bookService.findAll();
    } catch (error) {
      console.error(error)
    }
  }

  @Get('/all')
  @Public()
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  async findAllbooks() {
    try {
      return await this.bookService.findAllbook();
    } catch (error) {
      console.error(error)
    }
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.bookService.findOne(id);
    } catch (error) {
      console.error(error)
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  @AuthRoles([Roles.ADMIN,Roles.USER,Roles.PUBLISHER])
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    try {
      return await this.bookService.update(id, updateBookDto);
    } catch (error) {
      console.error(error)
    }

  }

  @Delete(':id')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.PUBLISHER,
  })
  @AuthRoles([Roles.ADMIN,Roles.USER,Roles.PUBLISHER])
  async remove(@Param('id',ParseIntPipe) id: number) {
    try {
      return await this.bookService.remove(id);
    } catch (error) {
      console.error(error)
    }
  }
}
