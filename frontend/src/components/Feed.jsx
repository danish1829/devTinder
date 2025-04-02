import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../config/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Card from './Card'

const Feed = () => {

  const dispatch = useDispatch();
  const getFeed = useSelector((store)=> store?.feed)

  const data = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {withCredentials: true})
      console.log(res.data);
       dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(()=>{
    data();
  },[])

  if (!getFeed) return;

  if (getFeed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    <>
    {getFeed[0] && <Card user= {getFeed[0]}/>}
    </>
  )
}

export default Feed