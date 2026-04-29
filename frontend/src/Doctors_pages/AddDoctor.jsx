import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  register,
  removeErrors,
  removeSuccess,
} from "../features/doctor/DoctorSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddDoctor = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { loading, success, error, doctors } = useSelector(
  (state) => state.doctor
);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };


  useEffect(() => {
    if (error) {
      toast.error("could not register");
      dispatch(removeErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("SuccessFully Registerd");
      navigate("/admin-dashboard/doctors");
      dispatch(removeSuccess())
    }
  }, [ dispatch,success,loading]);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 items-center">Register Doctor</h2>
      
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

          {/*LastName */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="LastName"
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
              placeholder="DOB"
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

          {/* Doctor Degree*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Degree
            </label>
            <select
              name="doctorialDegree"
              onChange={handleChange}
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
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
