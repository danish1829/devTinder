import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../config/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=> store.connection);
    //console.log(connections);
    
    const data = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true
            })

            //console.log(res.data);
            dispatch(addConnection(res?.data?.data));
        } catch (error) {
            
        }
    }

    useEffect(()=> {
        data();
    },[])

    if (!connections) return;

    if (connections.length === 0) return <h1 className='flex justify-center mt-10'> No Connections Found</h1>;
  
  return (
    <div className="text-center my-10">
  <h1 className="font-bold text-white text-3xl">Connections</h1>

  {connections.length > 0 ? (
    connections.map(({ _id, firstName, lastName, photoURL,location, age, gender, about }) => (
      <div
        key={_id}
        className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto justify-around"
      >
        <div>
          <img
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
            src={photoURL}
          />
        </div>
        <div className="text-left mx-4">
          <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{`${age}, ${gender}`}</p>}
          {about && <p>{about}</p>}
          <h2>{location}</h2>
        </div>
        <div className='flex ml-16'>
          <Link to={'/chat/'+ _id}><button className='btn btn-success'>message</button></Link>
        </div>
      </div>
    ))
  ) : (
    <p className="text-white text-lg mt-4">No connections available</p>
  )}
</div>
    
  )
}

export default Connections