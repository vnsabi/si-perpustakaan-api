import { 
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.usersService.getAll();
  }

}
