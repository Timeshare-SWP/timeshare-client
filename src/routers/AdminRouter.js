import React from "react";
import { Routes, Route } from "react-router-dom";

import LayoutAdmin from "../layouts/AdminLayout";

import Dashboard from "../pages/Admin/Dashboard";

import AdminStatistics from "../components/admin/AdminStatistics"
import AdminNotification from "../components/admin/AdminNotification"
import AdminUser from "../components/admin/AdminUser"
import AdminGroup from "../components/admin/AdminGroup"
import AdminProject from "../components/admin/AdminProject"
import AdminHelp from "../components/admin/AdminHelp"

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutAdmin />}>
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/statistics" Component={AdminStatistics}/>
        <Route path="/notification" Component={AdminNotification}/>
        <Route path="/user" Component={AdminUser}/>
        <Route path="/group" Component={AdminGroup}/>
        <Route path="/project" Component={AdminProject}/>
        <Route path="/help" Component={AdminHelp}/>
      </Route>
    </Routes>
  );
};

export default AdminRouter;
