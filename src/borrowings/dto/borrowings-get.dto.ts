import { IsNumberString, IsOptional } from "class-validator";

export class BorrowingsGetDto {

  @IsNumberString()
  @IsOptional()
  userId?: string;
  
}