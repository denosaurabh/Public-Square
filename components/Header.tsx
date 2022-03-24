import Link from "next/link";
import { useRouter } from "next/router";

import { styled } from "@/stitches.config";

import AccountButton from "./AccountButton";
import Network from "./Network";
import Accounts from "./Accounts";
import { AccountStore } from "@/stores/AccountStore";
import { useStore, useObservable } from "@/stores";

import PlusSvg from "@/icons/plus.svg";
import {
  Popover,
  PopoverContent,
  PopoverText,
  PopoverTrigger,
} from "./Popover";
import { LinkText, TextDefault } from "./Text";
import HeaderHomeLink from "./HeaderHomeLink";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderHomeLink />

      <HeaderCenterBox>
        <Link href="/social" passHref>
          <LinkText>Daos</LinkText>
        </Link>

        <Popover>
          <PopoverTrigger>
            <PlusSvg />
          </PopoverTrigger>
          <PopoverContent>
            <Link href="/create/post" passHref>
              <PopoverText>Publish Post</PopoverText>
            </Link>

            <Link href="/create/socialdao" passHref>
              <PopoverText>Form Dao</PopoverText>
            </Link>

            <Link href="/update/profile" passHref>
              <PopoverText>Update profile</PopoverText>
            </Link>
          </PopoverContent>
        </Popover>

        <LinkText>Social</LinkText>
      </HeaderCenterBox>

      <HeaderRightBox>
        <Network />
        <Accounts />
        <AccountButton />
      </HeaderRightBox>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled("header", {
  width: "100%",
  height: "fit-content",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  backgroundColor: "$grey100",
  borderRadius: "$900",

  padding: "0.5rem 2rem",

  boxShadow: "0px 8px 20px rgba(94, 94, 94, 0.1)",
});

const HeaderCenterBox = styled("div", {
  flex: 1,

  // margin: "0 auto",
  // marginLeft: "43vw",

  display: "flex",
  justifyContent: "center",

  svg: {
    fill: "grey",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      cursor: "pointer",
    },
  },
});

const HeaderRightBox = styled("div", {
  flex: 1,

  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "0.5rem",

  // marginLeft: "auto",
});
