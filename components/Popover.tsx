import { styled } from "@/stitches.config";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Text } from "./Text";

const StyledContent = styled(PopoverPrimitive.Content, {
  marginTop: "10px",

  border: "1px solid grey",
  borderRadius: "16px",

  textAlign: "center",

  backgroundColor: "#E7EBF9",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
});

const StyledTrigger = styled(PopoverPrimitive.Trigger, {
  padding: "0.5rem 0.5rem",

  border: "1px solid grey",
  borderRadius: "100px",

  transition: "all 0.1s ease-in-out",

  "&:hover": {
    transform: "translateY(-5px)",
  },
});

const StyledText = styled(Text, {
  fontFamily: "$sansSerif",
  fontSize: "1.8rem",
  fontWeight: "500",
  fontStyle: "italic",

  padding: "1.4rem 2.5rem",
  margin: 0,

  borderBottom: "1px solid grey",

  "&:last-child": {
    borderBottom: 0,
  },

  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
});

// Exports
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = StyledTrigger;
export const PopoverContent = StyledContent;
export const PopoverText = StyledText;
