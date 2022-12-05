import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
  exports: [
    BooksService
  ]
})
export class BooksModule {}
