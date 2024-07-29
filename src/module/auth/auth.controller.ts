import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/Login-auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService,) {}

  @Post("/signup")
  @Public()
  create(@Body() createUserDto: CreateUserDto,) {
    return this.authService.create(createUserDto);
  }
  
  @Post('/login')
  @Public()
  login(@Body() loginDto: LoginDto,) {
    return this.authService.login(loginDto);
  }
}
