import { IsOptional, IsString } from "class-validator";

export class BookGetDto {

  @IsString()
  @IsOptional()
  title?: string;
  
}