export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  details: string;
  highlights?: string[];
  tech?: string[];
};

export const experiences: Experience[] = [
  {
    id: "exp-3",
    role: "Software Engineer Intern",
    company: "Confluent",
    period: "May 2026 — Aug 2026",
    location: "Toronto, ON",
    summary:
      "Incoming Summer 2026",
    details:
      "More is to come!",
    tech: ["Coming soon!"],
  },
  {
    id: "exp-2",
    role: "Part-time Developer",
    company: "RBC",
    period: "Jan 2026 - Apr 2026",
    location: "Toronto, ON",
    summary:
      "Built AI, observability, and DevOps tooling to improve platform transparency and developer productivity.",
    details:
      "Built a production observability pipeline ingesting 50K+ Anthropic API audit events per day through Airflow, S3, and Splunk for monitoring, alerting, and compliance. Integrated OpenTelemetry with Grafana, Mimir, and Loki for scalable metrics and log aggregation, and built MCP-based internal tools with specialized agents that collect platform data and help automatically update operational manuals in Confluence.",
    highlights: [
      "Built a production observability pipeline processing 50K+ audit events/day.",
      "Integrated OpenTelemetry with Grafana, Mimir, and Loki for scalable observability.",
      "Built MCP-based internal tools with specialized agents to automate operational manual updates.",
      "Evaluated Windsurf and Claude Code, improving code completion efficiency by 20%.",
      "Built reusable GitHub Actions workflows to standardize CI/CD across teams.",
    ],
    tech: [
      "Python",
      "Airflow",
      "S3",
      "Splunk",
      "OpenTelemetry",
      "Grafana",
      "Mimir",
      "Loki",
      "GitHub Actions",
      "MCP",
      "Confluence",
      "Anthropic API",
    ],
  },
  {
    id: "exp-1",
    role: "Developer Intern",
    company: "RBC",
    period: "Jan 2025 - Dec 2025",
    location: "Toronto, ON",
    summary:
      "Built DevOps infrastructure and automation to improve CI/CD scalability, onboarding, and support workflows.",
    details:
      "Architected Terraform infrastructure for JFrog Artifactory, supporting 72M+ artifacts and scalable CI/CD pipelines. Automated configuration and access controls to reduce manual support work, migrated 700+ Jira projects with zero downtime, and streamlined developer onboarding pipelines from one day to one hour.",
    highlights: [
      "Architected Terraform infrastructure for JFrog Artifactory supporting 72M+ artifacts.",
      "Reduced support turnaround time by 20% through automated configuration and access controls.",
      "Migrated 700+ Jira projects with an automated pipeline and zero downtime.",
      "Reduced developer onboarding setup time from 1 day to 1 hour.",
      "Co-delivered an internal tech conference presentation on developer productivity with Windsurf.",
    ],
    tech: [
      "Terraform",
      "JFrog Artifactory",
      "GitHub Actions",
      "Jira",
      "Confluence",
      "CI/CD",
      "Windsurf",
      "DevOps",
    ],
  },
];
