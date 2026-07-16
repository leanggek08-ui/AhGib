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
  /* ===== Hero ===== */

  hero: {
    ...fullBleed,
    background:
      "linear-gradient(140deg, #0f0230 0%, #5313C0 50%, #9783C2 100%)",
    padding: "72px 32px 64px",
    position: "relative",
    overflow: "hidden",
  },

  heroBlob1: {
    position: "absolute",
    width: "480px",
    height: "480px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,.08) 0%, transparent 70%)",
    top: "-180px",
    right: "-100px",
    pointerEvents: "none",
  },

  heroBlob2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(151,131,194,0.2)",
    bottom: "-140px",
    left: "-60px",
    filter: "blur(40px)",
    pointerEvents: "none",
  },

  heroInner: {
    maxWidth: "1180px",
    margin: "0 auto",
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "56px",
    alignItems: "center",
  },

  eyebrowPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,.12)",
    border: "1px solid rgba(255,255,255,.2)",
    marginBottom: "22px",
  },

  eyebrowText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,.9)",
  },

  greeting: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "42px",
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: "1.1",
    marginBottom: "18px",
    letterSpacing: "-0.02em",
  },

  greetingAccent: {
    background: "linear-gradient(90deg, #C4B5FD, #E0D7FF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  subtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "rgba(255,255,255,.65)",
    fontSize: "15.5px",
    lineHeight: "1.7",
    maxWidth: "440px",
    marginBottom: "30px",
  },

  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "18px",
    marginBottom: "40px",
  },

  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 26px",
    borderRadius: "14px",
    border: "none",
    background: "#FFFFFF",
    color: colors.primary,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "800",
    fontSize: "14px",
    textDecoration: "none",
    cursor: "pointer",
  },

  ghostLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "rgba(255,255,255,.7)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "600",
    fontSize: "14px",
    textDecoration: "none",
  },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, auto)",
    gap: "30px",
    paddingTop: "28px",
    borderTop: "1px solid rgba(255,255,255,.12)",
  },

  statValue: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "22px",
    fontWeight: "900",
    color: "#FFFFFF",
  },

  statLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11.5px",
    color: "rgba(255,255,255,.5)",
    marginTop: "2px",
  },

  /* ===== Glass preview cards (hero right column) ===== */

  glassCol: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  glassCard: {
    borderRadius: "18px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.08)",
    backdropFilter: "blur(14px)",
  },

  glassCardHeadRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
  },

  glassIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
    flexShrink: 0,
  },

  glassTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "13.5px",
    color: "#FFFFFF",
  },

  glassSubtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11.5px",
    color: "rgba(255,255,255,.5)",
  },

  glassPercentWrap: {
    marginLeft: "auto",
    textAlign: "right",
  },

  glassPercentValue: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "22px",
    fontWeight: "900",
    color: "#FFFFFF",
  },

  glassPercentLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    color: "rgba(255,255,255,.4)",
  },

  matchRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },

  matchLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    color: "rgba(255,255,255,.7)",
    width: "120px",
    flexShrink: 0,
  },

  matchTrack: {
    flex: 1,
    height: "6px",
    borderRadius: "999px",
    background: "rgba(255,255,255,.15)",
    overflow: "hidden",
  },

  matchFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    borderRadius: "999px",
    background: `linear-gradient(90deg, ${colors.accent}, #FFFFFF)`,
  }),

  matchPct: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    fontWeight: "800",
    color: "#FFFFFF",
    width: "32px",
    textAlign: "right",
    flexShrink: 0,
  },

  glassTwoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },

  glassSmallLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    color: "rgba(255,255,255,.5)",
    marginBottom: "4px",
  },

  glassSmallTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    fontWeight: "700",
    color: "#FFFFFF",
  },

  glassSmallMeta: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    color: "rgba(255,255,255,.4)",
    marginBottom: "8px",
  },

  matchPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "3px 10px",
    borderRadius: "999px",
    background: "rgba(16,185,129,.18)",
    border: "1px solid rgba(16,185,129,.3)",
  },

  matchPillDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#34D399",
  },

  matchPillText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6EE7B7",
  },

  typingRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  typingDots: {
    marginLeft: "auto",
    display: "flex",
    gap: "4px",
  },

  typingDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "rgba(255,255,255,.4)",
  },

  /* ===== Section shells ===== */

  section: {
    padding: "72px 0",
  },

  sectionTight: {
    padding: "60px 0",
  },

  sectionHead: {
    textAlign: "center",
    maxWidth: "620px",
    margin: "0 auto 48px",
  },

  sectionLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 16px",
    borderRadius: "999px",
    background: "#EDE8F8",
    color: colors.primary,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "18px",
  },

  sectionTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "30px",
    fontWeight: "900",
    color: "#1F2937",
    lineHeight: "1.25",
    marginBottom: "14px",
    letterSpacing: "-0.01em",
  },

  sectionTitleAccent: {
    color: colors.primary,
  },

  sectionSubtitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#6B7280",
    fontSize: "14.5px",
    lineHeight: "1.7",
  },

  /* ===== Benefits grid ===== */

  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "18px",
  },

  benefitCard: {
    padding: "26px",
    borderRadius: "18px",
    border: "1px solid #F1F3F5",
    background: "#FFFFFF",
    transition: "all .2s ease",
  },

  benefitIconWrap: (bg) => ({
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    marginBottom: "16px",
  }),

  benefitTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "15px",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "8px",
  },

  benefitDesc: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12.5px",
    color: "#6B7280",
    lineHeight: "1.6",
  },

  /* ===== How it works ===== */

  stepsWrap: {
    ...fullBleed,
    background: "linear-gradient(180deg, #F4F2FA 0%, #EDE8F8 100%)",
    padding: "72px 32px",
  },

  stepsInner: {
    maxWidth: "1180px",
    margin: "0 auto",
  },

  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "18px",
  },

  stepCard: {
    position: "relative",
    background: "#FFFFFF",
    borderRadius: "18px",
    padding: "26px",
    border: `1px solid rgba(83,19,192,.1)`,
  },

  stepNum: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "38px",
    fontWeight: "900",
    color: "rgba(83,19,192,.14)",
    lineHeight: "1",
    display: "block",
    marginBottom: "10px",
  },

  stepTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "14.5px",
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: "8px",
  },

  stepDesc: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12.5px",
    color: "#6B7280",
    lineHeight: "1.6",
  },

  /* ===== Testimonials ===== */

  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },

  testimonialCard: {
    background: "#FAFAFC",
    borderRadius: "18px",
    padding: "24px",
    border: "1px solid #F1F3F5",
  },

  starsRow: {
    display: "flex",
    gap: "2px",
    marginBottom: "14px",
    color: "#F59E0B",
    fontSize: "13px",
  },

  testimonialText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13.5px",
    color: "#374151",
    lineHeight: "1.7",
    marginBottom: "18px",
  },

  testimonialFooter: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatarCircle: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: colors.light,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Sora', sans-serif",
    fontWeight: "700",
    fontSize: "13px",
    color: colors.primary,
    flexShrink: 0,
  },

  testimonialName: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: "700",
    fontSize: "13px",
    color: "#1F2937",
  },

  testimonialRole: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "11.5px",
    color: "#9CA3AF",
  },

  /* ===== CTA banner ===== */

  ctaWrap: {
    ...fullBleed,
    background: "linear-gradient(135deg, #0f0230 0%, #5313C0 55%, #7c3aed 100%)",
    padding: "72px 32px",
    textAlign: "center",
  },

  ctaTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: "28px",
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: "14px",
    letterSpacing: "-0.01em",
  },

  ctaText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "rgba(255,255,255,.65)",
    fontSize: "14.5px",
    marginBottom: "30px",
    maxWidth: "460px",
    margin: "0 auto 30px",
  },

  ctaActions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "18px",
  },
};
