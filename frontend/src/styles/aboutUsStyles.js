import { colors } from "./colors";

// Breaks a section out to full viewport width even though StudentLayout
// nests page content inside a centered, max-width <wrap> container.
//
// NOTE: a plain `marginLeft/Right: calc(50% - 50vw)` does NOT work here —
// margin percentages resolve against the *containing block's* width (wrap's
// 1180px), not the viewport, so on wide screens it under-corrects and the
// section ends up shifted left with a gap on the right. This left/margin-vw
// combo works instead because `left: 50%` shifts by 50% of wrap's width
// (which equals wrap's offset from the viewport edge, since wrap is
// horizontally centered), while `margin: -50vw` (an absolute vw unit, not a
// percentage) pulls back by half the true viewport width — the two cancel
// out correctly regardless of nesting depth.
const fullBleed = {
  position: "relative",
  left: "50%",
  right: "50%",
  width: "100vw",
  marginLeft: "-50vw",
  marginRight: "-50vw",
};

export const styles = {
  container: {
    background: "#FFFFFF",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  /* ===== Shared section shell ===== */

  section: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "72px 32px",
  },

  sectionAlt: {
    ...fullBleed,
    background: "#FAFAFC",
  },

  sectionHead: {
    textAlign: "center",
    maxWidth: "640px",
    margin: "0 auto 44px",
  },

  badgePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 18px",
    borderRadius: "999px",
    background: "#EDE8F8",
    marginBottom: "24px",
  },

  badgeText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: colors.primary,
  },

  sectionTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "30px",
    fontWeight: "900",
    color: "#1F2937",
    lineHeight: "1.3",
    letterSpacing: "-0.01em",
  },

  sectionSubtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#6B7280",
    fontSize: "14.5px",
    lineHeight: "1.7",
    marginTop: "14px",
  },

  /* ===== Hero ===== */

  hero: {
    ...fullBleed,
    background: "linear-gradient(180deg, #F4F2FA 0%, #EDE8F8 100%)",
    padding: "80px 32px 64px",
    textAlign: "center",
  },

  heroInner: {
    maxWidth: "820px",
    margin: "0 auto",
  },

  heroTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "40px",
    fontWeight: "900",
    color: "#1F2937",
    lineHeight: "1.25",
    letterSpacing: "-0.01em",
    marginBottom: "20px",
  },

  heroTitleAccent: {
    color: colors.primary,
    display: "block",
  },

  heroSubtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#6B7280",
    fontSize: "15.5px",
    lineHeight: "1.8",
    maxWidth: "640px",
    margin: "0 auto",
  },

  backLink: {
    display: "inline-block",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "700",
    color: colors.primary,
    textDecoration: "none",
    marginBottom: "18px",
  },

  /* ===== Mission / Vision ===== */

  missionVisionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },

  missionCard: {
    background: "#FAFAFC",
    border: "1px solid #F1F3F5",
    borderRadius: "22px",
    padding: "34px",
  },

  visionCard: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.blend} 100%)`,
    borderRadius: "22px",
    padding: "34px",
  },

  cardIconWrap: (light) => ({
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: light ? "#EDE8F8" : "rgba(255,255,255,.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: "18px",
    color: light ? colors.primary : "#FFFFFF",
  }),

  cardTitle: (light) => ({
    fontFamily: "'Sora', sans-serif",
    fontSize: "19px",
    fontWeight: "800",
    color: light ? "#1F2937" : "#FFFFFF",
    marginBottom: "12px",
  }),

  cardText: (light) => ({
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "14px",
    lineHeight: "1.8",
    color: light ? "#6B7280" : "rgba(255,255,255,.85)",
  }),

  /* ===== Values / Feature grid ===== */

  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "18px",
  },

  valueCard: {
    background: "#FFFFFF",
    borderRadius: "18px",
    padding: "26px",
    border: "1px solid #F1F3F5",
  },

  valueIconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "#EDE8F8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    color: colors.primary,
    marginBottom: "16px",
  },

  valueTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "15px",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "8px",
  },

  valueText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12.5px",
    color: "#6B7280",
    lineHeight: "1.65",
  },

  /* ===== Who We Are / numbered text sections ===== */

  sectionNumber: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "13px",
    fontWeight: "800",
    color: colors.accent,
    letterSpacing: "0.1em",
    marginBottom: "10px",
  },

  sectionHeading: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "26px",
    fontWeight: "900",
    color: "#1F2937",
    marginBottom: "16px",
  },

  divider: {
    width: "48px",
    height: "3px",
    borderRadius: "2px",
    background: colors.primary,
    marginBottom: "20px",
  },

  sectionText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "14.5px",
    color: "#6B7280",
    lineHeight: "1.8",
    maxWidth: "760px",
  },

  /* ===== Features grid (existing product features) ===== */

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "18px",
    marginTop: "8px",
  },

  featureCard: {
    background: "#FAFAFC",
    borderRadius: "18px",
    padding: "26px",
    border: "1px solid #F1F3F5",
  },

  featureIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    marginBottom: "16px",
  },

  featureTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "15px",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "8px",
  },

  featureText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12.5px",
    color: "#6B7280",
    lineHeight: "1.65",
  },

  /* ===== Team grid ===== */

  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    marginTop: "8px",
    textAlign: "center",
  },

  teamCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  teamImageWrap: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "16px",
    border: "3px solid #F1EFFA",
  },

  teamImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  teamName: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "15.5px",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "2px",
  },

  teamRole: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12.5px",
    fontWeight: "700",
    color: colors.primary,
    marginBottom: "10px",
  },

  teamBio: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12.5px",
    color: "#6B7280",
    lineHeight: "1.6",
    marginBottom: "10px",
  },

  teamEmail: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11.5px",
    fontWeight: "600",
    color: colors.primary,
    textDecoration: "none",
    background: "#F1EFFA",
    padding: "6px 12px",
    borderRadius: "999px",
  },

  /* ===== Tech stack ===== */

  techContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "8px",
  },

  techBadge: (color) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 16px",
    borderRadius: "999px",
    border: `1px solid ${color}`,
    background: "#FFFFFF",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "700",
    color: "#374151",
  }),

  techDot: (color) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: color,
    display: "inline-block",
  }),

  ctaSection: {
  ...fullBleed,
  background: `linear-gradient(135deg, #1E0B3C 0%, ${colors.primary} 100%)`,
  padding: "72px 32px",
  textAlign: "center",
  marginBottom: "-40px",
},

ctaHeading: {
  fontFamily: "'Sora', sans-serif",
  fontSize: "30px",
  fontWeight: "900",
  color: "#FFFFFF",
  marginBottom: "12px",
},

ctaSubtitle: {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "15px",
  color: "rgba(255,255,255,.75)",
  marginBottom: "28px",
  maxWidth: "560px",
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: "1.7",
},

ctaActions: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "24px",
  flexWrap: "wrap",
},

ctaLink: {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "14.5px",
  fontWeight: "700",
  color: "#FFFFFF",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
},

ctaButton: {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "14px 28px",
  borderRadius: "12px",
  border: "1.5px solid rgba(255,255,255,.6)",
  color: "#FFFFFF",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "14.5px",
  fontWeight: "700",
  textDecoration: "none",
},

  /* ===== Footer ===== */

  footer: {
    background: "#1F2937",
    padding: "28px 32px",
  },

  footerInner: {
    maxWidth: "1180px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },

  footerBrand: {
    fontFamily: "'Sora', sans-serif",
    fontWeight: "800",
    color: "#FFFFFF",
    fontSize: "15px",
  },

  footerText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12.5px",
    color: "rgba(255,255,255,.5)",
  },
};
