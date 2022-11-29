import { 
  Body, 
  Controller,
  UseGuards, 
  UsePipes, 
  ValidationPipe,
  Post,
  Get,
  Put,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BooksService } from './books.service';
import { BookCreateDto } from './dto/book-create.dto';
import { BookGetDto } from './dto/book-get.dto';
import { BookUpdateDto } from './dto/book-update.dto';

@Controller('books')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class BooksController {

  constructor(
    private booksService: BooksService
  ) {}

  @Post('create')
  async create(@Body() body: BookCreateDto) {
    return await this.booksService.create(
      body.code,
      body.title,
      body.quantity
    );
  }

  @Get()
  async getAll(@Query() query: BookGetDto) {
    return await this.booksService.getAll(query.title);
  }

  @Get(':id')
  async getById(@Param('id') bookId: string) {
    let book = await this.booksService.getById(parseInt(bookId));
    return book;
  }

  @Put('update')
  async update(@Body() body: BookUpdateDto) {
    return await this.booksService.update(
      body.bookId,
      body.title,
      body.code,
      body.quantity
    );
  }

  @Delete(':id')
  async deleteBook(@Param('id') bookId: string) { 
    return await this.booksService.deleteBook(parseInt(bookId));
  }
}
