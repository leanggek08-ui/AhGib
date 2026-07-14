import { colors } from "./colors";

export const styles = {
  page: {
    minHeight: "100vh",
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
    flex: 1,
    background: "radial-gradient(1000px 500px at 92% -12%, #EFE9FA 0%, #F7F5FC 55%)",
  },

  wrap: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "40px 32px",
  },

  /* ================= Footer ================= */

  footer: {
    background: "#1B1030",
    color: "#D9D4EC",
    padding: "40px 0 24px",
  },

  footerInner: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 32px",
    textAlign: "center",
  },

  footerLogo: {
    fontFamily: "'Sora', sans-serif",
    fontWeight: "800",
    fontSize: "19px",
    color: colors.white,
    marginBottom: "10px",
  },

  footerTag: {
    fontSize: "13.5px",
    color: "#A79DC4",
    maxWidth: "420px",
    margin: "0 auto 20px",
    lineHeight: "1.6",
  },

  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "22px",
    flexWrap: "wrap",
    marginBottom: "22px",
  },

  footerLink: {
    fontSize: "13.5px",
    fontWeight: "600",
    color: "#CBC3E3",
    textDecoration: "none",
  },

  footerBottom: {
    fontSize: "12.5px",
    color: "#8C7FB5",
    borderTop: "1px solid rgba(255,255,255,.08)",
    paddingTop: "18px",
  },
};
