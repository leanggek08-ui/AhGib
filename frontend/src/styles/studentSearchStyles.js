import { colors } from "./colors";

const fullBleed = {
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
};

export const styles = {
  hero: {
    ...fullBleed,
    background:
      "linear-gradient(140deg, #0f0230 0%, #5313C0 55%, #9783C2 100%)",
    padding: "70px 32px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  heroBlob: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(255,255,255,.05)",
    top: "-100px",
    right: "-60px",
    filter: "blur(40px)",
    pointerEvents: "none",
  },

  heroInner: {
    maxWidth: "760px",
    margin: "0 auto",
    position: "relative",
  },

  heroTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "36px",
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: "8px",
    letterSpacing: "-0.01em",
  },

  heroSubtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "rgba(255,255,255,.65)",
    fontSize: "14px",
    marginBottom: "28px",
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
    fontSize: "14.5px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(0,0,0,.25)",
  },

  body: {
    padding: "36px 0",
  },

  tabWrap: {
    display: "inline-flex",
    flexWrap: "wrap",
    gap: "6px",
    background: "#FFFFFF",
    borderRadius: "16px",
    padding: "8px",
    border: "1px solid #F1F3F5",
    boxShadow: "0 2px 10px rgba(0,0,0,.04)",
    marginBottom: "28px",
  },

  tabBtn: {
    padding: "11px 22px",
    borderRadius: "12px",
    border: "none",
    background: "transparent",
    color: "#6B7280",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "12.5px",
    textTransform: "capitalize",
    cursor: "pointer",
  },

  tabBtnActive: {
    background: colors.primary,
    color: "#FFFFFF",
    boxShadow: "0 8px 18px rgba(83,19,192,.25)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "18px",
  },

  gridTwoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "16px",
  },

  card: {
    background: "#FFFFFF",
    borderRadius: "18px",
    padding: "20px",
    border: "1px solid #F1F3F5",
    transition: "all .18s ease",
  },

  cardTopRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "12px",
  },

  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "#F1EFFA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },

  cardTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "14.5px",
    fontWeight: "800",
    color: "#111827",
  },

  cardMeta: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    color: "#9CA3AF",
    marginTop: "2px",
  },

  badge: (variant) => ({
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 12px",
    borderRadius: "999px",
    marginLeft: "auto",
    flexShrink: 0,
    background: variant === "Public" ? "#DBEAFE" : "#EDE8F8",
    color: variant === "Public" ? "#2563EB" : colors.primary,
  }),

  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  tag: {
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#F3F4F6",
    color: "#6B7280",
    fontSize: "11.5px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    marginTop: "6px",
  },

  statBox: {
    background: "#FAFAFC",
    borderRadius: "12px",
    padding: "10px 6px",
    textAlign: "center",
  },

  statLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "10.5px",
    color: "#9CA3AF",
    marginBottom: "2px",
  },

  statValue: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "13px",
    fontWeight: "800",
    color: "#111827",
  },

  careerCard: {
    background: "#FFFFFF",
    borderRadius: "18px",
    padding: "18px 20px",
    border: "1px solid #F1F3F5",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  careerIcon: {
    fontSize: "28px",
    flexShrink: 0,
  },

  careerBody: {
    flex: 1,
    minWidth: 0,
  },

  careerTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "14px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "3px",
  },

  careerDesc: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    color: "#9CA3AF",
    lineHeight: "1.5",
  },

  careerCountPill: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    color: colors.primary,
    background: "#F1EFFA",
    padding: "6px 12px",
    borderRadius: "10px",
    flexShrink: 0,
    whiteSpace: "nowrap",
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
};
