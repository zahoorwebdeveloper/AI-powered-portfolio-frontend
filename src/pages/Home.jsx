import About from "../components/About";
import AiChat from "../components/AiChat";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Project";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <div className="max-w-[1400px] relative mx-auto px-4 md:px-8 lg:px-12 pt-24 sm:pt-28">
        <AiChat />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
