import { colors } from "./colors";
import { styles as baseStyles } from "./studentUniversitiesStyles";

export const styles = {
  ...baseStyles,

  pageTitle: {
    ...baseStyles.pageTitle,
  },

  cardIcon: {
    ...baseStyles.cardIcon,
  },

  fieldBadge: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "12px",
    fontWeight: "700",
    color: colors.primary,
    background: "#F1EFFA",
    padding: "4px 12px",
    borderRadius: "100px",
    display: "inline-block",
    marginTop: "6px",
    alignSelf: "flex-start",
  },

  uniList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  uniRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    padding: "8px 12px",
    background: "#FAF9FD",
    borderRadius: "10px",
    border: "1px solid #F1F3F5",
  },

  uniRowName: {
    color: "#374151",
    fontWeight: "600",
  },

  uniRowTuition: {
    fontFamily: "'IBM Plex Mono', monospace",
    color: colors.primary,
    fontWeight: "700",
    fontSize: "12px",
  },

  noUni: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "13px",
    color: "#9CA3AF",
    fontStyle: "italic",
  },
};