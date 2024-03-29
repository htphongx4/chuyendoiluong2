module.exports = {
  prefix: "tw-",
  purge: {
    enabled: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "480",
      sm: "768px",
      md: "992px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1480px",
    },
    colors: {
      primary: {
        medium: "#00b14f",
        light: "#fa9494",
        DEFAULT: "#00b14f",
        dark: "#15ad81",
        vdark: "#54060a",
        cranberry: "#bf0000",
        "extra-light": "#ffcccc",
        smoke: "#00b14f",
      },
      secondary: {
        medium: "#777576",
        light: "#a2a0a0",
        DEFAULT: "#231f20",
        dark: "#000000",
        "extra-light": "#cccbcb",
      },
      error: {
        dark: "#8a171a",
        light: "#ffcccc",
        DEFAULT: "#ff0000",
      },
      warning: {
        dark: "#fba422",
        light: "#feffe6",
        DEFAULT: "#ffd60a",
      },
      success: {
        dark: "#05882c",
        light: "#cdf0d8",
        DEFAULT: "#07b53b",
      },
      typo: {
        primary: "#231f20",
        secondary: "#777576",
        tertiary: "#a2a0a0",
        quarternary: "#cccbcb",
      },
      info: {
        light: "#f4f7fc",
        DEFAULT: "#007aff",
        dark: "#1155cc",
        "extra-light": "#e3eeff",
      },
      coral: "lightcoral",
      orange: {
        light: "#fee7d7",
        dark: "#fa8334",
      },
      grey: {
        50: "#f5f5f5",
        100: "#e9e9e9",
        200: "#dadada",
        300: "#c5c5c5",
        400: "#9f9f9f",
        500: "#7d7d7d",
        600: "#565656",
        700: "#444444",
        800: "#272727",
        900: "#020202",
      },
      white: "#ffffff",
      border: "#c5c5c5",
      "input-bg": "#f0f0f0",
    },
    borderRadius: {
      none: "0",
      xs: ".125rem",
      sm: ".375rem",
      DEFAULT: ".25rem",
      lg: ".5rem",
      xl: "1rem",
      full: "9999px",
    },
    fontSize: {
      xxs: "0.625rem", // 10px
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      md: "1.125rem", // 18px
      lg: "1.25rem", // 20px
      xl: "1.5625rem", // 25px
      "2xl": "1.75rem", // 28px
      "3xl": "2rem", // 32px
      "4xl": "2.375rem", // 38px
    },
    boxShadow: {
      sm: "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14)",
      DEFAULT:
        "0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 1px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14)",
      md: "0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14)",
      lg: "0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      xl: "0 3px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 6px 10px 0 rgba(0, 0, 0, 0.14)",
      "2xl":
        "0 5px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 14px 0 rgba(0, 0, 0, 0.12), 0 8px 10px 0 rgba(0, 0, 0, 0.14)",
      "3xl":
        "0 5px 6px 0 rgba(0, 0, 0, 0.2), 0 3px 16px 0 rgba(0, 0, 0, 0.12), 0 9px 12px 0 rgba(0, 0, 0, 0.14)",
      "4xl":
        "0 7px 8px 0 rgba(0, 0, 0, 0.2), 0 5px 22px 0 rgba(0, 0, 0, 0.12), 0 12px 17px 0 rgba(0, 0, 0, 0.14)",
      "5xl":
        "0 8px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.12), 0 16px 24px 0 rgba(0, 0, 0, 0.14)",
      "6xl":
        "0 11px 15px 0 rgba(0, 0, 0, 0.2), 0 9px 46px 0 rgba(0, 0, 0, 0.12), 0 24px 38px 0 rgba(0, 0, 0, 0.14)",
      none: "none",
    },
    fontFamily: {
      "khmer-main": "Nato-Khmer-Regular, sans-serif",
      "khmer-bold": "Nato-Khmer-Bold, sans-serif",
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      textColor: ["disabled"],
      borderColor: ["disabled"],
    },
  },
  plugins: [],
};
