import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Questions from "../pages/admin/Questions";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/questions" element={<Questions />} />

      </Routes>
    </BrowserRouter>
  );
}