import { IsEmail, IsInt, IsString } from "class-validator";

export class BookCreateDto {
    
    @IsString()
    title: string;    
    
    @IsInt()
    quantity: 0;

    @IsString()
    publisher: string;

    @IsString()
    author: string;

    @IsString()
    publishYear: string;
    
}