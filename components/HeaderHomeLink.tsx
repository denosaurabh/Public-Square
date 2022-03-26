import { useRouter } from "next/router";
import Link from "next/link";

import { styled } from "@/stitches.config";

const HeaderHomeLink = () => {
  const router = useRouter();

  return (
    <HeaderHomeLinkStyled>
      <Link href={"/"} passHref>
        <a>δεσμός</a>
      </Link>
    </HeaderHomeLinkStyled>
  );
};

export default HeaderHomeLink;

const HeaderHomeLinkStyled = styled("div", {
  flex: 1,

  display: "flex",
  alignItems: "center",
  gap: "1.5rem",

  fontFamily: "$sansSerif",
  fontSize: "1.8rem",
  color: "$grey600",
});
