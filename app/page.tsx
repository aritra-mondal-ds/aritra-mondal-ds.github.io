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
      <Navbar locale="en" />
      <main id="main" className="flex-1">
        <Hero locale="en" />
        <ProjectsSection locale="en" />
        <BentoSkills locale="en" />
        <ExperienceTimeline locale="en" />
        <InteractiveTerminal locale="en" />
        <ContactSection locale="en" />
      </main>
      <Footer locale="en" />
    </>
  );
}
