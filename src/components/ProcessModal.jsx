import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { steps } from "../data/processData";
import ChatBubble from "./ChatBubble";

const ProcessModal = ({ onClose }) => {
    const [active, setActive] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Prevenir el scroll en el body cuando el modal está abierto
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)", opacity: 0 }}
                animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)", opacity: 1 }}
                exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 z-[99999] flex items-start md:items-center justify-center bg-[#050505]/98 backdrop-blur-xl p-4 sm:p-8 overflow-y-auto"
            >
                <div className="min-h-full w-full flex items-start md:items-center justify-center py-16 md:py-10">
                    <motion.button
                        onClick={onClose}
                        className="fixed top-5 right-5 sm:top-8 sm:right-8 md:top-12 md:right-12 z-[999999] text-white hover:text-primary transition-colors p-2 sm:p-3 md:p-3 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer backdrop-blur-md border border-white/10"
                        initial={{ opacity: 0, rotate: -90, scale: 0 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0 }}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                    >
                        <X size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center mt-10 lg:mt-0"
                    >

                        {/* Columna Izquierda: Los Procesos */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
                            className="flex flex-col space-y-6 lg:space-y-8 w-full max-w-2xl mx-auto px-4 sm:px-0"
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight">Nuestro Proceso</h2>
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setActive(index)}
                                    className={`cursor-pointer transition-all duration-300 border-l-4 rounded-r-xl border-y border-r border-white/5 shadow-md p-4 sm:p-5 mb-3 ${active === index
                                        ? "border-l-primary bg-white/[0.04] shadow-[0_4px_20px_rgba(2,223,130,0.15)] scale-[1.02]"
                                        : "border-l-gray-800 bg-black/20 hover:bg-white/[0.02]"
                                        }`}
                                >
                                    <div className={`text-xl sm:text-2xl font-black mb-1 flex items-center gap-4 transition-colors ${active === index ? "text-primary/90" : "text-gray-400"}`}>
                                        <span className="text-sm sm:text-lg font-medium opacity-50">{step.number}</span>
                                        {step.title}
                                    </div>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: active === index ? "auto" : 0, opacity: active === index ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-gray-100 font-medium text-sm sm:text-base mt-3 mb-2 leading-relaxed pr-4">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Columna Derecha: Avatar y Contacto */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
                            className="flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-14 relative overflow-visible shadow-2xl w-full max-w-xl mx-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

                            {/* El Avatar - Clickeable */}
                            <motion.button
                                onClick={() => setShowBubble(!showBubble)}
                                className="relative mb-6 sm:mb-8 group focus:outline-none cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
                                <img
                                    src="/imagenes/Avatar/AVATAR-Photoroom.png"
                                    alt="Avatar Olimpo Innova"
                                    className="w-32 sm:w-40 md:w-56 relative z-10 object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
                                />
                            </motion.button>

                            <div className="relative z-10 w-full text-center">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 tracking-wide">Ponte en contacto</h3>

                                <div className="grid gap-3 sm:gap-4 text-gray-300 text-xs sm:text-sm md:text-base">
                                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                                        <span className="text-primary text-lg sm:text-xl flex-shrink-0">✉</span>
                                        <span className="font-medium tracking-wide break-all">contactenos@olimpo-empresa.com</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                                        <span className="text-primary text-lg sm:text-xl flex-shrink-0">📱</span>
                                        <span className="font-medium tracking-wide">302 562 7200</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                        <span className="text-primary text-lg sm:text-xl flex-shrink-0">🕒</span>
                                        <span className="font-medium tracking-wide text-center text-xs sm:text-sm">Lunes a Viernes <br className="sm:hidden" /> 8:00 AM - 6:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>

                {/* Chat Bubble */}
                <ChatBubble isVisible={showBubble} onClose={() => setShowBubble(false)} />
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default ProcessModal;
