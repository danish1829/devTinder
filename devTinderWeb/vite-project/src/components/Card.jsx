import React from 'react'
import { BASE_URL } from '../config/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const Card = ({ user }) => {

  const dispatch = useDispatch();
  //console.log(user);
  const {_id, firstName, lastName, age, gender, location, about, photoURL} = user;

  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      
      dispatch(removeUserFromFeed(toUserId));
    } catch (err) {
      console.log(err.message);
      
    }
  };
   
  return (
    <div className='flex justify-center mt-6'>
    <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoURL}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title font-bold text-2xl">{firstName + " " + lastName}</h2>
    <h4 className='font-semibold text-xl'>{gender + ", " + age}</h4>
    <h3 className='font-semibold text-xl'>{location}</h3>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button onClick={() => handleSendRequest("ignored", _id)}
      className="btn btn-primary">Ignore</button>
      <button onClick={() => handleSendRequest("interested", _id)}
      className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Card