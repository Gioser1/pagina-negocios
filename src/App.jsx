import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";

// Componentes
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Cursor from "./components/Cursor";
import PageTransition from "./components/PageTransition";
import WhatsAppButton from "./components/WhatsAppButton";

// Lazy loading de páginas
const Home = lazy(() => import("./pages/Home"));
const DesarrolloSoftware = lazy(() => import("./pages/services/DesarrolloSoftware"));
const Automatizaciones = lazy(() => import("./pages/services/Automatizaciones"));
const MotoresIA = lazy(() => import("./pages/services/MotoresIA"));
const BigData = lazy(() => import("./pages/services/BigData"));
const InfraestructuraNube = lazy(() => import("./pages/services/InfraestructuraNube"));
const Ciberseguridad = lazy(() => import("./pages/services/Ciberseguridad"));
const DomoticaIoT = lazy(() => import("./pages/services/DomoticaIoT"));
const MarketingDigital = lazy(() => import("./pages/services/MarketingDigital"));
const NarrativasAudiovisuales = lazy(() => import("./pages/services/NarrativasAudiovisuales"));
const MundosMagicos = lazy(() => import("./pages/services/MundosMagicos"));

const MainLayout = () => (
    <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
);

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainLayout />}>

                    <Route index element={
                        <PageTransition>
                            <Home />
                        </PageTransition>
                    } />

                    <Route path="services/desarrollo-software" element={
                        <PageTransition>
                            <DesarrolloSoftware />
                        </PageTransition>
                    } />

                    <Route path="services/automatizaciones" element={
                        <PageTransition>
                            <Automatizaciones />
                        </PageTransition>
                    } />

                    <Route path="services/motores-ia" element={
                        <PageTransition>
                            <MotoresIA />
                        </PageTransition>
                    } />

                    <Route path="services/big-data" element={
                        <PageTransition>
                            <BigData />
                        </PageTransition>
                    } />

                    <Route path="services/infraestructura-nube" element={
                        <PageTransition>
                            <InfraestructuraNube />
                        </PageTransition>
                    } />

                    <Route path="services/ciberseguridad" element={
                        <PageTransition>
                            <Ciberseguridad />
                        </PageTransition>
                    } />

                    <Route path="services/domotica-iot" element={
                        <PageTransition>
                            <DomoticaIoT />
                        </PageTransition>
                    } />

                    <Route path="services/marketing-digital" element={
                        <PageTransition>
                            <MarketingDigital />
                        </PageTransition>
                    } />

                    <Route path="services/narrativas-audiovisuales" element={
                        <PageTransition>
                            <NarrativasAudiovisuales />
                        </PageTransition>
                    } />

                    <Route path="services/mundos-magicos" element={
                        <PageTransition>
                            <MundosMagicos />
                        </PageTransition>
                    } />

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
        }, 1500);

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

                    <Suspense fallback={<div style={{padding:"40px", textAlign:"center"}}>Cargando...</div>}>
                        <AnimatedRoutes />
                    </Suspense>

                    <WhatsAppButton />
                </Router>
            )}
        </>
    );
}

export default App;