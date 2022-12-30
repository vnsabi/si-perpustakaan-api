import { Module } from '@nestjs/common';
import { VisitFormService } from './visit-form.service';
import { VisitFormController } from './visit-form.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VisitFormService, PrismaService],
  controllers: [VisitFormController]
})
export class VisitFormModule {}
