import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Questions from "../pages/admin/Questions";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";
import SuperAdminUsers from "../pages/admin/SuperAdminUsers";
import SuperAdminPanel from "../pages/admin/SuperAdminPanel";
import ActivityLogs from "../pages/admin/ActivityLogs";
import AboutUs from "../pages/about/AboutUs";
import AdminUniversities from "../pages/admin/AdminUniversities";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route  path="/about" element={<AboutUs />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={[1,2]}><Profile /></ProtectedRoute>}/>
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route  path="/about" element={<AboutUs />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
        <Route path="/admin/users" element={ <ProtectedRoute allowedRoles={[1,3]}> <Users /></ProtectedRoute> }/>
        <Route path="/admin/questions" element={ <ProtectedRoute allowedRoles={[1,3]}>  <Questions /></ProtectedRoute>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin/dashboard" element={ <ProtectedRoute allowedRoles={[1,3]}> <AdminDashboard /> </ProtectedRoute>}/>
        <Route path="/admin/super-users" element={<ProtectedRoute allowedRoles={[3]}><SuperAdminUsers /></ProtectedRoute>}/>
        <Route path="/admin/super" element={ <ProtectedRoute allowedRoles={[3]}><SuperAdminPanel /></ProtectedRoute>}/>
        <Route path="/admin/activity" element={<ProtectedRoute allowedRoles={[3]}> <ActivityLogs /></ProtectedRoute>}/>
        <Route path="/admin/universities" element={<AdminUniversities/>}/>


      </Routes>
    </BrowserRouter>
  );
}