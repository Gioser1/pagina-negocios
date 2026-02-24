import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Importa tus componentes existentes
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Marquee from "./components/Marquee";
import ScrollToTop from "./components/ScrollToTop";
import Cursor from "./components/Cursor";

// Un Layout para envolver las páginas con Navbar y Footer
const MainLayout = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
    >
        <Navbar />
        <main>
            <Outlet /> {/* El contenido de la página se renderiza aquí */}
        </main>
        <Footer />
    </motion.div>
);

// La página de inicio que agrupa todas tus secciones
const HomePage = () => (
    <>
        <Hero />
        <Marquee />
        <Services />
        {/* Puedes agregar más secciones aquí si las tienes */}
    </>
);

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simula el tiempo de carga
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3 segundos

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Cursor />
            <Router>
                <ScrollToTop />
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <Preloader key="preloader" />
                    ) : (
                        <Routes>
                            <Route path="/" element={<MainLayout />} children={[<Route key="home" index element={<HomePage />} />]} />
                        </Routes>
                    )}
                </AnimatePresence>
            </Router>
        </>
    );
}

export default App;