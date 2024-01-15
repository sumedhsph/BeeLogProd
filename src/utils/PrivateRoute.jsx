import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
function PrivateRoute() {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
