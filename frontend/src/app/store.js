 import { configureStore } from "@reduxjs/toolkit";
import UserReducer from '../features/User/UserSlice.js';
import  doctorSlice  from "../features/doctor/DoctorSlice.js";
import appointmentSlice  from "../features/Appointment/AppointmentSlice.js";
import  patientSlice  from "../features/patient/PatientSlice.js";
import PerscriptionSlice from "../features/Perscription/PerscriptionSlice.js";

 
export const store = configureStore({
    reducer:{
        user:UserReducer,
        doctor:doctorSlice,
        appointment:appointmentSlice,
        patient:patientSlice,
        perscription:PerscriptionSlice
    },
    devTools:false
 })
 