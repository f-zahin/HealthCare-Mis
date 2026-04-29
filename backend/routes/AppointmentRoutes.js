import express from 'express';
import { createAppointment, getAllAppointments } from '../controller/AppointmentController.js';
import { verifyUserAuth } from '../utlil/UserAuth.js';
const router = express.Router();

router.post('/createAppointment',verifyUserAuth,createAppointment)
router.get('/get-appointments',verifyUserAuth,getAllAppointments)

export default router;