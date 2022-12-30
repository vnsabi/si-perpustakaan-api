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
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BooksService } from './books.service';
import { BookCreateDto } from './dto/book-create.dto';
import { BookGetDto } from './dto/book-get.dto';
import { BookUpdateDto } from './dto/book-update.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/common/helpers/edit-file-name';

@Controller('books')
@UsePipes(new ValidationPipe({ transform: true }))
export class BooksController {

  constructor(
    private booksService: BooksService
  ) {}

  
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: BookCreateDto) {
    return await this.booksService.create(
      body.code,
      body.title,
      body.quantity
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files/books',
      filename: editFileName
    }),
  }))
  async uploadEbook(
    @Req() req: any, 
    @UploadedFile() file: Express.Multer.File
  ) { 
    let bookId = req.body.bookId;
    let filename = file.filename;
    return await this.booksService.update(
      parseInt(bookId),
      null,
      null,
      null,
      filename
    );
  }

  @Get('download')
  async downloadEbook(@Query('bookId') bookId: string) {
    if(!bookId) throw new BadRequestException({
      message: "bookId is missing"
    });

    return await this.booksService.downloadEbook(
      parseInt(bookId)
    );
  }

  @Get()
  async getAll(@Query() query: BookGetDto) {
    return await this.booksService.getAll(query.title);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') bookId: string) {
    let book = await this.booksService.getById(parseInt(bookId));
    return book;
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
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
