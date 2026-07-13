import { NavLink, useNavigate } from "react-router-dom";
import { styles } from "../../styles/adminLayoutStyles";

export default function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role_id;
  const isAdmin = role === 1;
  const isSuperAdmin = role === 3;

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
        <div style={styles.logoSub}>Admin Panel</div>

        <div style={styles.menu}>
          <NavLink to="/admin/dashboard" style={menuStyle}>
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
            🎓 Universities
            </NavLink>
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