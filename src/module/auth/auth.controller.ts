import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/Login-auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/decorators/getCurrentUser.decorator';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/utilities/contants';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly jwtService:JwtService) {}

  @Post("/signup")
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  @Public()
  create(@Body() createUserDto: CreateUserDto,) {
    return this.authService.create(createUserDto);
  }
  
  @Post('/login')
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  @Public()
  login(@Body() loginDto: LoginDto,) {
    return this.authService.login(loginDto);
  }

  @Get("/me")
  @Public()
  @ApiOperation({
    summary: Roles.ADMIN + ', ' + Roles.USER + ', ' + Roles.PUBLISHER,
  })
  async findMe(@GetCurrentUser('token') token :string) {
    const user=await this.jwtService.decode(token);
    console.log(user.sub)
     return await this.authService.findMe(user.sub);
  }

}
