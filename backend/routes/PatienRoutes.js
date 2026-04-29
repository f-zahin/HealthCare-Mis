import express from 'express';
import { createPatient, getPatients } from '../controller/patientController.js';
import { verifyUserAuth } from '../utlil/UserAuth.js';
const router = express.Router();

router.post('/patient-register',verifyUserAuth,createPatient)
router.get('/get-patients',verifyUserAuth,getPatients)
export default router;