import { IsOptional, IsString } from "class-validator";

export class AdminGetDto {

  @IsString()
  @IsOptional()
  name?: string;
  
}