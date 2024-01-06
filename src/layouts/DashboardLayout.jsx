import React from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/sidebars/Sidebar";

const DashBoardLayout = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
