import { styled } from "@/stitches.config";

export const MarkDownContainer = styled("div", {
  margin: "4rem 0",

  color: "$grey600",

  "& .post-content-markdown": {
    fontFamily: "$main",
    fontSize: "1.5rem",
    color: "$grey600",
  },
});
