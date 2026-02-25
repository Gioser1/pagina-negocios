import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CalendarScheduler from "./CalendarScheduler";

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
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showTypewriter, setShowTypewriter] = useState(false);
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
        <section className={`relative min-h-[100svh] flex flex-col items-start justify-center overflow-hidden pt-32 pb-10 transition-colors duration-1000 ${darkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-black"}`}>
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

            {/* Video de fondo como marca de agua */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.video
                    src={`${import.meta.env.BASE_URL}videos/logo.mp4`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 1.5 }}
                />
            </div>

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
                >
                    <motion.button
                        onClick={() => setShowTypewriter(!showTypewriter)}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight py-2 text-left cursor-pointer group transition-all hover:scale-105 whitespace-nowrap -ml-2 sm:-ml-4 md:-ml-6 lg:-ml-8"
                        whileHover={{ x: 5 }}
                    >
                        <motion.span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-white to-primary inline"
                            style={{ backgroundSize: '200% auto' }}
                            animate={{ backgroundPosition: ['0% center', '100% center'] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut'
                            }}
                        >
                            CREAMOS EXPERIENCIAS{" "}
                        </motion.span>
                        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent inline">DIGITALES ÚNICAS</span>
                    </motion.button>

                    {showTypewriter && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-6 sm:mt-8 md:mt-10"
                        >
                            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] py-2 text-white">
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
                    className="flex flex-col sm:flex-row items-start gap-6 mt-16"
                >
                    <motion.button
                        onClick={() => setIsCalendarOpen(true)}
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px 0px rgba(2, 223, 130, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-secondary to-primary text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wide px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full w-full sm:w-auto transition-all hover:from-primary hover:to-primary-light border border-primary/50 shadow-[0_0_20px_rgba(2,223,130,0.2)]"
                    >
                        Agenda una llamada
                    </motion.button>
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center"
                    >
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base text-center sm:text-left">
                            Asesoria inicial gratuita. sin compromiso
                        </p>
                    </motion.div>
                </motion.div>

                {isCalendarOpen && (
                    <CalendarScheduler isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
                )}
            </motion.div>
        </section>
    );
};

export default Hero;
