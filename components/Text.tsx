import { styled } from "@/stitches.config";

export const Text = styled("p", {
  fontSize: "$md",
  margin: "1rem",
  color: "$textColorDark",

  variants: {
    font: {
      sansSerif: {
        fontFamily: "$sansSerif",
      },
    },

    italic: {
      true: {
        fontStyle: "italic",
      },
    },
  },
});

export const SemiBoldText = styled(Text, {
  fontWeight: "500",
});

export const BoldText = styled(Text, {
  fontWeight: "600",
});

export const SmallText = styled(Text, {
  color: "light-grey",
  fontWeight: "400",
  fontSize: "$sm",
});

export const LinkSmallText = styled(SmallText, "a", {
  textDecoration: "underline",

  "&:hover": {
    cursor: "pointer",
  },
});

export const LightSansSerifText = styled(Text, {
  fontFamily: "$sansSerif",
  fontStyle: "italic",
  color: "light-grey",
});

export const LinkText = styled(Text, {

  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
});
