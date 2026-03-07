import { memo } from "react";
import { motion } from "framer-motion";

// --- SHARED MOTION VARIANTS ---
export const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
};

// --- SIMPLIFIED BACKGROUND (Optimización Detox) ---
export const BackgroundBlobs = memo(() => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
        <div
            className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] opacity-10"
            style={{
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
                filter: 'blur(100px)'
            }}
        />
        <div
            className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] opacity-10"
            style={{
                background: 'radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, transparent 70%)',
                filter: 'blur(120px)'
            }}
        />
    </div>
));

export const ServiceDetailModal = ({ info, onClose }) => {
    if (!info) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90" // backdrop-blur eliminado
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[2.5rem] max-w-2xl w-full relative overflow-hidden shadow-2xl"
            >
                <div className="absolute top-0 right-0 p-8">
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl transition-colors">✕</button>
                </div>
                <div className="relative z-10">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-[10px] mb-4 block underline decoration-blue-500/30 underline-offset-4">{info.category}</span>
                    <h3 className="text-3xl font-bold mb-6 text-white tracking-tight">{info.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg italic opacity-80">{info.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};
