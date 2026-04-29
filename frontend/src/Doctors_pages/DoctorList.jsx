import React, { useEffect } from "react";
import DataTable from "react-data-table-component/dist/index.es.js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteDoctor, getDoctors, removeErrors, removeSuccess } from "../features/doctor/DoctorSlice";
import { ActionButton, columns } from "../utill/Helper";
import { useState } from "react";
import { toast } from "react-toastify";

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState({});
  const { loading, doctors,isDeleted } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch,isDeleted]);

  
  useEffect(()=>{
    if (!Array.isArray(doctors)) return;
    let sno=1;
    const data = doctors.map((doc)=>({
      sno:sno++,
      name:doc.name,
      lastName:doc.lastName,
      dob:new Date(doc.dob).toDateString(),
      gender:doc.gender,
      VisitingTime:doc.VisitingTime,
      maritalStatus:doc.maritalStatus,
      doctorialDegree:doc.doctorialDegree,
      Fee:doc.Fee,
      action:<ActionButton id={doc._id} />
    }
  
  ))
    setDoctorList(data)
  },[doctors,dispatch])

  return (
    <div className="pt-10 ml-10 mr-10 ">
      <div className="py-5">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Manage Doctors</h3>
        </div>
        <div className="flex justify-between items-center">
          <input className="px-4 py-0.5" />
          <NavLink
            to="add-doctor"
            className="px-4 ml-10 py-1 bg-teal-600 rounded-md text-white"
          >
            Add New New Docotor
          </NavLink>
        </div>
        <div className="mt-6 rounded-md">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <DataTable
                columns={columns}
                data={Array.isArray(doctorList) ? doctorList : []}
                pagination
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
