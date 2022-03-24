import { styled } from "@/stitches.config";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const StyledSeparator = styled(SeparatorPrimitive.Root, {
  backgroundColor: "$grey300",
  "&[data-orientation=horizontal]": {
    height: "1px",
    width: "100%",
    margin: "2rem 0",
  },
  "&[data-orientation=vertical]": {
    height: "100vh",
    width: "1px",
    margin: "0 2rem",
  },
});

export const Separator = StyledSeparator;
