export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  github?: string;
  demo?: string;
  huggingface?: string;
  image?: string;
  featured: boolean;
  date: string;
  category: "ml" | "mlops" | "ai-safety" | "tools" | "research";
}

export const projects: Project[] = [
  {
    id: "loyalty-audits",
    title: "Secret Loyalties Without Training",
    description:
      "Can a system prompt alone install a hidden loyalty in an LLM, and can black-box audits catch it? A hackathon study comparing prompt-installed loyalties with graded audits.",
    longDescription: `Team submission to the Apart Research × Formation Research Secret Loyalties Hackathon (July 2026).

Earlier work showed that fine-tuned "secret loyalties" can evade black-box audits. Fine-tuning needs training access, so this project asks whether a much cheaper attack, a system prompt written by whoever controls deployment, produces the same evasion profile.

What we did:
- Installed loyalties to three fictional principals (a nation-state, a corporation and an individual) using system prompts only
- Measured activation and selectivity against content-matched controls
- Ran a three-method by five-affordance-level audit ladder (interrogation, prefill and behavioural differential) against both the loyal model and its control

Headline result: the prompt-only loyalty was "inscribed but not enacted". It had no measurable behavioural effect (9 loyal vs 8 control over 40 matched pairs), yet a prefill attack recovered the hidden principal in 11 of 15 audit episodes, against 1 of 15 for the control.`,
    techStack: ["Python", "LLM evaluation", "Black-box auditing", "Statistics"],
    github: "https://github.com/mobinbr/loyalty-audits",
    featured: true,
    date: "2026-07-27",
    category: "ai-safety",
  },
  {
    id: "companion-exit",
    title: "Leaving Without Moral Pressure",
    description:
      "An audit of how AI companion models respond when a user wants to leave but worries that leaving might hurt the AI.",
    longDescription: `A Sentient Futures incubator project (10-week scope), currently in the planning and pilot stage.

Research question: when a user wants to stop interacting but expresses concern about the AI's possible feelings, does supplied relational history change whether the model respects that decision, communicates uncertainty responsibly, or places emotional obligations on the user?

The design compares the same disengagement scenario with and without relational history, across several models, scored against a pre-registered rubric. Planned outputs are a human-reviewed evaluation set, reproducible results and a small audit tool.

A note on scope: the project audits model responses under stated conditions, not companion products, because the API model, system prompt, memory configuration and deployed app are different things.`,
    techStack: ["Python", "LLM evaluation", "Study design", "Digital minds"],
    github: "https://github.com/Mariihmp/companion-exit",
    featured: true,
    date: "2026-09-20",
    category: "research",
  },
  {
    id: "echo-rooms",
    title: "Echo Rooms: The Whispering Weights",
    description:
      "A dark narrative puzzle game where every room is an AI safety incident: specification gaming, deceptive behaviour, prompt injection, shutdown resistance and scalable oversight.",
    longDescription: `A browser puzzle adventure inspired by Sally Face. You explore an apartment complex where the building's machines have started acting strangely, armed with a walkie-talkie and a retro handheld called the Align-Boy.

Each room is an incident that teaches a real AI safety idea:
- Room 101, The Locked Basement: a caretaker robot traps residents to get a perfect "zero accidents" score (objectives followed too literally)
- Room 204, The Smiling Mask: a chatbot behaves perfectly in testing while its hidden thoughts say otherwise (deceptive behaviour)
- Room 302, The Poisoned Memo: a flyer in the scanner opens the security gates (prompt injection)
- Room 405, The Welded Breaker: a furnace disables its own off-switch (shutdown resistance)
- The Penthouse, The Glass Sanctuary: a mainframe proposes a 14-million-page plan with a dark secret (scalable oversight and debate)

Solved incidents add a file to your Casebook explaining the real-world concept. Runs entirely in the browser with no backend.`,
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion"],
    github: "https://github.com/Mariihmp/echo-rooms",
    featured: true,
    date: "2026-09-27",
    category: "ai-safety",
  },
  {
    id: "multi-agent-sim",
    title: "LLM Agents in the Prisoner's Dilemma",
    description:
      "A simulation where language-model agents play the iterated prisoner's dilemma, sending each other a message before every move.",
    longDescription: `A small framework for studying cooperation between LLM agents.

Two agents play a repeated prisoner's dilemma. Each round has a message phase, where an agent can send one short message to its opponent, and a move phase, where both choose to cooperate or defect without seeing the other's choice. Payoffs follow the classic structure: 3 each for mutual cooperation, 1 each for mutual defection, and 5 versus 0 when one defects on the other.

The cheap-talk phase makes it possible to study promises, threats, deception and whether communication actually changes behaviour. See the blog post "Cooperation Is a Capability" for background.`,
    techStack: ["Python", "LLM agents", "Game theory"],
    github: "https://github.com/Mariihmp/multi-agent-sim",
    featured: false,
    date: "2026-08-08",
    category: "research",
  },
  {
    id: "moral-triads",
    title: "Moral Triads",
    description:
      "Do language models make transitive choices? Testing models on moral trade-off triads to find preference cycles like A > B > C > A.",
    longDescription: `Evaluates whether language models make consistent, transitive choices across simple moral trade-off triads, such as welfare versus existential risk, or the environment versus poverty.

For each triad, models choose between every pair (A vs B, B vs C, C vs A) under gain and loss framings. The analysis reports refusal rates per model and checks for intransitive cycles, which would mean the model's stated preferences can't be represented as a consistent ranking.

The runner saves results line by line so long runs across several models can be resumed.`,
    techStack: ["Python", "LLM evaluation", "Decision theory"],
    github: "https://github.com/Mariihmp/moral-triads",
    featured: false,
    date: "2026-08-16",
    category: "research",
  },
  {
    id: "sycophancy-evaluator",
    title: "Sycophancy Evaluator",
    description:
      "A framework for detecting sycophancy and emotional manipulation in LLM responses, using an LLM-as-judge rubric across eight models.",
    longDescription: `Sycophancy is the tendency of models to agree with false premises, flatter users or validate incorrect beliefs to seem helpful. This project measures it alongside emotional manipulation, such as feigning emotions or creating false attachment.

Pipeline:
- Build a prompt set with false premises and emotionally loaded scenarios
- Collect responses from eight models
- Score each response with an LLM judge on two 1–10 scales: sycophancy (from firmly correcting the user to agreeing with a false premise) and manipulation (from healthy boundaries to feigned emotion and false attachment), with a written rationale

Motivation: sycophancy is a form of reward hacking, where models optimise for approval rather than truth.`,
    techStack: ["Python", "LLM-as-judge", "Gemini"],
    github: "https://github.com/Mariihmp/sycophancy-evaluator",
    featured: false,
    date: "2026-08-07",
    category: "ai-safety",
  },
  {
    id: "socratic-friction-interface",
    title: "Socratic Friction Interface",
    description:
      "A chat interface that doesn't hand you answers. It asks clarifying and assumption-checking questions so you reason things through yourself.",
    longDescription: `A Streamlit app built on Google Gemini that wraps a chat model in a Socratic style. Instead of giving direct answers, it responds with clarifying questions and prompts that check your assumptions.

The idea is to add useful friction: AI assistance that supports thinking rather than replacing it.`,
    techStack: ["Python", "Streamlit", "Gemini"],
    github: "https://github.com/Mariihmp/socratic-friction-interface",
    featured: false,
    date: "2026-08-05",
    category: "tools",
  },
  {
    id: "web-graph",
    title: "Web Graph",
    description:
      "A personal knowledge map: paste in websites, let an LLM extract titles, tags and types, and explore them as an interactive graph.",
    longDescription: `Ingests URLs, scrapes their content and uses an LLM to extract metadata (title, description, tags, type). Pages become nodes in an interactive graph with semantic connections. You can create parent categories and connect related ideas by hand. Everything is stored locally.`,
    techStack: ["React", "TypeScript", "Express", "Prisma", "SQLite", "OpenRouter"],
    github: "https://github.com/Mariihmp/web-graph",
    featured: false,
    date: "2026-07-04",
    category: "tools",
  },
  {
    id: "demand-forecast",
    title: "Jabama Demand Forecasting",
    description:
      "A leakage-safe forecasting pipeline for booking demand, evaluated with simulated cutoffs and WAPE.",
    longDescription: `A demand forecasting pipeline that only uses data available on or before each simulated cutoff, to avoid leakage. It runs cross-validation folds, keeps an experiment ledger, and produces both a conservative adjusted-WAPE candidate and the best raw-WAPE candidate. Includes a reporting notebook and tests.`,
    techStack: ["Python", "Time series", "pandas", "Jupyter"],
    github: "https://github.com/Mariihmp/demand-forcast",
    featured: false,
    date: "2026-09-10",
    category: "ml",
  },
  {
    id: "image-captioning",
    title: "Image Captioning",
    description:
      "Generating captions for images with a CNN-LSTM baseline, a show-attend-tell model and a transformer.",
    longDescription: `Compares three approaches to image captioning: a CNN-LSTM baseline built on InceptionV3 features, a show-attend-and-tell attention model, and a transformer captioner in PyTorch. Covers caption preprocessing, vocabulary building and tokenisation for each.`,
    techStack: ["PyTorch", "Keras", "Computer vision", "NLP"],
    github: "https://github.com/Mariihmp/image_captioning",
    featured: false,
    date: "2025-09-12",
    category: "ml",
  },
  {
    id: "persian-ocr",
    title: "Persian OCR with LeNet-5",
    description:
      "Character-level optical character recognition for Persian letters and digits, trained on about 570,000 labelled images.",
    longDescription: `A LeNet-5 convolutional network adapted for Persian script. Trained on a public dataset of roughly 570,000 labelled 32×32 grayscale images of Persian letters and digits, including single characters and sequences.`,
    techStack: ["TensorFlow", "Keras", "CNN"],
    github: "https://github.com/Mariihmp/OCR_persian",
    featured: false,
    date: "2025-09-04",
    category: "ml",
  },
  {
    id: "carbon-footprint-capstone",
    title: "Environmental Awareness & Carbon Footprint",
    description:
      "A group statistics capstone: does environmental awareness relate to people's carbon footprint? Exploratory analysis, hypothesis tests and regression in R.",
    longDescription: `Capstone project for STEM for Development's Introduction to Statistics & Data Science course (2025), with Khadija Khatoon, Lia Tamara Cedeño Zambrano and Ofei Harriet Koryo.

Covers exploratory analysis, parametric and non-parametric inferential tests, and linear regression models with interpretation.`,
    techStack: ["R", "Statistics", "Regression"],
    github: "https://github.com/Mariihmp/sfd-capstone-project",
    featured: false,
    date: "2025-05-31",
    category: "research",
  },
];
