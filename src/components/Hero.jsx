import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CalendarScheduler from "./CalendarScheduler";

const Hero = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const { scrollY } = useScroll();
    const textY = useTransform(scrollY, [0, 800], [0, 150]);
    const opacityOut = useTransform(scrollY, [0, 600], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="relative min-h-[100svh] flex flex-col items-center justify-between overflow-hidden pt-32 pb-10">
            {/* Background animado lento parallax (Nivel 4) */}
            <motion.div
                className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none"
                style={{ y: useTransform(scrollY, [0, 1000], [0, 300]) }}
                animate={{
                    background: [
                        "radial-gradient(circle at 0% 0%, #D1FAE5 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, #A7F3D0 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 100%, #6EE7B7 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 0%, #34D399 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, #D1FAE5 0%, transparent 50%)",
                    ]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Espaciador invisible para centrar contenido */}
            <div className="flex-1 w-full" />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ y: textY, opacity: opacityOut }}
            >
                <motion.div variants={itemVariants}>
                    {/* Tipografía con pr-2 para evitar el corte visual de la última letra en algunas pantallas */}
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 md:mb-8 leading-[1.05] pr-2 py-2">
                        Creamos experiencias <br className="hidden md:block" />
                        <motion.span
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-emerald-700 bg-[length:200%_auto]"
                        >
                            digitales únicas
                        </motion.span>
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants}>
                    {/* Limitador de ancho a 650px y más line-height */}
                    <p className="mt-4 text-base sm:text-xl md:text-2xl text-gray-300 max-w-[650px] mx-auto mb-10 md:mb-12 leading-relaxed font-light">
                        Impulsamos tu marca con diseño moderno y desarrollo web de vanguardia. Resultados escalables que enamoran a tus usuarios.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <motion.button
                        onClick={() => setIsCalendarOpen(true)}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px 0px rgba(2, 223, 130, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-secondary to-primary text-white text-base md:text-lg font-bold tracking-wide px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full w-full sm:w-auto transition-all hover:from-primary hover:to-primary-light border border-primary/50 shadow-[0_0_20px_rgba(2,223,130,0.2)]"
                    >
                        Agenda una llamada
                    </motion.button>

                    <p className="text-sm text-gray-400 font-medium text-center sm:text-left">
                        Asesoría inicial gratuita. <br className="hidden sm:block" />Sin compromisos.
                    </p>

                </motion.div>

                <CalendarScheduler isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
            </motion.div>


        </section>
    );
};

export default Hero;
