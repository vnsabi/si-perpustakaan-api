import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BooksService } from 'src/books/books.service';
import { AdminJwtPayloadDto } from 'src/common/dto/admin-jwt-payload.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { BorrowingsCreateDto } from './dto/borrowings-create.dto';

@Injectable()
export class BorrowingsService implements OnModuleInit {
  private readonly logger = new Logger(BorrowingsService.name);

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private booksService: BooksService
  ) {}

  async onModuleInit() {
    // await this.prisma.borrowings.deleteMany();
  }

  async getAll(userId?: number) {
    let filter: Prisma.BorrowingsWhereInput = {};
    if(userId) {
      filter.userModel = {};
      filter.userModel.id = userId;
    }
      let borrowings = await this.prisma.borrowings.findMany({
      where: filter,
      orderBy: { createdAt: "desc" },
      include: {
        userModel: true,
        adminModel: true
      }
    });
    let response = [];
    for(let borrowing of borrowings) {
      response.push({
        id: borrowing.id,
        userName: borrowing.userModel.name,
        createdBy: borrowing.adminModel.name,
        createdAt: borrowing.createdAt,
        expiredAt: borrowing.expiredAt,
        status: borrowing.status,
        booksData: JSON.parse(borrowing.booksData),
      });
    }

    return { data: response };
  }

  async create(
    body: BorrowingsCreateDto,
    admin: AdminJwtPayloadDto
  ) {
    let {
      booksData,
      userId,
      expiredAt
    } = body;
    let expiredDate = new Date(expiredAt);
    expiredDate.setDate(expiredDate.getDate() - 1);
    expiredDate.setUTCHours(23,59,59,999);

    let payload: Prisma.BorrowingsUncheckedCreateInput = {
      booksData: JSON.stringify(booksData),
      adminId: admin.id,
      userId,
      expiredAt: expiredDate
    };

    this.logger.log(`Creating books borrowing`);
    let created = await this.prisma.borrowings.create({
      data: payload
    });
    this.logger.log(`Successfully created books borrowing`);

    return { data: created };
  }

  async mappingUsers() {
    let users = (await this.usersService.getAll()).data;
    let result = [];
    for(let user of users) {
      result.push({
        label: user.name,
        id: user.id
      });
    }

    return { data: result };
  }

  async mappingBooks() {
    let books = (await this.booksService.getAll()).data;
    let result = [];
    for(let book of books) {
      result.push({
        label: book.title,
        id: book.id,
        title: book.title,
        code: book.code,
        quantity: book.quantity
      });
    }
    
    return { data: result };
  }

}
