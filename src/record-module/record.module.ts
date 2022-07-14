import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RecordController } from "./record.controller";
import { RecordRepository } from "./record.repository";
import { RecordService } from "./record.service";
import { User, UserSchema, Doctor, DoctorSchema } from './schemas';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }, 
            { name: Doctor.name, schema: DoctorSchema }
        ])
    ],
    controllers: [ RecordController ],
    providers: [ RecordService, RecordRepository ],
    exports: [],
})
export class RecordModule {};