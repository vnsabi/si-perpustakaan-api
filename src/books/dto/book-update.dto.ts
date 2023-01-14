import { IsInt, IsString } from "class-validator";

export class BookUpdateDto {
  
  @IsInt()
  bookId: number;

  @IsString()
  title: string;

  @IsInt()
  quantity: number;
}