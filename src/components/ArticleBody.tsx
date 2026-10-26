import type { ReactNode } from "react";
import type { Block, Span } from "@/lib/cms";

// Renders Sanity rich text: headings, paragraphs, quotes, bullet/numbered lists, bold, italic and links.

function renderSpan(span: Span, block: Block): ReactNode {
  let node: ReactNode = span.text;
  for (const mark of span.marks ?? []) {
    if (mark === "strong") node = <strong>{node}</strong>;
    else if (mark === "em") node = <em>{node}</em>;
    else {
      const def = block.markDefs?.find((d) => d._key === mark);
      if (def?.href) {
        const external = /^https?:\/\//.test(def.href);
        node = <a href={def.href} className="font-semibold text-spark-dark underline" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{node}</a>;
      }
    }
  }
  return node;
}

function renderBlock(block: Block, i: number): ReactNode {
  const content = block.children.map((s, j) => <span key={s._key ?? j}>{renderSpan(s, block)}</span>);
  switch (block.style) {
    case "h2": return <h2 key={block._key ?? i} className="mt-8 text-2xl font-bold tracking-tight">{content}</h2>;
    case "h3": return <h3 key={block._key ?? i} className="mt-6 text-xl font-bold">{content}</h3>;
    case "blockquote": return <blockquote key={block._key ?? i} className="my-5 border-l-4 border-spark pl-4 text-lg font-medium">{content}</blockquote>;
    default: return <p key={block._key ?? i} className="mt-4 leading-relaxed text-ink-soft">{content}</p>;
  }
}

export default function ArticleBody({ body }: { body: Block[] }) {
  const out: ReactNode[] = [];
  for (let i = 0; i < body.length; i++) {
    const b = body[i];
    if (b.listItem) {
      // Group consecutive list items into one list.
      const kind = b.listItem;
      const items: Block[] = [];
      while (i < body.length && body[i].listItem === kind) items.push(body[i++]);
      i--;
      const Tag = kind === "number" ? "ol" : "ul";
      out.push(
        <Tag key={b._key ?? i} className={`mt-4 space-y-1.5 pl-6 text-ink-soft ${kind === "number" ? "list-decimal" : "list-disc"}`}>
          {items.map((it, j) => <li key={it._key ?? j}>{it.children.map((s, k) => <span key={s._key ?? k}>{renderSpan(s, it)}</span>)}</li>)}
        </Tag>,
      );
    } else out.push(renderBlock(b, i));
  }
  return <div className="max-w-3xl">{out}</div>;
}
