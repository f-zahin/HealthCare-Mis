import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../features/doctor/DoctorSlice";
import { addAppointment } from "../features/Appointment/AppointmentSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Appointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {appointment,success} = useSelector((state)=>state.appointment)
  const [formData, setFormData] = useState({});
  const { doctors,  } = useSelector((state) => state.doctor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preveData) => ({ ...preveData, [name]: value }));
  };

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAppointment(formData))
    toast.success('SuccessFully Added')
      navigate('/admin-dashboard')
  };



  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Insert Name"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Visit
            </label>
            <input
              type="date"
              name="visitDate"
              placeholder="visitDate"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
          {/* gender*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Martial Status*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Marital Status</option>
              <option value="engaged">Engaged</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Medical Record*/}

   {/*Medical Record */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medical Record
            </label>
            <input
              type="text"
              name="medicalRecord"
              placeholder="Medical Record"
              onChange={handleChange}
              className="mt-1 p-2 block  w-full border border-gray-300 rounded-md"
            ></input>
          </div>          

          {/* Doctor Status*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <select
              name="doctor"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
