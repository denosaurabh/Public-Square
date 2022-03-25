import { styled } from "@/stitches.config";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const StyledContent = styled(TooltipPrimitive.Content, {
  padding: "1.2rem 2rem",

  fontFamily: "$main",
  fontSize: "1.6rem",
  color: "$grey200",

  border: "1px solid $grey200",

  borderRadius: "14px",

  backgroundColor: "$grey500",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",

  transition: "opacity 0.15s",
});

const StyledTrigger = styled(TooltipPrimitive.Trigger, {
  fontFamily: "$main",
  background: "none !important",
});

const StyledArrow = styled(TooltipPrimitive.Arrow, {
  fill: "white",
});

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = StyledTrigger;
export const TooltipContent = StyledContent;
export const TooltipArrow = StyledArrow;
