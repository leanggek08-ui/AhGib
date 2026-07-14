import { Link } from "react-router-dom";
import { styles } from "../../styles/studentLayoutStyles";

export default function StudentFooter() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={styles.footerLogo}>AhGib</div>
        <p style={styles.footerTag}>
          AI-powered career assessment helping Cambodian high school students find their path.
        </p>
        <div style={styles.footerLinks}>
          <Link to="/student/dashboard" style={styles.footerLink}>Home</Link>
          <Link to="/universities" style={styles.footerLink}>University</Link>
          <Link to="/careers" style={styles.footerLink}>Career</Link>
          <Link to="/majors" style={styles.footerLink}>Major</Link>
          <Link to="/about#contact" style={styles.footerLink}>Chat with us</Link>
        </div>
        <div style={styles.footerBottom}>© 2026 AhGib. All rights reserved.</div>
      </div>
    </footer>
  );
}
