import { motion } from "framer-motion";
import { steps } from "../data/processData";

const Process = () => {
    return (
        <section id="process" className="py-20 md:py-32 border-y border-gray-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Cómo Trabajamos</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-gray-900">Nuestro Proceso</h3>
                </motion.div>

                <motion.div
                    className="relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
                    }}
                >
                    {/* Línea conectora decorativa animada (solo Desktop) */}
                    <div className="hidden lg:block absolute top-[4rem] left-[12%] right-[12%] h-[2px] z-0 overflow-hidden bg-gray-100 rounded-full">
                        <motion.div
                            className="h-full bg-emerald-200"
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
                                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                                }}
                                className="relative z-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="text-5xl font-black text-emerald-200/80 mb-4 group-hover:text-primary transition-colors duration-300">
                                    {step.number}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Process;
