import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    nisId: string;

    @IsString()
    study: string;

    @IsString()
    className: string;

    @IsString()
    batch: string;
}