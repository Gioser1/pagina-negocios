import { motion } from "framer-motion";
import { clientesData, aliadosData } from "../data/clientesData";

const ClientesAliados = () => {
    // helper to render one continuous carousel for given dataset
    const renderCarousel = (data) => {
        return (
            <div className="relative mb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none z-10" />
                <motion.div
                    className="flex w-max space-x-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                            duration: data.length * 4,
                        },
                    }}
                >
                    {[...data, ...data].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="w-40 h-40 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-primary/20 flex items-center justify-center cursor-pointer"
                        >
                            {item.image ? (
                                <img src={`${import.meta.env.BASE_URL}${item.image}`} alt={item.name} className="max-w-[85%] max-h-[85%] object-contain" />
                            ) : (
                                <div className="text-center">
                                    <div className="text-lg font-black text-primary">
                                        {item.initials}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {item.name}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        );
    };

    return (
        <section className="py-16 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Clientes Carousel */}
                <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6">Nuestros <span className="text-primary">Clientes</span></h3>
                {renderCarousel(clientesData)}

                {/* Aliados Carousel */}
                <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6">Nuestros <span className="text-primary">Aliados</span></h3>
                {renderCarousel(aliadosData)}
            </div>
        </section>
    );
};

export default ClientesAliados;
