import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const MERMAID_CDN_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void;
  render: (id: string, chart: string) => Promise<{ svg: string }>;
};

let mermaidPromise: Promise<MermaidApi> | null = null;

function loadMermaid() {
  mermaidPromise ??= import(/* @vite-ignore */ MERMAID_CDN_URL).then((module) => {
    const mermaid = (module.default ?? module) as MermaidApi;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: {
        background: "#ffffff",
        primaryColor: "#f5f3ff",
        primaryTextColor: "#1e293b",
        primaryBorderColor: "#7c3aed",
        lineColor: "#64748b",
        secondaryColor: "#ecfeff",
        tertiaryColor: "#f8fafc",
        fontFamily: 'Inter, "Segoe UI", Helvetica, Arial, sans-serif',
      },
    });
    return mermaid;
  });

  return mermaidPromise;
}

function normalizeMermaidChart(chart: string) {
  return chart
    .split("\n")
    .map((line) => {
      if (line.trimStart().startsWith("%%")) {
        return line;
      }

      // 1. Replace % with #37;
      let processed = line.replace(/%/g, "#37;");

      // 2. Escape semicolons and replace \n inside double quoted strings
      processed = processed.replace(/"([^"]*)"/g, (match, p1) => {
        const cleanedContent = p1
          .replace(/;/g, "#59;")
          .replace(/\\n/g, "<br>");
        return `"${cleanedContent}"`;
      });

      return processed;
    })
    .join("\n");
}

