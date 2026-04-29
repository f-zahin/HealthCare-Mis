import mongoose from "mongoose";

const appointMentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name:{
    type:String,
    required:true
  },
  doctor: {
    type: String,
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  medicalRecord: {
    type: String,
    required: true,
  },
  status:{
    type:String,
    default:'Proccesing'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const appointmenModel = mongoose.model("Appointment", appointMentSchema);
export { appointmenModel };
