import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VisitFormCreateDto } from './dto/visit-form-create.dto';
import { VisitFormService } from './visit-form.service';

@Controller('visit-form')
@UsePipes(new ValidationPipe({ transform: true }))
export class VisitFormController {

	constructor(
		private visitFormService: VisitFormService
	) {}

	@Post('create')
	async create(@Body() body: VisitFormCreateDto) {
		return await this.visitFormService.create(
			body.visitorName,
			body.className,
			body.visitReason
		);
	}
	
	@Get()
  @UseGuards(JwtAuthGuard)
	async getAll() {
		return await this.visitFormService.getAll();
	}

}
