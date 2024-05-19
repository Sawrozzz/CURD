import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <>
      <h1 className="mb-6 font-sans font-bold text-2xl">This is home page</h1>
      <h2 className='mt-4 mb-4 text-red-500'>You can't go to Manage User until you are registerd and loggedIN. So signup first</h2>
      <div className="flex flex-row gap-5">
        <Link
          to="/authRoute/users"
          className=" bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Manage User
        </Link>
        <Link
          to="/login"
          className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-5 "
        >
          Login Here
        </Link>
        <Link
          to="/register"
          className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Register Here
        </Link>
      </div>
    </>
  );
}

export default Home