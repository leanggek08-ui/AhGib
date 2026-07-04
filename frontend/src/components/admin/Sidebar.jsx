import { NavLink, useNavigate } from "react-router-dom";
import { styles } from "../../styles/adminLayoutStyles";

export default function Sidebar() {
  const navigate = useNavigate();

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
            <span style={styles.menuIcon}>📊</span> Dashboard
          </NavLink>

          <NavLink to="/admin/users" style={menuStyle}>
            <span style={styles.menuIcon}>👤</span> Users
          </NavLink>

          <NavLink to="/admin/questions" style={menuStyle}>
            <span style={styles.menuIcon}>❓</span> Questions
          </NavLink>

          <NavLink to="/admin/universities" style={menuStyle}>
            <span style={styles.menuIcon}>🎓</span> Universities
          </NavLink>
        </div>
      </div>

      {/* Bottom */}
      <div style={styles.sidebarFooter}>
        <div style={styles.divider} />
        <button
          onClick={logout}
          style={styles.logout}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(220,38,38,.22)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(220,38,38,.12)";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}