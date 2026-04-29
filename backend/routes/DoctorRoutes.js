import express from 'express';
import { createDoctor ,updateDoctor,deleteDoctor, getDoctors, getSingleDoctor} from '../controller/doctorController.js';
import { roleBaseAuth, verifyUserAuth } from '../utlil/UserAuth.js';
const router=express.Router();

router.post('/register',verifyUserAuth,createDoctor)
router.get('/get-doctors',verifyUserAuth,getDoctors)
router.put('/update-doctor/:id',verifyUserAuth,updateDoctor);
router.delete('/delete-doctor/:id',verifyUserAuth,deleteDoctor);
router.get('/get-doctor/:id',verifyUserAuth,getSingleDoctor);

export default router;