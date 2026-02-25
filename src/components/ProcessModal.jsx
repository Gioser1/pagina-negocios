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
                <div className="min-h-full w-full flex items-center justify-center py-10 pt-20 sm:pt-24 lg:pt-10">
                    <motion.button
                        onClick={onClose}
                        className="fixed top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-[999999] text-white hover:text-primary transition-colors p-3 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer backdrop-blur-md border border-white/10"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <X size={28} className="sm:w-8 sm:h-8" />
                    </motion.button>

                    {/* Botón Logo en la esquina superior izquierda */}
                    <button
                        onClick={onClose}
                        className="fixed top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-[999999] group cursor-pointer"
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}imagenes/Logos/olimpologo.png`}
                            alt="Logo Olimpo"
                            className="h-10 sm:h-12 lg:h-14 transition-transform duration-300 group-hover:scale-105"
                        />
                    </button>

                    {/* Contenedor principal de tarjetas centradas */}
                    <div className="w-full max-w-[90rem] px-4 flex flex-col justify-center items-center mt-12 sm:mt-0 min-h-screen">

                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-12 lg:mb-20 tracking-tight text-center"
                        >
                            Nuestro Proceso
                        </motion.h2>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                            {steps.map((step, index) => {
                                const isHovered = active === index;
                                const isAnyHovered = active !== null;
                                const isDimmed = isAnyHovered && !isHovered;

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                        key={index}
                                        onMouseEnter={() => setActive(index)}
                                        onMouseLeave={() => setActive(null)}
                                        className={`relative group cursor-pointer rounded-3xl p-8 sm:p-10 transition-all duration-500 overflow-hidden flex flex-col border h-full justify-between min-h-[320px] ${isHovered
                                            ? "bg-white/[0.05] border-primary/50 scale-[1.02] shadow-[0_0_30px_rgba(2,223,130,0.15)] z-10"
                                            : "bg-[#0a0a0a]/80 border-white/5 hover:border-white/10"
                                            } ${isDimmed ? "opacity-30 blur-[2px] scale-[0.98]" : "opacity-100"}`}
                                    >
                                        {/* Fondo decorativo al hacer hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                                        <div className="relative z-10 flex flex-col h-full">
                                            {/* Número grande estilo marca de agua en el fondo superior */}
                                            <div className="absolute -top-4 -right-2 text-8xl font-black text-white/[0.03] select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/[0.05]">
                                                {step.number}
                                            </div>

                                            <div className="flex flex-col gap-6 flex-grow">
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-4xl sm:text-5xl font-black transition-colors duration-300 ${isHovered ? "text-primary" : "text-white/20"}`}>
                                                        {step.number}
                                                    </span>
                                                </div>

                                                <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight transition-all duration-300 ${isHovered ? "text-white drop-shadow-md" : "text-gray-300"}`}>
                                                    {step.title}
                                                </h3>

                                                <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 mt-auto ${isHovered ? "text-gray-200" : "text-gray-500"}`}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Agregado: Sección inferior con Avatar y Contacto combinados horizontalmente */}
                        <div className="w-full mt-12 bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

                                {/* Lado Izquierdo: El Avatar */}
                                <div className="flex-shrink-0 flex items-center justify-center">
                                    <motion.button
                                        onClick={() => setShowBubble(!showBubble)}
                                        className="relative group focus:outline-none cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
                                        <img
                                            src={`${import.meta.env.BASE_URL}imagenes/Avatar/AVATAR-Photoroom.png`}
                                            alt="Avatar Olimpo Innova"
                                            className="w-32 sm:w-48 relative z-10 object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
                                        />
                                    </motion.button>
                                </div>

                                {/* Lado Derecho: Información de Contacto */}
                                <div className="w-full text-center md:text-left">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-wide">Ponte en contacto</h3>
                                    <div className="flex flex-col md:flex-row gap-4 text-gray-300 text-sm sm:text-base justify-center md:justify-start">
                                        <div className="flex items-center space-x-3 bg-white/5 px-6 py-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer flex-1 justify-center md:justify-start">
                                            <span className="text-primary text-xl">✉</span>
                                            <span className="font-medium tracking-wide break-all">contactenos@olimpo-empresa.com</span>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-white/5 px-6 py-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer flex-1 justify-center md:justify-start">
                                            <span className="text-primary text-xl">📱</span>
                                            <span className="font-medium tracking-wide min-w-max">302 562 7200</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-white/5 px-6 py-4 rounded-2xl mt-4 w-full justify-center md:justify-start">
                                        <span className="text-primary text-xl">🕒</span>
                                        <span className="font-medium tracking-wide">Lunes a Viernes 8:00 AM - 6:00 PM</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Chat Bubble restaurado */}
                <ChatBubble isVisible={showBubble} onClose={() => setShowBubble(false)} />
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default ProcessModal;
