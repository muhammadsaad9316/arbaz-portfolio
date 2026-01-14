import ScrollyCanvas from "@/components/frontend/ScrollyCanvas";

export const dynamic = "force-dynamic";
import Projects from "@/components/frontend/Projects";
import Header from "@/components/frontend/Header";
import About from "@/components/frontend/About";
import Expertise from "@/components/frontend/Expertise";
import { Timeline } from "@/components/ui/timeline";
import Contact from "@/components/frontend/Contact";
import Footer from "@/components/frontend/Footer";
import { getProjects } from "@/actions/projects";
import { getAbout } from "@/actions/about";
import { getExperience } from "@/actions/experience";
import { getContact } from "@/actions/contact";
import { getOverlayContent } from "@/actions/overlay";
import { getSkills } from "@/actions/skills";

export default async function Home() {
  const projectsData = getProjects();
  const aboutData = getAbout();
  const experienceData = getExperience();
  const contactData = getContact();
  const overlayData = getOverlayContent();
  const skillsData = getSkills();

  const [projects, about, experience, contact, overlay, skills] = await Promise.all([
    projectsData,
    aboutData,
    experienceData,
    contactData,
    overlayData,
    skillsData
  ]);

  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-white/20">
      <Header />
      <ScrollyCanvas overlayContent={overlay} />
      <About data={about} />
      <Expertise data={skills} />
      {/* Transform experience data for the new Timeline component */}
      <Timeline
        data={experience.map((item: any) => ({
          title: item.year,
          content: (
            <div>
              <h3 className="text-2xl font-bold text-neutral-500 dark:text-neutral-500 mb-2">
                {item.role}
              </h3>
              <p className="text-lg text-neutral-400 font-medium mb-4">
                {item.company}
              </p>
              <p className="text-neutral-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ),
        }))}
      />

      <div id="projects">
        <Projects data={projects} />
      </div>

      <Contact data={contact} />
      <Footer />
    </main>
  );
}
