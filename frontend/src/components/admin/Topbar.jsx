import { styles } from "../../styles/adminLayoutStyles";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const roleLabel =
    user?.role_id === 3 ? "Super Admin" : user?.role_id === 1 ? "Admin" : "Student";

  const titles = {
    "Super Admin": { title: "Super Admin Panel", subtitle: "Welcome back, manage your platform" },
    "Admin": { title: "Admin Management", subtitle: "Welcome back, manage your platform" },
    "Student": { title: "Student Dashboard", subtitle: "Welcome back, continue your career journey" },
  };

  return (
    <div style={styles.topbar}>
      <div>
        <h2 style={styles.title}>{titles[roleLabel].title}</h2>
        <div style={styles.subtitle}>{titles[roleLabel].subtitle}</div>
      </div>

      <div style={styles.userArea}>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user?.username || "Admin"}</div>
          <div style={styles.userRole}>{roleLabel}</div>
        </div>

        <div style={styles.avatar}>
          {(user?.username || "A").charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}