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
      "Extended safe-settings framework with a new org-level plugin layer to manage GitHub organization resources (IP allow lists, GitHub App visibility, team structure) as infrastructure-as-code.",
      "Replaced manually-managed org IP allow list with a version-controlled, PR-reviewed workflow, adding audit trails and automated enforcement to prevent overly broad CIDR ranges and stale entries.",
      "Prototyped EC2 build agents using EBS snapshots with pre-cached dependencies to evaluate caching strategies to improve Maven/Java CI build times.",
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
      "Built a production observability pipeline ingesting 50K+ audit events/day from the Anthropic API, orchestrated via Airflow (S3→Splunk) to enable monitoring, alerting, and compliance.",
      "Integrated OpenTelemetry with Grafana, Mimir, and Loki to track Claude Code usage, inform cost optimization, and retain telemetry for audits.",
      "Built an MCP server and multi-agent workflow to generate operational documentation in Confluence for platform tools, coordinating agents that retrieved PagerDuty data, identified service owners from an internal platform, and drafted updates.",
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
      "Expanded Terraform-managed RBAC for JFrog Artifactory housing 72M+ artifacts, configuring permissions for users and services to manage access and enforce retention policies.",
      "Migrated 700+ Jira projects with an automated pipeline, ensuring data integrity and zero downtime.",
      "Leveraged internal Developer Portal to streamline the onboarding pipeline from 1 day to 1 hour for Artifactory.",
      "Delivered a workshop on emerging AI tooling and intelligent development environments to over 50 participants, advancing adoption of innovative technologies across teams.",
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
