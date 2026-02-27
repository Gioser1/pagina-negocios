import { motion } from "framer-motion";
import { certificadosData } from "../data/certificadosData";

const Certificados = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
            {certificadosData.map((cert, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.05, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative group h-full flex"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-400 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition duration-500 z-0"></div>
                    <div className="relative z-10 w-full h-full bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 p-4 md:p-6 group-hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center group-hover:bg-white/10 shadow-sm group-hover:shadow-[0_20px_40px_-15px_rgba(2,223,130,0.3)] overflow-hidden">
                        <div className="absolute top-0 left-0 -mt-2 -ml-2 w-20 h-20 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        {/* Año */}
                        <div className="text-2xl md:text-3xl font-black text-primary mb-2 group-hover:text-primary-light transition-colors">
                            {cert.year}
                        </div>

                        {/* Icono */}
                        <div className="text-4xl md:text-5xl mb-3">
                            {cert.icon}
                        </div>

                        {/* Título */}
                        <h4 className="text-xs md:text-sm font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {cert.title}
                        </h4>

                        {/* Descripción */}
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                            {cert.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Certificados;
