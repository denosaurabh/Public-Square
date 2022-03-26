import NextLink from "next/link";
import { useRouter } from "next/router";

import { styled } from "@/stitches.config";
import { LineBox } from "./LineBox";
import { Text } from "./Text";
import Search from "./Search";

const ActionBox = () => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <ActionBoxContainer>
      <Box>
        <NextLink href="/home" passHref>
          <Link active={path === "/home"}>Home</Link>
        </NextLink>
        <NextLink href="/recommandations" passHref>
          <Link active={path === "/recommandations"}>Recommandations</Link>
        </NextLink>
        <NextLink href="/social" passHref>
          <Link active={path === "/social"}>Social Groups</Link>
        </NextLink>
      </Box>
      <Box>
        <Search />

        <NextLink href="/settings" passHref>
          <Link active={path === "/settings"}>Settings</Link>
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

  variants: {
    active: {
      true: {
        backgroundColor: "$grey200",
      },
    },
  },

  "&:hover": {
    backgroundColor: "$grey300",

    cursor: "pointer",
  },
});

const Box = styled("div", {
  display: "flex",
});
