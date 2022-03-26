import { styled } from "@/stitches.config";

export const Button = styled("button", {
  fontFamily: "$main",
  fontSize: "1.6rem",
  fontWeight: "500",
  color: "$grey400",

  // textTransform: "uppercase",

  border: "1px solid $grey300",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",

  width: "fit-content",

  borderRadius: "20px",

  variants: {
    color: {
      action: {
        backgroundColor: "$grey500",
        color: "$grey100",
      },
      dark: {
        backgroundColor: "$grey-800",
        color: "$grey400",

        boxShadow: "0px 1rem 2rem rgba(0, 0, 0, 0.15)",

        svg: {
          fill: "$grey-800",
        },

        "@mobile": {
          boxShadow: "0px 0.6rem 1rem rgba(0, 0, 0, 0.25)",
        },

        "&:disabled": {
          // backgroundColor: "$grey-600",
          // color: "$grey-100",
          opacity: 0.7,
          boxShadow: "0px 0.2rem 1rem rgba(0, 0, 0, 0.2)",

          "&:hover": {
            transform: "translateY(0) scale(1)",
            cursor: "not-allowed",
          },
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
  boxShadow: "none !important",

  border: "1px solid $grey400 !important",
  color: "$grey400",

  transition: "all 150ms",

  "&:hover": {
    // backgroundColor: "#E7EBF9 !important",
    color: "$grey600",

    boxShadow: "0px 0.2rem 1rem rgba(0, 0, 0, 0.25) !important",
    outline: "1px solid grey",
    transform: "translateY(-4px) !important",
  },
});
