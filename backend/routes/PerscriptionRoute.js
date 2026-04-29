import { Router } from "express";
import express from 'express';
import  {verifyUserAuth}  from "../utlil/UserAuth.js";
import {addPerscription}  from "../controller/PerscriptionController.js";

const router = express.Router();


router.post('/add/:id',verifyUserAuth,addPerscription);


export default router;

