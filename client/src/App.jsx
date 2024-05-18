// src/App.js
import "./App.css";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/Create";
import Update from "./components/Update";
import Users from "./components/Users";
import AuthRoute from "./components/AuthRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  path="/authRoute" element={<AuthRoute />}>
            <Route path="profile/:id" element={<Profile />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="create" element={<Create />}></Route>
            <Route path="update/:id" element={<Update />}></Route>
          </Route>
          <Route path="/" element={<Home />}></Route> // yesma pay
          <Route path="/register" element={<Register />}></Route> // yesma ne
          payo
          <Route path="/login" element={<Login />}></Route> // yesma ne payo
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
