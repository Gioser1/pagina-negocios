import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Descubre from "../components/Descubre";
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

            {/* Nueva Sección: Descubre lo que hacemos (Routing a Servicios) */}
            <Descubre />

            {/* Misión, Visión y Valores */}
            <CorporateIdentity />

            {/* 3. Quiénes somos: Nuestro equipo y visión */}
            <About />

            {/* 4. Audiovisual: Nuestros Trabajos */}
            <Videos />
        </main>
    );
};

export default Home;
