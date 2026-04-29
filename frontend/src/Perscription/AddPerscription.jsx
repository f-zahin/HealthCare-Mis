import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addPerscription } from '../features/Perscription/PerscriptionSlice';
import { useNavigate, useParams } from 'react-router-dom';
const AddPerscription = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {perscription,success,loading} = useSelector((state)=>state.perscription);

  
    const [formData ,setFormData] = useState({});
    const {id} = useParams();
    const handleChange = (e)=>{
        const {name,value}=e.target;
        setFormData((prevData)=>({...prevData,[name]:value}));
    }   

    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch(addPerscription({id,formData}));
        navigate('/admin-dashboard/prescription/');
    }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 items-center">Add Perscription</h2>

      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Abstinance
            </label>
            <textarea
              type="text"
              name="abstinance"
              value={formData.abstinance}
              onChange={handleChange}
              className="mt-1 p-2 block h-50 w-full border border-gray-800 rounded-md"
            />
          </div>

          {/*Perscription */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Perscription
            </label>
            <textarea

              type="text"
              name="perscription"
              value={formData.perscription}
              onChange={handleChange}
              className="mt-1 p-2 block h-50 w-full border border-gray-700 rounded-md"
            />
          </div>

         
        </div>
        <button
          type="submit"
          className="justify-center align-middle  w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddPerscription
