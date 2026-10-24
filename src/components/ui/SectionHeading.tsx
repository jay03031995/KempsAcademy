interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-medium tracking-wide uppercase text-gold-dark">{eyebrow}</span>
      )}
      <h2 className="text-2xl md:text-3xl font-semibold text-plum">{title}</h2>
      {description && <p className="text-base text-charcoal-muted leading-relaxed">{description}</p>}
    </div>
  );
}
