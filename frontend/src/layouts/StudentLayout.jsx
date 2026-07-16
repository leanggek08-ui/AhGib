import StudentHeader from "../components/student/StudentHeader";
import StudentFooter from "../components/student/StudentFooter";
import { styles } from "../styles/studentLayoutStyles";

export default function StudentLayout({ children }) {
  return (
    <div style={styles.page}>
      <StudentHeader />
      <main style={styles.main}>
        <div style={styles.wrap}>
          {children}
        </div>
      </main>
      <StudentFooter />
    </div>
  );
}
