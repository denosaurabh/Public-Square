import { styled } from "@/stitches.config";

export const Button = styled("button", {
  fontFamily: "$main",
  fontSize: "1.6rem",
  fontWeight: "500",
  // textTransform: "uppercase",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",

  width: "fit-content",

  borderRadius: "20px",

  variants: {
    color: {
      dark: {
        backgroundColor: "$grey-800",
        color: "#181818",
        boxShadow: "0px 1rem 2rem rgba(0, 0, 0, 0.15)",

        svg: {
          fill: "$grey-800",
        },

        "@mobile": {
          boxShadow: "0px 0.6rem 1rem rgba(0, 0, 0, 0.25)",
        },

        "&:disabled": {
          backgroundColor: "$grey-600",
          color: "$grey-100",
          boxShadow: "0px 0.2rem 1rem rgba(0, 0, 0, 0.25)",
        },
      },
      light: {
        backgroundColor: "$grey-100",
        color: "$grey-800",
        boxShadow: "0px 1.4rem 2rem rgba(0, 0, 0, 0.25)",

        svg: {
          fill: "$grey-800",
        },

        "@mobile": {
          boxShadow: "0px 0.6rem 1rem rgba(0, 0, 0, 0.25)",
        },

        "&:disabled": {
          backgroundColor: "$grey-300",
          color: "$grey-700",
        },
      },
    },
    size: {
      mega: {
        fontSize: "2.4rem",
        padding: "2.8rem 5rem",
      },
      medium: {
        padding: "1rem 2rem",
      },
      small: {
        padding: "1rem 1.6rem",
      },
    },
  },

  transition: "100ms",

  "&:hover": {
    cursor: "pointer",
    transform: "translateY(-4px) scale(1.03)",
  },

  "&:active": {
    cursor: "pointer",
    transform: "translateY(0px) scale(0.98)",
  },

  defaultVariants: {
    color: "dark",
    size: "medium",
  },
});

export const TextButton = styled(Button, {
  backgroundColor: "transparent !important",
  color: "inherit",
  boxShadow: "none !important",

  transition: "all 200ms",

  "&:hover": {
    // backgroundColor: "#E7EBF9 !important",
    color: "black",
    boxShadow: "0px 0.2rem 1rem rgba(0, 0, 0, 0.25) !important",
    outline: "1px solid grey",
    transform: "translateY(-4px) !important",
  },
});
