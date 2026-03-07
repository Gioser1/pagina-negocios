import { motion } from "framer-motion";
import CountUp from "react-countup";

const MonitoringCloud = () => {
    return (
        <section className="relative py-40 px-4 overflow-hidden transform-gpu">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.span
                        className="text-sky-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        Alta Disponibilidad
                    </motion.span>
                    <motion.h2
                        className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Soporte 24/7.
                    </motion.h2>
                    <p className="text-gray-500 text-xl max-w-2xl mx-auto italic">
                        Plataforma <span className="text-white underline decoration-sky-500 underline-offset-4">siempre activa.</span>
                    </p>
                </div>

                <div className="relative p-1 overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] shadow-2xl group/main-card">
                    <div
                        className="absolute inset-0 -z-10 bg-cover bg-center brightness-[0.2] transition-transform duration-700 group-hover/main-card:scale-105 transform-gpu"
                        style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/server-cloud-data-storage-concept-cloudscape-digital-online-service-global-network-web-database-backup-computer-infrastructure-technology.jpg')" }}
                        loading="lazy"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 bg-[#050505] divide-y md:divide-y-0 md:divide-x divide-white/10 mt-10 rounded-[2rem] border border-white/5 overflow-hidden">
                        {[
                            { val: 24, suf: "/7", lab: "VIGILANCIA ACTIVA" },
                            { val: 99.9, suf: "%", lab: "UPTIME GARANTIZADO" },
                            { val: 15, suf: "min", lab: "RESPUESTA MÁXIMA" }
                        ].map((stat, i) => (
                            <div key={i} className="p-16 flex flex-col items-center justify-center text-center group/stat">
                                <div className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter tabular-nums drop-shadow-xl transition-transform group-hover/stat:scale-105 will-change-transform">
                                    <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={3} enableScrollSpy scrollSpyOnce />{stat.suf}
                                </div>
                                <div className="px-4 py-1 rounded-full border border-sky-500/30 bg-sky-500/5 text-sky-400 text-[10px] font-black tracking-[0.2em] uppercase">
                                    {stat.lab}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MonitoringCloud;
