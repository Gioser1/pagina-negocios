import { motion } from "framer-motion";
import CountUp from "react-countup";
import { fadeIn, staggerContainer } from "./SoftwareEffects";

const FullStackDev = ({ onOpenDetail }) => {
    return (
        <>
            {/* Seccion de Estadisticas Post-PWA */}
            <section className="py-20 bg-[#050505]/40 relative overflow-hidden transform-gpu">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { value: 3, suffix: "X", label: "Desempeño superior" },
                            { value: 50, suffix: "%", label: "Mayor retención" },
                            { value: 70, suffix: "%", label: "Eficiencia operativa" }
                        ].map((stat, i) => (
                            <div key={i} className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 group transform-gpu">
                                <h3 className="text-6xl font-black text-white mb-2 tracking-tighter">
                                    <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                                    <span className="text-blue-500">{stat.suffix}</span>
                                </h3>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCION: Full-Stack */}
            <section className="relative py-24 px-4 bg-[#0a0a0a]/60 overflow-hidden" style={{ contentVisibility: 'auto' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic underline underline-offset-8 decoration-blue-500/30 tracking-tight">Desarrollo Full-Stack <br />Escalable</h2>
                            <motion.p variants={fadeIn} className="text-lg text-gray-300 mb-8 leading-relaxed italic">
                                Construimos plataformas <span className="text-white font-medium">end-to-end</span>. Arquitecturas robustas listas para manejar alto tráfico con una latencia mínima.
                            </motion.p>

                            <button
                                onClick={() => onOpenDetail({
                                    category: "Full-Stack",
                                    title: "Ingeniería de Extremo a Extremo",
                                    description: "Desde bases de datos optimizadas hasta interfaces reactivas. Nuestra metodología asegura que el backend y el frontend trabajen en perfecta sincronía."
                                })}
                                className="mb-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-[10px]"
                            >
                                Detalle Arquitectónico <span className="text-lg">→</span>
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                {[
                                    { title: "React/Next.js", desc: "Interfaces dinámicas" },
                                    { title: "Node.js/Python", desc: "Backend de alto rendimiento" },
                                    { title: "NoSQL/SQL", desc: "Gestión eficiente de datos" },
                                    { title: "Cloud Ready", desc: "AWS / Azure / GCP" }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-[border-color,background-color] duration-300 transform-gpu">
                                        <h4 className="font-bold text-white text-xs mb-1 uppercase">{item.title}</h4>
                                        <p className="text-[10px] text-gray-500 italic">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-8">
                                {[
                                    { val: 99.9, suf: "%", lab: "uptime cloud" },
                                    { val: 60, suf: "%", lab: "velocidad dev" },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-3xl font-black text-blue-500 tabular-nums">
                                            <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={2} enableScrollSpy scrollSpyOnce />
                                            {stat.suf}
                                        </div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-tight w-24">{stat.lab}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group mt-10 lg:mt-0 transform-gpu"
                        >
                            <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] transform-gpu" />
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group-hover:border-blue-500/30 transition-[border-color,transform] duration-500 transform-gpu">
                                <img
                                    src="/imagenes/micrositios/Desarrollo-software/people-working-html-codes.jpg"
                                    alt="Full-Stack Dev"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] transform-gpu will-change-transform"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FullStackDev;
