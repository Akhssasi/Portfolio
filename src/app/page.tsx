import { getExperience, getProjects, getSkills } from "@/lib/data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export const dynamic = "force-dynamic";

function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Grid */}
      <div className="bg-grid grid-fade absolute inset-x-0 top-0 h-[80vh]" />
      {/* Glow orbs */}
      <div className="absolute -top-40 start-[8%] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[130px] dark:bg-cyan-500/14" />
      <div className="absolute end-[4%] top-[30%] h-[380px] w-[380px] rounded-full bg-violet-400/16 blur-[130px] dark:bg-violet-600/12" />
      <div className="animate-pulse-soft absolute bottom-[-10%] start-[30%] h-[460px] w-[460px] rounded-full bg-sky-400/10 blur-[150px] dark:bg-cyan-700/10" />
    </div>
  );
}

export default async function Home() {
  const [projects, skills, experience] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperience(),
  ]);

  return (
    <div className="relative min-h-screen">
      <SiteBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience entries={experience} />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
