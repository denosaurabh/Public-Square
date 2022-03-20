import { MarkDownContainer } from "@/style/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

interface MarkDownBoxProps {
  content: string;
  css?: any;
}

const MarkDownBox: React.FC<MarkDownBoxProps> = ({ content, css }) => {
  return (
    <MarkDownContainer css={css}>
      <ReactMarkdownComp>{content || "*weirdly nothing...*"}</ReactMarkdownComp>
    </MarkDownContainer>
  );
};

export default MarkDownBox;

export const ReactMarkdownComp: React.FC = ({ children }) => {
  return (
    <ReactMarkdown
      className="post-content-markdown"
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      // components={{
      //   code({ node, inline, className, children, ...props }) {
      //     const match = /language-(\w+)/.exec(className || "");
      //     return !inline && match ? (
      //       <SyntaxHighlighter
      //         style={dark}
      //         language={match[1]}
      //         PreTag="div"
      //         {...props}>
      //         {String(children).replace(/\n$/, "")}
      //       </SyntaxHighlighter>
      //     ) : (
      //       <code className={className} {...props}>
      //         {children}
      //       </code>
      //     );
      //   },
      // }}
    >
      {children}
    </ReactMarkdown>
  );
};
