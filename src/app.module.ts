import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AdminModule } from './admin/admin.module';
import { BorrowingsModule } from './borrowings/borrowings.module';

@Module({
  imports: [AuthModule, UsersModule, BooksModule, AdminModule, BorrowingsModule],
  providers: [
    PrismaService
  ],
})
export class AppModule {}
