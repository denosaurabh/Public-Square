import { styled } from "@/stitches.config";

export const Text = styled("p", {
  fontSize: "$md",
  margin: "1rem",
  color: "$textColorDark",
});

export const SemiBoldText = styled(Text, {
  fontWeight: "500",
});

export const BoldText = styled(Text, {
  fontWeight: "600",
});

export const SmallText = styled(Text, {
  color: "light-grey",
  fontWeight: "300",
  fontSize: "$sm",
});
