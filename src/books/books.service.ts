import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    private prisma: PrismaService
  ) {}


  // FUNCTION UNTUK MEMBUAT DATA BUKU BARU
  async create(
    code: string,
    title: string,
    quantity: number,
  ) {

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

  async getAll() {
    let books = await this.prisma.books.findMany({
      where: {
        isDelete: false
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return {
      data: books
    }
  }
}

