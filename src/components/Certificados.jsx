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
                    whileHover={{ y: -6, scale: 1.05 }}
                    className="group"
                >
                    <div className="h-full bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-primary/20 p-4 md:p-6 hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center hover:bg-white/15">
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
