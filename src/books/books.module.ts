import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AlgorithmModule } from 'src/algorithm/algorithm.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './files/books'
    }),
    AlgorithmModule
  ],
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
  exports: [
    BooksService
  ]
})
export class BooksModule {}
