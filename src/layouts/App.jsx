import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* Navbar */}
      <div>
        <Outlet />
      </div>
      {/* Footer */}
    </>
  );
};

export default App;
