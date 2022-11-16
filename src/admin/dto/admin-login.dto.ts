import { IsString } from "class-validator";

export class AdminLoginDto {

    @IsString()
    name: string;

    @IsString()
    password: string;
}