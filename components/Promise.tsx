import { Text } from "./Text";

interface PromiseProps {
  text: string;
  by: {
    name: string;
    avatar: string;
  };
}

const Promise: React.FC<PromiseProps> = ({ text, by }) => {
  return (
    <Text>
      {text}
      <div>
        {by.avatar} {by.name}
      </div>
    </Text>
  );
};

export default Promise;
