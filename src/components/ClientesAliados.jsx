import { motion } from "framer-motion";
import { clientesData, aliadosData } from "../data/clientesData";

const ClientesAliados = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
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
        <section className="py-16 bg-[#0a0a0a] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Clientes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                        Nuestros <span className="text-primary">Clientes</span>
                    </h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
                    >
                        {clientesData.map((cliente, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="flex items-center justify-center"
                            >
                                <div className="w-full h-20 sm:h-24 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-primary/20 hover:border-primary/50 transition-all flex items-center justify-center group hover:bg-white/10 cursor-default">
                                    <div className="text-center">
                                        <div className="text-xs sm:text-sm font-bold text-primary group-hover:text-primary-light transition-colors">
                                            {cliente.initials}
                                        </div>
                                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors mt-1 line-clamp-2">
                                            {cliente.name}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Aliados */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                        Nuestros <span className="text-primary">Aliados</span>
                    </h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {aliadosData.map((aliado, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="flex items-center justify-center"
                            >
                                <div className="w-full h-20 sm:h-24 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-primary/20 hover:border-primary/50 transition-all flex items-center justify-center group hover:bg-white/10 cursor-default">
                                    <div className="text-center">
                                        <div className="text-xs sm:text-sm font-bold text-primary group-hover:text-primary-light transition-colors">
                                            {aliado.initials}
                                        </div>
                                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors mt-1 line-clamp-2">
                                            {aliado.name}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ClientesAliados;
