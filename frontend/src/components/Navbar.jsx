import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../config/constant';
import { removeUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'

const Navbar = () => {

  const data = useSelector((store) => store.user);
  //console.log(data);
  const { firstName, lastName, photoURL } = data || {};

  const [showToast, setShowToast] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, {withCredentials: true})
      setShowToast(true);
            setTimeout(() => {
              toast.success("Logout successfully!");
            }, 2000);
      dispatch(removeUser());
      navigate('/');
    } catch (error) {
      console.log(error.message);
      
    }
  } 

  const handleConnection = async () => {
    try {
      navigate('/connections')
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const handleRequest = async () => {
    try {
      navigate('/requests')
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <div className="navbar bg-base-300 px-4">
  <div className="flex-1">
    <Link to={'/feed'}><img className='h-10 cursor-pointer'
    src="https://tinder.com/static/build/fdddb23e13aebd5b7d8673f7ad31d67f.png" alt="logo" /> </Link>
    <a className="ml-3 text-xl font-serif font-bold">tinder</a>
  </div>
  {data && ( 
    <div className="flex-none gap-2">
    { <div className='font-semibold text-lg'>
      {firstName + " " + lastName}
    </div> }
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/profile'}><a className="justify-between">
            Profile
          </a></Link>
        </li>
        <li onClick={handleConnection}>
          <a>Connections</a></li>
          <li onClick={handleRequest}>
          <a>Requests</a></li>
        <li onClick={handleLogout}>
          <a>Logout</a></li>
      </ul>
    </div>
  </div>
   )}
   <Toaster position="top-center" reverseOrder={false} />
</div>
  )
}

export default Navbar