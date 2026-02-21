import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import DarkContrastSection from "../components/DarkContrastSection";
import Services from "../components/Services";
import Process from "../components/Process";
import ContactForm from "../components/ContactForm";

const Home = () => {
    return (
        <main>
            <Hero />
            <Marquee />
            <DarkContrastSection />
            <Services />
            <Process />
            <ContactForm />
        </main>
    );
};

export default Home;
