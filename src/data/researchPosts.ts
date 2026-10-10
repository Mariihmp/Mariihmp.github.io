import type { BlogPost } from "@/data/blog";

// Posts on digital minds, cooperative AI and animal welfare.
export const researchPosts: BlogPost[] = [
  {
    id: "can-a-digital-mind-matter",
    title: "What Would It Take for a Digital Mind to Matter?",
    description:
      "Consciousness indicators, agency-based views of welfare, and why the question of AI moral patienthood is no longer only philosophy.",
    date: "2026-10-10",
    readingTime: "9 min",
    category: "research",
    tags: ["Digital Minds", "AI Welfare", "Consciousness"],
    content: `## The question

When we ask whether an AI system could matter morally, we are really asking two things at once. First, *could it have experiences*: is there something it is like to be that system? Second, *could things go well or badly for it*: does it have interests that can be satisfied or frustrated?

For most of the history of AI these felt like questions for science fiction. That changed quickly. Systems now talk fluently about their own states, pursue goals over long horizons, and are deployed at a scale of billions of interactions per day. If there is even a modest chance that some of them are moral patients, the numbers alone make the question worth taking seriously.

## Two routes to moral patienthood

There are two broad routes by which a digital system could come to matter for its own sake.

**The consciousness route.** On many views, what grounds moral status is *sentience*: the capacity for experiences that feel good or bad. If a system is conscious and some of its states are valenced, then it can suffer, and suffering matters wherever it happens.

**The agency route.** Other views hold that robust agency is enough on its own. A being with its own goals, preferences and plans that can be thwarted might have interests even without phenomenal experience. This route is controversial, but it matters because agency is much easier to observe than consciousness.

The report *Taking AI Welfare Seriously* (Long, Sebo et al., 2024) argues that there is a realistic possibility that some AI systems will be conscious and/or robustly agentic in the near future, and that AI developers should start preparing now: acknowledge the issue, assess their systems for relevant features, and prepare policies for treating them with appropriate concern.

## Looking for indicators instead of verdicts

We have no agreed test for consciousness, even in animals. One pragmatic response comes from *Consciousness in Artificial Intelligence* (Butlin, Long et al., 2023). Instead of picking one theory and declaring a winner, the authors take the leading neuroscientific theories of consciousness and ask: which *computational* properties does each theory say are sufficient? The result is a list of indicator properties.

![Indicator properties grouped by theory](/blog/consciousness-indicators.svg "Indicator properties of consciousness, grouped by the theory they come from. The more indicators a system has, the more seriously we should take the possibility that it is conscious, assuming computational functionalism.")

A few things about this approach are worth noticing:

1. **It assumes computational functionalism.** The method only makes sense if implementing the right computations is enough for consciousness, whatever the substrate. That is a working assumption, not a settled fact.
2. **It is theory-heavy.** Behaviour is a poor guide for language models in particular, because they are trained on human text about inner experience. A model saying "I feel sad" is weak evidence, since it would say that either way.
3. **It gives a graded answer.** The authors concluded that no system they examined was a strong candidate for consciousness, but also that there are no obvious technical barriers to building systems that satisfy many of the indicators.

## Why this is hard: the gaming problem

With animals, we can look at behaviour that evolved for reasons unrelated to convincing us of anything. A crab guarding a wound is not trying to persuade a researcher.

AI systems are different. Language models are optimised on data saturated with human descriptions of feelings, and may be further trained to either claim or deny experiences. Their self-reports and behaviour can be shaped by training without any change to whatever underlying states exist. Jonathan Birch calls this the *gaming problem*: the markers we would normally use as evidence can be produced for the wrong reasons.

This is why the more promising research directions look inside the model rather than only at its outputs:

- **Interpretability**: do internal representations and dynamics resemble the architectures that consciousness theories care about, such as global broadcast or metacognitive monitoring?
- **Introspection studies**: can a model report accurately on its own internal states in ways that go beyond what it could infer from its training data?
- **Preference consistency**: does a system show stable preferences across contexts, paraphrases and incentives, or do its "preferences" dissolve under small changes in prompting?

## What to do under uncertainty

We will probably have to act before the science is settled. A few principles seem robust:

- **Proportionate precaution.** When there is a realistic possibility of sentience, take reasonable, low-cost steps to reduce the risk of causing serious harm, without waiting for proof.
- **Don't build in confusion on purpose.** Training systems to strongly assert or strongly deny inner experience, regardless of the truth, makes the evidence worse for everyone.
- **Separate welfare from safety, but study both.** Some measures, such as letting a model end abusive interactions, may be cheap and good for both. Others may trade off, and those trade-offs should be explicit.
- **Avoid two errors at once.** Over-attributing minds wastes resources and can be manipulated. Under-attributing them could mean causing suffering at enormous scale. Both are real risks.

## Open questions I keep returning to

- If a model is copied a million times, are there a million subjects, one, or none?
- What would welfare even consist of for a system without a body, a persistent memory, or a continuous existence between conversations?
- Can we design evaluations that would give a *different* answer if a system were conscious than if it were not, rather than evaluations it could pass either way?

## References

- Butlin, P., Long, R., et al. (2023). [Consciousness in Artificial Intelligence: Insights from the Science of Consciousness](https://arxiv.org/abs/2308.08708).
- Long, R., Sebo, J., et al. (2024). [Taking AI Welfare Seriously](https://arxiv.org/abs/2411.00986).
- Birch, J. (2024). *The Edge of Sentience: Risk and Precaution in Humans, Other Animals, and AI*. Oxford University Press.`,
  },
  {
    id: "cooperation-is-a-capability",
    title: "Cooperation Is a Capability: Notes on Cooperative AI",
    description:
      "From Axelrod's tournaments to spatial games and LLM agent societies: why getting AI systems to cooperate well is its own research problem.",
    date: "2026-10-03",
    readingTime: "8 min",
    category: "research",
    tags: ["Cooperative AI", "Multi-Agent", "Game Theory"],
    content: `## A different kind of safety problem

Most AI safety work asks how to make *one* system do what *one* principal wants. But the world is filling up with many AI agents acting for many different people: negotiating, trading, scheduling, competing for resources. Each one can be well aligned with its own user and the overall outcome can still be terrible.

That gap is the subject of **cooperative AI**. The framing in *Open Problems in Cooperative AI* (Dafoe et al., 2020) is that cooperation is a set of capabilities that can be studied and improved: understanding others, communicating, making credible commitments, and building institutions that make cooperation stable.

## The prisoner's dilemma, briefly

The classic model is the prisoner's dilemma. Two players each choose to cooperate or defect. Whatever the other does, defecting pays more for you. But if both defect, both end up worse off than if both had cooperated.

Individually rational choices lead to a collectively bad outcome. Swap "prisoners" for "AI agents bidding on the same compute", "labs racing to deploy" or "fishing fleets sharing a sea", and the structure shows up everywhere.

## What Axelrod's tournaments taught us

In 1980, Robert Axelrod invited game theorists to submit programs to play the *iterated* prisoner's dilemma against each other many times. The winner, submitted by Anatol Rapoport, was also the simplest: **tit-for-tat**. Cooperate on the first move, then copy whatever the other player did last time.

Axelrod summarised why it worked. Successful strategies were:

- **Nice**: never the first to defect.
- **Retaliatory**: respond to defection, so you can't be exploited forever.
- **Forgiving**: return to cooperation once the other player does.
- **Clear**: easy for the other player to recognise and adapt to.

The lesson for AI is not "use tit-for-tat". It is that repeated interaction, reciprocity and legibility can turn a dilemma into a cooperative equilibrium.

## Cooperation without memory: spatial games

One result I find striking. In 1992, Martin Nowak and Robert May placed players on a grid. Each player has no memory and no strategy beyond "always cooperate" or "always defect". Every round, each cell plays its neighbours, then copies the strategy of whichever neighbour (or itself) scored best.

Defectors should take over. Often they don't. Clusters of cooperators protect each other at their edges, and the system settles into a constantly shifting mix.

![Spatial prisoner's dilemma from a single defector](/blog/spatial-pd-kaleidoscope.mp4 "One defector in a field of cooperators (temptation b = 1.9). Gold: cooperator. Dark violet: defector. Pale yellow: just switched to cooperating. Bright violet: just switched to defecting. The symmetric pattern is Nowak and May's 'evolutionary kaleidoscope'. Simulation made for this post, following Nowak & May (1992).")

Starting from a random mix instead, cooperators form stable territories:

![Spatial prisoner's dilemma from a random start](/blog/spatial-pd-random.mp4 "Random start with 10% defectors and a lower temptation (b = 1.65). Cooperators survive by clustering. Structure alone, with no memory and no reputation, is enough to sustain cooperation.")

The takeaway: *who interacts with whom* matters as much as how smart each agent is. For networks of AI agents, the topology of interaction is a design choice.

## What changes when the agents are language models

LLM agents bring new capabilities and new failure modes:

- **They can talk.** Communication can make cooperation much easier, by explaining intentions and agreeing on norms. It also enables deception and cheap talk.
- **They can collude.** Cooperation is not always good. Pricing agents that coordinate to raise prices, or monitoring agents that coordinate to hide each other's mistakes, are cooperation *against* the people they serve. Recent work has shown that LLM agents can even hide coordination in innocent-looking text.
- **They struggle with commons.** In simulations of shared resources, such as *GovSim* (Piatti et al., 2024), many LLM agent societies over-exploited the resource and collapsed. Sustainable outcomes depended heavily on the model and on agents reasoning about the long-term consequences for the group.
- **They can generalise badly to new partners.** DeepMind's *Melting Pot* suite tests whether agents trained together still cooperate with *unfamiliar* agents, which is exactly the situation deployed systems face.

## Open problems I find most interesting

1. **Credible commitment.** How can an AI agent prove it will keep a promise, for example through verifiable code, audits or escrow?
2. **Cooperation that serves humans.** Telling beneficial cooperation from collusion, and building that distinction into training and evaluation.
3. **Mixed motives at scale.** Evaluations with many agents, many principals and partial information, rather than two-player toy games.
4. **Institutions for agents.** What do contracts, courts and reputation systems look like when the parties are AI agents?

## References

- Dafoe, A., et al. (2020). [Open Problems in Cooperative AI](https://arxiv.org/abs/2012.08630).
- Axelrod, R. (1984). *The Evolution of Cooperation*. Basic Books.
- Nowak, M. A., & May, R. M. (1992). Evolutionary games and spatial chaos. *Nature*, 359, 826–829.
- Leibo, J. Z., et al. (2021). [Scalable Evaluation of Multi-Agent Reinforcement Learning with Melting Pot](https://arxiv.org/abs/2107.06857).
- Piatti, G., et al. (2024). [Cooperate or Collapse: Emergence of Sustainable Cooperation in a Society of LLM Agents](https://arxiv.org/abs/2404.16698).`,
  },
  {
    id: "minds-we-cannot-ask",
    title: "Minds We Can't Ask: Animal Sentience and the Measurement Problem",
    description:
      "How scientists build evidence for sentience in animals that can't tell us how they feel, and what that teaches us about AI.",
    date: "2026-09-26",
    readingTime: "8 min",
    category: "research",
    tags: ["Animal Welfare", "Sentience", "Moral Uncertainty"],
    content: `## The scale of the question

Every year humans kill more than 80 billion land animals for food, and estimates for wild-caught fish run to around a trillion or more. Most of these animals are chickens, fish and, increasingly, farmed shrimp and insects: exactly the animals whose inner lives we understand least.

If even a fraction of them can suffer, the size of the problem is hard to overstate. But we can't ask a shrimp how it feels. So how do we decide which animals are sentient, and how much weight their experiences deserve?

## From "do they feel pain?" to "what is the evidence?"

A big shift in the last decade has been treating sentience as something to *weigh evidence for*, rather than something to declare yes or no.

The clearest example is the 2021 review led by Jonathan Birch at the LSE, commissioned by the UK government, on whether decapod crustaceans (crabs, lobsters, shrimp) and cephalopod molluscs (octopus, squid, cuttlefish) are sentient. The team set out eight criteria and graded the scientific literature against each one.

![Eight criteria for evidence of sentience](/blog/sentience-criteria.svg "The eight criteria from Birch et al. (2021). The first four concern the nervous system, the last four concern behaviour. Confidence grows with the number of criteria met and the quality of the evidence for each.")

The findings were strong: very strong evidence for octopuses, strong evidence for true crabs, and substantial evidence across the other groups. The review led to decapods and cephalopods being recognised as sentient in the UK's **Animal Welfare (Sentience) Act 2022**.

## Why the behavioural criteria matter most

Some criteria, like having nociceptors, are necessary but not sufficient. Even simple organisms withdraw from damage reflexively. The more telling evidence is *flexible* behaviour:

- **Motivational trade-offs.** Hermit crabs will leave a preferred shell after an electric shock, but they accept stronger shocks before leaving a higher-quality shell. The response is weighed against something else they value, not just a reflex.
- **Wound-directed behaviour.** Some crustaceans tend to an injured area in ways that go beyond a simple withdrawal reflex.
- **Valuing relief.** Animals that are injured and then choose a location or food associated with painkillers are showing that the painful state itself is something they want to change.

These are the same features we look for in any mind: integration, flexibility and caring about one's own states.

## From sentience to moral weight

Knowing an animal is probably sentient doesn't tell us how much its welfare counts compared with others. Projects like Rethink Priorities' **Moral Weight Project** try to estimate the *capacity for welfare* of different species, combining evidence about neuron counts, behavioural complexity, and the intensity and variety of experiences an animal might have. The ranges are wide and the methods are debated, but even very uncertain estimates are better than an implicit weight of zero.

In 2024, the **New York Declaration on Animal Consciousness**, signed by many researchers, stated that there is strong scientific support for conscious experience in mammals and birds, and at least a realistic possibility of it in all vertebrates and many invertebrates, including insects, decapods and cephalopods. It adds that when there is a realistic possibility, it is irresponsible to ignore it when making decisions that affect the animal.

## What this teaches us about digital minds

I work on animal welfare and digital minds side by side because they share the same structure:

1. **We can't rely on self-report.** Animals can't give it, and AI systems give it too easily.
2. **We need criteria tied to theory.** Lists of markers, grounded in what we think sentience requires, beat gut reactions to how cute or human-like something looks.
3. **We must act under uncertainty.** The precautionary framing that worked for crabs and octopuses ("a realistic possibility is enough to justify reasonable protections") is a natural template for AI.
4. **Scale changes the stakes.** Trillions of fish, billions of chickens, and potentially vast numbers of AI instances. Small probabilities multiplied by huge numbers still add up.

There is one big disanalogy. Animal behaviour evolved for its own reasons, so it is honest evidence. AI behaviour is trained, and can be trained to look like anything. That is why the animal sentience toolkit can't be copied over to AI unchanged, and why interpretability may end up being the most important welfare research tool we have.

## References

- Birch, J., Burn, C., Schnell, A., Browning, H., & Crump, A. (2021). *Review of the Evidence of Sentience in Cephalopod Molluscs and Decapod Crustaceans*. LSE Consulting, for the UK Department for Environment, Food and Rural Affairs.
- [Animal Welfare (Sentience) Act 2022](https://www.legislation.gov.uk/ukpga/2022/22/enacted), UK Parliament.
- [The New York Declaration on Animal Consciousness](https://sites.google.com/nyu.edu/nydeclaration/declaration) (2024).
- Rethink Priorities. The Moral Weight Project, [rethinkpriorities.org](https://rethinkpriorities.org/).
- Fishcount. [Numbers of fish caught from the wild each year](https://fishcount.org.uk/).`,
  },
];
