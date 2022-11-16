import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminRegisterDto } from './dto/admin-register.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from '@prisma/client';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);
  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async login(body: AdminLoginDto) {
    let adminData = await this.prisma.admin.findFirst({
      where: { name: body.name },
      select: { 
        id: true,
        name: true,
        password: true,
        isActive: true,
        createdAt: true
      }
    });

    if(!adminData) {
      this.logger.error(`Admin not found with name ${body.name}`);
      console.trace();
      throw new UnauthorizedException();
    }

    let adminPassword = adminData.password;
    let comparePassword = await bcrypt.compare(body.password, adminPassword);
    if(!comparePassword) {
      this.logger.error(`Invalid admin password for user ${adminData.name}`);
      console.trace()
      throw new UnauthorizedException();
    }

    let payload = Object.assign({}, adminData);
    delete payload.password;
    payload['role'] = 'admin';
    let token = this.authService.generateToken(payload);

    return {
      accessToken: token
    }
  }

  async register(
    body: AdminRegisterDto,
    admin: Admin  
  ) {

    if(admin.name !== "SuperAdmin") {
      this.logger.error(`Forbidden Resource`);
      console.trace();
      throw new UnauthorizedException({
        message: "Forbidden resource"
      });
    }

    let adminCheck = await this.prisma.admin.count({
      where: { name: body.name }
    });
    if(adminCheck) {
      this.logger.error(`Admin name already exist`);
      console.trace();
      throw new BadRequestException();
    }

    // HASHING PASSWORD
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(body.password, salt);
    
    this.logger.log(`Creating admin ...`);
    let created = await this.prisma.admin.create({
      data: {
        name: body.name,
        password: hash
      }
    });
    this.logger.log(`Create admin successfully`);

    return {
      data: created
    }
  }

}
