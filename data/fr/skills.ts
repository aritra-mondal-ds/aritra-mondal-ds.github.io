import { SkillCategory, Certification } from "@/types";

export const skillCategoriesFr: SkillCategory[] = [
  {
    id: "ml-ai",
    title: "Machine Learning & Modélisation Statistique",
    description: "Développement de modèles de bout en bout, stratégies de validation et architectures prédictives.",
    icon: "Brain",
    accentColor: "indigo",
    skills: [
      { name: "Scikit-learn", level: "Core", highlight: true },
      { name: "XGBoost & LightGBM", level: "Core", highlight: true },
      { name: "Prévision de Séries Temporelles", level: "Core", highlight: true },
      { name: "Feature Engineering", level: "Core", highlight: true },
      { name: "Apprentissage Statistique", level: "Advanced", highlight: true },
      { name: "Deep Learning (LSTM, PyTorch)", level: "Advanced" },
      { name: "Optimisation d'Hyperparamètres", level: "Advanced" },
      { name: "Validation Purged Walk-Forward", level: "Advanced" },
      { name: "Évaluation & Interprétabilité (SHAP)", level: "Core" },
    ],
  },
  {
    id: "big-data",
    title: "Big Data & Pipelines Distribués",
    description: "Traitement et passage à l'échelle de volumes d'entreprise avec des moteurs distribués.",
    icon: "Database",
    accentColor: "cyan",
    skills: [
      { name: "Apache Spark", level: "Core", highlight: true },
      { name: "PySpark", level: "Core", highlight: true },
      { name: "Scala", level: "Advanced", highlight: true },
      { name: "Apache Parquet & S3 Data Lakes", level: "Core", highlight: true },
      { name: "SQL (Requêtes complexes & fenêtrage)", level: "Core", highlight: true },
      { name: "Optimisation de flux ETL", level: "Advanced", highlight: true },
      { name: "DuckDB / Pandas", level: "Core" },
      { name: "Base Graphe Neo4j", level: "Advanced", highlight: true },
    ],
  },
  {
    id: "cloud-mlops",
    title: "Infrastructure Cloud & MLOps",
    description: "Déploiement en production, orchestration automatisée et infrastructure résiliente.",
    icon: "Cloud",
    accentColor: "sky",
    skills: [
      { name: "AWS (EMR, S3, EC2)", level: "Core", highlight: true },
      { name: "Docker & Conteneurisation", level: "Advanced", highlight: true },
      { name: "CI/CD Jenkins", level: "Advanced", highlight: true },
      { name: "Bash & Scripting Linux Shell", level: "Core", highlight: true },
      { name: "Git & Bonnes Pratiques de Versioning", level: "Core" },
      { name: "Tests Automatisés & Linting", level: "Advanced" },
      { name: "Intégration d'APIs REST", level: "Core" },
    ],
  },
  {
    id: "systems-security",
    title: "Systèmes, Sécurité & Ingénierie",
    description: "Télémétrie réseau, architectures défensives et fondamentaux bas niveau.",
    icon: "Shield",
    accentColor: "emerald",
    skills: [
      { name: "Python", level: "Core", highlight: true },
      { name: "Java & Kotlin", level: "Proficient" },
      { name: "Sécurité Réseau (TCP/IP, UDP, ICMP)", level: "Advanced", highlight: true },
      { name: "SNORT IDS & Conception de Règles", level: "Advanced", highlight: true },
      { name: "Cryptographie & Protocoles", level: "Proficient" },
      { name: "Architectures Distribuées", level: "Advanced" },
    ],
  },
];

export const certificationsDataFr: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    dateOrStatus: "En cours de préparation (2025)",
    verifyUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    name: "Neo4j Certified Professional",
    issuer: "Neo4j Graph Academy",
    dateOrStatus: "Certifié en 2024",
    verifyUrl: "https://graphacademy.neo4j.com/",
  },
  {
    name: "Fortinet NSE 1 – Sensibilisation à la Cybersécurité",
    issuer: "Fortinet Training Institute",
    dateOrStatus: "Valide jusqu'en juin 2026",
    verifyUrl: "https://www.fortinet.com/training/certification",
  },
  {
    name: "Fortinet NSE 2 – Fondamentaux de la Sécurité Réseau",
    issuer: "Fortinet Training Institute",
    dateOrStatus: "Valide jusqu'en juin 2026",
    verifyUrl: "https://www.fortinet.com/training/certification",
  },
  {
    name: "Fortinet NSE 3 – Produits & Architectures de Sécurité",
    issuer: "Fortinet Training Institute",
    dateOrStatus: "Valide jusqu'en juin 2026",
    verifyUrl: "https://www.fortinet.com/training/certification",
  },
];

