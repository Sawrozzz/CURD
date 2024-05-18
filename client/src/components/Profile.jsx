import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import getCookieByName from "../../functions/getcookie";


const Profile = () => {
  const [profile, setProfile] = useState([]);
const navigate = useNavigate();
const {id} =useParams()
useEffect(() => {
  axios
    .get(
      "http://localhost:3000/users/getProfile/" + id,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + getCookieByName("token"),
        },
      }
    )

    .then((result) => {
      console.log(result);
     setProfile(result.data)
      // setPassword(result.data.password);
    })
    .catch((err) => console.log(err));
}, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <img src='/profile.svg' alt='profile' className='w-11 h-11 border-2 border-black rounded-full'></img>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-96">
        <div className="mb-6 flex">
          <label className="block text-gray-700 text-sm font-bold mt-2">
            Name:
          </label>
          <p className=" appearance-nonerounded w-full py-2 px-3 text-gray-700 leading-tight">
            {profile.name}
          </p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 text-sm font-bold mt-2">
            Email:
          </label>
          <p className=" appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;