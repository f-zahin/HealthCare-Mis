import app from "./app.js";
import dotenv from 'dotenv';
import express from 'express';
import UserRouter from './routes/UserRoutes.js';
import DoctorRoutes from './routes/DoctorRoutes.js';
import patientRoutes from './routes/PatienRoutes.js';
import AppointmentRoutes from './routes/AppointmentRoutes.js';
import PerscriptionRoute from './routes/PerscriptionRoute.js'
import cookieParser from "cookie-parser";

import { dbConnection } from "./config/databaseConnection.js";

dotenv.config({
    path:'backend/config/config.env'
})

dbConnection();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use('/api/user/',UserRouter)
app.use('/api/doctor/',DoctorRoutes)
app.use('/api/patient/',patientRoutes)
app.use('/api/appointment/',AppointmentRoutes)
app.use('/api/perscription/',PerscriptionRoute)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

