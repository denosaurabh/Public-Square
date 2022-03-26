import { styled } from "@/stitches.config";

export const Text = styled("p", {
  fontFamily: "$main",
  fontSize: "$sm",
  fontWeight: 400,
  color: "$grey400",

  variants: {
    size: {
      xs: {
        fontSize: "$xs",
      },
      sm: {
        fontSize: "$sm",
      },
      md: {
        fontSize: "$md",
      },
      lg: {
        fontSize: "$lg",
      },
      xl: {
        fontSize: "$xl",
      },
    },

    weight: {
      300: {
        fontSize: "300",
      },
      400: {
        fontSize: "400",
      },
      500: {
        fontSize: "500",
      },
      600: {
        fontSize: "600",
      },
      700: {
        fontSize: "700",
      },
      800: {
        fontSize: "800",
      },
      900: {
        fontSize: "900",
      },
    },

    sansSerif: {
      true: {
        fontFamily: "$sansSerif",
      },
    },

    italic: {
      true: {
        fontStyle: "italic",
      },
    },

    undeline: {
      true: {
        textDecoration: "underline",
      },
    },
  },
});

export const TextDefault = styled(Text, {
  color: '$grey500',
  fontSize: "$md",
  margin: "1rem",
});

export const SemiBoldText = styled(TextDefault, {
  fontWeight: "500",
});

export const BoldText = styled(TextDefault, {
  fontWeight: "600",
});

export const SmallText = styled(TextDefault, {
  fontWeight: "400",
  fontSize: "$sm",
});

export const LinkSmallText = styled(SmallText, "a", {
  textDecoration: "underline",

  "&:hover": {
    cursor: "pointer",
  },
});

export const LightSansSerifText = styled(TextDefault, {
  fontFamily: "$sansSerif",
  fontStyle: "italic",
});

export const LinkText = styled(TextDefault, {
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
});
