import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/constant'
import { Link, useNavigate }  from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password
      }, {withCredentials: true})
      //console.log(res.data);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        toast.success("Login successfully!");
      }, 3000);
      navigate('/feed');
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        toast.success("Account created successfully!");
      }, 3000);
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl m-auto mt-6">
  <div className="card-body">
    <div className='text-center mb-2'>
      <h1 className='font-bold text-3xl'>{isLoginForm ? "Login" : "Sign Up"}</h1>
    </div>
    {!isLoginForm && (
      <>
    <div className="label">
    <span className="label-text">First Name :</span>
  </div>
  <input
  type="text"
  value={firstName}
  onChange={(e)=> setFirstName(e.target.value)}
  placeholder="Type here"
  className="input input-bordered input-accent w-full max-w-xs" />

<div className="label">
    <span className="label-text">Last Name :</span>
  </div>
  <input
  type="text"
  value={lastName}
  onChange={(e)=> setLastName(e.target.value)}
  placeholder="Type here"
  className="input input-bordered input-accent w-full max-w-xs" />
  </>
)}
    <div className="label">
    <span className="label-text">Email Address :</span>
  </div>
  <input
  type="text"
  value={email}
  onChange={(e)=> setEmail(e.target.value)}
  placeholder="Type here"
  className="input input-bordered input-accent w-full max-w-xs" />

<div className="label">
    <span className="label-text">Password :</span>
  </div>
<input
  type="text"
  value={password}
  onChange={(e)=> setPassword(e.target.value)}
  placeholder="Type here"
  className="input input-bordered input-accent w-full max-w-xs" />

    <div className="card-actions justify-end mt-2">
      <button onClick={isLoginForm ? handleLogin : handleSignUp}
      className="btn btn-primary">{isLoginForm ? "Login" : "Sign Up"}</button>
    </div>
    <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
  </div>
  <Toaster position="top-center" reverseOrder={false} />
</div>
  )
}

export default Login