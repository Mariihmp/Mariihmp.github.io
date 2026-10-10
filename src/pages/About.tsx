import { SITE } from "@/data/site";
import { contributions, talks } from "@/data/contributions";
import { Github, Linkedin, Twitter, Mail, ExternalLink, Calendar, Presentation } from "lucide-react";
import { Tag } from "@/components/Tag";

const skills = {
  "ML & AI": ["PyTorch", "TensorFlow", "HuggingFace", "LangChain", "scikit-learn", "JAX"],
  "MLOps & Infrastructure": ["Kubernetes", "Docker", "MLflow", "Airflow", "Kafka", "Redis"],
  "Languages": ["Python", "TypeScript", "Rust", "SQL", "Bash"],
  "AI Safety": ["RLHF", "Constitutional AI", "Interpretability", "Red-teaming", "Evaluation"],
  "Data & Cloud": ["PostgreSQL", "BigQuery", "AWS", "GCP", "Spark", "dbt"],
};

export function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <h1 className="text-2xl font-bold text-nano-text mb-6">About</h1>

      {/* Bio */}
      <div className="prose-nano mb-10">
        <p>
          Hi! I'm an ML Engineer focused on building reliable ML systems and advancing AI safety research.
          I'm particularly interested in the intersection of MLOps and AI alignment — how do we not just
          deploy models, but deploy them <strong>safely</strong>?
        </p>
        <p>
          Currently, I'm working on evaluation frameworks for large language models, with a focus on
          detecting harmful behaviors, measuring robustness, and building interpretability tools
          that help us understand what models are actually doing under the hood.
        </p>
        <p>
          Previously, I built production ML pipelines processing millions of predictions daily,
          and I contribute to several open-source projects in the ML ecosystem. I believe that
          open-source tools and transparent research are essential for safe AI development.
        </p>
        <p>
         
        </p>
      </div>

      <hr className="border-nano-border mb-10" />

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-nano-text mb-4">Skills & Technologies</h2>
        <div className="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-nano-text-secondary uppercase tracking-wider mb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <Tag key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-nano-border mb-10" />

      {/* Open Source Contributions */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-nano-text mb-4">Open Source Contributions</h2>
        <div className="space-y-4">
          {contributions.map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 shrink-0">
                <Github className="w-4 h-4 text-nano-text-secondary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={c.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-nano-accent hover:text-nano-accent-hover"
                  >
                    {c.repo}
                  </a>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      c.type === "feature"
                        ? "bg-green-400/15 text-green-300"
                        : c.type === "bugfix"
                        ? "bg-red-400/15 text-red-300"
                        : c.type === "docs"
                        ? "bg-blue-400/15 text-blue-300"
                        : "bg-purple-400/15 text-purple-300"
                    }`}
                  >
                    {c.type}
                  </span>
                  <span className="text-xs text-nano-text-secondary">
                    {c.prs} PR{c.prs > 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-sm text-nano-text-secondary mt-0.5">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-nano-border mb-10" />

      {/* Talks */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Presentation className="w-5 h-5 text-nano-text-secondary" />
          <h2 className="text-lg font-semibold text-nano-text">Talks & Presentations</h2>
        </div>
        <div className="space-y-5">
          {talks.map((talk, i) => (
            <article key={i}>
              <h3 className="text-sm font-medium text-nano-text">{talk.title}</h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-nano-text-secondary">
                <Calendar className="w-3 h-3" />
                <span>{talk.event}</span>
                <span>·</span>
                <span>{talk.date}</span>
              </div>
              <p className="text-sm text-nano-text-secondary mt-1">{talk.description}</p>
              <div className="flex items-center gap-3 mt-2">
                {talk.slidesUrl && (
                  <a
                    href={talk.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-nano-accent hover:text-nano-accent-hover"
                  >
                    <ExternalLink className="w-3 h-3" /> Slides
                  </a>
                )}
                {talk.videoUrl && (
                  <a
                    href={talk.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-nano-accent hover:text-nano-accent-hover"
                  >
                    <ExternalLink className="w-3 h-3" /> Video
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <hr className="border-nano-border mb-10" />

      {/* Contact */}
      <section>
        <h2 className="text-lg font-semibold text-nano-text mb-4">Get in Touch</h2>
        <p className="text-sm text-nano-text-secondary mb-4">
          I'm always happy to chat about ML, AI safety, or potential collaborations.
          Feel free to reach out through any of these channels:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-3 p-3 border border-nano-border rounded-lg hover:bg-nano-tag-bg transition-colors"
          >
            <Mail className="w-4 h-4 text-nano-text-secondary" />
            <div>
              <div className="text-sm font-medium text-nano-text">Email</div>
              <div className="text-xs text-nano-text-secondary">{SITE.email}</div>
            </div>
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 border border-nano-border rounded-lg hover:bg-nano-tag-bg transition-colors"
          >
            <Github className="w-4 h-4 text-nano-text-secondary" />
            <div>
              <div className="text-sm font-medium text-nano-text">GitHub</div>
              <div className="text-xs text-nano-text-secondary">@Mariihmp</div>
            </div>
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 border border-nano-border rounded-lg hover:bg-nano-tag-bg transition-colors"
          >
            <Linkedin className="w-4 h-4 text-nano-text-secondary" />
            <div>
              <div className="text-sm font-medium text-nano-text">LinkedIn</div>
              <div className="text-xs text-nano-text-secondary">Connect with me</div>
            </div>
          </a>
          <a
            href={SITE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 border border-nano-border rounded-lg hover:bg-nano-tag-bg transition-colors"
          >
            <Twitter className="w-4 h-4 text-nano-text-secondary" />
            <div>
              <div className="text-sm font-medium text-nano-text">Twitter / X</div>
              <div className="text-xs text-nano-text-secondary">@yourusername</div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
