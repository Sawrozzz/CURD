import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:3000/login", { email, password })
        .then((result) => {
          console.log(result);
          console.log("success");
            navigate("/profile");
          
        })
        .catch((err) => console.log(err));
    };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
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
            name="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <h3 className=" mt-6 mb-6"> Create new account here!!</h3>
      <Link
        to="/register"
        className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        SignUp
      </Link>
    </div>
  );
};

export default Login;
