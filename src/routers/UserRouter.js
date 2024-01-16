import React from "react";
import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout"

import Home from "../pages/Home";

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
