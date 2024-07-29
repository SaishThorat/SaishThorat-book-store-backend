import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { BookModule } from './module/book/book.module';
import { OrderModule } from './module/order/order.module';

@Module({
  imports: [PrismaModule, AuthModule,BookModule,OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
