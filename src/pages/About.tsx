import { Link } from "react-router-dom";
import { SITE, SOCIAL_LINKS } from "@/data/site";
import { ExternalLink } from "lucide-react";
import { Tag } from "@/components/Tag";

const interests = [
  {
    title: "Digital minds",
    text: "When could an AI system be a moral patient, and how would we know? Consciousness indicators, AI welfare, and how models talk about their own possible feelings.",
  },
  {
    title: "Cooperative AI",
    text: "How AI agents cooperate, collude or fail in social dilemmas, and what makes cooperation between agents good for the humans they act for.",
  },
  {
    title: "Animal welfare",
    text: "Evidence for sentience in animals we can't ask, moral weights under uncertainty, and what that toolkit teaches us about AI.",
  },
  {
    title: "Evaluations and audits",
    text: "Black-box audits for hidden objectives, sycophancy and manipulation, and whether models' stated preferences are even consistent.",
  },
];

const skills = {
  "ML & AI": ["PyTorch", "TensorFlow / Keras", "HuggingFace", "scikit-learn", "Time series"],
  "AI safety research": ["LLM evaluation", "LLM-as-judge", "Black-box auditing", "Study design", "Red-teaming"],
  "Engineering": ["Python", "TypeScript", "React", "Streamlit", "SQL", "R"],
};

const writing = [
  {
    title: "We Made a Map of the Doom Debate",
    venue: "LessWrong",
    url: "https://www.lesswrong.com/posts/dZZD5Lviid2mALAZL/we-made-a-map-of-the-doom-debate",
  },
];

export function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <h1 className="font-display text-4xl md:text-5xl font-normal text-nano-text mb-8">About</h1>

      {/* Bio */}
      <div className="prose-nano mb-10">
        <p>
          I'm Maryam Hampaei, an ML and AI safety researcher. I'm a former AI Safety Camp fellow and
          have worked as an ML engineer and data scientist in fintech.
        </p>
        <p>
          My research sits where machine learning meets philosophy: I study <strong>digital minds</strong>,{" "}
          <strong>cooperative AI</strong> and <strong>animal welfare</strong>. In practice that means building
          evaluations and audits for language models, and writing about how we should act when we're unsure
          which minds matter.
        </p>
        <p>
          I like collaborating on fun, challenging projects and contributing to open source. If any of this
          overlaps with what you're working on, I'd love to hear from you.
        </p>
      </div>

      {/* Interests */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-nano-text mb-4">What I work on</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {interests.map((i) => (
            <div key={i.title} className="glass rounded-xl p-4">
              <h3 className="text-sm font-semibold text-nano-accent mb-1">{i.title}</h3>
              <p className="text-sm text-nano-text-secondary leading-relaxed">{i.text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-nano-text-secondary mt-4">
          See my <Link to="/projects" className="text-nano-accent hover:text-nano-accent-hover">projects</Link> and{" "}
          <Link to="/blog" className="text-nano-accent hover:text-nano-accent-hover">blog</Link> for more.
        </p>
      </section>

      <hr className="border-nano-border mb-10" />

      {/* Writing */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-nano-text mb-4">Writing elsewhere</h2>
        <ul className="space-y-3">
          {writing.map((w) => (
            <li key={w.url}>
              <a
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 text-sm text-nano-text hover:text-nano-accent transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 mt-0.5 shrink-0 text-nano-text-secondary group-hover:text-nano-accent" />
                <span>
                  {w.title} <span className="text-nano-text-secondary">· {w.venue}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-nano-border mb-10" />

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-nano-text mb-4">Skills</h2>
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

      {/* Contact */}
      <section>
        <h2 className="text-lg font-semibold text-nano-text mb-4">Get in touch</h2>
        <p className="text-sm text-nano-text-secondary mb-4">{SITE.status}.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SOCIAL_LINKS.map(({ label, href, handle, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="glass flex items-center gap-3 p-3 rounded-lg hover:border-nano-accent/50 transition-colors"
            >
              <Icon className="w-4 h-4 text-nano-text-secondary" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-nano-text">{label}</div>
                <div className="text-xs text-nano-text-secondary truncate">{handle}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
