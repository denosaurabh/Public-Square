import { useState } from "react";

import { LineBox } from "@/components/LineBox";
import { LightSansSerifText } from "@/components/Text";
import { SEARCH } from "@/graphql/SEARCH";
import { styled } from "@/stitches.config";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { H1 } from "@/components/Heading";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import PostsContainer from "@/components/PostsContainer";
import Profile from "@/components/Profile";
import Input from "@/components/Input";

import SearchSvg from "@/icons/search.svg";

type SEARCH = "PROFILE" | "PUBLICATION";

const Search = () => {
  const router = useRouter();
  const search = router.query.query;

  const [searchText, setSearchText] = useState(search);

  const [type, setType] = useState<SEARCH>("PUBLICATION");

  const { data, loading } = useQuery(gql(SEARCH), {
    variables: {
      request: {
        query: search,
        type: type,
        limit: 30,
      },
    },
  });

  const onSearchTabChange = (val: string) => {
    if (!val) return;

    setType(val);
  };

  const onInputChange = (e) => {
    e.preventDefault();

    const { value } = e.target;
    setSearchText(value);
  };

  const onFromSubmit = (e) => {
    e.preventDefault();

    console.log(searchText);

    if (!searchText) return;
    router.push("/search?query=" + searchText);
  };

  console.log(data);

  return (
    <Container>
      <TopContainer>
        <SearchBox onSubmit={onFromSubmit}>
          <SearchSvg />
          <Input
            placeholder="search"
            value={searchText}
            onChange={onInputChange}
          />
        </SearchBox>

        <H1 as="h3" size="h3" sansSerif italic>
          Your Search results for <span>&quot;{search}&quot;</span>
        </H1>
      </TopContainer>

      <Tabs
        defaultValue="POST"
        value={type}
        onValueChange={onSearchTabChange}
        css={{ width: "100%" }}>
        <TabsList aria-label="Manage your account">
          <TabsTrigger value="PUBLICATION">Publications</TabsTrigger>
          <TabsTrigger value="PROFILE">Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="PUBLICATION">
          {data?.search?.items?.length &&
          data.search.__typename !== "PublicationSearchResult" &&
          !loading ? (
            <PostsContainer noHeader publications={data?.search.items} />
          ) : (
            <LightSansSerifText css={{ textAlign: "center" }}>
              loading....
            </LightSansSerifText>
          )}

          {!loading &&
          data &&
          data.search.__typename === "PublicationSearchResult" &&
          !data.search.items.length ? (
            <LightSansSerifText css={{ textAlign: "center" }}>
              No Publications found....
            </LightSansSerifText>
          ) : null}
        </TabsContent>
        <TabsContent value="PROFILE">
          {!data ||
          data.search.__typename !== "ProfileSearchResult" ||
          loading ? (
            <LightSansSerifText css={{ textAlign: "center" }}>
              Loading....
            </LightSansSerifText>
          ) : (
            <ProfilesContainer>
              {data?.search.items.map((profile, i) => {
                return (
                  <Profile
                    {...profile}
                    key={i}
                    href={`/profile/${profile.profileId}`}
                  />
                );
              })}
            </ProfilesContainer>
          )}

          {!loading &&
          data &&
          data.search.__typename === "ProfileSearchResult" &&
          !data.search.items.length ? (
            <LightSansSerifText css={{ textAlign: "center" }}>
              No Profiles found....
            </LightSansSerifText>
          ) : null}
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Search;

const Container = styled(LineBox, {
  padding: "2rem",
});

const SearchBox = styled("form", {
  display: "flex",
  alignItems: "center",

  gap: "1rem",

  margin: "2rem 0",
  padding: "1rem 2rem",

  border: "1px solid $grey200",
  borderRadius: "$500",

  svg: {
    fill: "$grey400",
    stroke: "$grey400",

    width: "20px",
    height: "20px",
  },

  input: {
    fontSize: "$lg",

    margin: 0,
    padding: 0,
  },
});

const TopContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const ProfilesContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
});
