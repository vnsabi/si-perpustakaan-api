import { Module } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { BorrowingsController } from './borrowings.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    UsersModule,
    BooksModule
  ],
  providers: [BorrowingsService, PrismaService],
  controllers: [BorrowingsController]
})
export class BorrowingsModule {}
