import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user")); 
  const role_id = user?.role_id;

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role not allowed
  if (!allowedRoles.includes(role_id)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}