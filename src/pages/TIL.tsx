import { tilEntries } from "@/data/til";
import { Tag } from "@/components/Tag";
import { format } from "date-fns";
import { Lightbulb } from "lucide-react";
import { useState } from "react";

export function TIL() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(tilEntries.flatMap((t) => t.tags)));
  const filtered = activeTag
    ? tilEntries.filter((t) => t.tags.includes(activeTag))
    : tilEntries;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h1 className="font-display font-normal text-nano-text tracking-tight text-4xl md:text-5xl">Today I Learned</h1>
      </div>
      <p className="text-sm text-nano-text-secondary mb-8">
        Short notes on things I picked up while reading and researching.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        <Tag
          label="All"
          onClick={() => setActiveTag(null)}
          active={activeTag === null}
          size="md"
        />
        {allTags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            active={activeTag === tag}
            size="md"
          />
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((til) => (
          <article
            key={til.id}
            className="border-l-2 border-nano-border pl-4 hover:border-nano-accent transition-colors"
          >
            <time className="text-xs text-nano-text-secondary font-mono tabular-nums">
              {format(new Date(til.date), "MMM dd, yyyy")}
            </time>
            <h3 className="text-sm font-medium text-nano-text mt-1">
              {til.title}
            </h3>
            <p className="text-sm text-nano-text-secondary mt-1 leading-relaxed">
              {til.content}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {til.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-nano-text-secondary text-center py-8">
          No entries for this tag.
        </p>
      )}
    </div>
  );
}
