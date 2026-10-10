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
    id: "llm-safety-eval",
    title: "LLM Safety Evaluation Framework",
    description:
      "A comprehensive framework for evaluating safety properties of large language models including toxicity, bias, and adversarial robustness.",
    longDescription: `Built a modular evaluation pipeline that tests LLMs across multiple safety dimensions. The framework supports custom red-teaming prompts, automated scoring with GPT-4 as judge, and generates detailed safety reports with actionable recommendations.

Key features include:
- Automated red-teaming with 500+ adversarial prompts
- Multi-dimensional safety scoring (toxicity, bias, hallucination, privacy)
- Integration with HuggingFace model hub for easy model loading
- CI/CD pipeline for continuous safety monitoring
- Interactive dashboard for exploring evaluation results`,
    techStack: ["Python", "PyTorch", "HuggingFace", "Gradio", "FastAPI", "Docker"],
    github: "https://github.com/Mariihmp/llm-safety-eval",
    demo: "https://huggingface.co/spaces/yourusername/safety-eval",
    featured: true,
    date: "2024-11-15",
    category: "ai-safety",
  },
  {
    id: "ml-pipeline-orchestrator",
    title: "ML Pipeline Orchestrator",
    description:
      "Production-grade ML pipeline orchestration tool with experiment tracking, model versioning, and automated deployment.",
    longDescription: `Designed and built a lightweight ML pipeline orchestrator that handles the full lifecycle from data ingestion to model deployment. Features include automatic experiment tracking, model registry, A/B testing support, and rollback capabilities.

The system processes 10M+ predictions daily with 99.9% uptime.`,
    techStack: ["Python", "Kubernetes", "MLflow", "Airflow", "PostgreSQL", "Redis"],
    github: "https://github.com/Mariihmp/ml-orchestrator",
    featured: true,
    date: "2024-09-20",
    category: "mlops",
  },
  {
    id: "interpretability-toolkit",
    title: "Neural Network Interpretability Toolkit",
    description:
      "Open-source toolkit for mechanistic interpretability of transformer models with interactive visualizations.",
    longDescription: `A research toolkit that implements various interpretability techniques for transformer architectures. Includes attention head visualization, activation patching, probing classifiers, and circuit analysis tools.

Used in 3 published research papers and adopted by 2 university research labs.`,
    techStack: ["Python", "PyTorch", "TransformerLens", "Plotly", "Streamlit"],
    github: "https://github.com/Mariihmp/interp-toolkit",
    demo: "https://huggingface.co/spaces/yourusername/interp-viz",
    huggingface: "https://huggingface.co/yourusername/interp-toolkit",
    featured: true,
    date: "2024-07-10",
    category: "research",
  },
  {
    id: "drift-detector",
    title: "Real-time Data Drift Detector",
    description:
      "Monitors ML model inputs in production for distribution shifts and triggers automated retraining workflows.",
    longDescription: `Built a real-time monitoring system that detects data drift using statistical tests (KS, PSI, MMD) and automatically triggers retraining pipelines when drift exceeds configurable thresholds.`,
    techStack: ["Python", "Kafka", "Prometheus", "Grafana", "scikit-learn"],
    github: "https://github.com/Mariihmp/drift-detector",
    featured: false,
    date: "2024-05-01",
    category: "mlops",
  },
  {
    id: "paper-qa",
    title: "Research Paper Q&A Bot",
    description:
      "RAG-based system for querying ML research papers with citation-aware responses.",
    longDescription: `An intelligent Q&A system built on top of a RAG architecture that can answer questions about ML research papers. Features semantic search over paper embeddings, citation-aware response generation, and source attribution.`,
    techStack: ["Python", "LangChain", "ChromaDB", "OpenAI", "FastAPI"],
    github: "https://github.com/Mariihmp/paper-qa",
    demo: "https://paper-qa.yourdomain.com",
    featured: false,
    date: "2024-03-15",
    category: "ml",
  },
];
