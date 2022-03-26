import { styled } from "@/stitches.config";

export const Heading = styled("h1", {
  fontFamily: "$main",
  fontSize: "$sm",
  fontWeight: 400,
  color: "$grey600",

  variants: {
    size: {
      xxl: {
        fontSize: "6rem",
      },
      xl: {
        fontSize: "5rem",
      },
      h1: {
        fontSize: "3.2rem",
      },
      h2: {
        fontSize: "3rem",
      },
      h3: {
        fontSize: "2.9rem",
      },
      h4: {
        fontSize: "2.8rem",
      },
      h5: {
        fontSize: "2.4rem",
      },
      h6: {
        fontSize: "2rem",
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
      bold: {
        fontSize: "bold",
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

export const H1 = styled(Heading, {
  fontSize: "3.2rem",
  fontWeight: "600",

  margin: "2rem 0",
});

export const H3 = styled(Heading, {
  fontSize: "2.8rem",
  fontWeight: "500",

  margin: "1.5rem 0",
});

export const H5 = styled(Heading, {
  fontSize: "2.4rem",
  fontWeight: "500",

  margin: "1.5rem 0",
});

export const H6 = styled(Heading, {
  fontSize: "2rem",
  fontWeight: "400",

  margin: "1.5rem 0",
});
