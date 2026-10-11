import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";
import { Tag } from "@/components/Tag";
import { Github, ExternalLink } from "lucide-react";

const categories = [
  { value: null, label: "All" },
  { value: "ai-safety", label: "AI Safety" },
  { value: "ml", label: "ML" },
  { value: "research", label: "Research" },
  { value: "tools", label: "Tools" },
] as const;

export function Projects() {
  const [activeCat, setActiveCat] = useState<Project["category"] | null>(null);

  const filtered = activeCat
    ? projects.filter((p) => p.category === activeCat)
    : projects;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <h1 className="font-display font-normal text-nano-text tracking-tight text-4xl md:text-5xl mb-3">Projects</h1>
      <p className="text-sm text-nano-text-secondary mb-8">
        Research audits, evaluations, simulations, a game, and some ML along the way.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Tag
            key={cat.label}
            label={cat.label}
            onClick={() => setActiveCat(cat.value as Project["category"] | null)}
            active={activeCat === cat.value}
            size="md"
          />
        ))}
      </div>

      <div className="space-y-8">
        {filtered.map((project) => (
          <article key={project.id} className="group">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-base font-medium text-nano-text group-hover:text-nano-accent transition-colors"
                >
                  {project.title}
                </Link>
                <p className="text-sm text-nano-text-secondary mt-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.techStack.map((tech) => (
                    <Tag key={tech} label={tech} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 pt-1">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nano-text-secondary hover:text-nano-text transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nano-text-secondary hover:text-nano-text transition-colors"
                    aria-label="Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-nano-text-secondary text-center py-8">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
