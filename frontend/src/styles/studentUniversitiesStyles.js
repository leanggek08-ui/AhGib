import { colors } from "./colors";

export const styles = {
  header: {
    marginBottom: "24px",
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
    marginBottom: "10px",
  },

  eyebrowDash: {
    width: "16px",
    height: "2px",
    background: "#FFB648",
    borderRadius: "2px",
    display: "inline-block",
  },

  pageTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "6px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  subtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#6B7280",
    fontSize: "15px",
  },

  /* ===== Toolbar ===== */

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
    flexWrap: "wrap",
    gap: "12px",
  },

  searchWrap: {
    position: "relative",
    flex: "1",
    minWidth: "240px",
    maxWidth: "360px",
  },

  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "14px",
  },

  searchInput: {
    width: "100%",
    padding: "11px 14px 11px 38px",
    borderRadius: "12px",
    border: `1.5px solid ${colors.light}`,
    fontSize: "14px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none",
    background: colors.white,
    color: "#111827",
    colorScheme: "light",
    transition: "border-color .15s ease, box-shadow .15s ease",
  },

  countBadge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "700",
    color: colors.primary,
    background: "#F1EFFA",
    padding: "7px 16px",
    borderRadius: "100px",
    border: "1px solid #E6DFFA",
  },

  countNum: {
    fontFamily: "'IBM Plex Mono', monospace",
  },

  /* ===== Grid ===== */

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    position: "relative",
    background: colors.white,
    borderRadius: "18px",
    padding: "24px 22px 22px",
    border: "1px solid #F1F3F5",
    boxShadow: "0 4px 16px rgba(83,19,192,.05)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    overflow: "hidden",
    transition: "transform .18s ease, box-shadow .18s ease, border-color .18s ease",
    cursor: "default",
  },

  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${colors.primary}, ${colors.blend})`,
  },

  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
  },

  cardIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.blend})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flex: "none",
    boxShadow: "0 4px 10px rgba(83,19,192,.25)",
  },

  cardName: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: "1.35",
  },

  cardLocation: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    color: "#6B7280",
    fontWeight: "500",
    marginTop: "4px",
    lineHeight: "1.5",
  },

  cardDivider: {
    height: "1px",
    background: "#F1F3F5",
  },

  cardLink: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "700",
    color: colors.primary,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#F1EFFA",
    padding: "8px 16px",
    borderRadius: "100px",
    alignSelf: "flex-start",
    transition: "background .15s ease, transform .15s ease",
  },

  noWebsite: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    color: "#9CA3AF",
    fontStyle: "italic",
  },

  /* ===== Empty / loading ===== */

  emptyState: {
    textAlign: "center",
    padding: "70px 20px",
    color: "#9CA3AF",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: colors.white,
    borderRadius: "18px",
    border: `1px dashed ${colors.light}`,
  },

  emptyIcon: {
    fontSize: "38px",
    marginBottom: "12px",
  },

  skeletonCard: {
    background: "linear-gradient(90deg, #F3F4F6 25%, #ECEAF5 37%, #F3F4F6 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
    borderRadius: "18px",
    height: "140px",
  },
};