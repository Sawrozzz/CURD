import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getCookieByName from "../../functions/getcookie";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + getCookieByName("token"),
        },
      })
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/users/deleteUser/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + getCookieByName("token"),
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="py-8">
        <div className="overflow-x-auto">
          <div className="min-w-full shadow rounded-lg overflow-hidden">
            <Link
              to="/authRoute/create"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-8  rounded"
            >
              Create
            </Link>
            <table className="min-w-full leading-normal mt-5">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-200 text-gray-800 text-left text-sm uppercase font-bold"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-200 text-gray-800 text-left text-sm uppercase font-bold"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-200 text-gray-800 text-left text-sm uppercase font-bold"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link to={`/authRoute/profile/${user._id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                          Profile
                        </button>
                      </Link>
                      <Link to={`/authRoute/update/${user._id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={(e) => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Go To HomePage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Users;
