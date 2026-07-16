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
    padding: "0",
  },

  /* ================= CARD ================= */
  card: {
    display: "flex",
    width: "100%",
    maxWidth: "none",
    height: "100vh",
    minHeight: "100vh",
    borderRadius: "0",
    overflow: "hidden",
    boxShadow: "none",
    background: "#fff",
  },

  /* ================= LEFT SIDE ================= */
  leftPanel: {
    flex: "1",
    background: "#f8fafc",
    padding: "80px 64px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  brand: {
    fontSize: "22px",
    fontWeight: 800,
    color: colors.primary,
    marginBottom: "18px",
    letterSpacing: "-0.5px",
  },

  leftTitle: {
    fontSize: "38px",
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: "14px",
  },

  leftText: {
    fontSize: "16px",
    color: "#64748b",
    lineHeight: "1.7",
    maxWidth: "400px",
  },

  /* ================= RIGHT SIDE ================= */
  rightPanel: {
    flex: "1",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 64px",
  },

  formWrap: {
    width: "100%",
    maxWidth: "440px",
  },

  title: {
    fontSize: "38px",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "34px",
    lineHeight: "1.6",
  },

  /* ================= FORM ================= */
  label: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.8)",
    fontWeight: 600,
    marginBottom: "8px",
    display: "block",
    letterSpacing: "0.4px",
  },

  input: {
    width: "100%",
    padding: "17px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    marginBottom: "18px",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },

  inputFocus: {
    border: "1px solid #c4b5fd",
    boxShadow: "0 0 0 3px rgba(196,181,253,0.2)",
  },

  button: {
    width: "100%",
    padding: "17px",
    borderRadius: "14px",
    background: "#ffffff",
    color: "#0f172a",
    fontWeight: 700,
    fontSize: "16px",
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
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    marginBottom: "16px",
  },

  linkText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "20px",
  },

  link: {
    color: "#fff",
    fontWeight: 600,
    textDecoration: "underline",
  },
};