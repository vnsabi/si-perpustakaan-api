import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from 'src/auth/auth.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async login(body: UserLoginDto) {
    let { email, password } = body;
    let userData = await this.prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        nisId: true,
        study: true,
        class: true,
        createdAt: true
      }
    });

    if(!userData) {
      this.logger.error(`User not found with email ${email}`);
      console.trace()
      throw new UnauthorizedException();
    }

    let userPassword = userData.password;
    let comparePassword = await bcrypt.compare(password, userPassword);
    if(!comparePassword) {
      this.logger.error(`Invalid password for user ${email}`);
      console.trace()
      throw new UnauthorizedException();
    }

    let payload = Object.assign({}, userData);
    delete payload.password;
    payload['role'] = 'user';
    let token = this.authService.generateToken(payload);

    return { 
      accessToken: token
    }
  }

  async register(body: UserRegisterDto) {
    let {
      email,
      name,
      password,
      nisId,
      study,
      className,
      batch
    } = body; 

    // HASHING PASSWORD
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    this.logger.log(`Registering user ....`)
    let created = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hash,
        nisId,
        study,
        class: className,
        batch
      }
    });
    this.logger.log(`Successfully create user`);
    return {
      data: created
    }
  }

  async getAll(
    name?: string,
    className?: string,
    study?: string,
    batch?: string
  ) {
    let filter: Prisma.UserWhereInput = {
      isDelete: false
    };
    if(name) filter.name = { contains: name };
    if(className) filter.class = className;
    if(study) filter.study = study;
    if(batch) filter.batch = batch;
    let users = await this.prisma.user.findMany({
      where: filter,
      orderBy: {
        createdAt: "desc"
      }
    });
    return { data: users };
  }

  async getFilterDDL() {
    let classData = await this.prisma.user.groupBy({
      by: ['class'],
      where: {
        isDelete: false,
        class: {
          not: null
        }
      }
    });
    let studyData = await this.prisma.user.groupBy({
      by: ['study'],
      where: {
        isDelete: false,
        study: {
          not: null
        }
      }
    });
    let batchData = await this.prisma.user.groupBy({
      by: ['batch'],
      where: {
        isDelete: false,
        batch: {
          not: null
        }
      }
    });

    return {
      data: {
        classData,
        studyData,
        batchData
      }
    }
  }
}