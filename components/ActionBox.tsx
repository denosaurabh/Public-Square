import NextLink from "next/link";
import { useRouter } from "next/router";

import { styled } from "@/stitches.config";
import { LineBox } from "./LineBox";
import { Text } from "./Text";
import Search from "./Search";
import { Filter, SettingsStore } from "@/stores/SettingsStore";
import { useObservable } from "@/stores";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import { Toggle } from "./Toggle";

const ActionBox = () => {
  const router = useRouter();
  const path = router.pathname;

  const action = useObservable(SettingsStore.action);
  const filter = useObservable(SettingsStore.filter);
  const isDenoAppID = useObservable(SettingsStore.denoAppId);

  const onFilterClick = () => {
    if (action !== "HOME") {
      SettingsStore.action.set("HOME");
    } else {
      SettingsStore.action.set("FILTER");
    }
  };

  const onFilterChange = (val: Filter) => {
    if (val) {
      SettingsStore.filter.set(val);
    }
  };

  return (
    <>
      <ActionBoxContainer
        css={
          action === "FILTER" && router.pathname === "/home"
            ? {
                marginBottom: 0,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }
            : {}
        }>
        <Box>
          <NextLink href="/home" passHref>
            <Link active={path === "/home"}>Home</Link>
          </NextLink>
          <NextLink href="/recommandations" passHref>
            <Link active={path === "/recommandations"}>Recommandations</Link>
          </NextLink>
          <NextLink href="/timeline" passHref>
            <Link active={path === "/timeline"}>Connections</Link>
          </NextLink>
          <NextLink href="/social" passHref>
            <Link active={path === "/social"}>Social Groups</Link>
          </NextLink>
        </Box>
        <Box>
          <Search />

          {(action === "HOME" || action === "FILTER") &&
          router.pathname === "/home" ? (
            <Link onClick={onFilterClick}>
              {action === "HOME" ? "Filter" : "Close"}
            </Link>
          ) : null}
        </Box>
      </ActionBoxContainer>
      {action === "FILTER" && router.pathname === "/home" ? (
        <ActionBoxContainer
          css={{
            marginTop: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          }}>
          <ToggleGroup
            type="single"
            defaultValue="TOP_COMMENTED"
            aria-label="Text alignment"
            value={filter}
            onValueChange={onFilterChange}>
            <ToggleGroupItem value="TOP_COMMENTED" aria-label="Left aligned">
              Top Comment
            </ToggleGroupItem>
            <ToggleGroupItem value="TOP_COLLECTED" aria-label="Center aligned">
              Top Collected
            </ToggleGroupItem>
            <ToggleGroupItem value="LATEST" aria-label="Right aligned">
              Latest
            </ToggleGroupItem>
          </ToggleGroup>

          <Toggle
            defaultPressed={false}
            pressed={isDenoAppID}
            onPressedChange={(pressed) => {
              SettingsStore.denoAppId.set(pressed);
            }}
            css={{
              marginLeft: "auto",
              borderRadius: 0,
              borderBottomRightRadius: "$500",
            }}>
            Only from Public Square
          </Toggle>
        </ActionBoxContainer>
      ) : null}
    </>
  );
};

export default ActionBox;

const ActionBoxContainer = styled(LineBox, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  marginBottom: "4rem",

  width: "100%",

  borderRadius: "$500",
});

const Link = styled(Text, {
  padding: "1rem 1.5rem",

  fontSize: "$md",

  color: "$grey400",

  borderRight: "1px solid $grey300",

  "&:first-child": {
    borderLeft: "0",

    // "&:hover": {
    borderTopLeftRadius: "$500",
    borderBottomLeftRadius: "inherit",
    // },
  },

  "&:last-child": {
    borderRight: "0",

    // "&:hover": {
    borderTopRightRadius: "inherit",
    borderBottomRightRadius: "inherit",
    // },
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
