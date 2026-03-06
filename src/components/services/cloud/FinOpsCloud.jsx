import { motion } from "framer-motion";
import CountUp from "react-countup";

const FinOpsCloud = () => {
    return (
        <section className="relative py-40 px-4 bg-[#080808] transform-gpu">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-indigo-400 font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block"
                        >
                            Eficiencia de Costos
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
                        >
                            FinOps: <br />
                            <span className="text-sky-500 italic">Auditado.</span>
                        </motion.h2>
                        <p className="text-gray-400 text-xl leading-relaxed mb-12 italic">
                            Eliminamos el desperdicio de recursos. Nuestra metodología FinOps asegura que cada dólar invertido en la nube genere <span className="text-white font-medium underline decoration-sky-500">valor real de negocio.</span>
                        </p>

                        <div className="space-y-4">
                            {[
                                { t: "Right-Sizing", d: "Ajustamos tus instancias al consumo real." },
                                { t: "Spot Instances", d: "Ahorra hasta un 70% en cargas no críticas." },
                                { t: "Alertas Activas", d: "Sin sorpresas al final del mes." }
                            ].map((box, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 10 }}
                                    className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group cursor-default will-change-transform"
                                >
                                    <div>
                                        <h4 className="text-white font-bold text-sm tracking-wide uppercase">{box.t}</h4>
                                        <p className="text-gray-500 text-xs italic">{box.d}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-sky-500/30 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-black transition-[background-color,color] duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="relative p-2 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
                            <div className="relative aspect-square rounded-[2.9rem] overflow-hidden bg-black transform-gpu">
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-50 grayscale"
                                    style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/businessman-analyzing-data-tablet-cityscape-background.jpg')" }}
                                />
                                {/* Scan Line Effect - Optimización 3 & 6 */}
                                <motion.div
                                    className="absolute left-0 right-0 h-px bg-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.6)] z-20 will-change-transform"
                                    initial={{ y: "0%" }}
                                    animate={{ y: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, repeat: 5, ease: "linear" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                                    <span className="text-sky-400 font-bold text-[10px] tracking-[0.4em] mb-4 uppercase">Ahorro Garantizado</span>
                                    <div className="text-[10rem] font-black text-white leading-none tracking-tighter opacity-80">
                                        <CountUp start={0} end={45} duration={4} enableScrollSpy scrollSpyOnce /><span className="text-sky-500">%</span>
                                    </div>
                                    <p className="text-gray-400 text-sm max-w-[200px] mt-4 font-light italic">Promedio de reducción de gastos cloud.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinOpsCloud;
