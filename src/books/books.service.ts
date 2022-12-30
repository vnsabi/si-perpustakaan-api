import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { readFile, readFileSync } from 'fs';
import { AlgorithmService } from 'src/algorithm/algorithm.service';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    private prisma: PrismaService,
    private algorithmService: AlgorithmService
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

  async getAll(title?: string) {
    let filter: Prisma.BooksWhereInput = {
      isDelete: false
    };
    let books = await this.prisma.books.findMany({
      where: filter,
      orderBy: {
        createdAt: "desc"
      }
    });
    if(title) {
      let searchedBooks = await this.algorithmService.kmpSearch(
        title,
        books,
        "title"
      );
      return { data: searchedBooks }
    }

    return { data: books }
  }

  async getById(bookId: number) {
    return await this.prisma.books.findUnique({
      where: { id: bookId }
    });
  }

  async update(
    bookId: number,
    title?: string,
    code?: string,
    quantity?: number,
    filename?: string
  ) {
    let updateData: Prisma.BooksUpdateInput = {};
    if(title) updateData.title = title;
    if(code) updateData.code = code;
    if(quantity) updateData.quantity = quantity;
    if(filename) updateData.filename = filename;
    return await this.prisma.books.update({
      where: { id: bookId },
      data: updateData
    });
  }

  async downloadEbook(bookId: number) {
    let bookData = await this.prisma.books.findUnique({
      where: { id: bookId },
      select: { filename: true }
    });
    if(!bookData) return {
      base64: null
    };
    if(!bookData.filename) return {
      base64: null
    };

    let filename = bookData.filename;

    let base64 = readFileSync(`./files/books/${filename}`, {
      encoding: "base64"
    });
    return {
      base64,
      filename
    };
  }

  async deleteBook(bookId: number) {
    return await this.prisma.books.delete({
      where: { id: bookId }
    });
  }
}

