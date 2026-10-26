import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { BentoSkills } from "@/components/bento-skills";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

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

