import { doctorModel } from "../model/DoctorModel.js";

// create docotr

const createDoctor = async (req, res) => {
  try {
    const {
      name,
      lastName,
      gender,
      dob, // ✅ match frontend
      doctorialDegree,
      VisitingTime,
      maritalStatus,
      Fee,
    } = req.body;

    const doctor = await doctorModel.create({
      userId: req.user._id,
      name,
      lastName,
      gender,
      dob,
      doctorialDegree,
      VisitingTime,
      maritalStatus,
      Fee,
    });

    return res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.log(error.message);
  }
};

// update doctor

const updateDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDoctor = await doctorModel.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new:true
    });

    if (!updateDoctor) {
      return res
        .status(401)
        .json({ success: false, message: "Not updated doctor" });
    }
    return res.status(200).json({ success: true, updateDoctor });
  } catch (error) {
    console.log(error.message);
  }
};

// delete doctor

const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const docotor = await doctorModel.findByIdAndDelete(id);
    if (!docotor) {
      return res
        .status(400)
        .json({ success: false, message: "could not deleted" });
    }
    return res
      .status(200)
      .json({ success: true, docotor });

  } catch (error) {
    console.log(error.message);
  }
};

// get doctor detial

const getSingleDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res
        .status(400)
        .json({ success: false, message: "not retrived doctor" });
    }

    return res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.log(error.message);
  }
};


// get All Doctors

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    if (!doctors) {
      return res
        .status(400)
        .json({ success: false, message: "not found doctors" });
    }
    
    return res.status(200).json({ success: true, doctors });

  } catch (error) {
    console.log(error.message);
  }
};

export { createDoctor, updateDoctor, deleteDoctor, getSingleDoctor ,getDoctors };
