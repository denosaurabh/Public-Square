import * as SelectPrimitive from "@radix-ui/react-select";
import { darkTheme, styled } from "@/stitches.config";

export const Select = styled(SelectPrimitive.Root, {
  // backgroundColor: "$grey200",
});

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  display: "flex",
  alignItems: "center",
  gap: "1rem",

  height: "fit-content",

  padding: "12px 16px",
  margin: "0 1rem",

  fontFamily: "$main",
  fontSize: "15px",
  fontWeight: 470,
  color: "$grey400",

  width: "fit-content",
  backgroundColor: "$grey100",

  border: "1px solid $grey300",
  borderRadius: "$900",

  transition: "all 150ms",

  "&:hover": {
    // backgroundColor: "#E7EBF9 !important",
    cursor: "pointer",

    color: "$grey600",

    boxShadow: "0px 0.2rem 1rem rgba(0, 0, 0, 0.25) !important",
    outline: "1px solid grey",
    transform: "translateY(-4px) !important",
  },

  "& > span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.8rem",
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

  border: "1px solid $grey300",
  borderRadius: "10px",

  width: "max-content",

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

  // userSelect: "none",

  padding: "12px 16px",

  fontFamily: "inherit",
  fontSize: "14px",

  backgroundColor: "$grey600",
  color: "$grey100",

  // [`.${darkTheme} &`]: {
  //   backgroundColor: "$grey300",
  //   color: "$grey400",
  // },

  // backgroundColor: "#E7EBF9",
  // borderBottom: "1px solid #D3D3D3",

  width: "100%",

  // "& > span": {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  //   gap: "0.8rem",
  // },

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#E7EBF9",
  },

  "&:focus": {
    backgroundColor: "#E7EBF9",
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

  "&:focus": {
    color: "$grey600",
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
