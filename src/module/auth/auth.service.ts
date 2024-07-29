import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from 'prisma/Prisma.service';
import { LoginDto } from './dto/Login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor (private readonly prismaService:PrismaService,private jwtService: JwtService){}

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

  const role=await this.prismaService.role.findUnique({where:{id:user.roleId},select:{rolename:true}})

  const payload = { sub: user.id, role: role.rolename};

  const accesstoken=await this.jwtService.signAsync(payload);

    if(!hashPass){
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
    }
      return accesstoken;
    }

}
