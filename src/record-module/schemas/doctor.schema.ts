import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema()
class Slot {
    date_time: string;

    reservedBy: string | null; // userId
}

@Schema()
export class Doctor {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  spec: string;

  @Prop()
  slots: Array<Slot>
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);