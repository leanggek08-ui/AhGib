import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { styles } from "../../styles/studentLayoutStyles";

export default function StudentHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    ...styles.navLink,
    ...(isActive ? styles.navLinkActive : {}),
  });

  return (
    <header style={styles.header}>
      <style>{`
        @media (max-width: 860px) {
          .student-nav-list { display: none; }
          .student-user-name { display: none; }
          .student-burger { display: flex !important; }
        }
      `}</style>

      <nav style={styles.nav}>
        <Link to="/student/dashboard" style={styles.logo}>AhGib</Link>

        <ul
          className="student-nav-list"
          style={{ ...styles.navList, ...(menuOpen ? styles.navListOpen : {}) }}
        >
          <li><NavLink to="/student/dashboard" style={linkStyle} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/student/universities" style={linkStyle} onClick={() => setMenuOpen(false)}>University</NavLink></li>
          <li><NavLink to="/student/careers" style={linkStyle} onClick={() => setMenuOpen(false)}>Career</NavLink></li>
          <li><NavLink to="/student/majors" style={linkStyle} onClick={() => setMenuOpen(false)}>Major</NavLink></li>
          <li><Link to="/student/about#contact" style={styles.navLink} onClick={() => setMenuOpen(false)}>Chat with us</Link></li>
        </ul>

        <div style={styles.userArea}>
          <div style={styles.avatar}>{(user?.username || "S").charAt(0).toUpperCase()}</div>
          <span className="student-user-name" style={styles.userName}>{user?.username || "Student"}</span>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>

        <button
          className="student-burger"
          style={styles.burger}
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={styles.burgerBar} />
          <span style={styles.burgerBar} />
          <span style={styles.burgerBar} />
        </button>
      </nav>
    </header>
  );
}
