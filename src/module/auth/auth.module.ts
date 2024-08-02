import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/Prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({
    global: true,
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: '10h' },
  }),],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
})
export class AuthModule {
  
}
