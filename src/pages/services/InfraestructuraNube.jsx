import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import ContactModal from "/src/components/ContactModal";

// --- SHARED UTILS ---

const MagneticButton = ({ children, onClick, className }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.button>
    );
};

// --- BACKGROUND EFFECTS ---

const BackgroundBlobs = memo(() => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020202]">
        <div
            className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] opacity-25"
            style={{
                background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
                filter: 'blur(100px)'
            }}
        />
        <div
            className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] opacity-20"
            style={{
                background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.15) 0%, transparent 70%)',
                filter: 'blur(120px)'
            }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
    </div>
));

// --- SECTION COMPONENTS ---

const HeroCloud = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
            <BackgroundBlobs />
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 grayscale-[40%]"
                    style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/cyber-security-concept-digital-art.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-sky-950/30 via-black/80 to-[#020202]" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="inline-block px-6 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-[10px] font-black tracking-[0.4em] uppercase mb-10 shadow-2xl shadow-sky-500/10">
                        Next-Gen Cloud Architecture
                    </span>
                    <h1 className="text-6xl md:text-[9rem] font-black mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-sky-600/50 leading-[0.85] tracking-tighter">
                        Infraestructura <br />
                        <span className="italic font-light text-blue-100/90 underline decoration-sky-500/20 underline-offset-[20px]">en la Nube</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto font-light leading-relaxed italic">
                        Orquestamos ecosistemas digitales ultra-resilientes. <br />
                        <span className="text-sky-500 underline decoration-sky-500/40 underline-offset-8">Tu negocio, sin límites geográficos ni técnicos.</span>
                    </p>

                    <div className="flex justify-center">
                        <MagneticButton
                            onClick={() => {
                                document.getElementById('migration-section').scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-14 py-6 bg-white text-black rounded-full font-black overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                        >
                            <span className="relative z-10 flex items-center gap-3 text-xl uppercase tracking-widest">
                                Explorar Soluciones
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                <motion.div
                    animate={{ height: [40, 80, 40], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-px bg-gradient-to-b from-sky-400 to-transparent"
                />
            </div>
        </section>
    );
};

const MigrationCloud = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    return (
        <section id="migration-section" className="relative py-48 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/0 via-sky-500/20 to-sky-500/0 hidden lg:block" />

                    <div className="lg:col-span-12 mb-20">
                        <div className="w-16 h-1 bg-sky-500 mb-8 mx-auto lg:mx-0" />
                    </div>

                    <div className="lg:col-span-5 pt-10">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                        >
                            <motion.span variants={fadeInUp} className="text-sky-500 font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">Fases de Operación</motion.span>
                            <motion.h2 variants={fadeInUp} className="text-6xl md:text-8xl font-black mb-12 leading-[0.85] tracking-tighter">
                                Migración <br />
                                <span className="text-indigo-400 italic">Inteligente.</span>
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-gray-400 text-xl leading-relaxed mb-16 italic">
                                No se trata de "mover" servidores, se trata de <span className="text-white font-medium underline decoration-sky-500/40">evolucionar</span>. Rediseñamos tu arquitectura para que sea elástica, segura y lista para el futuro.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-8">
                                {[
                                    { t: "E-commerce Extremo", d: "Soporta picos de tráfico masivo sin caídas ni latencia." },
                                    { t: "Data Lakes", d: "Almacenamiento y procesamiento a escala petabyte." },
                                    { t: "Crecimiento Start-up", d: "Escala recursos al ritmo exacto de tus usuarios." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-sky-600/20 group-hover:border-sky-500/50 transition-all duration-500">
                                            <span className="text-sky-400 font-black italic text-2xl">{i + 1}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black text-xl mb-2 tracking-tight uppercase italic">{item.t}</h4>
                                            <p className="text-gray-500 text-sm leading-snug font-light italic">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-2 hidden lg:flex justify-center pt-60">
                        <motion.div
                            className="w-20 h-20 rounded-full bg-sky-600 flex items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.4)] z-10 border-2 border-white/20"
                            animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px rgba(14,165,233,0.2)", "0 0 50px rgba(14,165,233,0.5)", "0 0 20px rgba(14,165,233,0.2)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] group"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-110"
                                style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/server-cabinets-data-center-maintaining-large-scale-ai-datasets.jpg')" }}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-12 left-10 right-10 p-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-[2.5rem]">
                                <h4 className="text-white font-black text-xl mb-3 tracking-tighter uppercase italic">Cloud Native Monitoring</h4>
                                <p className="text-gray-400 text-xs leading-relaxed italic opacity-70">Monitoreo térmico y de carga en tiempo real con alertas proactivas mediante IA.</p>
                            </div>
                        </motion.div>
                        <div className="absolute -top-16 -right-16 w-60 h-60 bg-indigo-600/10 blur-[100px] rounded-full animate-pulse" />
                        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-sky-600/10 blur-[100px] rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const FinOpsCloud = () => {
    return (
        <section className="relative py-48 px-4 bg-[#080808]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-24 items-center">
                    <div className="lg:w-1/2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-indigo-400 font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block"
                        >
                            Eficiencia de Costos
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-7xl md:text-[8rem] font-black text-white mb-10 leading-[0.85] tracking-tighter"
                        >
                            FinOps: <br />
                            <span className="text-sky-500 italic underline decoration-sky-500/20 underline-offset-[15px]">Auditado.</span>
                        </motion.h2>
                        <p className="text-gray-400 text-2xl leading-relaxed mb-14 italic max-w-xl">
                            Eliminamos el desperdicio de recursos. Nuestra metodología FinOps asegura que cada dólar genere <span className="text-white font-medium underline decoration-sky-500/50">valor real de negocio.</span>
                        </p>

                        <div className="space-y-6">
                            {[
                                { t: "Right-Sizing", d: "Ajustamos tus instancias al consumo real en tiempo real." },
                                { t: "Spot Instances", d: "Ahorra hasta un 70% en cargas de trabajo no críticas." },
                                { t: "Alertas Activas", d: "Evitamos sorpresas de facturación al final del mes." }
                            ].map((box, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 15, backgroundColor: "rgba(14, 165, 233, 0.05)" }}
                                    className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-center justify-between group cursor-default transition-all duration-300"
                                >
                                    <div>
                                        <h4 className="text-white font-black text-sm tracking-[0.1em] uppercase group-hover:text-sky-400 transition-colors">{box.t}</h4>
                                        <p className="text-gray-500 text-xs italic mt-1">{box.d}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-sky-500/30 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-black transition-all duration-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative mt-20 lg:mt-0">
                        <div className="relative p-3 bg-gradient-to-br from-white/10 to-transparent rounded-[4rem] shadow-2xl">
                            <div className="relative aspect-square rounded-[3.8rem] overflow-hidden bg-black">
                                <img
                                    src="/imagenes/micrositios/Infraestructura-en-la-nube/businessman-analyzing-data-tablet-cityscape-background.jpg"
                                    alt="FinOps Data"
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                                    loading="lazy"
                                />
                                {/* Scan Line Effect */}
                                <motion.div
                                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_20px_rgba(14,165,233,0.8)] z-20"
                                    animate={{ y: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                                    <span className="text-sky-400 font-black text-xs tracking-[0.5em] mb-6 uppercase italic">Ahorro Promedio</span>
                                    <div className="text-[12rem] font-black text-white leading-none tracking-tighter drop-shadow-[0_0_50px_rgba(14,165,233,0.3)]">
                                        <CountUp start={0} end={45} duration={4} enableScrollSpy scrollSpyOnce /><span className="text-sky-500">%</span>
                                    </div>
                                    <p className="text-gray-400 text-lg max-w-[250px] mt-8 font-light italic leading-snug">Reducción garantizada de gastos operativos Cloud.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SecurityCloud = () => {
    return (
        <section className="relative py-48 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square max-w-[500px] mx-auto"
                        >
                            {/* Radar Circles */}
                            <div className="absolute inset-0 rounded-full border border-sky-500/10 animate-[ping_4s_linear_infinite]" />
                            <div className="absolute inset-16 rounded-full border border-sky-500/10 animate-[ping_3s_linear_infinite_0.5s]" />
                            <div className="absolute inset-32 rounded-full border border-sky-500/5 animate-[ping_5s_linear_infinite_1s]" />

                            <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(14,165,233,0.15)] group h-full">
                                <img
                                    src="/imagenes/micrositios/Infraestructura-en-la-nube/cloud-security-data-protection-concept.jpg"
                                    alt="Cloud Security"
                                    className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-sky-900/30 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-sky-500 rounded-full shadow-[0_0_30px_rgba(14,165,233,1)] animate-pulse" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <motion.span
                            className="text-sky-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-10 block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Blindaje Integral
                        </motion.span>
                        <motion.h2
                            className="text-7xl md:text-[8rem] font-black mb-14 leading-[0.85] tracking-tighter"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Capas de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-white italic">Seguridad.</span>
                        </motion.h2>
                        <p className="text-gray-400 text-2xl leading-relaxed mb-16 italic max-w-xl">
                            La nube es intrínsecamente segura, pero tu configuración es la clave. Implementamos el modelo <span className="text-white font-medium underline decoration-sky-500/30">Shared Responsibility</span> al más alto nivel.
                        </p>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { t: "Zero Trust Architecture", d: "Validación continua de identidad y privilegios mínimos." },
                                { t: "Prevención DLP", d: "Sistemas inteligentes contra la fuga de datos sensibles." },
                                { t: "SOC Cloud 24/7", d: "Análisis proactivo de amenazas basado en IA y respuesta rápida." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="p-10 bg-white/[0.02] border-l-4 border-l-sky-600 border-white/5 rounded-r-[2rem] hover:bg-white/[0.05] transition-all duration-300 group"
                                >
                                    <h4 className="text-white font-black text-lg uppercase mb-3 tracking-[0.1em] group-hover:text-sky-400 transition-colors">{item.t}</h4>
                                    <p className="text-gray-500 text-sm font-light italic leading-snug">{item.d}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServerlessCloud = () => {
    return (
        <section className="relative py-48 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-indigo-950/20 via-sky-950/10 to-black border border-white/5 rounded-[4rem] p-16 md:p-32 relative overflow-hidden group">
                    <div
                        className="absolute top-0 right-0 w-full h-full opacity-[0.05] grayscale pointer-events-none transition-all duration-[3s] group-hover:scale-105 group-hover:opacity-10"
                        style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/saas-concept-collage.jpg')", backgroundSize: "cover" }}
                        loading="lazy"
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div>
                            <h2 className="text-6xl md:text-[8rem] font-black text-white mb-12 tracking-tighter leading-[0.85]">
                                Serverless & <br />
                                <span className="text-sky-500 italic">Containers.</span>
                            </h2>
                            <p className="text-gray-400 text-2xl leading-relaxed mb-16 italic max-w-md">
                                Desacoplamos tu lógica de la infraestructura física. Ejecuta código, escala de inmediato, paga solo por consumo.
                            </p>
                            <div className="space-y-6">
                                {[
                                    "Orquestación avanzada con Kubernetes (EKS/AKS).",
                                    "Funciones Serverless para procesos event-driven.",
                                    "Despliegues GitOps con pipelines automatizados."
                                ].map((li, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-6 text-gray-300 group"
                                    >
                                        <div className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.6)] group-hover:scale-150 transition-transform" />
                                        <span className="text-xl font-light italic">{li}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-8">
                                <motion.div
                                    className="aspect-square bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 flex flex-col justify-end group/box shadow-2xl"
                                    whileHover={{ y: -15, backgroundColor: "rgba(14, 165, 233, 0.08)", borderColor: "rgba(14, 165, 233, 0.3)" }}
                                >
                                    <span className="text-sky-400 font-black text-5xl mb-6 block tracking-tighter transition-transform group-hover/box:scale-110">DOCKER</span>
                                    <p className="text-gray-500 text-xs font-black uppercase tracking-[0.3em] leading-none">Contenedores</p>
                                </motion.div>
                                <motion.div
                                    className="aspect-square bg-sky-600 rounded-[3.5rem] p-10 flex flex-col justify-end mt-20 group/box shadow-[0_0_50px_rgba(14,116,144,0.3)]"
                                    whileHover={{ y: -15, scale: 1.05, rotate: 2 }}
                                >
                                    <span className="text-white font-black text-6xl mb-6 block tracking-tighter">K8s</span>
                                    <p className="text-sky-200 text-xs font-black uppercase tracking-[0.3em] leading-none">Scaling</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const MonitoringCloud = () => {
    return (
        <section className="relative py-48 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-32 max-w-4xl mx-auto">
                    <motion.span
                        className="text-sky-500 font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        Alta Disponibilidad Global
                    </motion.span>
                    <motion.h2
                        className="text-7xl md:text-[9rem] font-black text-white italic tracking-tighter mb-10 leading-[0.85]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Soporte 24/7. <br /><span className="text-sky-500/80">Activo.</span>
                    </motion.h2>
                    <p className="text-gray-500 text-2xl mx-auto italic leading-relaxed">
                        Mantenemos tu plataforma <span className="text-white underline decoration-sky-500/50 underline-offset-8">siempre operativa,</span> sin importar picos de demanda o zonas horarias.
                    </p>
                </div>

                <div className="relative p-1 overflow-hidden rounded-[5rem] border border-white/5 bg-white/[0.01] shadow-[0_0_100px_rgba(0,0,0,0.5)] group/main-card">
                    <div
                        className="absolute inset-0 -z-10 bg-cover bg-center brightness-[0.3] transition-all duration-[3s] group-hover/main-card:scale-110 grayscale"
                        style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/server-cloud-data-storage-concept-cloudscape-digital-online-service-global-network-web-database-backup-computer-infrastructure-technology.jpg')" }}
                        loading="lazy"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 bg-black/40 backdrop-blur-xl divide-y md:divide-y-0 md:divide-x divide-white/5 mt-20 md:mt-40 rounded-[4rem] border border-white/5 overflow-hidden">
                        {[
                            { val: 24, suf: "/7", lab: "VIGILANCIA ACTIVA" },
                            { val: 99.9, suf: "%", lab: "UPTIME GARANTIZADO" },
                            { val: 15, suf: "min", lab: "RESPUESTA MÁXIMA" }
                        ].map((stat, i) => (
                            <div key={i} className="p-20 flex flex-col items-center justify-center text-center group/stat transition-colors hover:bg-white/[0.02]">
                                <div className="text-8xl md:text-[9rem] font-black text-white mb-10 tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-transform group-hover/stat:scale-110 duration-500">
                                    <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={3} enableScrollSpy scrollSpyOnce />{stat.suf}
                                </div>
                                <div className="px-8 py-2 rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-400 text-[10px] font-black tracking-[0.4em] uppercase shadow-lg">
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

const CTACloud = ({ onOpenModal }) => {
    return (
        <section className="relative py-48 px-4 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 via-black to-indigo-950/20" />
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 transition-all duration-[5s] hover:scale-105" style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/website-hosting-concept-with-cloud.jpg')" }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-7xl md:text-[10rem] font-black text-white mb-14 tracking-tighter leading-[0.8] drop-shadow-2xl">
                        ¿Arquitectura <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-sky-400 italic underline decoration-white/10 underline-offset-8">preparada?</span>
                    </h2>
                    <p className="text-3xl text-gray-400 mb-20 italic font-light max-w-3xl mx-auto leading-relaxed">
                        Obtén una ventaja competitiva real con infraestructura de nivel empresarial.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                        <button
                            onClick={onOpenModal}
                            className="group relative px-16 py-8 bg-sky-600 rounded-[2rem] font-black text-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(14,165,233,0.4)]"
                        >
                            <span className="relative z-10 uppercase tracking-[0.2em] text-white">Solicitar Auditoría</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
                        </button>
                        <Link
                            to="/"
                            className="px-16 py-8 bg-white/5 rounded-[2rem] font-black text-2xl border border-white/10 hover:bg-white/10 transition-all uppercase tracking-[0.2em] text-white/70"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Volver al Inicio
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- MAIN PAGE ORCHESTRATOR ---

const InfraestructuraNube = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#020202] text-white overflow-x-hidden relative selection:bg-sky-500/30">
            <BackgroundBlobs />

            <HeroCloud />
            <MigrationCloud />
            <FinOpsCloud />
            <SecurityCloud />
            <ServerlessCloud />
            <MonitoringCloud />
            <CTACloud onOpenModal={() => setIsModalOpen(true)} />

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <footer className="py-24 px-4 border-t border-white/5 text-center bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 flex justify-center">
                        <div className="w-16 h-px bg-sky-500/20" />
                    </div>
                    <p className="text-gray-500 text-[10px] font-black tracking-[0.8em] uppercase">
                        © {new Date().getFullYear()} Olimpo Innova • Cloud Architects & Digital Infrastructure
                    </p>
                </div>
            </footer>
        </main>
    );
};

export default InfraestructuraNube;
