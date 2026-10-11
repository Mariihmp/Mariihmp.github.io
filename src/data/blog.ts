import { researchPosts } from "@/data/researchPosts";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  readingTime: string;
  category: "ml" | "mlops" | "ai-safety" | "paper-summary" | "tutorial" | "research";
}

export const blogPosts: BlogPost[] = [...researchPosts];
