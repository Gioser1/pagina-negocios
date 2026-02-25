import { useState } from "react";
import { motion } from "framer-motion";
import ServicesModal from "./ServicesModal";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring", stiffness: 150, damping: 20
        }
    }
};

const Descubre = () => {
    const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
    return (
        <section id="Services" className="py-20 md:py-32 bg-[#0a0f1a] text-white relative overflow-hidden border-t border-white/5">
            {/* Background glowing blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -50, 0], y: [0, -40, 0], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] -right-[10%] w-[50rem] h-[50rem] bg-indigo-600/20 rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-blue-400 font-bold tracking-widest uppercase text-xs">Descubre lo que hacemos</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
                    >
                        Soluciones para el <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">futuro digital</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 w-24 bg-blue-500 mt-8 origin-left mx-auto md:mx-0"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center md:justify-start"
                >
                    <motion.button
                        onClick={() => setIsServicesModalOpen(true)}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px 0px rgba(59,130,246,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-base sm:text-lg md:text-xl font-bold tracking-wide px-8 sm:px-12 py-3 sm:py-4 md:py-5 rounded-full w-full sm:w-auto transition-all border border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                    >
                        Explorar Servicios
                    </motion.button>
                </motion.div>

            </div>

            <ServicesModal isOpen={isServicesModalOpen} onClose={() => setIsServicesModalOpen(false)} />
        </section>
    );
};

export default Descubre;
