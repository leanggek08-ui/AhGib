import { colors } from "./colors";

export const styles = {
  header: {
    marginBottom: "28px",
  },

  eyebrowPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 18px",
    borderRadius: "999px",
    background: "#EDE8F8",
    marginBottom: "22px",
  },

  eyebrowText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: colors.primary,
  },

  pageTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "38px",
    fontWeight: "900",
    color: "#111827",
    lineHeight: "1.2",
    letterSpacing: "-0.01em",
    marginBottom: "0",
  },

  pageTitleAccent: {
    color: colors.primary,
    display: "block",
  },

  subtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#6B7280",
    fontSize: "15px",
    marginTop: "10px",
  },

  /* ===== Mode toggle (University Search / AI Career Assessment) ===== */

  toggleWrap: {
    display: "inline-flex",
    gap: "4px",
    background: "#FFFFFF",
    border: "1px solid #F1F3F5",
    borderRadius: "999px",
    padding: "6px",
    boxShadow: "0 4px 16px rgba(83,19,192,.06)",
    margin: "26px 0 28px",
  },

  toggleBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 22px",
    borderRadius: "999px",
    border: "none",
    background: "transparent",
    color: "#4B5563",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all .15s ease",
  },

  toggleBtnActive: {
    background: colors.primary,
    color: "#FFFFFF",
    boxShadow: "0 8px 18px rgba(83,19,192,.3)",
  },

  /* ===== Search hero (purple gradient box) ===== */

  searchHero: {
    background: `linear-gradient(120deg, ${colors.primary} 0%, ${colors.blend} 55%, ${colors.accent} 100%)`,
    borderRadius: "26px",
    padding: "36px 40px",
    marginBottom: "24px",
  },

  searchHeroTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "24px",
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: "6px",
  },

  searchHeroSubtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "rgba(255,255,255,.8)",
    fontSize: "14.5px",
    marginBottom: "22px",
  },

  searchInputWrap: {
    position: "relative",
  },

  searchIcon: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9CA3AF",
    fontSize: "17px",
  },

  searchInput: {
    width: "100%",
    padding: "17px 18px 17px 50px",
    borderRadius: "16px",
    border: "none",
    fontSize: "15px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    background: "#FFFFFF",
    color: "#111827",
    colorScheme: "light",
  },

  /* ===== Filter chips ===== */

  filterRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },

  filterIcon: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginRight: "-2px",
  },

  filterLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13.5px",
    fontWeight: "700",
    color: "#4B5563",
  },

  filterDivider: {
    width: "1px",
    height: "20px",
    background: "#E5E7EB",
    margin: "0 4px",
  },

  chip: {
    padding: "8px 18px",
    borderRadius: "999px",
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
    color: "#4B5563",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13.5px",
    fontWeight: "700",
    cursor: "pointer",
  },

  chipActiveSolid: {
    background: colors.primary,
    border: `1px solid ${colors.primary}`,
    color: "#FFFFFF",
  },

  chipActiveSoft: {
    background: "#EDE8F8",
    border: `1px solid ${colors.accent}`,
    color: colors.primary,
  },

  chipToggle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: `1px solid ${colors.accent}`,
    background: "transparent",
    color: colors.primary,
    fontSize: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  countBadge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13.5px",
    color: "#6B7280",
    marginBottom: "18px",
    display: "block",
  },

  countNum: {
    fontWeight: "800",
    color: colors.primary,
  },

  /* ===== Grid / cards ===== */

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "#FFFFFF",
    border: "1px solid #F1F3F5",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 4px 16px rgba(83,19,192,.05)",
    transition: "all .18s ease",
  },

  cardMedia: {
    height: "130px",
    margin: "-20px -20px 18px",
    borderRadius: "18px 18px 0 0",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  cardLogo: {
    width: "86px",
    height: "86px",
    objectFit: "contain",
    boxSizing: "border-box",
    padding: "12px",
    borderRadius: "16px",
    background: "rgba(255,255,255,.96)",
    boxShadow: "0 10px 24px rgba(15,2,48,.2)",
  },

  cardMediaFallback: {
    fontSize: "38px",
  },

  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "10px",
  },

  cardIcon: {
    fontSize: "22px",
  },

  cardName: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },

  cardMeta: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    color: "#6B7280",
    marginBottom: "10px",
  },

  cardDivider: {
    height: "1px",
    background: "#F1F3F5",
    margin: "12px 0",
  },

  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  tag: {
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#F1EFFA",
    color: colors.primary,
    fontSize: "12px",
    fontWeight: "600",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  emptyState: {
    textAlign: "center",
    padding: "48px 20px",
    color: "#9CA3AF",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  emptyIcon: {
    fontSize: "36px",
    marginBottom: "10px",
  },

  skeletonCard: {
    height: "160px",
    borderRadius: "18px",
    background:
      "linear-gradient(90deg, #F3F4F6 25%, #EDE8F8 50%, #F3F4F6 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  },

  /* ===== AI Career Assessment ===== */

  assessmentCard: {
    background: "#FFFFFF",
    border: "1px solid #F1F3F5",
    borderRadius: "24px",
    padding: "36px",
    boxShadow: "0 8px 24px rgba(83,19,192,.06)",
    maxWidth: "680px",
    margin: "0 auto",
  },

  assessmentIntroIcon: {
    fontSize: "40px",
    marginBottom: "14px",
  },

  assessmentTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "22px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "8px",
  },

  assessmentText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#6B7280",
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "24px",
  },

  startBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "14px",
    border: "none",
    background: colors.primary,
    color: "#FFFFFF",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },

  progressBarTrack: {
    width: "100%",
    height: "8px",
    borderRadius: "999px",
    background: "#F1EFFA",
    marginBottom: "24px",
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    background: colors.primary,
    borderRadius: "999px",
    transition: "width .25s ease",
  },

  progressLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    fontWeight: "700",
    color: colors.primary,
    marginBottom: "8px",
    display: "block",
  },

  questionText: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "20px",
    lineHeight: "1.5",
  },

  optionList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "28px",
  },

  optionBtn: {
    textAlign: "left",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid #E5E7EB",
    background: "#FAFAFA",
    color: "#374151",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all .15s ease",
  },

  optionBtnActive: {
    background: "#EDE8F8",
    border: `1px solid ${colors.primary}`,
    color: colors.primary,
  },

  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subjectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginBottom: "28px",
  },

  subjectField: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  subjectLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "700",
    color: "#374151",
  },

  subjectInput: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    fontSize: "14px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    background: "#FFFFFF",
    color: "#111827",
    colorScheme: "light",
  },

  subjectInputError: {
    border: "1px solid #F87171",
  },

  subjectHint: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    color: "#9CA3AF",
  },

  navBtnSecondary: {
    padding: "12px 22px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
    color: "#374151",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },

  navBtnPrimary: {
    padding: "12px 26px",
    borderRadius: "12px",
    border: "none",
    background: colors.primary,
    color: "#FFFFFF",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },

  navBtnDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },

  reportSummary: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.7",
    background: "#F9F8FD",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "24px",
  },

  reportSectionTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "15px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "12px",
  },

  matchCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #F1F3F5",
    marginBottom: "10px",
  },

  matchName: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "14px",
    color: "#111827",
  },

  matchReason: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    color: "#6B7280",
  },

  matchPercent: {
    fontFamily: "'Sora', sans-serif",
    fontWeight: "800",
    fontSize: "15px",
    color: colors.primary,
  },

  retakeBtn: {
    marginTop: "24px",
    padding: "12px 24px",
    borderRadius: "12px",
    border: `1px solid ${colors.primary}`,
    background: "#FFFFFF",
    color: colors.primary,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
};
