
import { patientModel } from "../model/PatientModel.js";

export const createPatient= async (req,res)=>{
    console.log(req.body);
    try{
    const {name,age,gender,medicalHistory,phone}=req.body;

    const patient = await patientModel.create({
        userId:req.user._id,
        name,
        age,
        gender,
        medicalHistory,
        phone
    })
    return res.status(200).json({success:true,patient})

    }catch(error){
        console.log(error.message)
    }
}

// get patients

export const getPatients = async(req,res)=>{
    try{
        const patient =await patientModel.find();
        return res.status(200).json({success:true,patient});

    }catch(error){
        console.log(error.message)
    }
}

