import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { EventEmitter } from "stream";
import { RecordModule } from "./record-module/record.module";

@Module({
    imports: [ 
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_URL),
        RecordModule,
        ScheduleModule.forRoot(),
        EventEmitterModule.forRoot() 
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {};