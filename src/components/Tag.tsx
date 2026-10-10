interface TagProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
  size?: "sm" | "md";
}

export function Tag({ label, onClick, active, size = "sm" }: TagProps) {
  const base =
    size === "sm"
      ? "text-xs px-2 py-0.5 rounded"
      : "text-sm px-2.5 py-1 rounded-md";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${base} transition-colors ${
          active
            ? "bg-nano-accent text-nano-bg"
            : "bg-nano-tag-bg text-nano-tag-text hover:bg-nano-accent/25"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={`${base} bg-nano-tag-bg text-nano-tag-text`}>
      {label}
    </span>
  );
}
