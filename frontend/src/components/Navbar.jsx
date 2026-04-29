import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { logout ,removeErrors,removeSuccess} from '../features/User/UserSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();  

  const {user,error,success}= useSelector((state)=>  state.user);

  const handleLogout = async () => {
  try {
    await dispatch(logout()).unwrap();
    navigate('/');
    toast.success('Logout Successfuly')
    dispatch(removeSuccess())
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className='flex items-center bg-cyan-950 text-white h-15 justify-between px-5'>
      <p>Welcome {user?.name}</p>
      <button className='px-4 py-1 bg-teal-600 hover:bg-teal-900 text-white rounded' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
