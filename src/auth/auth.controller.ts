import { 
  Controller, 
  Request,
  Post,
  Get,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Post('authenticate')
  @UseGuards(JwtAuthGuard)
  async authenticate() {
    return { success: true }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: any) {
    return req.user;
  }
}
