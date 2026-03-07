import { useState, useRef, lazy, Suspense } from "react";
import { useScroll, AnimatePresence } from "framer-motion";
import ContactModal from "../../components/ContactModal";
import { BackgroundBlobs, ServiceDetailModal } from "../../components/services/software/SoftwareEffects";

// --- LAZY LOADED SECTIONS (Optimización 10) ---
const HeroSoftware = lazy(() => import("../../components/services/software/HeroSoftware"));
const PWADevelopment = lazy(() => import("../../components/services/software/PWADevelopment"));
const FullStackDev = lazy(() => import("../../components/services/software/FullStackDev"));
const MobileApps = lazy(() => import("../../components/services/software/MobileApps"));
const DevOpsEngineering = lazy(() => import("../../components/services/software/DevOpsEngineering"));
const MicroservicesSection = lazy(() => import("../../components/services/software/MicroservicesSection"));
const MaintenanceSection = lazy(() => import("../../components/services/software/MaintenanceSection"));
const CTASoftware = lazy(() => import("../../components/services/software/CTASoftware"));

const DesarrolloSoftware = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeServiceInfo, setActiveServiceInfo] = useState(null);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative transform-gpu">
            <BackgroundBlobs />

            <Suspense fallback={<div className="h-screen bg-[#050505]" />}>
                <div>
                    <HeroSoftware />
                </div>

                <PWADevelopment onOpenDetail={setActiveServiceInfo} />
                <FullStackDev onOpenDetail={setActiveServiceInfo} />
                <MobileApps onOpenDetail={setActiveServiceInfo} />
                <DevOpsEngineering onOpenDetail={setActiveServiceInfo} />
                <MicroservicesSection onOpenDetail={setActiveServiceInfo} />
                <MaintenanceSection onOpenDetail={setActiveServiceInfo} />
                <CTASoftware onOpenModal={() => setIsModalOpen(true)} />
            </Suspense>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Optimización 7: AnimatePresence para transiciones de GPU suaves */}
            <AnimatePresence>
                {activeServiceInfo && (
                    <ServiceDetailModal
                        info={activeServiceInfo}
                        onClose={() => setActiveServiceInfo(null)}
                    />
                )}
            </AnimatePresence>

            <footer className="py-16 px-4 border-t border-white/5 text-center">
                <p className="text-gray-600 text-[10px] font-bold tracking-[0.5em] uppercase">© {new Date().getFullYear()} Olimpo Innova • Software Factory</p>
            </footer>
        </main>
    );
};

export default DesarrolloSoftware;
