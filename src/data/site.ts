import { Github, Linkedin, Twitter, Mail, type LucideIcon } from "lucide-react";

export const SITE = {
  name: "Maryam Hampaei",
  title: "ML & AI Safety Researcher",
  description:
    "ML & AI safety researcher, currently doing research on digital minds, cooperative AI and animal welfare.",
  focus: ["Digital minds", "Cooperative AI", "Animal welfare research"],
  url: "https://mariihmp.github.io",
  repo: "https://github.com/Mariihmp/Mariihmp.github.io",
  email: "marhmpa@gmail.com",
  github: "https://github.com/Mariihmp",
  // Leave empty to hide a link everywhere on the site
  linkedin: "",
  twitter: "",
  huggingface: "",
  lesswrong: "https://www.lesswrong.com/posts/dZZD5Lviid2mALAZL/we-made-a-map-of-the-doom-debate",

  status: "Open to collaborations in AI Safety research",
};

export const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "TIL", path: "/til" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
];

// Contact links shown in the footer, home page and About page; empty URLs are skipped.
export const SOCIAL_LINKS: { label: string; href: string; handle: string; Icon: LucideIcon }[] = [
  { label: "Email", href: `mailto:${SITE.email}`, handle: SITE.email, Icon: Mail },
  { label: "GitHub", href: SITE.github, handle: "@Mariihmp", Icon: Github },
  { label: "LinkedIn", href: SITE.linkedin, handle: "Connect with me", Icon: Linkedin },
  { label: "Twitter / X", href: SITE.twitter, handle: "Follow me", Icon: Twitter },
].filter((l) => l.href);
