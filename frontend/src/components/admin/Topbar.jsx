import { styles } from "../../styles/adminLayoutStyles";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));
<<<<<<< HEAD
  const roleLabel =
    user?.role_id === 3 ? "Super Admin" : user?.role_id === 1 ? "Admin" : "Student";

  const titles = {
    "Super Admin": { title: "Super Admin Panel", subtitle: "Welcome back, manage your platform" },
    "Admin": { title: "Admin Management", subtitle: "Welcome back, manage your platform" },
    "Student": { title: "Student Dashboard", subtitle: "Welcome back, continue your career journey" },
  };
=======
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d

  return (
    <div style={styles.topbar}>
      <div>
<<<<<<< HEAD
        <h2 style={styles.title}>{titles[roleLabel].title}</h2>
        <div style={styles.subtitle}>{titles[roleLabel].subtitle}</div>
=======
        <h2 style={styles.title}>Admin Management</h2>
        <div style={styles.subtitle}>Welcome back, manage your platform</div>
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d
      </div>

      <div style={styles.userArea}>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user?.username || "Admin"}</div>
<<<<<<< HEAD
          <div style={styles.userRole}>{roleLabel}</div>
=======
          <div style={styles.userRole}>
            {user?.role_id === 3 ? "Super Admin" : user?.role_id === 1 ? "Admin" : "Student"}
          </div>
>>>>>>> c76542f1a13ebaf44334a4a51e26cf2124ea161d
        </div>

        <div style={styles.avatar}>
          {(user?.username || "A").charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}