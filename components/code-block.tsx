"use client";

import { CopyCodeButton } from "@/components/copy-code-button";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  // Extract code content for copy button
  const getCodeContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) {
      return node.map(getCodeContent).join('');
    }
    if (node && typeof node === 'object' && 'props' in node) {
      const nodeProps = node.props as { children?: React.ReactNode };
      if (nodeProps.children) {
        return getCodeContent(nodeProps.children);
      }
    }
    return '';
  };

  const codeContent = getCodeContent(children);

  return (
    <div className="relative my-6 group">
      <pre
        className="overflow-x-auto rounded-xl bg-[#1e1e1e] p-4 pr-12 text-sm border border-border/50"
        {...props}
      >
        {children}
      </pre>
      {codeContent && <CopyCodeButton code={codeContent} />}
    </div>
  );
}

