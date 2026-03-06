import { motion } from "framer-motion";
import CountUp from "react-countup";
import { fadeIn, staggerContainer } from "./SoftwareEffects";

const MobileApps = ({ onOpenDetail }) => {
    return (
        <section className="relative py-24 px-4 bg-[#050505]/40 overflow-hidden" style={{ contentVisibility: 'auto' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 relative group transform-gpu"
                    >
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group-hover:border-blue-500/30 transition-[border-color] duration-500 aspect-video md:aspect-[4/3] transform-gpu">
                            <img
                                src="/imagenes/micrositios/Desarrollo-software/smile-young-man-playing-happy-woman.jpg"
                                alt="Mobile Development"
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 transform-gpu will-change-transform"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
                        </div>

                        <motion.div
                            className="absolute top-10 left-[-10px] bg-blue-600 px-6 py-4 rounded-xl rotate-[-3deg] shadow-xl border border-white/10 hidden md:block transform-gpu"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: 0, duration: 4 }}
                        >
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white italic">Rendimiento Nativo</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="order-1 lg:order-2"
                    >
                        <span className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 block underline decoration-blue-500/30 underline-offset-8">Experiencia móvil total</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">Apps Nativas <br />iOS y Android</h2>
                        <motion.p variants={fadeIn} className="text-lg text-gray-300 mb-8 leading-relaxed italic">
                            Velocidad sin compromisos. Desarrollamos aplicaciones que aprovechan al máximo el <span className="text-white font-medium">hardware nativo</span> para una experiencia fluida y segura.
                        </motion.p>

                        <button
                            onClick={() => onOpenDetail({
                                category: "Mobile",
                                title: "Apps Nativas iOS y Android",
                                description: "Maximizamos el potencial de cada plataforma. Usamos tecnologías líderes para asegurar que tu app sea rápida, eficiente y esté lista para las tiendas de aplicaciones."
                            })}
                            className="mb-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-[10px]"
                        >
                            Ver capacidades móviles <span className="text-lg">→</span>
                        </button>

                        <div className="space-y-3 mb-10">
                            {[
                                "Optimización profunda por SO",
                                "Integración con biometría y sensores",
                                "Arquitectura offline-first persistente",
                                "Gestión de publicación en Stores"
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-400 italic text-sm">
                                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                                    {benefit}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                            {[
                                { val: 6.8, suf: "B", lab: "Usuarios móviles" },
                                { val: 88, suf: "%", lab: "Uso en apps" },
                                { val: 70, suf: "%", lab: "Ventas móviles" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl font-black text-white tabular-nums">
                                        <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={2} enableScrollSpy scrollSpyOnce />
                                        {stat.suf}
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold leading-tight">{stat.lab}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MobileApps;
