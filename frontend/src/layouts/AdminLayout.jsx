import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { styles } from "../styles/adminLayoutStyles";

export default function AdminLayout({ children }) {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        <Topbar />

        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
  
}