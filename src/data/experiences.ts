export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
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
      "Dev Productivity Team",
    highlights: [
      "Extended safe-settings with an org-level plugin layer to manage GitHub organization resources as infrastructure-as-code, replacing manual UI-based administration with PR-reviewed, auditable policy enforcement.",
      "Eliminated silent misconfiguration risk on the org-level IP allow list by codifying CIDR entries with mandatory review gates, audit trails, and automated enforcement.",
      "Built an org-wide GitHub App inventory system to surface installed apps, their permissions, and permission changes, providing visibility that previously did not exist.",
      "Reduced Maven/Java CI build times by 70% by configuring EC2 agents to launch from pre-cached EBS snapshots, eliminating redundant dependency resolution on each run"
    ],
    tech: ["Github",
          "Python",
          "Claude Code",
          "Semaphore",
          "AWS"
        ],
  },
  {
    id: "exp-2",
    role: "Part-time Developer",
    company: "RBC",
    period: "Jan 2026 - Apr 2026",
    location: "Toronto, ON",
    summary:
      "DevOps - Platform Engineering",
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
      "DevOps - Platform Engineering",
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
