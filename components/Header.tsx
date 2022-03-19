import Link from "next/link";
import { styled } from "@/stitches.config";

import AccountButton from "./AccountButton";
import Network from "./Network";
import Accounts from "./Accounts";
import { AccountStore } from "@/stores/AccountStore";
import { useStore, useObservable } from "@/stores";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const accountStore = useStore(AccountStore);
  const activeAccount = useObservable(accountStore.activeAccount);

  return (
    <HeaderContainer>
      <HeaderHomeLink>
        <Link href={router.pathname === "/" ? "/me" : "/"} passHref>
          <a>@{activeAccount?.handle || ""}</a>
        </Link>
      </HeaderHomeLink>

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
});

const HeaderHomeLink = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",

  fontSize: "1.8rem",
});

const HeaderRightBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",

  marginLeft: "auto",
});
