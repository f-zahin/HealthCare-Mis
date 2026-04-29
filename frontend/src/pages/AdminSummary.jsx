import React, { useEffect } from "react";
import SummaryCard from "./SummarCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWaveAlt,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors } from "../features/doctor/DoctorSlice";
import { getAppointments } from "../features/Appointment/AppointmentSlice";
import { getAllUSer } from "../features/User/UserSlice";
import { getPatients } from "../features/patient/PatientSlice";

// import your actions
const AdminSummary = () => {
  const dispatch = useDispatch();

  const { doctors } = useSelector((state) => state.doctor);
  const { appointment } = useSelector((state)=>state.appointment);
  const { user } = useSelector((state) => state.user);
  const { patient } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getDoctors());
     dispatch(getAppointments());
    dispatch(getAllUSer());
    dispatch(getPatients());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold"></h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
       
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">
          Admin Dashboard
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
           <SummaryCard
          icon={<FaUsers />}
          text="Total Doctors"
          number={doctors?.length || 0}
          color="bg-teal-600"
        />

        <SummaryCard
          icon={<FaBuilding />}
          text="Total Appointment"
          number={appointment?.length || 0}
          color="bg-yellow-600"
        />

        <SummaryCard
          icon={<FaMoneyBillWaveAlt />}
          text="Users"
          number={user?.length || 0}
          color="bg-red-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWaveAlt />}
          text="Patients"
          number={patient?.length || 0}
          color="bg-red-600"
        />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;