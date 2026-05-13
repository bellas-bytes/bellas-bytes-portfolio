export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  year?: string;
  tagline: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  featured?: boolean;
};
export const projects: Project[] = [
  {
    id: "proj-1",
    title: "CrisisNet",
    year: "2026",
    tagline: "An agentic emergency response system for real-time evacuation planning.",
    description:
      "Built an agentic simulation and routing system that coordinates multi-agent decision-making under changing emergency conditions. The system uses watsonx.ai for agent reasoning and Mapbox for real-time hazard visualization and adaptive routing.",
    tech: ["Python", "watsonx.ai", "Mapbox", "Agentic AI"],
    links: [
      { label: "GitHub", url: "https://github.com/BradGardea/genaigenesis2026" },
      { label: "DevPost", url: "https://devpost.com/software/crisisnet-ekq1jp#updates" },
    ],
    featured: true,
  },
  {
    id: "proj-2",
    title: "KnowItAll",
    year: "2025",
    tagline: "An AI study assistant that turns course material into quizzes and answers.",
    description:
      "Developed an AI study assistant with automated quiz generation and retrieval-augmented generation using Gemini. Built a scalable Django REST backend on GCP with a React frontend to support multi-user sessions and low-latency chatbot responses.",
    tech: ["JavaScript", "Django", "React", "GCP", "Gemini", "RAG"],
    links: [
      { label: "No link as it is a school project", url: "#" },
    ],
    featured: true,
  },
  {
    id: "proj-3",
    title: "Scriptorium",
    year: "2025",
    tagline: "A collaborative coding platform for writing, sharing, and discussing code.",
    description:
      "Built a collaborative platform where users can create blog-style posts, share code templates, and discuss technical ideas through comments and ratings. The project explored full-stack product design, containerized code execution, and community-driven developer workflows.",
    tech: ["TypeScript", "React", "Next.js", "Prisma", "Docker"],
    links: [{ label: "GitHub", url: "https://github.com/bellas-bytes/Scriptorium" }],
  },
  {
    id: "proj-4",
    title: "Personal Portfolio",
    year: "2026",
    tagline: "A cinematic personal site mixing DevOps depth with a softer visual identity.",
    description:
      "Designed and built a personal portfolio to present my work across DevOps, backend infrastructure, and applied AI. The site focuses on expressive typography, scroll-based storytelling, and a visual direction inspired by cyanotype, chrome, and editorial web design.",
    tech: ["TypeScript", "React", "Tailwind", "Framer Motion"],
    links: [
      { label: "GitHub", url: "https://github.com/bellas-bytes" },
      { label: "Live Site", url: "https://bellas-bytes.github.io/bellas-bytes-portfolio/" },
    ],
  },
];
