import { motion } from "framer-motion";
import { servicesData } from "../data/servicesData";

const Services = () => {
    // Variantes de animación para el contenedor y los elementos
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="services" className="py-20 md:py-32 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Título de la sección centrado */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Nuestros Servicios</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">Desde la idea hasta el lanzamiento, te acompañamos para crear productos digitales excepcionales.</p>
                </motion.div>

                {/* Cuadrícula de tarjetas de servicio */}
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    {servicesData.map((service) => (
                        <motion.div key={service.slug} variants={itemVariants} className="bg-white/[.03] p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/5 hover:border-primary/50 transition-all duration-300 group flex flex-col items-center text-center backdrop-blur-sm">
                            <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;