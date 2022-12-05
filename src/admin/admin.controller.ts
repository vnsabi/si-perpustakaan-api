import { 
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Query
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminService } from './admin.service';
import { AdminGetDto } from './dto/admin-get.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';

@Controller('admin')
@UsePipes(new ValidationPipe({ transform: true }))
export class AdminController {

  constructor(
    private adminService: AdminService
  ) {}

  @Get()
  async getAll(@Query() query: AdminGetDto) {
    return await this.adminService.getAll(query.name);
  }

  @Post('login')
  async login(@Body() body: AdminLoginDto) {
    return await this.adminService.login(body);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async register(
    @Req() req: any,
    @Body() body: AdminRegisterDto,
  ) {
    console.log(body, "BODI >")
    return await this.adminService.register(
      body,
      req.user
    );
  }

}
