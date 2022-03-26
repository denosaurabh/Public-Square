import { MessageStore } from "@/stores/MessageStore";
import Link from "next/link";
import { Button } from "./Button";

const ProfileMessageActions = () => {
  const onCreateMessageClick = async () => {
    const res = MessageStore.createCore();
    console.log(res);
  };

  return (
    <>
      <Button onClick={onCreateMessageClick}>Create message</Button>

      <Link href={`/messages/${id}`}>
        <Button>Message</Button>
      </Link>
    </>
  );
};

export default ProfileMessageActions;
