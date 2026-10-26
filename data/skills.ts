import { SkillCategory, Certification } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "ml-ai",
    title: "Machine Learning & Statistical Modeling",
    description: "End-to-end model development, validation strategies, and predictive architectures.",
    icon: "Brain",
    accentColor: "indigo",
    skills: [
      { name: "Scikit-learn", level: "Core", highlight: true },
      { name: "XGBoost & LightGBM", level: "Core", highlight: true },
      { name: "Time-Series Forecasting", level: "Core", highlight: true },
      { name: "Feature Engineering", level: "Core", highlight: true },
      { name: "Statistical Learning", level: "Advanced", highlight: true },
      { name: "Deep Learning (LSTM, PyTorch)", level: "Advanced" },
      { name: "Hyperparameter Optimization", level: "Advanced" },
      { name: "Walk-Forward Validation", level: "Advanced" },
      { name: "Model Evaluation & Interpretability", level: "Core" },
    ],
  },
  {
    id: "big-data",
    title: "Big Data & Distributed Pipelines",
    description: "Processing enterprise-scale datasets with distributed computing engines.",
    icon: "Database",
    accentColor: "cyan",
    skills: [
      { name: "Apache Spark", level: "Core", highlight: true },
      { name: "PySpark", level: "Core", highlight: true },
      { name: "Scala", level: "Advanced", highlight: true },
      { name: "Apache Parquet & S3 Data Lakes", level: "Core", highlight: true },
      { name: "SQL (Complex queries & window functions)", level: "Core", highlight: true },
      { name: "ETL Workflow Optimization", level: "Advanced", highlight: true },
      { name: "DuckDB / Pandas", level: "Core" },
      { name: "Neo4j Graph Database", level: "Advanced", highlight: true },
    ],
  },
  {
    id: "cloud-mlops",
    title: "Cloud Infrastructure & MLOps",
    description: "Production deployment, automated orchestration, and resilient infrastructure.",
    icon: "Cloud",
    accentColor: "sky",
    skills: [
      { name: "AWS (EMR, S3, EC2)", level: "Core", highlight: true },
      { name: "Docker & Containerization", level: "Advanced", highlight: true },
      { name: "Jenkins CI/CD", level: "Advanced", highlight: true },
      { name: "Bash & Linux Shell Scripting", level: "Core", highlight: true },
      { name: "Git & Version Control Workflows", level: "Core" },
      { name: "Automated Testing & Linting", level: "Advanced" },
      { name: "REST API Integration", level: "Core" },
    ],
  },
  {
    id: "systems-security",
    title: "Systems, Security & Engineering",
    description: "Network telemetry, secure architectures, and low-level computational foundations.",
    icon: "Shield",
    accentColor: "emerald",
    skills: [
      { name: "Python", level: "Core", highlight: true },
      { name: "Java & Kotlin", level: "Proficient" },
      { name: "Network Security (TCP/IP, UDP, ICMP)", level: "Advanced", highlight: true },
      { name: "SNORT IDS & Rule Engineering", level: "Advanced", highlight: true },
      { name: "Cryptography Fundamentals", level: "Proficient" },
      { name: "Distributed Systems Design", level: "Advanced" },
    ],
  },
];

export const certificationsData: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    dateOrStatus: "In Progress (Target Q3 2026)",
    verifyUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    name: "Neo4j Certified Professional",
    issuer: "Neo4j Graph Academy",
    dateOrStatus: "Certified 2024",
    verifyUrl: "https://graphacademy.neo4j.com/",
  },
  {
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    dateOrStatus: "Passed 2019",
    verifyUrl: "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/",
  },
  {
    name: "Fortinet NSE 1 – Information Security Awareness",
    issuer: "Fortinet Training Institute",
    dateOrStatus: "Certified · Valid through June 2026",
    verifyUrl: "https://www.fortinet.com/training/certification",
  },
  {
    name: "Fortinet NSE 2 – Network Security Associate",
    issuer: "Fortinet Training Institute",
    dateOrStatus: "Certified · Valid through June 2026",
    verifyUrl: "https://www.fortinet.com/training/certification",
  },
  {
    name: "Fortinet NSE 3 – Network Security Associate",
    issuer: "Fortinet Training Institute",
    dateOrStatus: "Certified · Valid through June 2026",
    verifyUrl: "https://www.fortinet.com/training/certification",
  },
];
