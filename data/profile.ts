import { Profile } from "@/types";

export const profileData: Profile = {
  name: "Aritra Mondal",
  preferredName: "Aritra",
  headline: "Building Production Machine Learning Systems & High-Throughput Data Products",
  subheadline:
    "Data Scientist with production experience at Amadeus and an Applied MSc in Data Science & AI (Summa Cum Laude, Bac+5). Specializing in distributed ML pipelines (Spark/Scala/AWS), time-series forecasting, and predictive modeling.",
  summary:
    "Production-minded Data Scientist with direct experience engineering and scaling ML pipelines in high-throughput enterprise environments (Amadeus). Proven track record migrating PySpark ETL to Scala for a 35% performance gain, operationalizing airline demand forecasting models on AWS (EMR, S3), and designing resilient CI/CD pipelines. Strong foundations in statistical learning, network security (BSc Hons), and graph databases (Neo4j Certified).",
  location: "Biarritz, France (Open to Paris, France-wide, EU & Hybrid)",
  email: "aritramondal100@gmail.com",
  phone: "+33 (0)7 49 29 79 66",
  availability: "Available for Senior / Mid Data Scientist roles across France & EU",
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
      icon: "GraduationCap",
      label: "Education",
      value: "MSc Bac+5 Equivalent",
      badge: "Summa Cum Laude",
      detail: "Applied MSc in Data Science & AI (DSTI France) + BSc (Hons) Computer Security",
    },
    {
      icon: "MapPin",
      label: "Location",
      value: "France / Paris & Hybrid",
      badge: "Open to Relocation",
      detail: "Based in Biarritz / Mobile for Paris, Sophia Antipolis, Lyon, or Remote",
    },
    {
      icon: "ShieldCheck",
      label: "Work Authorization",
      value: "Authorized in France",
      badge: "Titre de Séjour",
      detail: "Full legal right to work across France & European Union",
    },
    {
      icon: "Languages",
      label: "Languages",
      value: "EN (Native) · FR (B1/B2)",
      badge: "Multilingual",
      detail: "Fluent technical communications in French & native fluency in English",
    },
    {
      icon: "Briefcase",
      label: "Industry Track Record",
      value: "Amadeus Production",
      badge: "Scale-Up / Enterprise",
      detail: "Airline demand forecasting, distributed Spark/Scala on AWS EMR",
    },
  ],
};
