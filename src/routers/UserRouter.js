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
import PostTimeshare from "../pages/Investor/PostTimeshare";
import InvestorStatistics from "../pages/Investor/InvestorStatistics";

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

        <Route path="/up-timeshare" element={<PostTimeshare />}/>
        <Route path="/investor-statistics" element={<InvestorStatistics />}/>
      </Route>
    </Routes>
  );
};

export default UserRouter;
