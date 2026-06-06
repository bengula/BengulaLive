import React from "react";

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

