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
import InvestorStatistics from "../pages/Investor/_sub-page/InvestorStatistics";
import ManagementTransaction from "../pages/Investor/_sub-page/ManagementTransaction";

import CustomerTransaction from "../pages/Customer/_sub-page/CustomerTransaction";
import ReservedPlaceManagement from "../pages/Customer/_sub-page/ReservedPlaceManagement";

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/my_account" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />

        <Route
          path="/personal-projects"
          element={<PersonalProjectManagement />}
        />
        <Route path="/timeshare-list" element={<TimeshareList />} />
        <Route path="/timeshare-list/:slug" element={<TimeshareDetail />} />

        {/* investor */}
        <Route path="/up-timeshare" element={<PostTimeshare />} />
        <Route path="/investor-statistics" element={<InvestorStatistics />} />
        <Route
          path="/management-transaction"
          element={<ManagementTransaction />}
        />

        {/* customer */}

        <Route
          path="/reserved-place-list"
          element={<ReservedPlaceManagement />}
        />
        <Route path="/customer-transaction" element={<CustomerTransaction />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
