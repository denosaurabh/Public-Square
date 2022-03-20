import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { LightSansSerifText } from "./Text";

import Publications from "./SocialDAO/publications";

const SocialDAOTab: React.FC = () => {
  return (
    <Tabs defaultValue="posts" css={{ margin: "5rem auto" }}>
      <TabsList aria-label="Manage your account">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="subjects">Subjects</TabsTrigger>
        <TabsTrigger value="discussion">Discussion</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Publications />
      </TabsContent>
      <TabsContent value="subjects">
        <LightSansSerifText>Subjects will go here</LightSansSerifText>
      </TabsContent>
      <TabsContent value="discussion">
        <LightSansSerifText>Discussions will go here.</LightSansSerifText>
      </TabsContent>
    </Tabs>
  );
};

export default SocialDAOTab;
