import { colors } from "./colors";

export const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "80px 20px",
    background: colors.white,
    borderRadius: "24px",
    border: "1px solid #F1F3F5",
    boxShadow: "0 14px 34px -16px rgba(83,19,192,.15)",
  },

  icon: {
    width: "72px",
    height: "72px",
    borderRadius: "20px",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.blend})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    marginBottom: "22px",
    boxShadow: "0 10px 24px rgba(83,19,192,.28)",
  },

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.primary,
    marginBottom: "14px",
  },

  eyebrowDash: {
    width: "16px",
    height: "2px",
    background: "#FFB648",
    borderRadius: "2px",
    display: "inline-block",
  },

  title: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "26px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "12px",
  },

  text: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "14.5px",
    color: "#6B7280",
    maxWidth: "440px",
    lineHeight: "1.7",
    marginBottom: "26px",
  },

  badge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    color: colors.primary,
    background: "#F1EFFA",
    padding: "6px 16px",
    borderRadius: "100px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: "26px",
  },

  homeLink: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13.5px",
    fontWeight: "700",
    color: colors.white,
    background: colors.primary,
    padding: "12px 24px",
    borderRadius: "100px",
    textDecoration: "none",
  },
};
