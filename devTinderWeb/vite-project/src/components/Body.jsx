import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../config/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const userFound = useSelector((store)=> store.user);
  const dispatch = useDispatch();

  const loginUser = async () => {
    if(userFound) return;
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      })
      //console.log(res?.data);
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(()=>{
    loginUser()
  },[])

  return (
    <div>
      <Navbar />    
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body