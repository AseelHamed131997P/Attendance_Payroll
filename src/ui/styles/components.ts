import { colors, font } from "ui/styles";
import transparentize from "polished/lib/color/transparentize";

export type HeadingKeys = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type String = string | string[];
type Number = number | number[];

export interface Components {
  headings: {
    [key in HeadingKeys]: {
      color: String;
      fontSize: String;
      letterSpacing: String;
      fontFamily: String;
      fontWeight: Number;
      lineHeight: Number;
    };
  };
  cards: {
    backgroundColor: String;
    boxShadow: String;
    borderRadius: String;
    header: {
      color: String;
    };
  } & {
    [key in "small" | "medium" | "large"]: {
      padding: String;
    };
  };
  modal: {
    padding: String;
  };
}

const components: Components = {
  headings: {
    h1: {
      color: colors.primary,
      fontSize: ["1.875rem", "2.625rem", "3.5rem"],
      letterSpacing: ["0.04rem", "0.07rem"],
      fontFamily: font.family.lovelaceText,
      fontWeight: font.weight.medium,
      lineHeight: 1.4,
    },
    h2: {
      color: colors.primary,
      fontSize: ["1.575rem", "2.625rem", "3.5rem"],
      letterSpacing: ["0.04rem", "0.07rem"],
      fontFamily: font.family.lovelaceText,
      fontWeight: font.weight.medium,
      lineHeight: 1.4,
    },
    h3: {
      color: colors.primary,
      fontSize: ["1.5125rem", "2.625rem"],
      letterSpacing: "0.165rem",
      fontFamily: font.family.lovelaceText,
      fontWeight: font.weight.medium,
      lineHeight: 1.4,
    },
    h4: {
      color: colors.primary,
      fontSize: ["1.375rem", "1.813rem"],
      letterSpacing: "0.05rem",
      fontFamily: font.family.lovelaceText,
      fontWeight: font.weight.medium,
      lineHeight: 1.4,
    },
    h5: {
      color: colors.primary,
      fontSize: "1.375rem",
      letterSpacing: "0.05rem",
      fontFamily: font.family.lovelaceText,
      fontWeight: font.weight.medium,
      lineHeight: 1.4,
    },
    h6: {
      color: colors.primary,
      fontSize: "1.125rem",
      letterSpacing: "0.05rem",
      fontFamily: font.family.lovelaceText,
      fontWeight: font.weight.medium,
      lineHeight: 1.4,
    },
  },
  cards: {
    backgroundColor: colors.white,
    boxShadow: `0 2px 4px 0 ${transparentize(0.85, colors.black)}`,
    borderRadius: "5px",
    header: {
      color: "#222",
    },
    small: {
      padding: ["2rem 1rem", "2.5rem 1.5rem"],
    },
    medium: {
      padding: ["2.5rem 1rem", "4rem", "4rem 1.5rem"],
    },
    large: {
      padding: ["2.5rem 1rem", "4rem", "4rem", "4rem 6rem"],
    },
  },
  modal: {
    padding: ["48px 16px", "64px 48px", "56px"],
  },
};

export default components;
