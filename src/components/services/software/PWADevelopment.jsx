import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "./SoftwareEffects";

const PWADevelopment = ({ onOpenDetail }) => {
    return (
        // Optimización 8: content-visibility
        <section id="pwa-section" className="relative py-24 px-4 bg-[#0a0a0a]/60 overflow-hidden" style={{ contentVisibility: 'auto' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="relative group transform-gpu"
                    >
                        <div className="absolute -inset-4 bg-blue-500/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-video md:aspect-square transform-gpu">
                            <img
                                src="/imagenes/micrositios/Desarrollo-software/primer_texto.jpg"
                                alt="PWA Development"
                                // Optimización 5: scale-[1.03]
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] will-change-transform transform-gpu"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* Optimización 2 & 4: Animación al entrar al viewport y finita */}
                        <motion.div
                            className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-2xl shadow-2xl border border-white/20 hidden md:block transform-gpu"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: 6, duration: 4 }}
                        >
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-100 italic">Offline Ready</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.span variants={fadeIn} className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 block underline decoration-2 underline-offset-8">Vanguardia Digital</motion.span>
                        <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                            Aplicaciones Web <br />Progresivas (PWA)
                        </motion.h2>
                        <motion.p variants={fadeIn} className="text-lg text-gray-400 mb-8 leading-relaxed italic">
                            Combinamos lo mejor de la web y móvil. <span className="text-white font-medium">Funcionan offline</span>, cargan en milisegundos y eliminan la fricción de descarga.
                        </motion.p>

                        <div className="mb-10">
                            <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                                <span className="w-8 h-px bg-blue-500" />
                                Ideales para
                            </h4>
                            {/* Optimización 9: div estándar */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { name: "Sistemas Financieros" },
                                    { name: "Turismo y Reservas" },
                                    { name: "E-commerce Pro" },
                                    { name: "Plataformas SaaS" }
                                ].map((item, i) => (
                                    <div key={i} className="group/item relative overflow-hidden rounded-xl border border-white/5 p-4 bg-white/[0.03] hover:bg-white/[0.08] transition-colors duration-300">
                                        <span className="relative z-10 text-xs text-blue-100 font-medium italic">{item.name}</span>
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/5 blur-xl rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => onOpenDetail({
                                category: "PWA",
                                title: "Aplicaciones Web Progresivas",
                                description: "Velocidad nativa en el navegador. Las PWA permiten una experiencia de usuario fluida sin depender de tiendas de aplicaciones, optimizando la tasa de conversión y el engagement."
                            })}
                            className="mb-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-[10px]"
                        >
                            Explorar Tecnología <span className="text-lg">→</span>
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { title: "Instalables", desc: "Sin fricción de Store" },
                                { title: "Notificaciones", desc: "Engagement directo" },
                                { title: "Carga rápida", desc: "SEO optimizado" },
                                { title: "Costo eficiente", desc: "Cross-platform" }
                            ].map((benefit, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors duration-300 group/card cursor-default transform-gpu"
                                >
                                    <h4 className="font-bold text-white text-xs mb-1 uppercase tracking-tight">{benefit.title}</h4>
                                    <p className="text-[10px] text-gray-500 italic leading-tight">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PWADevelopment;
