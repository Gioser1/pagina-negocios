import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
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
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 md:mb-8 leading-[1.05] pr-2 py-2">
                        Creamos experiencias <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-700">digitales únicas</span>
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants}>
                    {/* Limitador de ancho a 650px y más line-height */}
                    <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-[650px] mx-auto mb-10 md:mb-12 leading-relaxed font-light">
                        Impulsamos tu marca con diseño moderno y desarrollo web de vanguardia. Resultados escalables que enamoran a tus usuarios.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px -10px rgba(16, 185, 129, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-white text-base md:text-lg font-medium px-8 py-4 md:px-10 md:py-5 rounded-full w-full sm:w-auto transition-colors hover:bg-emerald-500"
                    >
                        Agenda una llamada
                    </motion.button>

                    <p className="text-sm text-gray-400 font-medium text-center sm:text-left">
                        Asesoría inicial gratuita. <br className="hidden sm:block" />Sin compromisos.
                    </p>

                </motion.div>
            </motion.div>

            {/* Scroll Indicator (Nivel 4) integrado en el flujo natural para evitar solapamientos */}
            <div className="flex-1 flex items-end justify-center w-full mt-16 z-10 relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/10 overflow-hidden relative">
                        <motion.div
                            animate={{ y: [-20, 48] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="w-full h-1/2 bg-primary absolute top-0"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
