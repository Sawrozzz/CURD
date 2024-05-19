import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

        const token = result.data.token;
        document.cookie = `token = ${token};expires=${86400}`;

        navigate("/authRoute/users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Link className="text-3xl" to="/">
        Go To Home
      </Link>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl mb-5">Login Your Account</h1>
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

        <Link to="/register">
          <h3 className=" mt-4 text-blue-700 ax-w-56">
            {" "}
            Create new account here!!
          </h3>
        </Link>
      </div>
    </>
  );
};

export default Login;
