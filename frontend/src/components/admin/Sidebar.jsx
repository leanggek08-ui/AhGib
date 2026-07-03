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
        <div style={styles.logo}>
          AhGib Admin
        </div>

        <div style={styles.menu}>
          <NavLink to="/admin/dashboard" style={menuStyle}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/users" style={menuStyle}>
            👤 Users
          </NavLink>

          <NavLink to="/admin/questions" style={menuStyle}>
            ❓ Questions
          </NavLink>

          <NavLink to="/admin/universities" style={menuStyle}>
            🎓 Universities
          </NavLink>
        </div>
      </div>

      {/* Bottom */}
      <button
        onClick={logout}
        style={styles.logout}
      >
        Logout
      </button>
    </div>
  );
}