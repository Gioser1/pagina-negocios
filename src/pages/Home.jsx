import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import CorporateIdentity from "../components/CorporateIdentity";
import About from "../components/About";
import Videos from "../components/Videos";

const Home = () => {
    return (
        <main>
            {/* 1. Hero: Introducción y Call to action principal */}
            <Hero />

            {/* Scrolling Banner */}
            <Marquee />

            {/* 3. Quiénes somos: Nuestro equipo y visión */}
            <About />

            {/* Misión, Visión y Valores */}
            <CorporateIdentity />

            {/* 4. Audiovisual: Nuestros Trabajos */}
            <Videos />
        </main>
    );
};

export default Home;
