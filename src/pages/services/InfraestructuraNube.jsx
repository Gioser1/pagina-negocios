import { useState, lazy, Suspense } from "react";
import ContactModal from "../../components/ContactModal";
import { BackgroundBlobs } from "../../components/services/cloud/CloudEffects";

// --- LAZY LOADED SECTIONS (Optimización 8) ---
const HeroCloud = lazy(() => import("../../components/services/cloud/HeroCloud"));
const MigrationCloud = lazy(() => import("../../components/services/cloud/MigrationCloud"));
const FinOpsCloud = lazy(() => import("../../components/services/cloud/FinOpsCloud"));
const SecurityCloud = lazy(() => import("../../components/services/cloud/SecurityCloud"));
const ServerlessCloud = lazy(() => import("../../components/services/cloud/ServerlessCloud"));
const MonitoringCloud = lazy(() => import("../../components/services/cloud/MonitoringCloud"));
const CTACloud = lazy(() => import("../../components/services/cloud/CTACloud"));

const InfraestructuraNube = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative transform-gpu">
            <BackgroundBlobs />

            <Suspense fallback={<div className="h-screen bg-[#050505]" />}>
                <HeroCloud />
                <MigrationCloud />
                <FinOpsCloud />
                <SecurityCloud />
                <ServerlessCloud />
                <MonitoringCloud />
                <CTACloud onOpenModal={() => setIsModalOpen(true)} />
            </Suspense>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <footer className="py-16 px-4 border-t border-white/5 text-center">
                <p className="text-gray-600 text-[10px] font-bold tracking-[0.5em] uppercase">© {new Date().getFullYear()} Olimpo Innova • Digital Architects</p>
            </footer>
        </main>
    );
};

export default InfraestructuraNube;
