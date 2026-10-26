import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aritra Mondal | Data Scientist & Machine Learning Engineer (France - Bac+5)",
  description:
    "Data Scientist avec expérience de production chez Amadeus et titulaire d'un Applied MSc en Data Science & IA (Summa Cum Laude, Bac+5 Équivalent). Spécialisé dans les pipelines distribués (Spark/Scala/AWS), les séries temporelles et les architectures MLOps en France.",
  keywords: [
    "Data Scientist France",
    "Data Scientist Paris",
    "Ingénieur Machine Learning France",
    "Amadeus Data Science",
    "Pipeline Spark Scala ML",
    "Prévision Séries Temporelles",
    "Bac+5 Data Science",
    "MLOps Paris",
    "Aritra Mondal",
  ],
  authors: [{ name: "Aritra Mondal", url: "https://github.com/aritra-mondal-ds" }],
  creator: "Aritra Mondal",
  alternates: {
    canonical: "/fr",
    languages: {
      "en-FR": "/",
      "fr-FR": "/fr",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://aritra-mondal-ds.github.io/fr",
    title: "Aritra Mondal | Data Scientist & Ingénieur Systèmes ML",
    description:
      "Pipelines ML en production (Spark/Scala/AWS), prévision de séries temporelles et modélisation prédictive. Basé en France.",
    siteName: "Portfolio Aritra Mondal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Mondal | Data Scientist & Ingénieur Systèmes ML",
    description:
      "Data Scientist avec expérience de production Amadeus et MSc en IA (Summa Cum Laude, Bac+5).",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FrenchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

