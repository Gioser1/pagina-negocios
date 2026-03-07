import { motion } from "framer-motion";
import CountUp from "react-countup";
import { fadeIn } from "./SoftwareEffects";

const MaintenanceSection = ({ onOpenDetail }) => {
    return (
        <section className="relative py-24 px-4 bg-[#0a0a0a]/60 overflow-hidden" style={{ contentVisibility: 'auto' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 block underline decoration-blue-500/30 underline-offset-8"
                    >
                        Evolución Constante
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
                    >
                        Mantenimiento y Soporte Continuo
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-400 max-w-3xl mx-auto italic mb-10 leading-relaxed"
                    >
                        Estabilidad garantizada. Aseguramos que tu plataforma <span className="text-white font-medium">evolucione</span> al ritmo de la tecnología, sin deudas técnicas ni vulnerabilidades.
                    </motion.p>

                    <button
                        onClick={() => onOpenDetail({
                            category: "Soporte",
                            title: "Ciclo de Vida del Software",
                            description: "No solo construimos, cuidamos. Nuestro equipo realiza monitoreo proactivo y actualizaciones críticas para mantener el rendimiento al 100%."
                        })}
                        className="mx-auto text-blue-400 font-bold flex items-center justify-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-[10px]"
                    >
                        Políticas de Soporte <span className="text-lg">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { title: "Patching", desc: "Seguridad constante" },
                        { title: "Perf-Audit", desc: "Monitoreo de carga" },
                        { title: "Scale-Out", desc: "Optimización de recursos" },
                        { title: "Help-Desk", desc: "Respuesta inmediata" }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-[border-color] duration-300 text-center transform-gpu"
                        >
                            <h4 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h4>
                            <p className="text-[10px] text-gray-500 leading-relaxed italic">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="relative p-1 gap-8 overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.03] shadow-2xl group/main-card">
                    <div
                        className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 grayscale transform-gpu transition-transform duration-1000 group-hover/main-card:scale-[1.03]"
                        style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/professional-hacker-using-ransomware-phishing-tactics-compromise-networks.jpg')" }}
                        loading="lazy"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative z-10">
                        {[
                            { val: 60, suf: "%", lab: "Lower Attack Vector" },
                            { val: 70, suf: "%", lab: "Incident Reduction" },
                            { val: 40, suf: "%", lab: "Efficiency Boost" }
                        ].map((stat, i) => (
                            <div key={i} className={`p-10 text-center transition-[background-color] duration-500 hover:bg-white/[0.05] group/stat ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-white/5' : ''}`}>
                                <div className="text-5xl font-black text-white mb-2 transition-transform duration-500 group-hover/stat:scale-105 tabular-nums tracking-tighter">
                                    <CountUp end={stat.val} duration={2} enableScrollSpy scrollSpyOnce />
                                    <span className="text-blue-500">{stat.suf}</span>
                                </div>
                                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold leading-relaxed max-w-[150px] mx-auto opacity-60 group-hover/stat:opacity-100 transition-opacity whitespace-pre-line">{stat.lab}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MaintenanceSection;
