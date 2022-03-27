import { styled } from "@/stitches.config";
import * as TogglePrimitive from "@radix-ui/react-toggle";

const StyledToggle = styled(TogglePrimitive.Root, {
  all: "unset",

  backgroundColor: "$grey100",

  padding: "1rem 2rem",
  borderRadius: "$500",

  display: "flex",

  fontSize: "$sm",
  color: "$grey500",

  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "$grey200",
  },
  "&[data-state=on]": {
    backgroundColor: "$grey200",
  },
  "&:focus": { boxShadow: `0 0 0 2px $grey400` },
});

export const Toggle = StyledToggle;
