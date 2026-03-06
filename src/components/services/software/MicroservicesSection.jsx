import { motion } from "framer-motion";
import CountUp from "react-countup";
import { fadeIn, staggerContainer } from "./SoftwareEffects";

const MicroservicesSection = ({ onOpenDetail }) => {
    return (
        <section className="relative py-24 px-4 bg-[#050505]/40 overflow-hidden" style={{ contentVisibility: 'auto' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative lg:order-2 group transform-gpu"
                    >
                        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-video transform-gpu">
                            <img
                                src="/imagenes/micrositios/Desarrollo-software/computer-scientists-data-center-managing-maintaining-databases.jpg"
                                alt="Microservices Architecture"
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-[1.03] transform-gpu will-change-transform"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="lg:order-1"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 italic underline underline-offset-8 decoration-blue-500/30 tracking-tight">Arquitectura de <br />Microservicios</h2>
                        <motion.p variants={fadeIn} className="text-lg text-gray-300 mb-8 leading-relaxed italic">
                            Desacopla tu negocio. Construimos sistemas modulares donde cada servicio escala de forma <span className="text-white font-medium">independiente</span>, minimizando puntos de falla.
                        </motion.p>

                        <button
                            onClick={() => onOpenDetail({
                                category: "Infraestructura",
                                title: "Sistemas Modulares",
                                description: "Eliminamos el monolito. Nuestra arquitectura permite actualizar partes del sistema sin afectar al resto, asegurando una evolución técnica sin fricciones."
                            })}
                            className="mb-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-[10px]"
                        >
                            Diseño Evolutivo <span className="text-lg">→</span>
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {["Escalado elástico por módulo", "Resiliencia ante fallos", "Deployment independiente", "Stack tecnológico flexible"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border-l-2 border-blue-600 transition-[background-color] duration-300 hover:bg-white/[0.05]">
                                    <span className="text-white/80 text-xs font-medium italic">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-8">
                            {[
                                { val: 85, suf: "%", lab: "Enterprise adoption" },
                                { val: 50, suf: "%", lab: "Fast-to-Market" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl font-black text-blue-400 tabular-nums">
                                        <CountUp end={stat.val} duration={2} enableScrollSpy scrollSpyOnce />
                                        {stat.suf}
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold w-24 leading-tight">{stat.lab}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MicroservicesSection;
