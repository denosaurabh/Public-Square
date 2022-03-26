import { useState } from "react";

import Input from "./Input";
import { styled } from "@/stitches.config";

import SearchSvg from "@/icons/search.svg";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const onInputChange = (e) => {
    e.preventDefault();

    const { value } = e.target;
    setSearch(value);
  };

const onFromSubmit = (e) => {
    e.preventDefault();

    if (!search) return;
    router.push("/search?query=" + search);
  };

  return (
    <SearchBox onSubmit={onFromSubmit}>
      <SearchSvg />
      <Input placeholder="search" value={search} onChange={onInputChange} />
    </SearchBox>
  );
};

export default Search;

const SearchBox = styled("form", {
  display: "flex",
  alignItems: "center",

  gap: "1rem",

  svg: {
    fill: "$grey400",
    stroke: "$grey400",
  },

  input: {
    fontSize: "$md",

    margin: 0,
    padding: 0,
  },
});
