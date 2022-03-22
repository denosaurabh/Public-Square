import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";

import Publications from "./publications";
import NFTs from "./nfts";

const ProfileTabs: React.FC = ({ ownerAddress }) => {
  return (
    <Tabs defaultValue="publications" css={{ margin: "5rem auto" }}>
      <TabsList aria-label="View Profile Tabs">
        <TabsTrigger value="publications">Posts</TabsTrigger>
        <TabsTrigger value="nfts">NFTs</TabsTrigger>
      </TabsList>
      <TabsContent value="publications">
        <Publications />
      </TabsContent>
      <TabsContent value="nfts">
        <NFTs ownerAddress={ownerAddress} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
