import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CalendarScheduler from "./CalendarScheduler";

// Hook para detectar si es dispositivo móvil
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
};

const TypewriterText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.substring(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                onComplete?.();
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text, onComplete]);

    return <span>{displayedText}</span>;
};

const Hero = () => {
    const isMobile = useIsMobile();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showTypewriter, setShowTypewriter] = useState(false);
    const [showAdvisory, setShowAdvisory] = useState(false);
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
        <section className={`relative min-h-[100svh] flex flex-col items-start justify-center overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-10 transition-colors duration-1000 ${darkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-black"}`}>
            {/* Background animado lento parallax */}
            {darkMode && (
                <motion.div
                    className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{ y: bgY }}
                >
                    <motion.div
                        className="absolute -inset-[100%] rounded-full bg-[radial-gradient(circle_at_center,_#34D399_0%,_transparent_50%)]"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "center center" }}
                    />
                </motion.div>
            )}

            {/* Imagen logo2 de fondo como marca de agua */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.15,
                    y: [0, -15, 0] // Floating effect
                }}
                transition={{
                    opacity: { duration: 1.5 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <img
                    src={`${import.meta.env.BASE_URL}imagenes/Logos/logo2.jpeg`}
                    alt="Background Logo"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            <motion.div
                className="relative z-10 w-full max-w-6xl px-4 sm:px-8 lg:px-12 text-left flex flex-col justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ opacity: opacityOut }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    onMouseEnter={() => setShowTypewriter(true)}
                    onMouseLeave={() => setShowTypewriter(false)}
                >
                    <motion.button
                        className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight py-2 text-left cursor-pointer group transition-all hover:scale-105 whitespace-normal sm:whitespace-nowrap -ml-1 sm:-ml-2 md:-ml-4 lg:-ml-8"
                        whileHover={{ x: 5 }}
                    >
                        <motion.span
                            className="bg-clip-text text-transparent inline-block pb-1"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #FFFFFF, #02df82, #0ea5e9, #34d399, #FFFFFF)",
                                backgroundSize: "300% 100%"
                            }}
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                duration: 3, // 🔥 Mucho más rápido (antes era estático o muy lento)
                                ease: "linear",
                                repeat: Infinity
                            }}
                        >
                            CREAMOS EXPERIENCIAS DIGITALES ÚNICAS
                        </motion.span>
                    </motion.button>

                    {showTypewriter && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 ml-0 sm:ml-auto mr-0 sm:mr-4 md:mr-12 lg:mr-32 max-w-full sm:max-w-2xl md:max-w-3xl px-4 sm:px-0"
                        >
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-black tracking-tight leading-[1.2] py-2 text-white">
                                <span className="text-white">
                                    <span className="inline">"</span>
                                    <TypewriterText text="Nos apasionan los NODOS de tecnología y los ecosistemas de transformación digital, comunicaciones, mundos mágicos y narrativas audiovisuales. Unidos podemos reinventarnos." />
                                </span>
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-12 sm:mt-16 relative w-full"
                >
                    <div
                        className="w-full sm:w-auto"
                        {...(!isMobile && {
                            onMouseEnter: () => setShowAdvisory(true),
                            onMouseLeave: () => setShowAdvisory(false)
                        })}
                    >
                        <motion.button
                            onClick={() => setIsCalendarOpen(true)}
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px 0px rgba(2, 223, 130, 0.8)", y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="w-full sm:w-auto bg-gradient-to-r from-secondary to-primary text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wide px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full transition-all hover:from-primary hover:to-primary-light border border-primary/50 shadow-[0_0_20px_rgba(2,223,130,0.3)]"
                        >
                            Agenda una llamada
                        </motion.button>
                    </div>

                    {/* Tarjeta de asesoría - Hover en desktop, visible en móvil */}
                    {(showAdvisory || isMobile) && (
                        <motion.div
                            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                            transition={{ duration: isMobile ? 0 : 0.3, ease: "easeOut" }}
                            className={isMobile ? "w-full" : "absolute bottom-full mb-2 sm:mb-3 left-1/2 sm:left-0 transform sm:transform-none -translate-x-1/2 sm:translate-x-0 z-50 w-[calc(100vw-2rem)] sm:w-auto max-w-xs sm:max-w-sm"}
                        >
                            <div className="bg-gradient-to-r from-secondary to-primary p-0.5 rounded-2xl shadow-[0_0_40px_rgba(52,211,153,0.5)]">
                                <div className="bg-[#0a0a0a] backdrop-blur-xl px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 rounded-2xl border border-white/10 w-full">
                                    <p className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-white text-left">
                                        ✓ <span className="text-secondary ml-2">Asesoría inicial gratuita</span>
                                    </p>
                                    <p className="text-sm sm:text-sm md:text-base lg:text-lg font-bold text-white text-left mt-1">
                                        ✓ <span className="text-secondary ml-2">Sin compromiso</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                <CalendarScheduler isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
            </motion.div>
        </section>
    );
};

export default Hero;
