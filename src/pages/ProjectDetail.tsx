import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { Tag } from "@/components/Tag";
import { format } from "date-fns";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Markdown from "react-markdown";

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h1 className="text-xl font-bold text-nano-text mb-4">Project not found</h1>
        <Link to="/projects" className="text-sm text-nano-accent hover:text-nano-accent-hover">
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1 text-sm text-nano-text-secondary hover:text-nano-text transition-colors mb-8"
      >
        <ArrowLeft className="w-3 h-3" /> Back to projects
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="font-display font-normal text-nano-text tracking-tight text-3xl md:text-[2.6rem] leading-tight text-balance mb-4">{project.title}</h1>
          <time className="text-xs text-nano-text-secondary font-mono tabular-nums">
            {format(new Date(project.date), "MMMM yyyy")}
          </time>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.techStack.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-nano-accent hover:text-nano-accent-hover"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-nano-accent hover:text-nano-accent-hover"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>
        </header>

        <div className="prose-nano">
          <Markdown>{project.longDescription}</Markdown>
        </div>

        {/* HuggingFace embed placeholder */}
        {project.huggingface && (
          <div className="mt-8 border border-nano-border rounded-lg p-6 bg-nano-surface">
            <h3 className="text-sm font-semibold text-nano-text mb-2">Interactive Demo</h3>
            <p className="text-sm text-nano-text-secondary mb-3">
              Try this project directly on HuggingFace Spaces:
            </p>
            <a
              href={project.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-nano-accent hover:text-nano-accent-hover"
            >
              <span>🤗</span> Open on HuggingFace Spaces
            </a>
            <div className="mt-4 bg-nano-bg rounded border border-nano-border p-8 text-center text-nano-text-secondary text-xs">
              <p>Gradio / Streamlit demo would be embedded here via iframe.</p>
              <p className="mt-1">Replace the URL in your project data to embed your actual Space.</p>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
