
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../features/User/UserSlice';

const ChangePassword = () => {
  const {user,success,loading} = useSelector((state)=>state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData,setFromData]=useState({});

  const handleChagne=(e)=>{
      const {name,value}=e.target;
      setFromData((prevData)=>({...prevData,[name]:value}));
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(updatePassword(formData));
    if(success){
      navigate('/admin-dashboard/user')
    }
  }
  
  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        <p className="text-red-500"></p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="old Password"
              onChange={handleChagne}
              className="mt-1 w-full p-2 border border-gray-600 rounded-md"
            />
          </div>
          {/* newPassword */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="new Password"
              onChange={handleChagne}
              className="mt-1 w-full p-2 border border-gray-600 rounded-md"
            />
          </div>
          {/* ConfirmPassword */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm Password"
              onChange={handleChagne}
              className="mt-1 w-full p-2 border border-gray-600 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword
