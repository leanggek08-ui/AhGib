import { styles } from "../../styles/adminLayoutStyles";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.topbar}>
      <div>
        <h2 style={styles.title}>Admin Management</h2>
        <div style={styles.subtitle}>Welcome back, manage your platform</div>
      </div>

      <div style={styles.userArea}>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user?.username || "Admin"}</div>
          <div style={styles.userRole}>
            {user?.role_id === 1 ? "Super Admin" : "Admin"}
          </div>
        </div>

        <div style={styles.avatar}>
          {(user?.username || "A").charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}