import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import getCookieByName from "../../functions/getcookie";

const Update = () => {
  const {id} = useParams();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
      useEffect(() => {
        axios
          .get(
            "http://localhost:3000/users/getUser/" + id,

            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + " " + getCookieByName("token"),
              },
            }
          )

          .then((result) => {
            console.log(result);

            setName(result.data.name);
            setEmail(result.data.email);
            // setPassword(result.data.password);
          })
          .catch((err) => console.log(err));
      }, []);
      const handleUpdate = (e)=>{
        e.preventDefault();
          axios
            .put(
              "http://localhost:3000/users/updateUser/" + id,
              { name, email, password },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer" + " " + getCookieByName("token"),
                },
              }
            )
            .then((result) => {
              console.log(result);
              navigate("/authRoute/users");
            })
            .catch((err) => console.log(err));
      }
  return (
    <div className="max-w-md mx-auto mt-8">
    <h1 className='text-3xl'>
    Update user
    </h1>
      <form className="space-y-4 mt-8" onSubmit={handleUpdate}>
        <div >
          <label htmlFor="email" className="block mb-1">
            Name
          </label>
          <input
            type="name"
            placeholder="Update your name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Update your email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Update your password"
            name="password"
            value={password}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Update