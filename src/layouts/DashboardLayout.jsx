import React from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/sidebars/Sidebar";

const DashBoardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow overflow-y-auto p-4 pl-80">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
