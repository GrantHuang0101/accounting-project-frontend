import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Home
      <Link to="/login" className="bg-blue-500 text-white p-4">
        Login
      </Link>
    </div>
  );
};

export default Home;
