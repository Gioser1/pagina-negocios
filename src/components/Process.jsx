import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { steps } from "../data/processData";

const Process = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <section id="process" className="py-24 md:py-32 border-y border-white/10 relative overflow-hidden bg-[#0A0A0A]">
            {/* Glow de fondo */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="text-center mb-20 md:mb-32"
                >
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="font-bold tracking-widest uppercase text-xs text-primary">Cómo Trabajamos</span>
                    </motion.div>

                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 40, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
                    >
                        Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Proceso</span>
                    </motion.h2>
                </motion.div>

                <div ref={containerRef} className="relative mt-16 md:mt-24">
                    {/* Línea central animada por el Scroll */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform md:-translate-x-1/2 rounded-full overflow-hidden">
                        <motion.div
                            className="w-full bg-gradient-to-b from-primary to-cyan-400 origin-top"
                            style={{ scaleY: scrollYProgress }}
                        />
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className={`relative flex items-center md:justify-between flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Número central / Nodo en la línea */}
                                    <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-[#111] border-2 border-primary/50 text-white font-bold text-xl flex items-center justify-center transform -translate-x-0 md:-translate-x-1/2 z-10 shadow-[0_0_20px_rgba(2,223,130,0.3)] backdrop-blur-sm">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Espaciador vacío para empujar al otro lado en Desktop */}
                                    <div className="hidden md:block w-5/12" />

                                    {/* Tarjeta de paso animada */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? 50 : -50, filter: "blur(4px)" }}
                                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        className="w-full md:w-5/12 pl-20 md:pl-0 group"
                                    >
                                        <div className={`p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_20px_40px_-15px_rgba(2,223,130,0.2)] transition-all duration-300 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                            <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h4>
                                            <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">{step.description}</p>
                                        </div>
                                    </motion.div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
