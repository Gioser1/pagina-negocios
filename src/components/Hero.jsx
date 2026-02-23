import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CalendarScheduler from "./CalendarScheduler";

const Hero = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { scrollY } = useScroll();
    const opacityOut = useTransform(scrollY, [0, 600], [1, 0]);
    const bgY = useTransform(scrollY, [0, 1000], [0, 300]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDarkMode(true);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1 }
        }
    };

    return (
        <section className={`relative min-h-[100svh] flex flex-col items-start justify-center overflow-hidden pt-32 pb-10 transition-colors duration-1000 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
            {/* Background animado lento parallax */}
            {darkMode && (
                <motion.div
                    className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none"
                    style={{ y: bgY }}
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
            )}

            {/* Logo de fondo gigante e inactivo como marca de agua */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <motion.img
                    src="/imagenes/Logos/LOGO-OLIMPOINNOVAfinal_1-Photoroom.png"
                    alt="Logo Olimpo Innova"
                    className="w-[300px] md:w-[600px] lg:w-[800px] object-contain"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.05, scale: 1 }}
                    transition={{ duration: 1.5 }}
                />
            </div>

            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left flex flex-col justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ opacity: opacityOut }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-[1.05] py-2">
                        Creamos experiencias...
                    </h1>

                    <p className="mt-6 text-base sm:text-xl md:text-2xl max-w-xl mb-10 md:mb-12 leading-relaxed font-light text-gray-400">
                        Nos apasionan los NODOS de tecnología y los ecosistemas
                        de transformación digital, comunicaciones, mundos mágicos
                        y narrativas audiovisuales. Unidos podemos reinventarnos.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-start gap-6"
                >
                    <motion.button
                        onClick={() => setIsCalendarOpen(true)}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px 0px rgba(2, 223, 130, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-secondary to-primary text-white text-base md:text-lg font-bold tracking-wide px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full w-full sm:w-auto transition-all hover:from-primary hover:to-primary-light border border-primary/50 shadow-[0_0_20px_rgba(2,223,130,0.2)]"
                    >
                        Agenda una llamada
                    </motion.button>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <a href="#servicios" className="mt-12 inline-block text-primary underline text-lg font-medium hover:text-primary-light transition-colors">
                        Descubre lo que hacemos
                    </a>
                </motion.div>

                <CalendarScheduler isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
            </motion.div>
        </section>
    );
};

export default Hero;
