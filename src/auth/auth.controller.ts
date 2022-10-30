import { 
    Controller, 
    Request,
    Post
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
