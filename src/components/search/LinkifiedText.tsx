import Link from "next/link";
import { Fragment } from "react";

/** Renders plain text, turning any `[label](/relative-path)` markdown links into real links. */
export function LinkifiedText({ text }: { text: string }) {
  const markdownLink = /\[([^\]]+)\]\((\/[^\s)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = markdownLink.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    parts.push(
      <Link key={key++} href={match[2]} className="text-plum underline font-medium">
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);

  return <>{parts}</>;
}
