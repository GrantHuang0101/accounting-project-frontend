import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-row justify-center mt-8 items-center">
      <div className="text-3xl">Home</div>
      <div>
        <Link
          to="/introduction"
          className="bg-purple-500 text-white p-5 ml-5 rounded-lg"
        >
          Get Started
        </Link>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-blue-500 text-white p-5 ml-5 rounded-lg"
        >
          Login
        </Link>
      </div>
      <div>
        <Link
          to="/register"
          className="bg-blue-500 text-white p-5 ml-5 rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
