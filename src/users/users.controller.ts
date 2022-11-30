import { 
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserGetDto } from './dto/user-get.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return await this.usersService.login(body);
  }

  @Post('register')
  async register(@Body() body: UserRegisterDto) {
    return await this.usersService.register(body);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async getAll(@Body() query: UserGetDto) {
    return await this.usersService.getAll(
      query.name,
      query.className,
      query.study,
      query.batch
    );
  }

  @Get('filterDDL')
  @UseGuards(JwtAuthGuard)
  async getFilterDDL() {
    return await this.usersService.getFilterDDL();
  }

}
