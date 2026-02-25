import { motion } from "framer-motion";
import { servicesData } from "../data/servicesData";
import { Link } from "react-router-dom";

const Services = () => {
    // Variantes de animación para el contenedor y los elementos
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 20,
            },
        },
    };

    return (
        <section id="Descubre" className="py-20 md:py-32 bg-[#0a0a0a] text-white overflow-hidden relative border-t border-white/10">
            {/* Background glowing blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[40rem] h-[40rem] bg-emerald-600/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -50, 0], y: [0, -40, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] -right-[10%] w-[50rem] h-[50rem] bg-indigo-600/10 rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Animado */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">Descubre lo que hacemos</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                        Soluciones que impulsan tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">futuro digital</span>
                    </h2>
                </motion.div>

                {/* Cuadrícula de tarjetas de servicio */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {servicesData.map((service) => (
                        <motion.div
                            key={service.slug}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="relative group h-full flex"
                        >
                            {/* Glow exterior al hacer hover en la tarjeta */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 z-0"></div>

                            <Link
                                to={`/services/${service.slug}`}
                                className="w-full relative z-10 bg-[#0f0f0f] p-6 sm:p-7 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:bg-[#151515] group-hover:border-primary/40 flex flex-col"
                            >
                                {/* Destello de fondo dentro de la tarjeta */}
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="mb-6 relative">
                                    <motion.div
                                        className="inline-flex text-primary bg-primary/10 p-3.5 flex items-center justify-center rounded-xl group-hover:bg-primary group-hover:text-black transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(2,223,130,0.5)]"
                                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {service.icon}
                                    </motion.div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 flex-grow group-hover:text-gray-300 transition-colors line-clamp-4">
                                    {service.description}
                                </p>

                                {/* Botón "Explorar" que aparece en hover */}
                                <div className="mt-auto flex items-center gap-2 text-xs sm:text-sm font-bold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <span>Explorar servicio</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;