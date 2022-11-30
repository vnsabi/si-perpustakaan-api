import { IsOptional, IsString } from "class-validator";

export class UserGetDto {

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    className?: string;

    @IsString()
    @IsOptional()
    study?: string;

    @IsString()
    @IsOptional()
    batch?: string;
}