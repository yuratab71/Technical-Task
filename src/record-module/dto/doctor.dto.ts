import { IsString } from "class-validator";

export class DoctorDto {
    @IsString()
    name: string;

    @IsString()
    spec: string;

    @IsString({ each: true })
    slots: Array<string>;
}