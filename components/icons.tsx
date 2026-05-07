import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

// names of svgs that exist in /public/icons/ directory
// keep in sync with the actual files - only listed names get the file path.
const FILE_ICONS = new Set([
  "bike",
  "check",
  "close",
  "cloud",
  "coffee",
  "location",
  "part-cloud",
  "rain",
  "settings",
  "sun",
  "wind",
]);

// inline fallbacks for icons we don't have on disk (yet).
const INLINE_FALLBACKS: Record<string, React.FC<P>> = {
  shoe: ShoeInline,
  note: NoteInline,
  sparkle: SparkleInline,
};

type IconProps = {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
};

export function Icon({ name, size = 20, className, alt = "" }: IconProps) {
  if (FILE_ICONS.has(name)) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={`/icons/${name}.svg`}
        alt={alt}
        width={size}
        height={size}
        className={className}
      />
    );
  }

  const Inline = INLINE_FALLBACKS[name];
  if (Inline) {
    return <Inline width={size} height={size} className={className} />;
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(`Icon "${name}" missing - add to /public/icons/ or INLINE_FALLBACKS`);
  }
  return null;
}

// ---------- inline fallbacks ----------

function ShoeInline(props: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.5 13.75s1.25 0 2.5.83c1.25.84 2.5.84 3.75.84h7.5a1.67 1.67 0 0 0 1.67-1.67v-.83a.83.83 0 0 0-.84-.84h-3.33L11.67 9.17l-2.09.83-1.25-2.08-1.66.83v2.5a.83.83 0 0 1-.84.83h-2.5a.83.83 0 0 0-.83.83v.84ZM5 17.5h10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NoteInline(props: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M8.3 14.6a2.1 2.1 0 1 1-4.1 0 2.1 2.1 0 0 1 4.1 0Zm0 0V5.8L16.7 3.75v8.75m0 0a2.1 2.1 0 1 1-4.2 0 2.1 2.1 0 0 1 4.2 0Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleInline(props: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 2.5 11.5 7.5 16.5 9 11.5 10.5 10 15.5 8.5 10.5 3.5 9 8.5 7.5 10 2.5ZM15.8 13.3l.7 1.5 1.4.6-1.4.6-.7 1.5-.6-1.5-1.5-.6 1.5-.6.6-1.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
