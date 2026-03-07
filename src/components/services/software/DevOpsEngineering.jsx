import { motion } from "framer-motion";
import CountUp from "react-countup";
import { fadeIn } from "./SoftwareEffects";

const DevOpsEngineering = ({ onOpenDetail }) => {
    return (
        <section className="relative py-24 px-4 bg-[#0a0a0a]/60 overflow-hidden" style={{ contentVisibility: 'auto' }}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 block underline decoration-blue-500/30 underline-offset-8">Alta Disponibilidad</span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ingeniería DevOps & Cloud</h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-400 max-w-md italic border-l-2 border-blue-600/50 pl-6 py-2 text-sm leading-relaxed"
                    >
                        Estabilidad y escala. Implementamos pipelines CI/CD y arquitecturas en la nube que permiten despliegues frecuentes con riesgo cero.
                    </motion.p>
                </div>

                <button
                    onClick={() => onOpenDetail({
                        category: "DevOps",
                        title: "Automatización & Cloud",
                        description: "Reducimos el tiempo de salida al mercado (TTM). Mediante la infraestructura como código y el monitoreo proactivo, tu software siempre estará operativo y actualizado."
                    })}
                    className="mb-16 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-[10px]"
                >
                    Ver Stack DevOps <span className="text-lg">→</span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { title: "CI/CD Pipelines", desc: "Despliegue automatizado" },
                        { title: "IaC (Terraform)", desc: "Infraestructura escalable" },
                        { title: "Kubernetes/Docker", desc: "Orquestación moderna" },
                        { title: "SRE Monitoreo", desc: "Salud del sistema 24/7" }
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-[border-color,background-color] duration-300 group transform-gpu"
                        >
                            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{card.title}</h3>
                            <p className="text-[10px] text-gray-500 leading-relaxed italic">{card.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-blue-900/20 to-transparent p-10 rounded-[2.5rem] border border-white/5 flex flex-wrap justify-around gap-8 text-center relative overflow-hidden group transform-gpu">
                    <div
                        className="absolute inset-0 -z-10 bg-cover bg-center mix-blend-overlay opacity-20 grayscale"
                        style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/young-engineer-server-room-medium-shot.jpg')" }}
                        loading="lazy"
                    />
                    {[
                        { val: 61, suf: "%", lab: "Fast-Deploy" },
                        { val: 94, suf: "%", lab: "Cloud Adoption" },
                        { val: 99.9, suf: "%", lab: "Availability" }
                    ].map((stat, i) => (
                        <div key={i} className="relative z-10">
                            <div className="text-4xl font-black text-white mb-1 tabular-nums">
                                <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={2} enableScrollSpy scrollSpyOnce />
                                {stat.suf}
                            </div>
                            <p className="text-[10px] text-blue-300 uppercase tracking-widest font-bold opacity-60">{stat.lab}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DevOpsEngineering;
