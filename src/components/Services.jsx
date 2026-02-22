import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { servicesData } from "../data/servicesData";

const Services = () => {
    return (
        <section id="services" className="py-24 bg-dark-900/40 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-3"
                    >
                        Nuestros Servicios
                    </motion.h2>
                    <motion.h3
                        variants={{ hidden: { opacity: 0, y: 40, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
                        className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-secondary to-primary bg-[length:200%_auto]"
                        animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        Soluciones completas para tu marca
                    </motion.h3>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
                    }}
                >
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={index}
                            {...service}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
