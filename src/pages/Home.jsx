import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Videos from "../components/Videos";

const Home = () => {
    return (
        <main>
            {/* 1. Hero: Introducción y Call to action principal */}
            <Hero />

            {/* 2. Nuestros servicios: Qué ofrecemos exactamente */}
            <Services />

            {/* 3. Quiénes somos: Nuestro equipo y visión */}
            <About />

            {/* 4. Audiovisual: Nuestros Trabajos */}
            <Videos />
        </main>
    );
};

export default Home;
