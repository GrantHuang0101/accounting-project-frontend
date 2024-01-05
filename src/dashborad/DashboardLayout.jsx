import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  return (
    <div className="">
      {/* Sidebar */}
      <Link to="/logout" className="bg-red-400 px-8 py-2 text-white rounded">
        Logout
      </Link>
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
