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

  width: "50%",

  borderBottom: `1px solid ${mauve.mauve6}`,
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  color: mauve.mauve11,
  userSelect: "none",
  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  "&:hover": { color: violet.violet11 },
  '&[data-state="active"]': {
    color: violet.violet11,
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
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
