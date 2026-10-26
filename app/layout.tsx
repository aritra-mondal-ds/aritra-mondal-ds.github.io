import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aritra-mondal.dev"),
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
  alternates: {
    canonical: "/",
    languages: {
      "en-FR": "/",
      "fr-FR": "/fr",
    },
  },
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-indigo-500/20 selection:text-indigo-400"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Accessibility: Skip to Main Content Link (WCAG 2.4.1) */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:font-semibold text-xs tracking-wide uppercase transition-all"
          >
            Skip to main content / Aller au contenu
          </a>

          <div className="relative min-h-screen flex flex-col bg-grid-pattern">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
