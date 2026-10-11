import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import { Tag } from "@/components/Tag";
import { format } from "date-fns";

export function Blog() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

  const filtered = activeTag
    ? blogPosts.filter((p) => p.tags.includes(activeTag))
    : blogPosts;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <h1 className="font-display font-normal text-nano-text tracking-tight text-4xl md:text-5xl mb-3">Blog</h1>
      <p className="text-sm text-nano-text-secondary mb-8">
        Essays and notes on digital minds, cooperative AI, animal welfare and AI safety.
      </p>

      {/* Tag filters */}
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

      {/* Post list */}
      <div className="space-y-6">
        {filtered.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="block group"
          >
            <article>
              <div className="flex items-center gap-3 mb-1">
                <time className="text-xs text-nano-text-secondary font-mono tabular-nums">
                  {format(new Date(post.date), "MMM dd, yyyy")}
                </time>
                <span className="text-xs text-nano-text-secondary">·</span>
                <span className="text-xs text-nano-text-secondary">{post.readingTime}</span>
              </div>
              <h2 className="text-base font-medium text-nano-text group-hover:text-nano-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-nano-text-secondary mt-1 line-clamp-2">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-nano-text-secondary text-center py-8">
          No posts found for this tag.
        </p>
      )}
    </div>
  );
}
