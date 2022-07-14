import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Doctor, DoctorDocument, User, UserDocument } from "./schemas";


@Injectable()
export class RecordRepository {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        @InjectModel(Doctor.name) private DoctorModel: Model<DoctorDocument>
        ) {}

    async addUser(user) {
        const newUser = new this.UserModel(user);
        return await newUser.save();
    }

    async addDoctor(doctor) {
        const newDoctor = new this.DoctorModel(doctor);
        return await newDoctor.save();
    }

    async findAllUsers() {
        return await this.UserModel.find().exec();
    }

    async getDoctorById(id: string) {
        return await this.DoctorModel.findOne({ id: id }).exec()
    }

    async getUserById(id: string) {
        return await this.UserModel.findOne({id: id}).exec();
    }

    async addRecord({user_id, doctor_id, slot_time}) {
        return await this.DoctorModel.findOneAndUpdate({ id: doctor_id, 'slots.date_time': slot_time }, { $set: {
            'slots.$.reservedBy': user_id, 
        }, },{
            new: true
        } )
    }
};