import { createTheme } from "@mui/material/styles";
import { DM_Sans } from "next/font/google";
import { palette } from "@/theme/palette";

export const dm = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#1877F2",
      light: "#e5fafb",
      dark: "#212B36",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fb9678",
      light: "#fcf1ed",
      dark: "#e67e5f",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c292",
      light: "#ebfaf2",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
      dark: "#0bb2fb",
      contrastText: "#ffffff",
    },
    error: {
      main: "#e46a76",
      light: "#fdf3f5",
      dark: "#e45a68",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fec90f",
      light: "#fff4e5",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    // purple: {
    //   A50: "#EBF3FE",
    //   A100: "#6610f2",
    //   A200: "#557fb9",
    //   contrastText: "#ffffff",
    // },
    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#767e89",
      500: "#5A6A85",
      600: "#2A3547",
    },
    text: {
      primary: "#000",
      secondary: "rgba(0,0,0,0.87)",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
    background: {
      default: "#fafbfb",
      paper: "#fafbfb",
    },
  },

  typography: {
    fontFamily: dm.style.fontFamily,
    h1: {
      fontWeight: 500,
      fontSize: "1.875rem",
      lineHeight: "1.5",
    },
    h2: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: "1.5",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.3125rem",
      lineHeight: "1.5",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.125rem",
      lineHeight: "1.5",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: "1.5",
    },
    h6: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: "1.5",
    },
    button: {
      textTransform: "none",
      fontWeight: "400",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: "400",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: "400",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11) !important",
        },
        a: {
          textDecoration: "none",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "0",
          boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "30px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid #e5eaef`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          color: "white",
        },
        filledInfo: {
          color: "white",
        },
        filledError: {
          color: "white",
        },
        filledWarning: {
          color: "white",
        },
        standardSuccess: {
          backgroundColor: palette().success.light,
          color: palette().success.main,
        },
        standardError: {
          backgroundColor: palette().error.light,
          color: palette().error.main,
        },
        standardWarning: {
          backgroundColor: palette().warning.light,
          color: palette().warning.main,
        },
        standardInfo: {
          backgroundColor: palette().info.light,
          color: palette().info.main,
        },
        outlinedSuccess: {
          borderColor: palette().success.main,
          color: palette().success.main,
        },
        outlinedWarning: {
          borderColor: palette().warning.main,
          color: palette().warning.main,
        },
        outlinedError: {
          borderColor: palette().error.main,
          color: palette().error.main,
        },
        outlinedInfo: {
          borderColor: palette().info.main,
          color: palette().info.main,
        },
      },
    },
  },
});

export { baselightTheme };
