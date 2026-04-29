import React, { useEffect, useState } from 'react';

import DataTable from "react-data-table-component/dist/index.es.js";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getPatients } from '../features/patient/PatientSlice';
import {  PatientButton, patientColumns } from '../utill/Helper';

const Prescription = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {patient,success,loading} = useSelector((state)=>state.patient);

    const [patientList,setPatientList]=useState({})

    useEffect(()=>{
        dispatch(getPatients())
    },[dispatch])

    useEffect(() => {
  if (!Array.isArray(patient)) return;

  let sno = 1;

  const data = patient.map((p) => ({
    sno: sno++,
    name: p.name,
    age: p.age,
    gender: p.gender,
    medicalRecord: p.medicalHistory,
    phone: p.phone,
    action:<PatientButton patientId={p._id}/>
  }));

  setPatientList(data); // ✅ correct setter
}, [patient]); 


    return(
    <div className="pt-10 ml-10 mr-10 ">
      <div className="py-5">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Perscription</h3>
        </div>
        
        <div className="mt-6 rounded-md">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <DataTable
                columns={patientColumns}
                data={Array.isArray(patientList) ? patientList : []}
                pagination
              />
            </div>
          )}
        </div>
      </div>
    </div>);
  
}

export default Prescription
