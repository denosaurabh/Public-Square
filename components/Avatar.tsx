import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { styled } from "@/stitches.config";

export const Avatar = styled(AvatarPrimitive.Root, {
  width: "25px",
  height: "25px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  overflow: "hidden",
  userSelect: "none",

  borderRadius: "100%",
});

export const AvatarImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledAvatarGroup = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

interface AvatarGroupProps {
  gap?: number | string;
  css?: object;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  gap,
  children,
  css,
}) => {
  return (
    <StyledAvatarGroup
      css={{
        "& > *": {
          marginRight: gap,
        },

        ...css,
      }}>
      {children}
    </StyledAvatarGroup>
  );
};
