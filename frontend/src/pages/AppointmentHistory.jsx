import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appointmenCloumns } from '../utill/Helper';
import DataTable from "react-data-table-component/dist/index.es.js";
import { getAppointments } from '../features/Appointment/AppointmentSlice';

const AppointmentHistory = () => {

  const [appointtmentList,setAppointmentList]=useState({});

  const dispatch = useDispatch();
    const {appointment,success,loading} = useSelector((state)=>state.appointment);

    useEffect(()=>{
      dispatch(getAppointments());
    },[dispatch])
    

    useEffect(()=>{
      if (!Array.isArray(appointment)) return
      let sno=1
      const data = appointment.map((appoint)=>({
        sno:sno++,
        name:appoint.name,
        doctor:appoint.doctor,
        gender:appoint.gender,
        visitDate:new Date(appoint.visitDate).toDateString(),
        maritalStatus:appoint.maritalStatus,
        medicalRecord:appoint.medicalRecord,
        status:appoint.status
      }));
      setAppointmentList(data);
    },[dispatch,appointment]);



    return (
    <div className="pt-10 ml-10 mr-10 ">
      <div className="py-5">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Appointments</h3>
        </div>
        <div className="flex justify-between items-center">
          
        </div>
        <div className="mt-6 rounded-md">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <DataTable
                columns={appointmenCloumns}
                data={Array.isArray(appointtmentList) ? appointtmentList : []}
                pagination
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

}

export default AppointmentHistory
