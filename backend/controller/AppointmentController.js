import { appointmenModel } from "../model/AppointmentModel.js";

export const createAppointment = async (req, res) => {
  try {
    const { name, visitDate, gender, maritalStatus, medicalRecord, doctor } =
      req.body;
    const appointment = await appointmenModel.create({
      userId: req.user._id,
      name,
      doctor,
      visitDate,
      maritalStatus,
      gender,
      medicalRecord,
    });

    return res.status(200).json({ success: true, appointment });
  } catch (error) {
    console.log(error.message);
  }
};



 // get All Appointments

export const getAllAppointments = async (req, res) => {
  try {
    const appointment = await appointmenModel.find();

    return res.status(200).json({
      success: true,
      appointment,
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
