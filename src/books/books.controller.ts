import { 
  Body, 
  Controller,
  UseGuards, 
  UsePipes, 
  ValidationPipe,
  Post,
  Get
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BooksService } from './books.service';
import { BookCreateDto } from './dto/book-create.dto';

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
  async getAll() {
    return await this.booksService.getAll();
  }
}
