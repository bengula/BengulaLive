import React from "react";

export function renderInlineMarkdown(text: string, strongClassName = "text-slate-900 font-bold") {
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
        nodes.push(text.slice(nextMarker + 2));
        break;
      }

      nodes.push(
        <strong key={`strong-${key++}`} className={strongClassName}>
          {text.slice(nextMarker + 2, close)}
        </strong>
      );
      cursor = close + 2;
      continue;
    }

    const close = text.indexOf("*", nextMarker + 1);
    if (close === -1) {
      nodes.push(text.slice(nextMarker + 1));
      break;
    }

    nodes.push(
      <em key={`em-${key++}`} className="italic">
        {text.slice(nextMarker + 1, close)}
      </em>
    );
    cursor = close + 1;
  }

  return nodes;
}
