import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteDoctor, getSingelDoctor, removeErrors, removeSuccess } from "../features/doctor/DoctorSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import UpdateDoctor from "../Doctors_pages/UpdateDoctor";
import { deletUser } from "../features/User/UserSlice";

export const columns = [
  {
    name:"Sno",
    selector:(row)=>row.sno,
    width:'60px'
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "80px",
  },
  {
    name: "LastName",
    selector: (row) => row.lastName,
    width: "80px",
  },
  {
    name: "Dob",
    selector: (row) =>row.dob,
    width: "150px",
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
    width: "80px",
  },
  {
    name: "VisitingTime",
    selector: (row) => row.VisitingTime,
    width: "100px",
  },
  {
    name: "maritalStatus",
    selector: (row) => row.maritalStatus,
    width: "92px",
  },
  {
    name: "doctorialDegree",
    selector: (row) => row.doctorialDegree,
    width: "120px",
  },
  {
    name: "Fee",
    selector: (row) => row.Fee,
    width: "90px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];


export const appointmenCloumns=[
 {
  name:'sno',
  selector:(row)=>row.sno
 },
  {
    name:'name',
    selector:(row)=>row.name
  },
  {
    name:'Doctor',
    selector:(row)=>row.doctor
  },
  {
    name:'gender',
    selector:(row)=>row.gender
  },
  {
    name:'visitDate',
    selector:(row)=>row.visitDate
  },
  {
    name:'maritalStatus',
    selector:(row)=>row.maritalStatus
  },
  {
    name:'medicalRecord',
    selector:(row)=>row.medicalRecord
  },
  {
    name:'Status',
    selector:(row)=>row.status
  }
]


export const UserColumns =[
  {
    name:'Sno',
    selector:(row)=>row.sno
  },
  {
    name:'Name',
    selector:(row)=>row.name
  },
  {
    name:"Email",
    selector:(row)=>row.email
  },
  {
    name:'Role',
    selector:(row)=>row.role
  },
  {
    name:'Actions',
    selector:(row)=>row.action
  }
]

export const patientColumns = [
  {
    name:'Sno',
    selector:(row)=>row.sno,
  },{
    name:'Name',
    selector:(row)=>row.name
  },
  {
    name:'Age',
    selector:(row)=>row.age
  },
  {
    name:'Gender',
    selector:(row)=>row.gender
  },
  {
    name:'Medical Record',
    selector:(row)=>row.medicalRecord,
  },
  {
    name:'Phone',
    selector:(row)=>row.phone
  },
  {
    name:'Actions',
    selector:(row)=>row.action
  }
]


// ==================================Buttons

export const ActionButton = ({ id}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {success,error,isDeleted,doctor} = useSelector((state)=>state.doctor);

   const handeDelete = async () => {
    try {
      await dispatch(deleteDoctor(id)).unwrap();
      if(isDeleted){
        navigate('/admin-dashboard/doctors');
        toast.success('Deleted Successfuly');
      
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const handelUpdate = ()=>{
    dispatch(getSingelDoctor(id));
    navigate(`/admin-dashboard/doctors/update-doctor/${id}`)
  }
  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded-md"
        onClick={()=>navigate(`/admin-dashboard/doctors/view/${id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded-md"
        onClick={handelUpdate}
      >
        Edite
      </button>

      <button
        className="px-3 py-1 bg-green-600 text-white rounded-md"
        onClick={handeDelete}
      >
        Delete
      </button>
    </div>
  );
};



export const UserActionButton = ({userId})=>{

  const {user,loading,success}= useSelector((state)=>state.user);
  const dispatch= useDispatch();
  const navigate =useNavigate();

  const handelUserDelete =async()=>{
    try{

      await dispatch(deletUser(userId)).unwrap();
      navigate('/admin-dashboard/user')
      if(success){
        toast.success('successfully deleted')
      }
    }catch(error){
      console.log(error.message)
    }
      
  }



return (
    <div className="flex space-x-3 ">
     
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded-md"
        onClick={()=>navigate(`/admin-dashboard/user/update-user/${userId}`)}
      >
        Edite
      </button>

      <button
        className="px-3 py-1 bg-green-600 text-white rounded-md"
        onClick={handelUserDelete}
      >
        Delete
      </button>
    </div>
  );
  
}

// patient Button
export const PatientButton = ({patientId})=>{
const navigate =useNavigate();
return(
  <div className="flex space-x-3 ">
     
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded-md"
        onClick={()=>navigate(`/admin-dashboard/prescription/add/${patientId}`)}
      >
        Prescription
      </button>

    </div>
);
}