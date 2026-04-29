import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        maxLength:[25,'please enter fewer than 25 characters'],
        minLength:[5,'please enter at leaset 5 characters ']
    },
    age:{
        type:Number,
        required:true,
        default:1
    },
    gender:{
        type:String,
        required:true
    },
    medicalHistory:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }

})

const patientModel = mongoose.model('Patient',patientSchema);
export {patientModel};
