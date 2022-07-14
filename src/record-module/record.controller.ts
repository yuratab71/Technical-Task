import { Body, Controller, Post } from "@nestjs/common";
import { DoctorDto, RecordDto, UserDto } from "./dto";
import { RecordService } from "./record.service";

@Controller()
export class RecordController {
    constructor( private RecordService: RecordService ) {}
    @Post('user') 
    addUser(@Body() userDto: UserDto) {
        return this.RecordService.addUser(userDto);
    }

    @Post('doctor') 
    addDoctor(@Body() doctorDto: DoctorDto) {
        return this.RecordService.addDoctor(doctorDto)
    }

    @Post('record')
    addRecord(@Body() recordDto: RecordDto) {
        return this.RecordService.addRecord(recordDto);
    }
}