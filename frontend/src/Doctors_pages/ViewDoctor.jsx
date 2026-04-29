import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingelDoctor } from "../features/doctor/DoctorSlice";
import { useNavigate, useParams } from "react-router-dom";

const ViewDoctor = () => {
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

    
  }, [dispatch, id,success]);

  useEffect(()=>{
    if(doctor){
        setFormData({
      name: doctor.name,
      lastName: doctor.lastName,
      gender: doctor.gender,
      dob: new Date(doctor.dob).toDateString(),
      visitingTime: doctor.VisitingTime,
      maritalStatus: doctor.maritalStatus,
      doctorialDegree: doctor.doctorialDegree,
      Fee: doctor.Fee,
    });
    }
  },[doctor,id])
  console.log(doctor);


  return (
    <>
      
        <div className="max-w-130 mx-auto mt-10 bg-white p-8 rounded-3xl shadow-md justify-center">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Doctor Detials
          </h2>
          <div>
              <div className=" ">
                <div>
                  <div className="flex space-x-5 mb-5">
                    <p className="text-lg font-bold">Name:</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">LastName:</p>
                    <p className="font-medium">{formData.lastName}</p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Date of Birth:</p>
                    <p className="font-medium">
                      {new Date(formData.dob).toDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Gender:</p>
                    <p className="font-medium">{formData.gender}</p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">VisitingTime:</p>
                    <p className="font-medium">
                      {formData.visitingTime}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">DoctorilaDegree:</p>
                    <p className="font-medium">
                      {formData.doctorialDegree}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Marital Status:</p>
                    <p className="font-medium">{formData.maritalStatus}</p>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Fee:</p>
                    <p className="font-medium">{formData.Fee}</p>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      
    </>
  );
};

export default ViewDoctor;
