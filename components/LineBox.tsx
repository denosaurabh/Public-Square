import { darkTheme, styled } from "@/stitches.config";

export const LineBox = styled("div", {
  border: "1px solid $grey300",
  borderRadius: "$500",

  [`.${darkTheme} &`]: {
    border: "1px solid $grey300",
  },
});
