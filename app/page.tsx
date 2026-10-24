import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { BentoSkills } from "@/components/bento-skills";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProjectsSection />
        <BentoSkills />
        <ExperienceTimeline />
        <InteractiveTerminal />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
