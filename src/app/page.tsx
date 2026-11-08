import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CostConsulting } from "@/components/CostConsulting";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <CostConsulting />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
