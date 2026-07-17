import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
  }
  const role_id = user?.role_id;

  // not logged in
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // role not allowed
  if (!allowedRoles.includes(role_id)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
