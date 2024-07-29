import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {

      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const roles = this.reflector.get<string[]>('roles', context.getHandler());


      const isPublic = this.reflector.getAllAndOverride('isPublic', [
        context.getHandler(),
        context.getClass(),
      ]);
      
      if (isPublic) return true;

      const isEveryone = this.reflector.getAllAndOverride('everyone', [
        context.getHandler(),
        context.getClass(),
      ]);


      const decode = this.jwtService.verify(
        request.headers.authorization?.replace('Bearer ', ''),
      );


      if (isEveryone && decode) return true;

      const isValidRole = decode.role
        ?.split(',')
        ?.some((role: string) => roles?.includes(role));
      if (isValidRole) return true;
      return false;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}