import { MarkDownContainer } from "@/style/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkDownBoxProps {
  content: string;
  css?: any;
}

const MarkDownBox: React.FC<MarkDownBoxProps> = ({ content, css }) => {
  return (
    <MarkDownContainer css={css}>
      <ReactMarkdown
        className="post-content-markdown"
        remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </MarkDownContainer>
  );
};

export default MarkDownBox;
