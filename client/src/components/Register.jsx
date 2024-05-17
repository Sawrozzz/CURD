import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import axios from "axios";
 
const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:3000/register", { name, email, password })
        .then((data) => {
          console.log(data);
          navigate("/login");
        })
        .catch((err) => console.log(err));
    };
// const handleSubmit = async (name, email, password) => {
//   const response = await fetch("http://localhost:3000/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, email, password }),
//     credentials: "include", // Include credentials to send cookies
//   });

//   if (response.ok) {
//     const data = await response.json();
//     console.log(data.token); // Handle the token as needed
//   } else {
//     const error = await response.json();
//     console.error("Registration error:", error);
//   }
// };


  return (
    <div className="max-w-md mx-auto mt-8">
      <form className="space-y-4" method="post" action="/register" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-1">
            Name
          </label>
          <input
            type="name"
            placeholder="Enter your name"
            name="name"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <h3 className=" mt-6 mb-6"> Already have an Account!!</h3>
      <Link
        to="/login"
        className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Login Here
      </Link>
    </div>
  );
};

export default Register;
