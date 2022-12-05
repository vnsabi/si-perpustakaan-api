import { Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsInt, IsString, ValidateNested } from "class-validator";

export class BorrowingsCreateDto {

  @IsInt()
  userId: number;

  @IsDateString()
  expiredAt: string;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BorrowingBooks)
  booksData: BorrowingBooks[];
}

class BorrowingBooks {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  code: string;

  @IsInt()
  quantity: number;
}