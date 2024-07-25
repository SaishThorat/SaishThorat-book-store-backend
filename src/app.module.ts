import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { BookModule } from './module/book/book.module';

@Module({
  imports: [PrismaModule, AuthModule,BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
