// adminCareerSkillsStyles.js — "toolkit" theme
// Careers own many skills, so instead of one flat row per skill this page
// groups them into a card per career, skills shown as tool chips underneath —
// closer to how a résumé or job posting actually presents a skill set.
//
// Each career gets one accent color from the palette below (deterministic,
// based on its name) and every chip inside that card shares it. Cards are
// colorful against each other; each card on its own stays clean and uniform.

export const ACCENTS = [
  { text: "#6733B9", bg: "#F1EAFB", ring: "#6733B933" }, // violet
  { text: "#0F6E56", bg: "#E6F5F1", ring: "#0F6E5633" }, // teal
  { text: "#B3261E", bg: "#FBEAEC", ring: "#B3261E33" }, // rose
  { text: "#2B6CB0", bg: "#E9F1FB", ring: "#2B6CB033" }, // blue
  { text: "#2F7D32", bg: "#EAF7E9", ring: "#2F7D3233" }, // green
  { text: "#A21CAF", bg: "#FBEAF6", ring: "#A21CAF33" }, // magenta
  { text: "#C2540B", bg: "#FDEEE4", ring: "#C2540B33" }, // orange
  { text: "#8A5B0A", bg: "#FDF1DD", ring: "#8A5B0A33" }, // gold
];

export function accentFor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return ACCENTS[hash % ACCENTS.length];
}

export const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },

  pageTitle: {
    fontFamily: "'Baloo 2', 'Plus Jakarta Sans', sans-serif",
    fontSize: "22px",
    fontWeight: "600",
    color: "#232620",
    marginBottom: "4px",
  },

  subtitle: {
    color: "#8A8576",
    fontSize: "13.5px",
  },

  addBtn: (hover) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    background: hover
      ? "#6733B9"
      : "linear-gradient(90deg, #5313C0, #6C1EB1, #6733B9)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "13.5px",
    cursor: "pointer",
    transition: "background 0.15s ease",
  }),

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    gap: "16px",
    flexWrap: "wrap",
  },

  searchWrap: {
    position: "relative",
    width: "320px",
  },

  searchIcon: {
    position: "absolute",
    left: "13px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#B0AA98",
    display: "flex",
  },

  searchInput: {
    width: "100%",
    padding: "10px 14px 10px 38px",
    borderRadius: "10px",
    border: "1px solid #EAE5D8",
    fontSize: "13.5px",
    outline: "none",
    background: "#FFFFFF",
    color: "#232620",
    caretColor: "#232620",
    boxSizing: "border-box",
  },

  countBadge: {
    fontSize: "12.5px",
    color: "#8A8576",
    fontWeight: "500",
  },

  /* ================= Toolkit grid ================= */

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },

  card: (accent, hovered) => ({
    background: "#FFFFFF",
    border: "1px solid #EAE5D8",
    borderTop: `3px solid ${accent.text}`,
    borderRadius: "14px",
    padding: "18px 18px 16px",
    transition: "box-shadow 0.15s ease, transform 0.15s ease",
    boxShadow: hovered ? `0 10px 24px -8px ${accent.ring}` : "0 1px 2px rgba(35,38,32,0.03)",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
  }),

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    marginBottom: "14px",
  },

  careerIcon: (accent) => ({
    width: "34px",
    height: "34px",
    borderRadius: "9px",
    background: accent.bg,
    color: accent.text,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }),

  careerName: {
    fontWeight: "600",
    color: "#232620",
    fontSize: "14.5px",
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  skillCount: (accent) => ({
    fontSize: "11px",
    fontWeight: "700",
    color: accent.text,
    background: accent.bg,
    padding: "3px 10px",
    borderRadius: "20px",
    flexShrink: 0,
  }),

  chipsRail: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  chip: (accent) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 7px 7px 12px",
    borderRadius: "8px",
    background: accent.bg,
    color: accent.text,
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: 1,
  }),

  chipDot: (accent) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: accent.text,
    flexShrink: 0,
  }),

  chipActions: {
    display: "flex",
    gap: "4px",
    marginLeft: "2px",
  },

  chipIconBtn: (accent, disabled) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "26px",
    height: "26px",
    borderRadius: "7px",
    border: "none",
    background: `${accent.text}1A`,
    color: accent.text,
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? "default" : "pointer",
  }),

  addChip: (accent) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "8px",
    background: "transparent",
    border: `1px dashed ${accent.text}55`,
    color: accent.text,
    fontSize: "12.5px",
    fontWeight: "600",
    cursor: "pointer",
  }),

  emptyState: {
    padding: "56px 20px",
    textAlign: "center",
    color: "#B0AA98",
    background: "#FFFFFF",
    border: "1px solid #EAE5D8",
    borderRadius: "16px",
  },

  emptyIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
    color: "#D9D3C3",
  },

  skeletonCard: {
    borderRadius: "16px",
    background: "#FFFFFF",
    border: "1px solid #EAE5D8",
    padding: "18px",
  },

  skeletonBar: (width) => ({
    height: "13px",
    width,
    background: "#F2EFE6",
    borderRadius: "6px",
  }),

  /* ================= Modal ================= */

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(35,38,32,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },

  modal: {
    background: "#FFFFFF",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid #EAE5D8",
    width: "440px",
    maxWidth: "90%",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  modalTitle: {
    fontFamily: "'Baloo 2', sans-serif",
    fontSize: "17px",
    fontWeight: "600",
    color: "#232620",
  },

  closeIcon: {
    cursor: "pointer",
    color: "#B0AA98",
    background: "none",
    border: "none",
    display: "flex",
    padding: "4px",
  },

  fieldGroup: {
    marginBottom: "16px",
  },

  label: {
    display: "block",
    fontSize: "12.5px",
    fontWeight: "600",
    color: "#8A8576",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "9px",
    border: "1px solid #EAE5D8",
    fontSize: "13.5px",
    outline: "none",
    color: "#232620",
    caretColor: "#232620",
    background: "#FFFFFF",
    boxSizing: "border-box",
  },

  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "9px",
    border: "1px solid #EAE5D8",
    fontSize: "13.5px",
    outline: "none",
    color: "#232620",
    background: "#FFFFFF",
    boxSizing: "border-box",
    cursor: "pointer",
  },

  errorText: {
    color: "#B3261E",
    fontSize: "12.5px",
    marginTop: "-8px",
    marginBottom: "14px",
  },

  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "6px",
  },

  cancelBtn: {
    padding: "10px 18px",
    borderRadius: "9px",
    border: "1px solid #EAE5D8",
    background: "#FFFFFF",
    color: "#8A8576",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
  },

  saveBtn: (hover, disabled) => ({
    padding: "10px 18px",
    borderRadius: "9px",
    border: "none",
    background: hover && !disabled
      ? "#6733B9"
      : "linear-gradient(90deg, #5313C0, #6C1EB1, #6733B9)",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: "13px",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.7 : 1,
    transition: "background 0.15s ease",
  }),
};