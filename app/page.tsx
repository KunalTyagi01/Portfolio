import { ContactModal } from "@/components/contact";
import { Footer, Navbar } from "@/components/layout";
import {
  About,
  Achievements,
  Contact,
  Experience,
  Hero,
  PersonalProjects,
  Projects,
  Skills,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative z-10 md:pl-14 md:pt-12">
      <div className="noise" />
      <Navbar />
      <ContactModal />
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
