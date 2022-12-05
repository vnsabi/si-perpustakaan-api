import { 
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Req,
  UseGuards,
  Get
} from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { BorrowingsCreateDto } from './dto/borrowings-create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('borrowings')
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
export class BorrowingsController {
  constructor(
    private borrowingsService: BorrowingsService
  ) {}

  @Get()
  async getAll() {
    return await this.borrowingsService.getAll();
  }

  @Post('create')
  async create(
    @Body() body: BorrowingsCreateDto,
    @Req() req: any
  ) {
    return await this.borrowingsService.create(
      body,
      req.user
    );
  }

  @Get('mappingUsers')
  async mappingUsers() {
    return await this.borrowingsService.mappingUsers();
  }

  @Get('mappingBooks')
  async mappingBooks() {
    return await this.borrowingsService.mappingBooks();
  }
  
}
