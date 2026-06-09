import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

function renderEmphasis(text: string, strongClassName: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  while (cursor < text.length) {
    const nextMarker = text.indexOf("*", cursor);

    if (nextMarker === -1) {
      nodes.push(text.slice(cursor));
      break;
    }

    if (nextMarker > cursor) {
      nodes.push(text.slice(cursor, nextMarker));
    }

    if (text.startsWith("**", nextMarker)) {
      const close = text.indexOf("**", nextMarker + 2);
      if (close === -1) {
        nodes.push(text.slice(nextMarker));
        break;
      }

      nodes.push(
        <strong key={`${keyPrefix}-strong-${key++}`} className={strongClassName}>
          {text.slice(nextMarker + 2, close)}
        </strong>
      );
      cursor = close + 2;
      continue;
    }

    const close = text.indexOf("*", nextMarker + 1);
    if (close === -1) {
      nodes.push(text.slice(nextMarker));
      break;
    }

    nodes.push(
      <em key={`${keyPrefix}-em-${key++}`} className="italic">
        {text.slice(nextMarker + 1, close)}
      </em>
    );
    cursor = close + 1;
  }

  return nodes;
}

const TOKEN_RE =
  /(`[^`]+`)|(!?\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)(?:\s+"([^"]+)")?\))|(https?:\/\/[^\s<)]+)/g;

export function renderInlineMarkdown(text: string, strongClassName = "text-slate-900 font-bold") {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...renderEmphasis(text.slice(lastIndex, match.index), strongClassName, `seg-${key}`));
    }

    if (match[1]) {
      nodes.push(
        <code
          key={`code-${key++}`}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.88em] font-semibold text-slate-800"
        >
          {match[1].slice(1, -1)}
        </code>
      );
      lastIndex = TOKEN_RE.lastIndex;
      continue;
    }

    if (match[2]) {
      const isImage = match[2].startsWith("!");
      const label = match[3];
      const href = match[4];

      if (isImage) {
        nodes.push(label);
      } else {
        nodes.push(
          <a
            key={`link-${key++}`}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-violet-800 underline decoration-violet-800/30 underline-offset-2 hover:text-violet-700 break-words"
          >
            {label}
          </a>
        );
      }
      lastIndex = TOKEN_RE.lastIndex;
      continue;
    }

    const href = match[6];
    nodes.push(
      <a
        key={`url-${key++}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-violet-800 underline decoration-violet-800/30 underline-offset-2 hover:text-violet-700 break-words"
      >
        {href}
      </a>
    );
    lastIndex = TOKEN_RE.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(...renderEmphasis(text.slice(lastIndex), strongClassName, `seg-${key}`));
  }

  return nodes;
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 pt-8 pb-2 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-extrabold text-slate-950 pt-8 pb-2 border-b-2 border-slate-200 leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-slate-900 pt-6 pb-2 border-b border-slate-200">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-bold text-slate-800 pt-4 pb-1">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-base font-bold text-slate-800 pt-3 pb-1">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 pt-3 pb-1">
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="text-slate-600 text-sm leading-relaxed font-normal">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-violet-800 underline decoration-violet-800/30 underline-offset-2 hover:text-violet-700 break-words"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside space-y-1.5 pl-5 text-slate-600 text-sm py-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside space-y-1.5 pl-5 text-slate-600 text-sm py-2">
      {children}
    </ol>
  ),
  li: ({ children, className }) => (
    <li className={className?.includes("task-list-item") ? "list-none pl-0" : undefined}>
      {children}
    </li>
  ),
  input: (props) => (
    <input
      {...props}
      disabled
      className="mr-2 h-4 w-4 rounded border-slate-300 text-violet-800 align-middle"
    />
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-violet-800/30 bg-violet-50/40 pl-4 pr-3 py-2 my-3 text-slate-700 italic text-sm leading-relaxed rounded-r-lg">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-slate-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="text-slate-500">{children}</del>,
  hr: () => <div className="w-full border-t border-slate-200 my-4" />,
  img: ({ src, alt, title }) => (
    <figure className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
      <img
        src={src ?? ""}
        alt={alt ?? ""}
        loading="lazy"
        className="w-full max-h-[520px] object-contain bg-slate-100"
      />
      {title && (
        <figcaption className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] leading-relaxed text-slate-500">
          {title}
        </figcaption>
      )}
    </figure>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4 border border-slate-200 rounded-xl bg-slate-50 p-1 shadow-xs">
      <table className="w-full text-xs text-left text-slate-700">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="text-[10px] text-slate-700 uppercase bg-slate-100">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-slate-200/60 leading-relaxed font-normal">
      {children}
    </tbody>
  ),
  th: ({ children }) => <th className="p-3 font-extrabold">{children}</th>,
  td: ({ children }) => <td className="p-3">{children}</td>,
  code: ({ className, children }) => {
    const language = /language-(\w+)/.exec(className ?? "")?.[1];

    if (!language) {
      return (
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.88em] font-semibold text-slate-800">
          {children}
        </code>
      );
    }

    return (
      <figure className="my-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-xs">
        <figcaption className="border-b border-white/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300">
          {language}
        </figcaption>
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">
          <code>{children}</code>
        </pre>
      </figure>
    );
  },
  pre: ({ children }) => <>{children}</>,
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}

