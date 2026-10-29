import Image from "next/image";

type PhotoProps = {
  /** e.g. "/photos/x.jpg" for images/photos/x.jpg. Omit to show a labeled placeholder. */
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
};

/**
 * Fills its (relatively positioned) parent. Until real photography exists,
 * renders a styled placeholder captioned with what the photo should show.
 */
export function Photo({
  src,
  alt,
  className = "",
  sizes = "100vw",
  eager = false,
}: PhotoProps) {
  if (src) {
    return (
      <>
        <div className="photo-placeholder absolute inset-0" aria-hidden />
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className={`object-cover ${className}`.trim()}
        />
      </>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${alt}`}
      className={`photo-placeholder absolute inset-0 flex items-end ${className}`.trim()}
    >
      <div className="flex items-center gap-2 p-4 text-gold/70">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.3l1.4-2h7.6l1.4 2h2.3A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
        <span className="font-display text-[11px] uppercase tracking-[0.16em]">
          Photo · {alt}
        </span>
      </div>
    </div>
  );
}
