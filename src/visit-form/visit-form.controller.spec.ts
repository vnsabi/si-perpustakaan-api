import { Test, TestingModule } from '@nestjs/testing';
import { VisitFormController } from './visit-form.controller';

describe('VisitFormController', () => {
  let controller: VisitFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitFormController],
    }).compile();

    controller = module.get<VisitFormController>(VisitFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
