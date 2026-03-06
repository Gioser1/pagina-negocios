import { motion } from "framer-motion";

const SecurityCloud = () => {
    return (
        <section className="relative py-40 px-4 overflow-hidden transform-gpu">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square max-w-[450px] mx-auto"
                        >
                            {/* Radar Circles - Optimización 3 & 6 */}
                            <div className="absolute inset-0 rounded-full border border-sky-500/10 animate-[ping_4s_linear_5] will-change-transform" />
                            <div className="absolute inset-10 rounded-full border border-sky-500/10 animate-[ping_3s_linear_5_0.5s] will-change-transform" />

                            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl transform-gpu">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/cloud-security-data-protection-concept.jpg')" }}
                                />
                                <div className="absolute inset-0 bg-sky-900/20 mix-blend-overlay" />
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-sky-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.8)]" />
                        </motion.div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <motion.span
                            className="text-sky-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Blindaje Integral
                        </motion.span>
                        <motion.h2
                            className="text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tighter"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Capas de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 italic">Seguridad.</span>
                        </motion.h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-12 italic">
                            La nube es segura, pero tu configuración es la clave. Implementamos el modelo <span className="text-white font-medium italic">Shared Responsibility</span>.
                        </p>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { t: "Zero Trust", d: "Autenticación continua para cada solicitud." },
                                { t: "DLP (Data Loss)", d: "Prevención inteligente contra fuga." },
                                { t: "SIEM Cloud", d: "Análisis de amenazas basado en IA 24/7." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="p-8 bg-white/[0.03] border-l-2 border-l-sky-500 border-white/5 rounded-r-2xl transition-[background-color,border-color] duration-300 hover:bg-white/[0.06] will-change-[background-color]"
                                >
                                    <h4 className="text-white font-black text-sm uppercase mb-2 tracking-widest">{item.t}</h4>
                                    <p className="text-gray-500 text-sm font-light italic">{item.d}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecurityCloud;
