import { IsString } from "class-validator";

export class AdminRegisterDto {

    @IsString()
    name: string;

    @IsString()
    password: string;
}