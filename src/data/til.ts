export interface TILEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export const tilEntries: TILEntry[] = [
  {
    id: "til-tit-for-tat",
    title: "The winner of Axelrod's tournament was the shortest program",
    content:
      "In Robert Axelrod's 1980 iterated prisoner's dilemma tournaments, the winner was tit-for-tat, submitted by Anatol Rapoport: cooperate first, then copy the other player's last move. It was the simplest entry, and it won both rounds. Axelrod's summary of why: be nice, retaliate, forgive, and be easy to read.",
    date: "2026-10-09",
    tags: ["Cooperative AI", "Game Theory"],
  },
  {
    id: "til-spatial-cooperation",
    title: "Cooperation can survive with no memory at all, if space is structured",
    content:
      "Nowak and May (1992) put memoryless always-cooperate and always-defect players on a grid, each copying its best-scoring neighbour. Defectors don't simply take over: cooperators survive in clusters and protect each other at the edges. Who interacts with whom can matter as much as how clever the agents are.",
    date: "2026-10-06",
    tags: ["Cooperative AI", "Multi-Agent"],
  },
  {
    id: "til-sentience-act",
    title: "UK law recognises crabs, lobsters and octopuses as sentient",
    content:
      "The UK's Animal Welfare (Sentience) Act 2022 includes decapod crustaceans and cephalopod molluscs, not just vertebrates. This came directly from a 2021 LSE evidence review led by Jonathan Birch, which graded the evidence against eight criteria for sentience.",
    date: "2026-10-01",
    tags: ["Animal Welfare", "Policy"],
  },
  {
    id: "til-indicator-properties",
    title: "Consciousness researchers assess AI with a checklist of indicators, not a single test",
    content:
      "Butlin, Long et al. (2023) derived 14 indicator properties from theories like global workspace and higher-order theories, then checked AI systems against them. Their verdict: no current system was a strong candidate, but there are no obvious technical barriers to building one that has many of the indicators. The method assumes computational functionalism.",
    date: "2026-09-29",
    tags: ["Digital Minds", "Consciousness"],
  },
  {
    id: "til-ny-declaration",
    title: "The 2024 New York Declaration on Animal Consciousness",
    content:
      "Signed by many researchers, it says there is strong scientific support for conscious experience in mammals and birds, and at least a realistic possibility in all vertebrates and many invertebrates, including insects, decapods and cephalopods. Its key move: a realistic possibility is enough that ignoring it is irresponsible.",
    date: "2026-09-24",
    tags: ["Animal Welfare", "Consciousness"],
  },
  {
    id: "til-1",
    title: "PyTorch's torch.compile() reduces inference latency by 30-40%",
    content:
      "Discovered that `torch.compile()` with `mode='reduce-overhead'` can significantly reduce inference latency for transformer models. The first call has compilation overhead, but subsequent calls are much faster. Works best with static shapes.",
    date: "2024-11-12",
    tags: ["PyTorch", "Performance"],
  },
  {
    id: "til-2",
    title: "KV-cache quantization can halve memory usage with minimal quality loss",
    content:
      "INT8 quantization of the KV-cache in transformer inference reduces memory usage by ~50% with less than 0.1% degradation in perplexity. This is different from weight quantization — it targets the runtime attention cache.",
    date: "2024-11-08",
    tags: ["LLMs", "Optimization"],
  },
  {
    id: "til-3",
    title: "Great Expectations now supports Spark DataFrames natively",
    content:
      "Great Expectations v0.18+ has native Spark DataFrame support, meaning you can run data quality checks on distributed datasets without converting to Pandas first. Huge win for large-scale MLOps pipelines.",
    date: "2024-10-30",
    tags: ["MLOps", "Data Quality"],
  },
  {
    id: "til-4",
    title: "Activation patching reveals circuit structure in 15 lines of code",
    content:
      "Using TransformerLens, you can identify which attention heads are responsible for a specific behavior by patching activations from a clean run into a corrupted run. The heads that change the output the most are the important ones.",
    date: "2024-10-22",
    tags: ["Interpretability", "Research"],
  },
  {
    id: "til-5",
    title: "Docker multi-stage builds cut ML image sizes by 60%",
    content:
      "By using multi-stage Docker builds — compiling dependencies in a builder stage and copying only the runtime artifacts — I reduced our ML serving image from 4.2GB to 1.7GB. Key: separate build dependencies from runtime dependencies.",
    date: "2024-10-15",
    tags: ["Docker", "MLOps"],
  },
  {
    id: "til-6",
    title: "RLHF preference data quality matters more than quantity",
    content:
      "A recent Anthropic paper showed that 1,000 high-quality preference comparisons can outperform 10,000 noisy ones. Investing in annotator training and inter-annotator agreement metrics pays off significantly.",
    date: "2024-10-01",
    tags: ["RLHF", "AI Safety"],
  },
  {
    id: "til-7",
    title: "Python 3.12's type parameter syntax makes generics much cleaner",
    content:
      "Python 3.12 introduced `def func[T](x: T) -> T` syntax instead of the verbose `TypeVar` approach. Much more readable for typed ML codebases. Also supports `type` aliases with `type Vector = list[float]`.",
    date: "2024-09-20",
    tags: ["Python", "Developer Experience"],
  },
];
