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
];
