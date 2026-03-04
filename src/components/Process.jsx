import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { steps } from "../data/processData";
import ProcessModal from "./ProcessModal";

const Process = () => {
    const containerRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    return (
        <>
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
                        className="text-center mb-16 md:mb-24"
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

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-gray-400 mt-4 text-sm sm:text-base max-w-xl mx-auto"
                        >
                            Cada proyecto sigue una metodología clara para garantizar resultados excepcionales.
                        </motion.p>
                    </motion.div>

                    {/* Versión Mobile: Tarjetas apiladas */}
                    <div className="block md:hidden space-y-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg hover:border-primary/40 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#111] border-2 border-primary/50 text-white font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(2,223,130,0.3)]">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">{step.number}</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white">{step.title}</h4>
                                </div>
                                <p className="text-gray-400 leading-relaxed text-sm pl-14">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Versión Desktop: Timeline alternado */}
                    <div ref={containerRef} className="relative mt-0 hidden md:block">
                        {/* Línea central animada por el Scroll */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform -translate-x-1/2 rounded-full overflow-hidden">
                            <motion.div
                                className="w-full bg-gradient-to-b from-primary to-cyan-400 origin-top"
                                style={{ scaleY: scrollYProgress }}
                            />
                        </div>

                        <div className="space-y-24">
                            {steps.map((step, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <div key={index} className={`relative flex items-center justify-between ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>

                                        {/* Número central / Nodo en la línea */}
                                        <div className="absolute left-1/2 w-14 h-14 rounded-full bg-[#111] border-2 border-primary/50 text-white font-bold text-xl flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(2,223,130,0.3)] backdrop-blur-sm">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                                                {step.number}
                                            </span>
                                        </div>

                                        {/* Espaciador vacío */}
                                        <div className="w-5/12" />

                                        {/* Tarjeta */}
                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? 50 : -50, filter: "blur(4px)" }}
                                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                            whileHover={{ scale: 1.03, y: -5 }}
                                            className="w-5/12 group"
                                        >
                                            <div className={`p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_20px_40px_-15px_rgba(2,223,130,0.2)] transition-all duration-300 ${isEven ? 'text-right' : 'text-left'}`}>
                                                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h4>
                                                <p className="text-gray-400 leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-300">{step.description}</p>
                                            </div>
                                        </motion.div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Botón para abrir el modal */}
                    <motion.div
                        className="text-center mt-16 md:mt-24"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.button
                            onClick={() => setShowModal(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(2,223,130,0.3)] hover:shadow-[0_0_50px_rgba(2,223,130,0.5)] transition-all duration-300 cursor-pointer"
                        >
                            <span>Ver proceso completo</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Modal del proceso */}
            {showModal && <ProcessModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Process;
