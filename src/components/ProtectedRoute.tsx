import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const auth = useContext(AuthContext);

  // If there is no user, redirect to login
  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;