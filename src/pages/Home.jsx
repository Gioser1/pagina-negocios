import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import DarkContrastSection from "../components/DarkContrastSection";
import Services from "../components/Services";
import Process from "../components/Process";
import ContactForm from "../components/ContactForm";

const Home = () => {
    return (
        <main>
            {/* 1. Hero: Introducción y Call to action principal */}
            <Hero />

            {/* 2. Planteamiento del problema o consultoría estratégica */}
            <DarkContrastSection />

            {/* 3. Escucha sus historias / Logos de empresas que confían */}
            <Marquee />

            {/* 4. Nuestro proceso: Cómo se trabaja */}
            <Process />

            {/* 5. Nuestros servicios: Qué ofrecemos exactamente */}
            <Services />

            {/* 6. Contacto / Formulario final para cerrar */}
            <ContactForm />
        </main>
    );
};

export default Home;
