import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VisitFormService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    visitorName: string,
    className: string,
    visitReason: string
  ) {
    return await this.prisma.visitForm.create({
      data: {
        visitorName,
        className,
        visitReason
      }
    });
  }

  async getAll() {
    let visitForms = await this.prisma.visitForm.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { data: visitForms };
  }

}
