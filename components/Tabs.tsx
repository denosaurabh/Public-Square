import { styled } from "@stitches/react";
import { violet, mauve, blackA } from "@radix-ui/colors";
import * as TabsPrimitive from "@radix-ui/react-tabs";

const StyledTabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  width: "100%",

  backgroundColor: "transparent",
});

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",

  width: "fit-content",

  padding: "0.8rem",

  border: `1px solid $grey300`,
  borderRadius: "$500",

  marginBottom: "4rem",
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",

  padding: "1rem 2rem",

  height: "fit-content",
  flex: 1,

  color: "$grey400",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  fontSize: "$md",
  lineHeight: 1,

  userSelect: "none",

  transition: "all 100ms",

  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  "&:hover": {
    color: "$grey400",

    "&:hover": {
      cursor: "pointer",
    },
  },
  '&[data-state="active"]': {
    color: "$grey600",
    // fontWeight: "500",

    backgroundColor: "$grey200",
    borderRadius: "$500",

    // boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
  },
  "&:focus": {
    position: "relative",
    // boxShadow: `0 0 0 2px black`,
  },
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,

  width: "100%",

  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
});

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
