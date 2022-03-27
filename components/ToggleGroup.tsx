import { styled } from "@/stitches.config";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: "flex",
  borderRadius: "$500",

  //   padding: "0 1rem",
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  backgroundColor: "$grey100",

  height: "4rem",
  //   width: "10rem",
  padding: "2rem",

  fontSize: "$sm",
  color: "$grey500",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  //   borderRadius: "$500",
  borderRight: "1px solid $grey300",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "$grey200",
  },
  "&[data-state=on]": {
    backgroundColor: "$grey200",
  },

  "&:focus": { position: "relative", boxShadow: `0 0 0 2px $grey400` },

  "&:first-child": {
    borderLeft: "0",

    // "&:hover": {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "inherit",
    // },
  },

  "&:last-child": {
    borderRight: "0",

    // "&:hover": {
    borderTopRightRadius: "inherit",
    borderBottomRightRadius: "inherit",
    // },
  },
});

export const ToggleGroup = StyledToggleGroup;
export const ToggleGroupItem = StyledItem;
