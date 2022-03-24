import NextLink from "next/link";
import { styled } from "@/stitches.config";
import { LineBox } from "./LineBox";
import { Text } from "./Text";

const ActionBox = () => {
  return (
    <ActionBoxContainer>
      <Box>
        <NextLink href="/home" passHref>
          <Link>Home</Link>
        </NextLink>
        {/* <NextLink href="/recommandations" passHref>
          <Link>Recommandations</Link>
        </NextLink> */}
        <NextLink href="/social" passHref>
          <Link>Social Groups</Link>
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/social/superdeno" passHref>
          <Link>Super Deno</Link>
        </NextLink>
        <NextLink href="/settings" passHref>
          <Link>Settings</Link>
        </NextLink>
      </Box>
    </ActionBoxContainer>
  );
};

export default ActionBox;

const ActionBoxContainer = styled(LineBox, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  marginBottom: "4rem",

  width: "100%",
});

const Link = styled(Text, {
  padding: "1rem 1.5rem",

  fontSize: "$md",

  color: "$grey400",

  borderRight: "1px solid $grey300",

  "&:first-child": {
    borderLeft: "0",

    "&:hover": {
      borderTopLeftRadius: "$500",
      borderBottomLeftRadius: "$500",
    },
  },

  "&:last-child": {
    borderRight: "0",

    "&:hover": {
      borderTopRightRadius: "$500",
      borderBottomRightRadius: "$500",
    },
  },

  transition: "all 0.15s",

  "&:hover": {
    backgroundColor: "$grey300",

    cursor: "pointer",
  },
});

const Box = styled("div", {
  display: "flex",
});
