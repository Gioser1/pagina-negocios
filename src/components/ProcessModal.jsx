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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]/98 backdrop-blur-xl p-4 sm:p-8 overflow-y-auto"
            >
                <div className="min-h-full w-full flex items-center justify-center py-10">
                    <motion.button
                        onClick={onClose}
                        className="fixed top-8 right-8 sm:top-12 sm:right-12 z-[999999] text-white hover:text-primary transition-colors p-3 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer backdrop-blur-md border border-white/10"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <X size={28} className="sm:w-8 sm:h-8" />
                    </motion.button>

                    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-10 lg:mt-0">

                        {/* Columna Izquierda: Los Procesos */}
                        <div className="flex flex-col space-y-6 lg:space-y-8 w-full max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">Nuestro Proceso</h2>
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setActive(index)}
                                    className={`cursor-pointer transition-all duration-300 border-l-4 pl-6 sm:pl-8 py-2 ${active === index
                                        ? "border-primary text-white scale-[1.02] bg-white/[0.02]"
                                        : "border-gray-800 text-gray-500 hover:text-gray-400"
                                        }`}
                                >
                                    <div className={`text-xl sm:text-2xl font-black mb-2 flex items-center gap-4 transition-colors ${active === index ? "text-primary" : ""}`}>
                                        <span className="text-sm sm:text-lg font-medium opacity-50">{step.number}</span>
                                        {step.title}
                                    </div>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: active === index ? "auto" : 0, opacity: active === index ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-gray-400 text-sm sm:text-base mt-2 mb-4 leading-relaxed pr-4">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Columna Derecha: Avatar y Contacto */}
                        <div className="flex flex-col items-center justify-center bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 sm:p-14 relative overflow-visible shadow-2xl w-full max-w-xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

                            {/* El Avatar - Clickeable */}
                            <motion.button
                                onClick={() => setShowBubble(!showBubble)}
                                className="relative mb-8 group focus:outline-none cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
                                <img
                                    src="/imagenes/Avatar/AVATAR-Photoroom.png"
                                    alt="Avatar Olimpo Innova"
                                    className="w-40 sm:w-56 relative z-10 object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
                                />
                            </motion.button>

                            <div className="relative z-10 w-full text-center">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-wide">Ponte en contacto</h3>

                                <div className="grid gap-4 text-gray-300 text-sm sm:text-base">
                                    <div className="flex items-center justify-center space-x-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                                        <span className="text-primary text-xl">✉</span>
                                        <span className="font-medium tracking-wide">contactenos@olimpo-empresa.com</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                                        <span className="text-primary text-xl">📱</span>
                                        <span className="font-medium tracking-wide">302 562 7200</span>
                                    </div>
                                    <div className="flex items-center justify-center space-x-4 bg-white/5 p-4 rounded-2xl">
                                        <span className="text-primary text-xl">🕒</span>
                                        <span className="font-medium tracking-wide text-center">Lunes a Viernes <br className="sm:hidden" /> 8:00 AM - 6:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Chat Bubble */}
                <ChatBubble isVisible={showBubble} onClose={() => setShowBubble(false)} />
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default ProcessModal;
