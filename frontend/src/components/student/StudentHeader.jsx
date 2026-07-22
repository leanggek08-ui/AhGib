import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { styles } from "../../styles/studentLayoutStyles";

export default function StudentHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <nav style={styles.nav}>
        <Link to="/student/dashboard" style={styles.logoRow}>
          <div style={styles.logoIcon}>✨</div>
          <span style={styles.logo}>AhGib</span>
        </Link>

        <ul
          className="student-nav-list"
          style={{ ...styles.navList, ...(menuOpen ? styles.navListOpen : {}) }}
        >
          <li><NavLink to="/student/dashboard" style={linkStyle} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/student/features" style={linkStyle} onClick={() => setMenuOpen(false)}>Features</NavLink></li>
          <li><NavLink to="/student/search" style={linkStyle} onClick={() => setMenuOpen(false)}>Search</NavLink></li>
          <li><NavLink to="/student/about" style={linkStyle} onClick={() => setMenuOpen(false)}>About Us</NavLink></li>
          <li><NavLink to="/student/contact" style={linkStyle} onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>

        <div style={styles.userArea}>
          <Link to="/profile" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit" }}>
            <div style={styles.avatar}>{(user?.username || "S").charAt(0).toUpperCase()}</div>
            <span className="student-user-name" style={styles.userName}>{user?.username || "Student"}</span>
          </Link>
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