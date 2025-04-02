import { useSelector } from 'react-redux'
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../config/constant";
import { addUser } from "../utils/userSlice";
import Card from "./Card";

const Profile = () => {

 const user = useSelector((store)=> store.user);

 const { firstName, lastName, photoURL, age, gender, location, about } = user;

  const [FirstName, setFirstName] = useState(firstName);
  const [LastName, setLastName] = useState(lastName);
  const [PhotoURL, setPhotoURL] = useState(photoURL);
  const [Age, setAge] = useState(age);
  const [Gender, setGender] = useState(gender);
  const [Location, setLocation] = useState(location);
  const [About, setAbout] = useState(about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName: FirstName,
          lastName: LastName,
          photoURL: PhotoURL,
          age: Age,
          gender: Gender,
          location: Location,
          about: About,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div> 
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={PhotoURL}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={Age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Location :</span>
                  </div>
                  <input
                    type="text"
                    value={Location}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={Gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={About}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <Card
          user={{ firstName, lastName, photoURL, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile