import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from 'prisma/Prisma.service';
import { LoginDto } from './dto/Login-auth.dto';

@Injectable()
export class AuthService {

  constructor (private readonly prismaService:PrismaService){}

 async create(createAuthDto: CreateUserDto) {
    const {password}=createAuthDto;
    const salt = bcryptjs.genSaltSync(10);
    const hashPass = bcryptjs.hashSync(password, salt);
return await this.prismaService.user.create({
  data:{
    ...createAuthDto,password:hashPass,
    token:null
  }
})
}

async login(loginInfo: LoginDto) {
  const {email,password}=loginInfo;

  const user=await this.prismaService.user.findUnique({where:{email}});

  if(!user){
   throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
  }

const hashPass = bcryptjs.compareSync(password,user.password);

if(!hashPass){
  throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
}
  return hashPass;
}

}
