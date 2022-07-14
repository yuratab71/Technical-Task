import { IsString } from "class-validator";

export class UserDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;
}