function MermaidDiagram({ chart }: { chart: string }) {
  const reactId = React.useId();
  const diagramId = React.useMemo(
    () => `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId]
  );
  const [svg, setSvg] = React.useState<string | null>(null);
  const [error, setError] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 640px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    setSvg(null);
    setError(false);

    loadMermaid()
      .then(async (mermaid) => {
        // Mermaid sizes each label to the text width it measures at render time.
        // If fonts are still loading, the paint is slightly wider than the measure
        // and the last glyph gets clipped (worst in diamonds / edge-label chips).
        // Waiting for fonts to settle makes the measurement match the paint.
        if (typeof document !== "undefined" && document.fonts?.ready) {
          try {
            await document.fonts.ready;
          } catch {
            /* fonts API unavailable; render anyway */
          }
        }

        let processedChart = chart;
        if (isMobile) {
          processedChart = processedChart
            .replace(/\bflowchart LR\b/g, "flowchart TD")
            .replace(/\bgraph LR\b/g, "graph TD");
        }

        return mermaid.render(`${diagramId}-${Date.now()}`, normalizeMermaidChart(processedChart));
      })
      .then(({ svg }) => {
        if (!cancelled) {
          setSvg(svg);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId, isMobile]);

  if (error) {
    return (
      <figure className="my-5 overflow-hidden rounded-xl border border-amber-200 bg-amber-50 shadow-xs">
        <figcaption className="border-b border-amber-200 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800">
          mermaid
        </figcaption>
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-amber-950">
          <code>{chart}</code>
        </pre>
      </figure>
    );
  }

  return (
    <figure className="mermaid-diagram my-5 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <pre className="overflow-x-auto text-xs leading-relaxed text-slate-500">
          <code>{chart}</code>
        </pre>
      )}
    </figure>
  );
}

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

function getUrl(src?: string | null) {
  if (!src) {
    return null;
  }

  try {
    return new URL(src);
  } catch {
    return null;
  }
}

function isSlideShareUrl(src?: string | null) {
  return getUrl(src)?.hostname.toLowerCase().endsWith("slideshare.net") ?? false;
}

function getSlideShareEmbedUrl(src: string) {
  const url = getUrl(src);
  if (!url || !url.pathname.includes("/slideshow/embed_code/")) {
    return null;
  }

  return url.toString();
}

function getYouTubeEmbedUrl(src: string) {
  const url = getUrl(src);
  if (!url) {
    return null;
  }

  const hostname = url.hostname.toLowerCase();
  let videoId: string | null = null;

  if (hostname === "youtu.be" || hostname.endsWith(".youtu.be")) {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
  } else if (hostname === "youtube.com" || hostname.endsWith(".youtube.com")) {
    if (url.pathname === "/watch") {
      videoId = url.searchParams.get("v");
    } else {
      const [, id] = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/) ?? [];
      videoId = id ?? null;
    }
  }

  if (!videoId) {
    return null;
  }

  const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
  const start = url.searchParams.get("start") ?? url.searchParams.get("t");
  if (start) {
    embedUrl.searchParams.set("start", start.replace(/s$/, ""));
  }

  return embedUrl.toString();
}

function getMediaEmbed(src?: string | null) {
  if (!src) {
    return null;
  }

  if (isSlideShareUrl(src)) {
    const slideShareEmbedUrl = getSlideShareEmbedUrl(src);

    if (slideShareEmbedUrl) {
      return {
        provider: "SlideShare",
        iframeSrc: slideShareEmbedUrl,
        sourceUrl: src,
        aspectClassName: "aspect-[17/14]",
        allow: "fullscreen",
      };
    }
  }

  const youtubeEmbedUrl = getYouTubeEmbedUrl(src);
  if (youtubeEmbedUrl) {
    return {
      provider: "YouTube",
      iframeSrc: youtubeEmbedUrl,
      sourceUrl: src,
      aspectClassName: "aspect-video",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    };
  }

  return null;
}

function MediaEmbed({
  src,
  title,
  provider,
  aspectClassName,
  allow,
  sourceUrl,
}: {
  src: string;
  title: string;
  provider: string;
  aspectClassName: string;
  allow: string;
  sourceUrl: string;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
      <div className={`${aspectClassName} w-full bg-slate-950`}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow={allow}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
        />
      </div>
      <figcaption className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] leading-relaxed text-slate-500">
        {provider} embed.{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-violet-800 underline decoration-violet-800/30 underline-offset-2 hover:text-violet-700"
        >
          Open original
        </a>
      </figcaption>
    </figure>
  );
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
  p: ({ node, children }) => {
    // Markdown wraps a standalone image in a paragraph, but our img renderer
    // emits a <figure>, which is invalid inside <p> and breaks hydration.
    // Unwrap paragraphs whose only content is an image.
    const meaningful = node?.children?.filter(
      (c) => !(c.type === "text" && !c.value.trim())
    );
    if (
      meaningful?.length === 1 &&
      meaningful[0].type === "element" &&
      meaningful[0].tagName === "img"
    ) {
      return <>{children}</>;
    }
    return (
      <p className="text-slate-600 text-sm leading-relaxed font-normal">
        {children}
      </p>
    );
  },
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
  img: ({ src, alt, title }) => {
    const embed = getMediaEmbed(src);

    if (embed) {
      return (
        <MediaEmbed
          src={embed.iframeSrc}
          title={title ?? alt ?? `${embed.provider} embed`}
          provider={embed.provider}
          aspectClassName={embed.aspectClassName}
          allow={embed.allow}
          sourceUrl={embed.sourceUrl}
        />
      );
    }

    return (
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
    );
  },
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
    const code = String(children).replace(/\n$/, "");

    if (!language) {
      return (
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.88em] font-semibold text-slate-800">
          {children}
        </code>
      );
    }

    if (language.toLowerCase() === "mermaid") {
      return <MermaidDiagram chart={code} />;
    }

    return (
      <figure className="my-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-xs">
        <figcaption className="border-b border-white/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300">
          {language}
        </figcaption>
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">
          <code>{code}</code>
        </pre>
      </figure>
    );
  },
  pre: ({ children }) => <>{children}</>,
};

export function MarkdownContent({
  content,
  components,
}: {
  content: string;
  components?: Components;
}) {
  // Escape literal dollar signs followed by a digit (like $720 or US$578m)
  // to prevent remark-math from incorrectly parsing them as math blocks.
  // We match a $ that is:
  // - Not preceded by \ or $ (to avoid double escaping or breaking double dollars $$)
  // - Not followed by $ (to avoid breaking double dollars $$)
  // - Followed by optional spaces and a digit (which indicates currency/numbers, not variables or LaTeX math)
  const escapedContent = content.replace(/(?<![\$\\])\$(?![\$])(?=\s*\d)/g, "\\$");

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[
        rehypeRaw,
        [
          rehypeSanitize,
          {
            ...defaultSchema,
            attributes: {
              ...defaultSchema.attributes,
              code: [
                ...(defaultSchema.attributes?.code || []),
                ["className", /^language-./, "math-inline", "math-display"],
              ],
              span: [
                ...(defaultSchema.attributes?.span || []),
                ["className", "math", "math-inline", "math-display"],
              ],
              div: [
                ...(defaultSchema.attributes?.div || []),
                ["className", "math", "math-display"],
              ],
            },
          },
        ],
        rehypeKatex,
      ]}
      components={{ ...markdownComponents, ...components }}
    >
      {escapedContent}
    </ReactMarkdown>
  );
}

