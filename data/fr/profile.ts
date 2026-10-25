import { Profile } from "@/types";

export const profileDataFr: Profile = {
  name: "Aritra Mondal",
  preferredName: "Aritra",
  headline: "Conception de Systèmes de Machine Learning en Production & Architectures de Données Distribuées",
  subheadline:
    "Data Scientist avec expérience de production chez Amadeus et titulaire d'un MSc en Data Science & IA (Summa Cum Laude, Bac+5 Équivalent). Spécialisé dans les pipelines distribués (Spark/Scala/AWS), la prévision de séries temporelles et la modélisation prédictive.",
  summary:
    "Data Scientist orienté production, doté d'une expérience concrète dans l'ingénierie et le passage à l'échelle de pipelines ML en environnement d'entreprise à fort volume (Amadeus). Succès démontrés dans la migration d'ETL PySpark vers Scala (+35% de performance), le déploiement de modèles de prévision de la demande aérienne sur AWS (EMR, S3) et l'automatisation CI/CD. Solides fondamentaux en apprentissage statistique, sécurité réseau (BSc Hons) et bases de données graphes (Neo4j Certified).",
  location: "Biarritz, France (Mobile pour Paris, Sophia Antipolis, Lyon, Hybride ou Télétravail)",
  email: "aritramondal100@gmail.com",
  phone: "+33 (0)7 49 29 79 66",
  availability: "À l'écoute d'opportunités Data Scientist / ML Engineer en France & Europe",
  workAuthorization: "Autorisé à travailler en France (Titre de séjour / Plein droit de travail en France & UE)",
  educationLevel: "Applied MSc en Data Science & IA (Bac+5 / Summa Cum Laude) + BSc (Hons) Computer Security",
  languages: [
    { language: "Anglais", proficiency: "Langue maternelle / Bilingue", levelTag: "C2 / Bilingue" },
    { language: "Français", proficiency: "Compétence professionnelle complète", levelTag: "B1 / B2" },
    { language: "Hindi & Bengali", proficiency: "Langue maternelle", levelTag: "Natif" },
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
      label: "Formation",
      value: "MSc Équivalent Bac+5",
      badge: "Summa Cum Laude",
      detail: "Applied MSc en Data Science & IA (DSTI France) + BSc (Hons) Computer Security",
    },
    {
      icon: "MapPin",
      label: "Localisation",
      value: "France / Paris & Hybride",
      badge: "Mobile en France",
      detail: "Basé à Biarritz / Disponible pour Paris, Sophia Antipolis, Lyon ou Télétravail",
    },
    {
      icon: "ShieldCheck",
      label: "Droit de travail",
      value: "Autorisé en France & UE",
      badge: "Titre de Séjour",
      detail: "Plein droit légal de travail sur l'ensemble du territoire français et de l'UE",
    },
    {
      icon: "Languages",
      label: "Langues",
      value: "EN (Natif) · FR (B1/B2)",
      badge: "Multilingue",
      detail: "Communication technique fluide en français et bilingue natif en anglais",
    },
    {
      icon: "Briefcase",
      label: "Expérience Entreprise",
      value: "Amadeus Production",
      badge: "Scale-Up / Grand Compte",
      detail: "Prévision de la demande aérienne, Spark/Scala distribué sur AWS EMR",
    },
  ],
};
