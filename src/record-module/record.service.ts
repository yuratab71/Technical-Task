import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DoctorDto, RecordDto, UserDto } from "./dto";
import { RecordRepository } from "./record.repository";
import { v4 as uuid } from 'uuid';
import { SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class RecordService {
    constructor(private readonly RecordRepository: RecordRepository,
         private scheduleRegistry: SchedulerRegistry) {}

         private readonly logger = new Logger(RecordService.name);

    addUser(userDto: UserDto) {
        const newUser = {
            ...userDto,
            id: uuid()
        }

        return this.RecordRepository.addUser(newUser);
    }

    addDoctor(doctorDto: DoctorDto) {
        const newDoctor = {
            ...doctorDto,
            slots: doctorDto.slots.map((el) => {
                return {date_time: el,
                reservedBy: null}
            }),
            id: uuid(),
        }

        return this.RecordRepository.addDoctor(newDoctor);
    }
    
    async addRecord(recordDto: RecordDto) {
        const { user_id, doctor_id, slot_time } = recordDto;
        const doctor = await this.RecordRepository.getDoctorById(doctor_id);

       const slot = doctor.slots.find((el) => el.date_time === slot_time);

       if (!slot) return new NotFoundException()
       if (!!slot.reservedBy) return "Already reserved"

        const record = await this.RecordRepository.addRecord(recordDto);

       const extablishOneDayLogTimeout = setTimeout(() => this.OneDayLogNotification(recordDto), this.getOneDayTimeout(slot_time));
        
        const establishTwoHourLogTimeout = setTimeout(() => this.TwoHourlogNotification(recordDto), this.getTwoHoursTimeout(slot_time));
        
        this.scheduleRegistry.addTimeout(`${user_id}TwoHourNotification${slot_time}`, establishTwoHourLogTimeout);
        this.scheduleRegistry.addTimeout(`${user_id}OneDayNotification${slot_time}`, extablishOneDayLogTimeout);
        return record;
    }

    async TwoHourlogNotification({user_id, doctor_id, slot_time}) {
        const user = await this.RecordRepository.getUserById(user_id);
        const doctor = await this.RecordRepository.getDoctorById(doctor_id);
        
        this.logger.log(`Привет ${ user.name }! Вам через 2 часа к ${ doctor.spec } в ${ slot_time }!`);
    }

    async OneDayLogNotification({user_id, doctor_id, slot_time}) {
        const user = await this.RecordRepository.getUserById(user_id);
        const doctor = await this.RecordRepository.getDoctorById(doctor_id);
        
        this.logger.log(`Привет ${ user.name }! Напоминаем что вы записаны к ${ doctor.spec } завтра в ${ slot_time }!`);
    }

    getOneDayTimeout(slot_time) {
        const notification_time = new Date(slot_time);
        notification_time.setDate(notification_time.getDate() - 1);
        const result = notification_time.getTime() - Date.now();
        return result;
    }

    getTwoHoursTimeout(slot_time) {
        const notification_time = new Date(slot_time);
        notification_time.setHours(notification_time.getHours() - 2);
        const result = notification_time.getTime() - Date.now();
        return result;
        
    }
}