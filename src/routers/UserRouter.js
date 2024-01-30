import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

import Home from "../pages/Home";
import UserProfile from "../pages/UserProfile";
import Register from "../pages/Register";
import ForgotPassword from "../components/auth/ForgotPassword";
import TimeshareList from "../pages/TimeshareList";
import TimeshareDetail from "../pages/TimeshareDetail";
import PersonalProjectManagement from "../pages/Investor/PersonalProjectManagement";

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/my_account" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />

        <Route path="/personal-projects" element={<PersonalProjectManagement />} />
        <Route path="/timeshare-list" element={<TimeshareList />} />
        <Route path="/timeshare-list/:slug" element={<TimeshareDetail />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
