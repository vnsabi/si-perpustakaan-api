import { IsEmail, IsInt, IsString } from "class-validator";

export class BookCreateDto {

    @IsString()
    code: string;
    
    @IsString()
    title: string;    
    
    @IsInt()
    quantity: 0;
    
}