import { colors } from "./colors";

export const styles = {
  /* ================= BACKDROP ================= */
  backdrop: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at top, #2a1450 0%, #0f081f 60%)",
    padding: "24px",
  },

  /* ================= CARD ================= */
  card: {
    display: "flex",
    width: "100%",
    maxWidth: "980px",
    minHeight: "640px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 35px 90px rgba(0,0,0,0.55)",
    background: "#fff",
  },

  /* ================= LEFT SIDE ================= */
  leftPanel: {
    flex: "1",
    background: "#f8fafc",
    padding: "60px 50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  brand: {
    fontSize: "18px",
    fontWeight: 800,
    color: colors.primary,
    marginBottom: "14px",
    letterSpacing: "-0.5px",
  },

  leftTitle: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: "10px",
  },

  leftText: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.6",
    maxWidth: "320px",
  },

  /* ================= RIGHT SIDE ================= */
  rightPanel: {
    flex: "1",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 50px",
  },

  formWrap: {
    width: "100%",
    maxWidth: "360px",
  },

  title: {
    fontSize: "30px",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "6px",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "26px",
    lineHeight: "1.5",
  },

  /* ================= FORM ================= */
  label: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.8)",
    fontWeight: 600,
    marginBottom: "6px",
    display: "block",
    letterSpacing: "0.4px",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    marginBottom: "14px",
    transition: "all 0.2s ease",
  },

  inputFocus: {
    border: "1px solid #c4b5fd",
    boxShadow: "0 0 0 3px rgba(196,181,253,0.2)",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#0f172a",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  buttonHover: {
    transform: "translateY(-1px)",
    background: "#f1f5f9",
  },

  errorBox: {
    background: "rgba(255, 99, 99, 0.12)",
    border: "1px solid rgba(255, 99, 99, 0.25)",
    color: "#fecaca",
    padding: "10px 12px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "14px",
  },

  linkText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    textAlign: "center",
    marginTop: "16px",
  },

  link: {
    color: "#fff",
    fontWeight: 600,
    textDecoration: "underline",
  },
};