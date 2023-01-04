import { IsInt } from "class-validator";

export class BorrowingsDeleteDto {

  @IsInt()
  borrowingId: number;
  
}