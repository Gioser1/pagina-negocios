// ... App.jsx (restructuring to useLocation and AnimatePresence for route transitions)
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";

// Componentes
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Marquee from "./components/Marquee";
import ScrollToTop from "./components/ScrollToTop";
import Cursor from "./components/Cursor";
import PageTransition from "./components/PageTransition";
import WhatsAppButton from "./components/WhatsAppButton";

// Paginas Servicios
import Home from "./pages/Home";
import DesarrolloSoftware from "./pages/services/DesarrolloSoftware";
import Automatizaciones from "./pages/services/Automatizaciones";
import MotoresIA from "./pages/services/MotoresIA";
import BigData from "./pages/services/BigData";
import InfraestructuraNube from "./pages/services/InfraestructuraNube";
import Ciberseguridad from "./pages/services/Ciberseguridad";
import DomoticaIoT from "./pages/services/DomoticaIoT";
import MarketingDigital from "./pages/services/MarketingDigital";
import NarrativasAudiovisuales from "./pages/services/NarrativasAudiovisuales";
import MundosMagicos from "./pages/services/MundosMagicos";

const MainLayout = () => (
    <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
);

// AnimatedRoutes component tracks path changes
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<PageTransition><Home /></PageTransition>} />
                    {/* Servicios */}
                    <Route path="services/desarrollo-software" element={<PageTransition><DesarrolloSoftware /></PageTransition>} />
                    <Route path="services/automatizaciones" element={<PageTransition><Automatizaciones /></PageTransition>} />
                    <Route path="services/motores-ia" element={<PageTransition><MotoresIA /></PageTransition>} />
                    <Route path="services/big-data" element={<PageTransition><BigData /></PageTransition>} />
                    <Route path="services/infraestructura-nube" element={<PageTransition><InfraestructuraNube /></PageTransition>} />
                    <Route path="services/ciberseguridad" element={<PageTransition><Ciberseguridad /></PageTransition>} />
                    <Route path="services/domotica-iot" element={<PageTransition><DomoticaIoT /></PageTransition>} />
                    <Route path="services/marketing-digital" element={<PageTransition><MarketingDigital /></PageTransition>} />
                    <Route path="services/narrativas-audiovisuales" element={<PageTransition><NarrativasAudiovisuales /></PageTransition>} />
                    <Route path="services/mundos-magicos" element={<PageTransition><MundosMagicos /></PageTransition>} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3 segundos
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Cursor />
            <AnimatePresence mode="wait">
                {isLoading && <Preloader key="preloader" />}
            </AnimatePresence>

            {!isLoading && (
                <Router>
                    <ScrollToTop />
                    <AnimatedRoutes />
                    <WhatsAppButton />
                </Router>
            )}
        </>
    );
}

export default App;