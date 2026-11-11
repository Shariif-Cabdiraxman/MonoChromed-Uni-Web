import { About } from "@/components/About";
import { ClosingCta } from "@/components/ClosingCta";
import { CourseSearch } from "@/components/CourseSearch";
import { Faculties } from "@/components/Faculties";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InFocus } from "@/components/InFocus";
import { News } from "@/components/News";
import { Research } from "@/components/Research";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Faculties />
        <Research />
        <News />
        <InFocus />
        <CourseSearch />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
