export const styles = {
  container: {
    background: "#F8FAFC",
    minHeight: "100vh",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  /* ===== HERO ===== */
  hero: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
  },

  heroBg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.12) 0%, transparent 50%)",
  },

  heroShape1: {
    position: "absolute",
    top: "10%",
    left: "5%",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(99,102,241,0.08)",
    filter: "blur(60px)",
    animation: "float 6s ease-in-out infinite",
  },

  heroShape2: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "rgba(139,92,246,0.08)",
    filter: "blur(60px)",
    animation: "float 8s ease-in-out infinite",
    animationDelay: "2s",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.4) 100%)",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "0 24px",
    maxWidth: "720px",
  },

  heroBadge: {
    display: "inline-block",
    background: "rgba(99,102,241,0.15)",
    color: "#A5B4FC",
    fontSize: "13px",
    fontWeight: "600",
    padding: "8px 20px",
    borderRadius: "100px",
    marginBottom: "24px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    border: "1px solid rgba(99,102,241,0.2)",
  },

  heroTitle: {
    fontSize: "clamp(36px, 7vw, 64px)",
    fontWeight: "800",
    color: "#FFFFFF",
    margin: 0,
    marginBottom: "20px",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },

  heroTitleAccent: {
    background: "linear-gradient(135deg, #818CF8, #C084FC)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    fontSize: "clamp(16px, 2vw, 19px)",
    color: "#94A3B8",
    maxWidth: "540px",
    margin: "0 auto 36px",
    lineHeight: 1.7,
  },

  heroActions: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  heroBtnPrimary: {
    display: "inline-block",
    padding: "14px 32px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: "15px",
    textDecoration: "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
  },

  heroBtnSecondary: {
    display: "inline-block",
    padding: "14px 32px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.06)",
    color: "#E2E8F0",
    fontWeight: "600",
    fontSize: "15px",
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "background 0.2s ease",
  },

  /* ===== STATS BAR ===== */
  statsBar: {
    display: "flex",
    justifyContent: "center",
    gap: "48px",
    padding: "48px 24px",
    background: "#FFFFFF",
    borderBottom: "1px solid #F1F5F9",
    flexWrap: "wrap",
  },

  statItem: {
    textAlign: "center",
  },

  statValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: "4px",
    letterSpacing: "-0.02em",
  },

  statLabel: {
    fontSize: "13px",
    color: "#94A3B8",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  /* ===== GENERIC SECTION ===== */
  section: {
    padding: "80px 24px",
  },

  sectionAlt: {
    padding: "80px 24px",
    background: "#FFFFFF",
  },

  sectionInner: {
    maxWidth: "880px",
    margin: "0 auto",
  },

  sectionNumber: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#6366F1",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "12px",
  },

  sectionHeading: {
    fontSize: "clamp(24px, 4vw, 32px)",
    fontWeight: "800",
    color: "#0F172A",
    margin: 0,
    marginBottom: "12px",
    letterSpacing: "-0.02em",
  },

  divider: {
    width: "60px",
    height: "4px",
    borderRadius: "2px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    marginBottom: "24px",
  },

  sectionText: {
    fontSize: "16px",
    color: "#64748B",
    lineHeight: 1.8,
    maxWidth: "680px",
  },

  /* ===== MISSION ===== */
  missionWrap: {
    padding: "0 24px 80px",
  },

  missionCard: {
    maxWidth: "880px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
    borderRadius: "24px",
    padding: "56px 48px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  missionIcon: {
    fontSize: "48px",
    marginBottom: "20px",
  },

  missionHeading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#FFFFFF",
    margin: 0,
    marginBottom: "16px",
  },

  missionText: {
    fontSize: "16px",
    color: "#CBD5E1",
    lineHeight: 1.75,
    maxWidth: "600px",
    margin: "0 auto",
  },

  /* ===== FEATURES ===== */
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
  },

  featureCard: {
    background: "#FFFFFF",
    borderRadius: "20px",
    padding: "32px 24px",
    border: "1px solid #F1F5F9",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    textAlign: "center",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "default",
  },

  featureIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    fontSize: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },

  featureTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#0F172A",
    margin: 0,
    marginBottom: "10px",
  },

  featureText: {
    fontSize: "14px",
    color: "#64748B",
    lineHeight: 1.7,
    margin: 0,
  },

  /* ===== TEAM ===== */
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "28px",
    marginTop: "40px",
  },

  teamCard: {
    background: "#FFFFFF",
    borderRadius: "20px",
    padding: "32px 24px 28px",
    border: "1px solid #F1F5F9",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    textAlign: "center",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  teamImageWrap: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    margin: "0 auto 20px",
    padding: "4px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    boxShadow: "0 8px 32px rgba(99,102,241,0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  teamImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    border: "3px solid #FFFFFF",
  },

  teamName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0F172A",
    margin: 0,
    marginBottom: "4px",
  },

  teamRole: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#6366F1",
    marginBottom: "12px",
    letterSpacing: "0.02em",
  },

  teamBio: {
    fontSize: "14px",
    color: "#64748B",
    lineHeight: 1.65,
    margin: "0 0 16px",
  },

  teamEmail: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#6366F1",
    textDecoration: "none",
    fontWeight: "600",
    padding: "8px 16px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #EEF2FF, #E8F0FE)",
    border: "1px solid #C7D2FE",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },

  /* ===== TECH STACK ===== */
  techContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },

  techBadge: (color) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "100px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
  }),

  techDot: (color) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
  }),

  /* ===== CONTACT ===== */
  contactCard: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    borderRadius: "28px",
    padding: "56px 48px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  contactIconLarge: {
    fontSize: "44px",
    marginBottom: "16px",
  },

  contactHeading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#FFFFFF",
    margin: 0,
    marginBottom: "10px",
  },

  contactSubtitle: {
    fontSize: "15px",
    color: "#94A3B8",
    marginBottom: "40px",
  },

  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    maxWidth: "700px",
    margin: "0 auto",
  },

  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "left",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  contactItemIcon: {
    fontSize: "22px",
    flexShrink: 0,
    marginTop: "2px",
  },

  contactLabel: {
    fontSize: "11px",
    color: "#64748B",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "6px",
  },

  contactValue: {
    fontSize: "13px",
    color: "#E2E8F0",
    fontWeight: "500",
    lineHeight: 1.5,
  },

  contactLink: {
    color: "#A5B4FC",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "500",
    transition: "color 0.2s",
  },

  /* ===== FOOTER ===== */
  footer: {
    borderTop: "1px solid #F1F5F9",
    background: "#FFFFFF",
  },

  footerInner: {
    maxWidth: "880px",
    margin: "0 auto",
    padding: "32px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },

  footerBrand: {
    fontSize: "18px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  footerText: {
    fontSize: "13px",
    color: "#94A3B8",
  },
};
