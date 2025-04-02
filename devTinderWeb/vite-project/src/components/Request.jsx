import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../config/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Request = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store)=> store.request);
    //console.log(requests);

    const reviewRequest = async (status, _id) => {
        try {
          const res = axios.post(
            BASE_URL + "/request/review/" + status + "/" + _id,
            {},
            { withCredentials: true }
          );
          dispatch(removeRequest(_id));
        } catch (error) {
            console.log(error.message);
            
        }
      };

    const fetchRequest = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true
            })
            console.log(res.data);
            dispatch(addRequests(res?.data?.data));
            
        } catch (error) {
            console.log(error.message);
            
        }
    }

    useEffect(()=> {
        fetchRequest();
    },[])

    if (!requests) return;

    if (requests.length === 0)
      return <h1 className="flex justify-center my-10"> No Requests Found</h1>;
  

  return (
    <div className="text-center my-10">
  <h1 className="font-bold text-white text-3xl mb-6">Connection Requests</h1>

  {requests.length > 0 ? (
    requests.map(({ _id, fromUserId }) => {
      const { firstName, lastName, photoURL, age, gender, location } = fromUserId;

      return (
        <div
          key={_id}
          className="flex items-center justify-between bg-base-300 rounded-xl shadow-lg p-5 mx-auto w-3/4 max-w-lg gap-4"
        >
          {/* Profile Image */}
          <img
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            src={photoURL}
          />

          {/* User Details */}
          <div className="text-left flex-1">
            <h2 className="font-bold text-xl text-white">{`${firstName} ${lastName}`}</h2>
            {age && gender && (
              <p className="text-gray-300">{`${age}, ${gender}`}</p>
            )}
            {location && <p className="text-gray-400">{location}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              className="btn btn-error px-4 py-2"
              onClick={() => reviewRequest("rejected", _id)}
            >
              Reject
            </button>
            <button
              className="btn btn-success px-4 py-2"
              onClick={() => reviewRequest("accepted", _id)}
            >
              Accept
            </button>
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-gray-300 text-lg mt-4">No connection requests available.</p>
  )}
</div>

  )
}

export default Request