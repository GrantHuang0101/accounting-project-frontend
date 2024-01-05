import React, { useEffect } from "react";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout, authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      alert("No account login");
      navigate("/");
    }
  }, [authToken, navigate]);

  const handleLogout = () => {
    logout();
    alert("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="h-screen bg-teal-600 flex items-center justify-center">
      <button
        className="bg-red-700 px-8 py-2 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
