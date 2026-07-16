import { NavLink, useNavigate } from "react-router-dom";
import { styles } from "../../styles/adminLayoutStyles";

export default function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role_id;
  const isAdmin = role === 1;
  const isSuperAdmin = role === 3;
<<<<<<< HEAD
  const panelLabel = isSuperAdmin ? "Super Admin Panel" : isAdmin ? "Admin Panel" : "Student Panel";
=======
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuStyle = ({ isActive }) => ({
    ...styles.menuItem,
    ...(isActive ? styles.activeMenu : {}),
  });

  return (
    <div style={styles.sidebar}>
      {/* Top */}
      <div>
        <div style={styles.logo}>AhGib</div>
<<<<<<< HEAD
        <div style={styles.logoSub}>{panelLabel}</div>

        <div style={styles.menu}>
          <NavLink to={isAdmin || isSuperAdmin ? "/admin/dashboard" : "/student/dashboard"} style={menuStyle}>
=======
        <div style={styles.logoSub}>Admin Panel</div>

        <div style={styles.menu}>
          <NavLink to="/admin/dashboard" style={menuStyle}>
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d
          📊 Dashboard
        </NavLink>

        {(isAdmin || isSuperAdmin) && (
          <>
            <NavLink to="/admin/users" style={menuStyle}>
              👤 Users
            </NavLink>

            <NavLink to="/admin/questions" style={menuStyle}>
              ❓ Questions
            </NavLink>

            <NavLink to="/admin/universities" style={menuStyle}>
<<<<<<< HEAD
            🎓 Manage Universities
            </NavLink>
            <NavLink to="/admin/majors" style={menuStyle}>
          📚 Majors
          </NavLink>
      
          <NavLink to="/admin/careers" style={menuStyle}>
        💼 Careers
          </NavLink>

          <NavLink to="/admin/university-majors"style={menuStyle}>
            🎓 University Majors
          </NavLink>

          <NavLink to="/admin/career-skills" style={menuStyle}> 
          🛠 Career Skills
          </NavLink>
           <NavLink to="/admin/major-careers" style={menuStyle}> 
          🔑 University Major
          </NavLink>



=======
            🎓 Universities
            </NavLink>
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d
          </>
        )}
      {isSuperAdmin && (
        <>
            <NavLink to="/admin/super" style={menuStyle}>
                🛡️ Super Admin
            </NavLink>
            <NavLink to="/admin/activity" style={menuStyle}>
                📜 Activity Logs
            </NavLink>
            
            {/** Is page SuperadminUser */}
            <NavLink to="/admin/super-users" style={menuStyle}>
              <span>🛡️</span> User Management 
            </NavLink> 
        </>
)}

      


        </div>

      </div>

      {/* Bottom */}
      <div style={styles.sidebarFooter}>
        <div style={styles.divider} />
        <button onClick={logout} style={styles.logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}