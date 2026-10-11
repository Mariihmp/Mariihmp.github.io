import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import { Tag } from "@/components/Tag";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Markdown from "react-markdown";

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h1 className="text-xl font-bold text-nano-text mb-4">Post not found</h1>
        <Link to="/blog" className="text-sm text-nano-accent hover:text-nano-accent-hover">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1 text-sm text-nano-text-secondary hover:text-nano-text transition-colors mb-8"
      >
        <ArrowLeft className="w-3 h-3" /> Back to blog
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="font-display font-normal text-nano-text tracking-tight text-3xl md:text-[2.6rem] leading-tight text-balance mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-nano-text-secondary mb-3">
            <time className="font-mono tabular-nums text-xs">
              {format(new Date(post.date), "MMMM dd, yyyy")}
            </time>
            <span>·</span>
            <span className="text-xs">{post.readingTime}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </header>

        <div className="prose-nano">
          <Markdown
            components={{
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              code: ({ className, children }) => {
                const isBlock = className?.includes("language-");
                if (isBlock) {
                  return (
                    <pre>
                      <code>{children}</code>
                    </pre>
                  );
                }
                return <code>{children}</code>;
              },
              // ![alt](video.mp4 "caption") plays a looping video; a .webm with the same name is offered first
              img: ({ src, alt, title }) => {
                const isVideo = typeof src === "string" && /\.mp4$/i.test(src);
                return (
                  <span className="media">
                    {isVideo ? (
                      <video autoPlay muted loop playsInline controls aria-label={alt}>
                        <source src={src.replace(/\.mp4$/i, ".webm")} type="video/webm" />
                        <source src={src} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={src} alt={alt ?? ""} loading="lazy" />
                    )}
                    {title && <span className="media-caption">{title}</span>}
                  </span>
                );
              },
              blockquote: ({ children }) => <blockquote>{children}</blockquote>,
              hr: () => <hr />,
              table: ({ children }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="text-left p-2 border-b-2 border-nano-border font-semibold text-nano-text">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="p-2 border-b border-nano-border text-nano-text-secondary">
                  {children}
                </td>
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
    </div>
  );
}
