import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout"

import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile"
import Register from "../pages/Register";

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/my_account" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
