import { Module } from '@nestjs/common';
import { PrismaService } from './Prisma.service';

@Module({
  imports: [],
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}