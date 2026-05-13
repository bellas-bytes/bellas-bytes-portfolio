import type { IconType } from "react-icons";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiGrafana,
  SiSplunk,
  SiGit,
  SiGithub,
  SiOpenai,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

export type TechItem = {
  name: string;
  Icon?: IconType;
};

export type TechCategory = {
  id: string;
  title: string;
  items: TechItem[];
  wide?: boolean;
};

export const techStack: TechCategory[] = [
  {
    id: "languages",
    title: "Languages",
    items: [
      { name: "Python", Icon: SiPython },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Infra",
    items: [
      { name: "AWS", Icon: FaAws },
      { name: "Docker", Icon: SiDocker },
      { name: "Kubernetes", Icon: SiKubernetes },
      { name: "Terraform", Icon: SiTerraform },
      { name: "GitHub Actions", Icon: SiGithubactions },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    items: [
      { name: "Grafana", Icon: SiGrafana },
      { name: "Splunk", Icon: SiSplunk },
      { name: "OpenTelemetry" },
      { name: "Apache Airflow" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "FastAPI" },
      { name: "PostgreSQL", Icon: SiPostgresql },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Confluence" },
      { name: "Jira" },
    ],
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    items: [
      { name: "Claude Code" },
      { name: "Anthropic API" },
      { name: "Cursor" },
      { name: "Windsurf" },
      { name: "GitHub Copilot" },
      { name: "OpenAI", Icon: SiOpenai },
      { name: "MCP" },
    ],
    wide: true,
  },
];
