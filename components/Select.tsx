import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "@/stitches.config";

export const Select = styled(SelectPrimitive.Root, {});

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  display: "flex",
  alignItems: "center",
  gap: "1rem",

  height: "fit-content",

  padding: "12px 16px",

  fontFamily: "inherit",
  fontSize: "14px",
  color: "$tint12",

  width: "100%",
  backgroundColor: "$tint3",

  border: "1px solid grey",
  borderRadius: "10px",

  "& > span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.8rem",
  },

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "$tint4",
  },
});

const StyledSelectValue = styled(SelectPrimitive.SelectValue, {});

const StyledSelectIcon = styled(SelectPrimitive.Icon, {
  marginLeft: "auto",

  svg: {
    transition: "transform 300ms",
    "[data-state=open] &": { transform: "rotate(180deg)" },
  },
});

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  backgroundColor: "$tint1",
  border: 0,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
  // padding: '5px 6.5px'
});

const StyledItem = styled(SelectPrimitive.Item, {
  all: "unset",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",

  userSelect: "none",

  fontSize: "14px",
  color: "$tint12",

  padding: "8px 13px",
  borderBottom: "1px solid $tint7",

  "& > span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.8rem",
  },

  "&:hover": {
    cursor: "pointer",
  },

  "&:focus": {
    backgroundColor: "$tint12",
    color: "$tint1",
  },

  "&[data-disabled]": {
    opacity: 0.6,
    pointerEvents: "none",
  },

  "&:last-child": {
    borderBottom: 0,
  },
});

const StyledSelectItemText = styled(SelectPrimitive.ItemText, {
  fontSize: "$sm",
  color: "$tint12",

  "&:focus": {
    color: "$tint1",
  },
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton, {});

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton, {});

export const SelectTrigger = StyledTrigger;
export const SelectValue = StyledSelectValue;
export const SelectIcon = StyledSelectIcon;
export const SelectContent = StyledContent;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = StyledSelectItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = SelectPrimitive.Label;
export const SelectSeparator = SelectPrimitive.Separator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;
