import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { getSingelDoctor, updateDoctor } from "../features/doctor/DoctorSlice";

const UpdateDoctor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctor, loading, success, error } = useSelector(
    (state) => state.doctor,
  );

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    gender: "",
    dob: "",
    visitingTime: "",
    maritalStatus: "",
    doctorialDegree: "",
    Fee: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingelDoctor(id));
    }
    
  }, [dispatch, id]);

useEffect(()=>{
  if(success){
    setFormData({
      name: doctor.name,
      lastName: doctor.lastName,
      gender: doctor.gender,
      dob: new Date(doctor.dob).toDateString(),
      visitingTime: doctor.visitingTime,
      maritalStatus: doctor.maritalStatus,
      doctorialDegree: doctor.doctorialDegree,
      Fee: doctor.Fee,
    });
  }
},[dispatch])

  console.log("single doctor:", doctor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDoctor({ id, formData }));
    if (success) {
      toast.success("successfuly Update");
      navigate("/admin-dashboard/doctors");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 items-center">Update Doctor</h2>

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
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>

          {/*LastName */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
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
              value={formData.gender}
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
              value={formData.maritalStatus}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Marital Status</option>
              <option value="engaged">Engaged</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Doctor Degree*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Degree
            </label>
            <select
              name="doctorialDegree"
              onChange={handleChange}
              value={formData.doctorialDegree}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Degree</option>
              <option value="Professor">Professor</option>
              <option value="MD">MD</option>
              <option value="Trainer">Trainer</option>
            </select>
          </div>

          {/*Visiting Time */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Visiting Time
            </label>
            <input
              type="text"
              name="VisitingTime"
              placeholder="VisitingTime"
              value={formData.visitingTime}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
          {/*Fee */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fee
            </label>
            <input
              type="text"
              name="Fee"
              placeholder="Fee"
              value={formData.Fee}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateDoctor;
