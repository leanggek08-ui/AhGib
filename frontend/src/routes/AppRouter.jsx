import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
import AboutUs from "../pages/student/AboutUs";
import StudentAboutUs from "../pages/student/AboutUs";
import AdminUniversities from "../pages/admin/AdminUniversities";
import AdminMajors from "../pages/admin/AdminMajors";
import AdminCareers from "../pages/admin/AdminCareers";
import AdminUniversityMajors from "../pages/admin/AdminUniversityMajors";
import AdminCareerSkills from "../pages/admin/AdminCareerSkills";
import AdminMajorCareers from "../pages/admin/AdminMajorCareers";
import StudentDashboard from "../pages/student/StudentDashboard";
import Features from "../pages/student/Features";
import Search from "../pages/student/Search";

// React Router doesn't auto-scroll to a #hash on client-side navigation.
// This makes links like "/about#contact" actually land on that section.
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route  path="/about" element={<AboutUs />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={[1,2,3]}><Profile /></ProtectedRoute>}/>
        <Route path="/profile/edit" element={<ProtectedRoute allowedRoles={[1,2,3]}><EditProfile /></ProtectedRoute>} />
        <Route path="/admin/users" element={ <ProtectedRoute allowedRoles={[1,3]}> <Users /></ProtectedRoute> }/>
        <Route path="/admin/questions" element={ <ProtectedRoute allowedRoles={[1,3]}>  <Questions /></ProtectedRoute>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin/dashboard" element={ <ProtectedRoute allowedRoles={[1,3]}> <AdminDashboard /> </ProtectedRoute>}/>
        <Route path="/admin/super-users" element={<ProtectedRoute allowedRoles={[3]}><SuperAdminUsers /></ProtectedRoute>}/>
        <Route path="/admin/super" element={ <ProtectedRoute allowedRoles={[3]}><SuperAdminPanel /></ProtectedRoute>}/>
        <Route path="/admin/activity" element={<ProtectedRoute allowedRoles={[3]}> <ActivityLogs /></ProtectedRoute>}/>
        <Route path="/admin/universities" element={<ProtectedRoute allowedRoles={[1,3]}><AdminUniversities/></ProtectedRoute>}/>
        <Route path="/admin/majors" element={<ProtectedRoute allowedRoles={[1,3]}><AdminMajors/></ProtectedRoute>}/>
        <Route path="/admin/careers" element={<ProtectedRoute allowedRoles={[1,3]}><AdminCareers /></ProtectedRoute>}/>
        <Route path="/admin/university-majors" element={<ProtectedRoute allowedRoles={[1,3]}><AdminUniversityMajors/></ProtectedRoute>}/>
        <Route path="/admin/career-skills" element={<ProtectedRoute allowedRoles={[1,3]}><AdminCareerSkills /></ProtectedRoute>}/>
        <Route path="/admin/major-careers" element={<ProtectedRoute allowedRoles={[1,3]}><AdminMajorCareers/></ProtectedRoute>}/>
        <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={[2]}><StudentDashboard /></ProtectedRoute>}/>
        <Route path="/student/features" element={<ProtectedRoute allowedRoles={[2]}><Features /></ProtectedRoute>}/>
        <Route path="/student/search" element={<ProtectedRoute allowedRoles={[2]}><Search /></ProtectedRoute>}/>
        <Route path="/student/about" element={<ProtectedRoute allowedRoles={[2]}><StudentAboutUs /></ProtectedRoute>}/>
        {/* Old routes redirect so any existing bookmarks/links still work */}
        <Route path="/student/universities" element={<Navigate to="/student/features" replace />}/>
        <Route path="/student/careers" element={<Navigate to="/student/features" replace />}/>
        <Route path="/student/majors" element={<Navigate to="/student/features" replace />}/>

        {/* Anything else: show something instead of a silent blank page */}
        <Route path="*" element={<Navigate to="/unauthorized" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
