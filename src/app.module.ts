import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [AuthModule, UsersModule, BooksModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule {}
