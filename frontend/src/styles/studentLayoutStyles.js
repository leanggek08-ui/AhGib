import { colors } from "./colors";

export const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    background: "#F7F5FC",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  /* ================= Header ================= */

  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255,255,255,.9)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #EFEBFA",
  },

  nav: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 32px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
  },

  logo: {
    fontFamily: "'Sora', sans-serif",
    fontWeight: "800",
    fontSize: "20px",
    color: "#111827",
    textDecoration: "none",
    flex: "none",
  },

  navList: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: "center",
  },

  navListOpen: {
    display: "flex",
    position: "absolute",
    top: "72px",
    left: 0,
    right: 0,
    background: colors.white,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px 32px",
    boxShadow: "0 12px 24px -12px rgba(0,0,0,.15)",
    gap: "18px",
    zIndex: 60,
  },

  navLink: {
    fontSize: "14.5px",
    fontWeight: "600",
    color: "#4B5066",
    textDecoration: "none",
    padding: "6px 0",
  },

  navLinkActive: {
    color: colors.primary,
  },

  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: "none",
  },

  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.blend})`,
    color: colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "13px",
  },

  userName: {
    fontSize: "13.5px",
    fontWeight: "600",
    color: "#111827",
  },

  logoutBtn: {
    fontSize: "13px",
    fontWeight: "700",
    color: colors.primary,
    background: "#F1EFFA",
    border: "none",
    padding: "8px 14px",
    borderRadius: "100px",
    cursor: "pointer",
  },

  burger: {
    display: "none",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "24px",
    height: "18px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  burgerBar: {
    height: "2.5px",
    background: "#111827",
    borderRadius: "2px",
  },

  /* ================= Main content ================= */

main: {
  background: "radial-gradient(1000px 500px at 92% -12%, #EFE9FA 0%, #F7F5FC 55%)",
},

wrap: {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "40px 32px",
},

  /* ================= Footer ================= */

  footer: {
    background: "#0F0A1F",
    color: "#D9D4EC",
    padding: "56px 0 28px",
  },

  footerInner: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 32px",
  },

  footerTop: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
    gap: "32px",
    marginBottom: "44px",
  },

  footerBrandRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },

  footerBrandIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    flexShrink: 0,
  },

  footerLogo: {
    fontFamily: "'Sora', sans-serif",
    fontWeight: "800",
    fontSize: "19px",
    color: colors.white,
  },

  footerTag: {
    fontSize: "13.5px",
    color: "#8C82AC",
    maxWidth: "300px",
    lineHeight: "1.7",
    marginBottom: "20px",
  },

  footerSocialRow: {
    display: "flex",
    gap: "10px",
  },

  footerSocialIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "rgba(255,255,255,.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    color: "#8C82AC",
  },

  footerColTitle: {
    fontSize: "11.5px",
    fontWeight: "800",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#6E6390",
    marginBottom: "18px",
  },

  footerColLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
  },

  footerLink: {
    fontSize: "13.5px",
    fontWeight: "600",
    color: "#CBC3E3",
    textDecoration: "none",
  },

  footerLinkDisabled: {
    fontSize: "13.5px",
    fontWeight: "600",
    color: "#5A5178",
    cursor: "default",
  },

  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    fontSize: "12.5px",
    color: "#6E6390",
    borderTop: "1px solid rgba(255,255,255,.08)",
    paddingTop: "22px",
  },
};
