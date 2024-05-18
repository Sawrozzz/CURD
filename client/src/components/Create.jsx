import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Create = () => {
     const [name, setName] = useState();
     const [email, setEmail] = useState();
     const [password, setPassword] = useState();

      const navigate = useNavigate();
         const handleSubmit = (e) => {
           e.preventDefault();
           axios
             .post("http://localhost:3000/create", { name, email, password })
             .then((data) => {
               console.log(data);
               navigate('/authRoute/users')
             })
             
             .catch((err) => {console.log(err)
              alert("user already exits")});
         };
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className='text-3xl mb-5'>Create New Users</h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        method="post"
        action="/create"
      >
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
          Create
        </button>
      </form>
    </div>
  );
};

export default Create