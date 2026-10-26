import { Profile, RecruiterFastTrack } from "@/types";

export const profileData: Profile = {
  name: "Aritra Mondal",
  preferredName: "Aritra",
  headline: "Building Production Machine Learning Systems & High-Throughput Data Products",
  subheadline:
    "Data Scientist with production experience at Amadeus and an Applied MSc in Data Science & AI (Summa Cum Laude, Bac+5). Specializing in distributed ML pipelines (Spark/Scala/AWS), time-series forecasting, and predictive modeling.",
  summary:
    "Production-minded Data Scientist with direct experience engineering and scaling ML pipelines in high-throughput enterprise environments (Amadeus). Proven track record migrating PySpark ETL to Scala for a 35% performance gain, operationalizing airline demand forecasting models on AWS (EMR, S3), and designing resilient CI/CD pipelines. Strong foundations in statistical learning, network security (BSc Hons), and graph databases (Neo4j Certified).",
  location: "Paris / Biarritz, France (Immediate Paris relocation ready / Hybrid & Onsite)",
  email: "aritramondal100@gmail.com",
  phone: "+33 (0)7 49 29 79 66",
  availability: "Immediate Availability (0-day notice / Aucun préavis) · CDI (Statut Cadre)",
  workAuthorization: "Eligible to work in France (Titre de séjour / Full Working Rights)",
  educationLevel: "Applied MSc in DS & AI (Bac+5 / Summa Cum Laude) + BSc (Hons) Computer Security",
  languages: [
    { language: "English", proficiency: "Native / Bilingual", levelTag: "C2 / Native" },
    { language: "French", proficiency: "Professional Working Proficiency", levelTag: "B1 / B2" },
    { language: "Hindi & Bengali", proficiency: "Native", levelTag: "Native" },
  ],
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/aritra-mondal-ds",
      icon: "Github",
      username: "aritra-mondal-ds",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aritra-mondal-66702021",
      icon: "Linkedin",
      username: "aritra-mondal-66702021",
    },
    {
      name: "Email",
      url: "mailto:aritramondal100@gmail.com",
      icon: "Mail",
      username: "aritramondal100@gmail.com",
    },
    {
      name: "Phone",
      url: "tel:+33749297966",
      icon: "Phone",
      username: "+33 7 49 29 79 66",
    },
  ],
  recruiterSignals: [
    {
      icon: "Clock",
      label: "Availability",
      value: "Immediate (0-Day Notice)",
      badge: "No Notice Period",
      detail: "Available immediately for hire — free of employment constraints (Aucun préavis)",
    },
    {
      icon: "Briefcase",
      label: "Contract Target",
      value: "CDI (Statut Cadre)",
      badge: "Permanent Contract",
      detail: "Targeting Entry-level, Junior to Mid-level Data Scientist & ML Engineer roles across France",
    },
    {
      icon: "GraduationCap",
      label: "Education",
      value: "MSc Bac+5 Equivalent",
      badge: "Summa Cum Laude",
      detail: "Applied MSc in Data Science & AI (DSTI France) + BSc (Hons) Computer Security",
    },
    {
      icon: "MapPin",
      label: "Location & Mobility",
      value: "Paris & France-wide",
      badge: "Relocation Ready",
      detail: "Autonomous Paris relocation ready; available for 2-3 days hybrid or full onsite",
    },
    {
      icon: "ShieldCheck",
      label: "Work Authorization",
      value: "Authorized in France",
      badge: "Titre de Séjour",
      detail: "Full legal right to work across France & European Union",
    },
    {
      icon: "Cpu",
      label: "Industry Track Record",
      value: "Amadeus Production",
      badge: "Scale-Up / Enterprise",
      detail: "Airline demand forecasting, distributed Spark/Scala on AWS EMR, 35% speedup",
    },
  ],
};

export const recruiterFastTrackEn: RecruiterFastTrack = {
  headline: "Executive Recruiter Synthesis",
  availability: "Immediate (Available to start without delay)",
  noticePeriod: "0 days (No current employment notice period / Aucun préavis)",
  contractType: "CDI (Permanent contract / Statut Cadre)",
  targetRole: "Entry-level / Junior – Mid Data Scientist & Machine Learning Engineer",
  locationDetails: "Paris & Île-de-France (Immediate autonomous relocation / Hybrid 2-3 days or Full Onsite), Biarritz, Sophia Antipolis, Lyon, or EU Remote",
  workAuthorization: "Titre de séjour / Full legal work authorization across France & EU (No complex visa sponsorship required)",
  salaryExpectation: "Aligned with Paris market standards (€42,000 – €52,000 base for Junior / Mid roles, bonus & hybrid package)",
  languages: "English (Native / C2), French (Professional B1/B2 — daily engineering syncs, technical documentation, written & oral communication)",
  topHighlights: [
    {
      title: "Production ML at Amadeus (Enterprise Scale)",
      description: "Shipped distributed airline passenger demand forecasting models on AWS EMR (Spark/Scala). Re-architected PySpark workflows to native Scala, delivering a verified 35% latency reduction."
    },
    {
      title: "Dual Top-Tier Academic Credentials (Bac+5)",
      description: "Applied MSc in Data Science & AI from Data ScienceTech Institute (DSTI France) with First Class / Summa Cum Laude honors (Félicitations du Jury), backed by a BSc (Hons) in Computer Security."
    },
    {
      title: "End-to-End Autonomy (Data Science + MLOps)",
      description: "Self-sufficient from statistical exploratory data analysis, time-series forecasting (XGBoost, LSTM), and graph analytics (Neo4j Certified) to containerized CI/CD deployment (Docker, Jenkins, AWS, Bash)."
    }
  ],
  slackPitch: `*Candidate Synthesis : Aritra Mondal*
• *Target Role* : Entry-level / Junior – Mid Data Scientist & Machine Learning Engineer
• *Contract & Availability* : CDI (Statut Cadre) — *Immediate availability (0-day notice / Aucun préavis)*
• *Education* : Applied MSc in Data Science & AI (DSTI France, Bac+5 Equivalent — Summa Cum Laude) + BSc (Hons) Computer Security
• *Production Track Record* : Amadeus (Distributed airline demand forecasting on AWS EMR, Spark/Scala migration with 35% ETL speedup, Parquet, Jenkins CI/CD)
• *Location & Mobility* : Paris & France (Immediate autonomous relocation ready / 2-3 days hybrid or full onsite)
• *Work Rights* : Titre de séjour (Full legal authorization to work in France & EU)
• *Languages* : English (Native/C2), French (Professional/B1-B2)
• *Contact* : aritramondal100@gmail.com | +33 7 49 29 79 66 | https://www.linkedin.com/in/aritra-mondal-66702021`
};
