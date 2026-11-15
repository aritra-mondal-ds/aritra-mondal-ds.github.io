import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { BentoSkills } from "@/components/bento-skills";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Aritra Mondal | Data Scientist & Ingénieur Machine Learning (France)",
  description:
    "Data Scientist avec expérience de production chez Amadeus et titulaire d'un Applied MSc en Data Science & IA (Summa Cum Laude, Bac+5 Équivalent). Spécialisé dans les pipelines distribués (Spark/Scala/AWS), la prévision de séries temporelles et le MLOps en France.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://aritra-mondal-ds.github.io/fr",
    title: "Aritra Mondal | Data Scientist & Architectures Distribuées",
    description:
      "Pipelines ML en production (Spark/Scala/AWS), prévision de séries temporelles et modélisation prédictive. Basé en France.",
    siteName: "Portfolio Aritra Mondal",
  },
  alternates: {
    canonical: "/fr",
    languages: {
      "en-FR": "/",
      "fr-FR": "/fr",
    },
  },
};

export default function FrenchHomePage() {
  return (
    <>
      <Navbar locale="fr" />
      <main id="main" className="flex-1">
        <Hero locale="fr" />
        <ProjectsSection locale="fr" />
        <BentoSkills locale="fr" />
        <ExperienceTimeline locale="fr" />
        <InteractiveTerminal locale="fr" />
        <ContactSection locale="fr" />
      </main>
      <Footer locale="fr" />
    </>
  );
}

