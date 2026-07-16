import { Link } from "react-router-dom";
import { styles } from "../../styles/studentLayoutStyles";

export default function StudentFooter() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={styles.footerTop}>
          {/* Brand */}
          <div>
            <div style={styles.footerBrandRow}>
              <div style={styles.footerBrandIcon}>✨</div>
              <span style={styles.footerLogo}>AhGib</span>
            </div>
            <p style={styles.footerTag}>
              AI-powered career assessment helping Cambodian high school
              students find their path.
            </p>
            {/* Decorative only — no linked social accounts exist yet */}
            <div style={styles.footerSocialRow}>
              <span style={styles.footerSocialIcon}>𝕏</span>
              <span style={styles.footerSocialIcon}>in</span>
              <span style={styles.footerSocialIcon}>◎</span>
              <span style={styles.footerSocialIcon}>▶</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <div style={styles.footerColTitle}>Platform</div>
            <div style={styles.footerColLinks}>
              <Link to="/student/dashboard" style={styles.footerLink}>Home</Link>
              <Link to="/student/about" style={styles.footerLink}>About Us</Link>
              <Link to="/student/features" style={styles.footerLink}>Features</Link>
              <Link to="/student/search" style={styles.footerLink}>Search</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <div style={styles.footerColTitle}>Resources</div>
            <div style={styles.footerColLinks}>
              <Link to="/student/features" style={styles.footerLink}>University Guide</Link>
              <Link to="/student/search" style={styles.footerLink}>Career Library</Link>
              <Link
                to="/student/features"
                state={{ mode: "assessment" }}
                style={styles.footerLink}
              >
                AI Assessment
              </Link>
              <Link
                to="/student/features"
                state={{ mode: "assessment" }}
                style={styles.footerLink}
              >
                Career Report
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={styles.footerColTitle}>Company</div>
            <div style={styles.footerColLinks}>
              <Link to="/student/about" style={styles.footerLink}>About AhGib</Link>
              <Link to="/student/about#contact" style={styles.footerLink}>Contact Us</Link>
              {/* No Privacy Policy / Terms page exists yet — shown but not
                  clickable, rather than linking to a route that 404s. */}
              <span style={styles.footerLinkDisabled}>Privacy Policy</span>
              <span style={styles.footerLinkDisabled}>Terms of Service</span>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <span>© 2026 AhGib — Cambodia Academy of Digital Technology</span>
          <span>Built with care for students in Cambodia 🇰🇭</span>
        </div>
      </div>
    </footer>
  );
}
