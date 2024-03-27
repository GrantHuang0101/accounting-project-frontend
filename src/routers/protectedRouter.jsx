import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { authToken, user } = useAuth();

  if (authToken && user) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
