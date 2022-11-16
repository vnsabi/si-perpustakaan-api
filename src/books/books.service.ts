import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookCreateDto } from './dto/book-create.dto';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    private prisma: PrismaService
  ) {}


  // FUNCTION UNTUK MEMBUAT DATA BUKU BARU
  async books(body: BookCreateDto) {

    // DESTRUCTURE BODY OBJECT
    let {
      code,
      title,
      quantity,
    } = body; 
    // DESTRUCTURE BODY OBJECT

    // PRINT LOG SUCCESS CREATING
    this.logger.log(`Creating book ...`);
    // PRINT LOG SUCCESS CREATING


    // UNTUK MEMBUAT RECORD DI DATABASE. DENGAN PRISMA SEBAGAI ORM/PERANTARA
    let created = await this.prisma.books.create({
      data: {
        code,
        title,
        quantity
      }
    });
    // UNTUK MEMBUAT RECORD DI DATABASE. DENGAN PRISMA SEBAGAI ORM/PERANTARA


    // PRINT LOG SUCCESS CREATE
    this.logger.log(`Create book successfully.`);
    // PRINT LOG SUCCESS CREATE END

    return {
      data: created
    }
  }

}

