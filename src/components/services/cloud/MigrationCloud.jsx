import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const MigrationCloud = () => {
    return (
        <section id="migration-section" className="relative py-40 px-4 overflow-hidden transform-gpu">
            <div className="max-w-7xl mx-auto">
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/0 via-sky-500/20 to-sky-500/0 hidden lg:block" />

                    <div className="lg:col-span-5 pt-20">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                        >
                            <motion.span variants={fadeInUp} className="text-sky-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Fases de Operación</motion.span>
                            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter">
                                Migración <br />
                                <span className="text-indigo-400">Inteligente.</span>
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-gray-400 text-lg leading-relaxed mb-12 italic">
                                No se trata de "mover" servidores, se trata de <span className="text-white font-medium">evolucionar</span>. Rediseñamos tu arquitectura para que sea elástica, segura y lista para el futuro.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-6">
                                {[
                                    { t: "E-commerce Extremo", d: "Soporta picos de tráfico masivo sin caídas." },
                                    { t: "Data Lakes", d: "Almacenamiento y procesamiento a escala petabyte." },
                                    { t: "Crecimiento Start-up", d: "Escala recursos al ritmo de tus usuarios." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                                            <span className="text-sky-400 font-black italic">{i + 1}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">{item.t}</h4>
                                            <p className="text-gray-500 text-sm leading-snug">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-2 hidden lg:flex justify-center pt-40">
                        <motion.div
                            className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.3)] z-10"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: 3 }} // Optimización 3 (Finito)
                        >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group transform-gpu"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center grayscale transition-[transform,filter] duration-700 group-hover:grayscale-0 group-hover:scale-105 transform-gpu"
                                style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/server-cabinets-data-center-maintaining-large-scale-ai-datasets.jpg')" }}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10 p-6 bg-[#050505] border border-white/10 rounded-[2rem] max-w-[280px]">
                                <h4 className="text-white font-bold mb-2 tracking-tight">Cloud Native Performance</h4>
                                <p className="text-gray-400 text-xs leading-relaxed italic opacity-70">Monitoreo térmico y de carga en tiempo real.</p>
                            </div>
                        </motion.div>
                        {/* Optimización 5: Blur reducido a 8px */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/10 blur-[8px] rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-600/10 blur-[8px] rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MigrationCloud;
