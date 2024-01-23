import React from "react";
import { Routes, Route } from "react-router-dom";

import LayoutAdmin from "../layouts/AdminLayout";

import Dashboard from "../pages/Admin/Dashboard";

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutAdmin />}>
        <Route path="/admin-dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
