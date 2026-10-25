export interface RecruiterSignal {
  icon: string;
  label: string;
  value: string;
  badge?: string;
  detail?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export interface Profile {
  name: string;
  preferredName?: string;
  headline: string;
  subheadline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  workAuthorization: string;
  educationLevel: string;
  languages: {
    language: string;
    proficiency: string;
    levelTag: string;
  }[];
  socials: SocialLink[];
  recruiterSignals: RecruiterSignal[];
}

export interface SkillItem {
  name: string;
  level?: "Core" | "Advanced" | "Proficient";
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
  accentColor?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "MLOps & Systems" | "Time-Series & Forecasting" | "Applied Predictive Modeling" | "Cybersecurity & Graph AI";
  liveBadge?: string;
  metrics: ProjectMetric[];
  problem: string;
  solution: string;
  production: string;
  businessImpact: string;
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
    paperOrDocs?: string;
  };
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Full-Time" | "Apprenticeship" | "Internship" | "Contract";
  summary: string;
  achievements: string[];
  technologies: string[];
  logoText?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  period: string;
  honors?: string;
  frenchEquivalent?: string;
  description: string;
  thesis?: string;
  modules?: string[];
  skillsGained: string[];
  logoText?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  dateOrStatus: string;
  badgeUrl?: string;
}
