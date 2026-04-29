
import mongoose from "mongoose";
import validator from 'validator';
const DoctorSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:[true,'please enter your name'],
        maxLenght:[25,'please enter name fewer than 25 characters'],
        minLenght:[5,'please enter your name atleast 5 characters']
    },
    lastName:{
        type:String,
        required:[true,'please enter LastName'],
        maxLenght:[25,'please enter name fewer than 25 characters'],
        minLenght:[5,'please enter your name atleast 5 characters']
    },
    gender:{
        type:String,
        required:[true,'please enter gender']
    },
    dob:{
        type:Date,
    },
    doctorialDegree:{
        type:String,
        required:true
    },
    VisitingTime:{
        type:String,
        required:true
    },
    maritalStatus:{
        type:String,
        required:true
    },
    Fee:{
        type:Number,
        required:true
    }

})

const doctorModel = mongoose.model('Doctor',DoctorSchema);
export {doctorModel};