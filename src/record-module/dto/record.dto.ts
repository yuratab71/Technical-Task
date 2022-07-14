import { IsString } from "class-validator";

export class RecordDto {
    @IsString()
    user_id: string;

    @IsString()
    doctor_id: string;

    @IsString()
    slot_time: string;
}