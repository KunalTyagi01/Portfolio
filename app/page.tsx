import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PersonalProjects } from "@/components/PersonalProjects";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main className="relative z-10 md:pl-14 md:pt-12">
      <div className="noise" />
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <PersonalProjects />
      <Achievements />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
