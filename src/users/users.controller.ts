import { 
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe 
} from '@nestjs/common';
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
}
