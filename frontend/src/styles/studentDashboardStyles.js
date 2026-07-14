import { colors } from "./colors";

export const styles = {
  /* ===== Hero banner ===== */

  hero: {
    background: `linear-gradient(120deg, ${colors.primary} 0%, ${colors.blend} 100%)`,
    borderRadius: "24px",
    padding: "44px",
    marginBottom: "28px",
    position: "relative",
    overflow: "hidden",
  },

  heroBlob1: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,.18) 0%, transparent 70%)",
    top: "-120px",
    left: "-80px",
    pointerEvents: "none",
  },

  heroBlob2: {
    position: "absolute",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
    bottom: "-100px",
    right: "6%",
    opacity: 0.35,
    pointerEvents: "none",
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
    color: "rgba(255,255,255,.75)",
    marginBottom: "14px",
    position: "relative",
  },

  eyebrowDash: {
    width: "16px",
    height: "2px",
    background: "#FFB648",
    borderRadius: "2px",
    display: "inline-block",
  },

  greeting: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "30px",
    fontWeight: "800",
    color: colors.white,
    marginBottom: "10px",
    position: "relative",
  },

  subtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "rgba(255,255,255,.85)",
    fontSize: "15px",
    position: "relative",
  },

  /* ===== Quick action cards ===== */

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "28px",
  },

  card: {
    background: colors.white,
    borderRadius: "20px",
    padding: "26px",
    border: "1px solid #F1F3F5",
    boxShadow: "0 14px 34px -16px rgba(83,19,192,.22)",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "transform .18s ease, box-shadow .18s ease",
  },

  cardDisabled: {
    background: "#FAFAFC",
    borderRadius: "20px",
    padding: "26px",
    border: `1px dashed ${colors.light}`,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  cardIconWrap: (bg) => ({
    width: "50px",
    height: "50px",
    borderRadius: "15px",
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "23px",
  }),

  cardTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "16.5px",
    fontWeight: "700",
    color: "#111827",
  },

  cardText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13.5px",
    color: "#6B7280",
    lineHeight: "1.5",
  },

  cardBadge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    color: colors.primary,
    background: "#F1EFFA",
    padding: "4px 10px",
    borderRadius: "100px",
    alignSelf: "flex-start",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },

  /* ===== Info section ===== */

  infoSection: {
    background: "#F1EFFA",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    border: `1px solid ${colors.light}`,
  },

  infoIcon: {
    fontSize: "28px",
  },

  infoText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "14px",
    color: "#3E4256",
    lineHeight: "1.6",
  },
};