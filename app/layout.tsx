import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aritra Mondal | Data Scientist & Machine Learning Engineer (France)",
  description:
    "Data Scientist with production experience at Amadeus and an Applied MSc in Data Science & AI (Summa Cum Laude, Bac+5). Specializing in distributed ML systems (Spark/Scala/AWS), time-series forecasting, and predictive modeling in France.",
  keywords: [
    "Data Scientist France",
    "Data Scientist Paris",
    "Machine Learning Engineer France",
    "Amadeus Data Science",
    "Spark Scala ML Pipeline",
    "Time Series Forecasting",
    "Bac+5 Data Science",
    "MLOps Engineer Paris",
    "Aritra Mondal",
  ],
  authors: [{ name: "Aritra Mondal", url: "https://github.com/aritra-mondal-ds" }],
  creator: "Aritra Mondal",
  openGraph: {
    type: "website",
    locale: "en_FR",
    url: "https://aritra-mondal.dev",
    title: "Aritra Mondal | Data Scientist & ML Systems Engineer",
    description:
      "Production ML pipelines (Spark/Scala/AWS), time-series forecasting, and predictive modeling. Based in France.",
    siteName: "Aritra Mondal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Mondal | Data Scientist & ML Systems Engineer",
    description:
      "Data Scientist with Amadeus production experience and MSc in AI (Summa Cum Laude, Bac+5).",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-indigo-500/20 selection:text-indigo-400">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col bg-grid-pattern">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
