import { styled } from "@/stitches.config";

const variants = {
  font: {
    serif: {
      fontFamily: "$sansSerif",
    },
  },
  italic: {
    true: {
      fontStyle: "italic",
    },
  },
};

export const H1 = styled("h1", {
  fontSize: "3.2rem",
  fontWeight: "600",

  margin: "2rem 0",

  variants,
});

export const H3 = styled("h3", {
  fontSize: "2.8rem",
  fontWeight: "500",

  margin: "1.5rem 0",

  variants,
});

export const H5 = styled("h5", {
  fontSize: "2.4rem",
  fontWeight: "500",

  margin: "1.5rem 0",

  variants,
});

export const H6 = styled("h6", {
  fontSize: "2rem",
  fontWeight: "400",

  margin: "1.5rem 0",

  variants,
});
