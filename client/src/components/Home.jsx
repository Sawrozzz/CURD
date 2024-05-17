import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <>
    <h1 className="mb-6">This is home page</h1>
      <div className='flex flex-row gap-5'>
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