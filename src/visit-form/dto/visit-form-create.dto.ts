import { IsString } from "class-validator";

export class VisitFormCreateDto {

  @IsString()
  visitorName: string;
  
  @IsString()
  className: string;
  
  @IsString()
  visitReason: string;
  
}