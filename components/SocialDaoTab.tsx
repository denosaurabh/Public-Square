import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

import Publications from "./SocialDAO/publications";
import Subjects from "./SocialDAO/Subject";
import Discussions from "./SocialDAO/Discussions";
import Transactions from "./SocialDAO/transactions";

const SocialDAOTab: React.FC = () => {
  return (
    <Tabs defaultValue="posts" css={{ margin: "5rem auto" }}>
      <TabsList aria-label="Manage your account">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="subjects">Subjects</TabsTrigger>
        <TabsTrigger value="discussion">Discussions</TabsTrigger>
        <TabsTrigger value="transactions">Proposals</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Publications />
      </TabsContent>
      <TabsContent value="subjects">
        <Subjects />
      </TabsContent>
      <TabsContent value="discussion">
        <Discussions />
      </TabsContent>
      <TabsContent value="transactions">
        <Transactions />
      </TabsContent>
    </Tabs>
  );
};

export default SocialDAOTab;
