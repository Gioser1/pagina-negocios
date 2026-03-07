import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import ContactModal from "/src/components/ContactModal";

// --- SHARED UTILS ---
const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

// --- BACKGROUND EFFECTS ---

const FloatingNodes = memo(() => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-blue-500/20 rounded-full"
                initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0
                }}
                animate={{
                    y: [null, Math.random() * 100 + "%"],
                    opacity: [0, 0.4, 0],
                    scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                    duration: 10 + Math.random() * 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 10
                }}
            />
        ))}
    </div>
));

const DataStream = memo(() => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-full"
                style={{ top: (i * 15) + 5 + "%" }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                    duration: 4 + Math.random() * 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5
                }}
            />
        ))}
    </div>
));

const BackgroundBlobs = memo(() => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
        <FloatingNodes />
        <DataStream />
        <div
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] opacity-15"
            style={{
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
                filter: 'blur(100px)'
            }}
        />
        <div
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-15"
            style={{
                background: 'radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, transparent 70%)',
                filter: 'blur(120px)'
            }}
        />
    </div>
));

const ServiceDetailModal = ({ info, onClose }) => {
    if (!info) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[2.5rem] max-w-2xl w-full relative overflow-hidden shadow-2xl"
            >
                <div className="absolute top-0 right-0 p-8">
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl transition-colors">✕</button>
                </div>
                <div className="relative z-10">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-[10px] mb-4 block underline decoration-blue-500/30 underline-offset-4">{info.category}</span>
                    <h3 className="text-3xl font-bold mb-6 text-white tracking-tight leading-tight">{info.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg italic opacity-80">{info.description}</p>
                </div>
                <div className="absolute top-[-10%] left-[-10%] w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full" />
            </motion.div>
        </motion.div>
    );
};

// --- SECTION COMPONENTS ---

const HeroSoftware = () => (
    <section className="relative h-screen flex items-center justify-center overflow-hidden transform-gpu">
        <div className="absolute inset-0 z-0 bg-[#050505]">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-[2px]"
                style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/portrait-male-engineer-working-field-engineers-day-celebration.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-black/40 to-[#050505]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.h1
                    className="text-5xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-500 tracking-tight"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Desarrollo de Software
                </motion.h1>
                <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto font-light leading-relaxed italic"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Soluciones tecnológicas modernas diseñadas para escalar, <br />
                    <span className="text-blue-400 font-medium">optimizar procesos y potenciar el crecimiento digital.</span>
                </motion.p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button
                        onClick={() => {
                            document.getElementById('pwa-section').scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative px-10 py-5 bg-blue-600 rounded-full font-bold overflow-hidden transition-all duration-300 hover:bg-blue-500 hover:scale-[1.05] active:scale-95 shadow-2xl shadow-blue-500/30"
                    >
                        <span className="relative z-10 flex items-center gap-2 text-lg uppercase tracking-wider">
                            Explorar servicios
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </motion.div>
            </motion.div>
        </div>

        <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-blue-400 rounded-full" />
            </div>
        </motion.div>
    </section>
);

const PWADevelopment = ({ onOpenDetail }) => (
    <section id="pwa-section" className="relative py-32 px-4 bg-[#0a0a0a]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="relative group h-full"
                >
                    <div className="absolute -inset-4 bg-blue-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-square md:aspect-video lg:aspect-square">
                        <img
                            src="/imagenes/micrositios/Desarrollo-software/primer_texto.jpg"
                            alt="PWA Development"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-8 left-8">
                            <span className="text-blue-400 font-black text-6xl opacity-10 leading-none">01</span>
                        </div>
                    </div>

                    <motion.div
                        className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-2xl shadow-2xl border border-white/20 hidden md:block"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-100 italic">Offline Ready</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.span variants={fadeIn} className="text-blue-500 font-bold tracking-[0.4em] uppercase mb-6 block underline decoration- blue-500/30 underline-offset-8">Vanguardia Digital</motion.span>
                    <motion.h2 variants={fadeIn} className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                        Aplicaciones Web <br /><span className="text-white/90">Progresivas (PWA)</span>
                    </motion.h2>
                    <motion.p variants={fadeIn} className="text-xl text-gray-400 mb-10 leading-relaxed italic">
                        Combinamos lo mejor de la web y móvil. <span className="text-white font-medium underline decoration-blue-500/50">Funcionan offline</span>, cargan en milisegundos y eliminan la fricción de descarga.
                    </motion.p>

                    <div className="grid grid-cols-2 gap-4 mb-12">
                        {[
                            { name: "Sistemas Financieros" },
                            { name: "Turismo y Reservas" },
                            { name: "E-commerce Pro" },
                            { name: "Plataformas SaaS" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className="group/item relative overflow-hidden rounded-xl border border-white/5 p-4 bg-white/[0.03] hover:bg-white/[0.08] transition-all"
                            >
                                <span className="relative z-10 text-xs text-blue-100 font-medium italic uppercase tracking-wider">{item.name}</span>
                                <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/10 blur-xl rounded-full" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        variants={fadeIn}
                        onClick={() => onOpenDetail({
                            category: "PWA",
                            title: "Aplicaciones Web Progresivas",
                            description: "Velocidad nativa en el navegador. Las PWA permiten una experiencia de usuario fluida sin depender de tiendas de aplicaciones, optimizando la tasa de conversión y el engagement."
                        })}
                        className="group flex items-center gap-3 text-blue-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                    >
                        Explorar Tecnología
                        <span className="w-8 h-px bg-blue-500 group-hover:w-12 transition-all" />
                        <span className="text-lg">→</span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    </section>
);

const FullStackDev = ({ onOpenDetail }) => (
    <>
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        { value: 3, suffix: "X", label: "Desempeño superior" },
                        { value: 50, suffix: "%", label: "Mayor retención" },
                        { value: 70, suffix: "%", label: "Eficiencia operativa" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all"
                        >
                            <h3 className="text-7xl font-black text-white mb-2 tracking-tighter">
                                <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                                <span className="text-blue-500">{stat.suffix}</span>
                            </h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        <section className="relative py-32 px-4 bg-[#0a0a0a]/60 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-8 italic underline underline-offset-8 decoration-blue-500/30 tracking-tighter leading-none">
                            Desarrollo <br />Full-Stack <br /><span className="text-blue-500">Escalable</span>
                        </h2>
                        <motion.p variants={fadeIn} className="text-xl text-gray-300 mb-10 leading-relaxed italic">
                            Construimos plataformas <span className="text-white font-medium underline decoration-blue-500/30">end-to-end</span>. Arquitecturas robustas listas para manejar alto tráfico con una latencia mínima.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {[
                                { title: "React/Next.js", desc: "Interfaces dinámicas y SEO" },
                                { title: "Node.js/Python", desc: "Backend de alto rendimiento" },
                                { title: "NoSQL/SQL", desc: "Gestión eficiente de datos" },
                                { title: "Cloud Ready", desc: "Azure / AWS / GCP" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeIn}
                                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group"
                                >
                                    <h4 className="font-black text-white text-sm mb-2 uppercase tracking-widest group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                    <p className="text-xs text-gray-500 italic leading-snug">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            variants={fadeIn}
                            onClick={() => onOpenDetail({
                                category: "Full-Stack",
                                title: "Ingeniería de Extremo a Extremo",
                                description: "Desde bases de datos optimizadas hasta interfaces reactivas. Nuestra metodología asegura que el backend y el frontend trabajen en perfecta sincronía."
                            })}
                            className="bg-blue-600/10 border border-blue-500/30 px-8 py-4 rounded-xl text-blue-400 font-bold uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all"
                        >
                            Detalle Arquitectónico
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group mt-10 lg:mt-0"
                    >
                        <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group-hover:border-blue-500/40 transition-all duration-700">
                            <img
                                src="/imagenes/micrositios/Desarrollo-software/people-working-html-codes.jpg"
                                alt="Full-Stack Dev"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            <div className="absolute top-10 right-10 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    </>
);

const MobileApps = ({ onOpenDetail }) => (
    <section className="relative py-32 px-4 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1 relative group"
                >
                    <div className="absolute -inset-10 bg-indigo-600/10 blur-[80px] rounded-full" />
                    <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 aspect-square md:aspect-[4/3] group-hover:border-blue-500/30">
                        <img
                            src="/imagenes/micrositios/Desarrollo-software/smile-young-man-playing-happy-woman.jpg"
                            alt="Mobile Development"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 to-transparent" />
                    </div>

                    <motion.div
                        className="absolute top-12 left-[-20px] bg-blue-600 px-8 py-5 rounded-2xl rotate-[-4deg] shadow-2xl border border-white/20 hidden md:block"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                        <p className="text-xs font-black uppercase tracking-widest text-white italic">Rendimiento Nativo</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="order-1 lg:order-2"
                >
                    <span className="text-blue-500 font-bold tracking-[0.4em] uppercase mb-6 block underline decoration-blue-500/30 underline-offset-8">Experiencia móvil total</span>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 underline underline-offset-8 decoration-white/5 tracking-tighter leading-none">Apps Nativas <br />iOS y Android</h2>
                    <motion.p variants={fadeIn} className="text-xl text-gray-300 mb-10 leading-relaxed italic">
                        Velocidad sin compromisos. Desarrollamos aplicaciones que aprovechan al máximo el <span className="text-white font-medium underline decoration-blue-500">hardware nativo</span> para una experiencia fluida y segura.
                    </motion.p>

                    <motion.button
                        variants={fadeIn}
                        onClick={() => onOpenDetail({
                            category: "Mobile",
                            title: "Apps Nativas iOS y Android",
                            description: "Maximizamos el potencial de cada plataforma. Usamos tecnologías líderes para asegurar que tu app sea rápida, eficiente y esté lista para las tiendas de aplicaciones."
                        })}
                        className="mb-12 text-blue-400 font-bold flex items-center gap-3 hover:text-white transition-colors uppercase tracking-widest text-xs"
                    >
                        Ver capacidades móviles <span className="text-2xl">→</span>
                    </motion.button>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/10">
                        {[
                            { val: 6.8, suf: "B", lab: "Usuarios móviles" },
                            { val: 88, suf: "%", lab: "Uso en apps" },
                            { val: 70, suf: "%", lab: "Ventas móviles" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl font-black text-white tabular-nums">
                                    <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={2} enableScrollSpy scrollSpyOnce />
                                    {stat.suf}
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black leading-tight mt-1">{stat.lab}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

const DevOpsEngineering = ({ onOpenDetail }) => (
    <section className="relative py-32 px-4 bg-[#0a0a0a]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-blue-500 font-bold tracking-[0.4em] uppercase mb-6 block underline decoration-blue-500/30 underline-offset-8">Alta Disponibilidad</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Ingeniería <br />DevOps & Cloud</h2>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-gray-400 max-w-md italic border-l-4 border-blue-600 pl-8 p-4 text-lg bg-white/[0.01] rounded-r-2xl"
                >
                    Estabilidad y escala. Implementamos pipelines CI/CD y arquitecturas en la nube que permiten despliegues frecuentes con riesgo cero.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {[
                    { title: "CI/CD Pipelines", desc: "Despliegue automatizado sin caídas" },
                    { title: "IaC (Terraform)", desc: "Infraestructura definida por código" },
                    { title: "Kubernetes", desc: "Orquestación de contenedores a escala" },
                    { title: "Monitoreo SRE", desc: "Salud del sistema activa 24/7" }
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-blue-600/5 hover:border-blue-500/30 transition-all group"
                    >
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors uppercase italic">{card.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed italic">{card.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="relative p-12 lg:p-20 rounded-[4rem] border border-white/5 overflow-hidden group">
                <div
                    className="absolute inset-0 -z-10 bg-cover bg-center grayscale opacity-30 transition-transform duration-[3s] group-hover:scale-110"
                    style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/young-engineer-server-room-medium-shot.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-[#0a0a0a] -z-10" />

                <div className="flex flex-wrap justify-between gap-12 text-center items-center">
                    {[
                        { val: 61, suf: "%", lab: "Fast-Deploy Boost" },
                        { val: 94, suf: "%", lab: "Cloud Adoption" },
                        { val: 99.9, suf: "%", lab: "SLA Availability" }
                    ].map((stat, i) => (
                        <div key={i} className="flex-1 min-w-[200px]">
                            <div className="text-6xl font-black text-white mb-2 tabular-nums tracking-tighter">
                                <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={3} enableScrollSpy scrollSpyOnce />
                                <span className="text-blue-500">{stat.suf}</span>
                            </div>
                            <p className="text-xs text-blue-300 uppercase tracking-[0.3em] font-bold opacity-60 italic">{stat.lab}</p>
                        </div>
                    ))}
                    <div className="flex-1 min-w-[200px]">
                        <button
                            onClick={() => onOpenDetail({
                                category: "DevOps",
                                title: "Automatización & Cloud",
                                description: "Reducimos el tiempo de salida al mercado (TTM). Mediante la infraestructura como código y el monitoreo proactivo, tu software siempre estará operativo y actualizado."
                            })}
                            className="bg-white text-black px-8 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 hover:text-white transition-all shadow-2xl"
                        >
                            Ver Stack Completo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const MicroservicesSection = ({ onOpenDetail }) => (
    <section className="relative py-32 px-4 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative lg:order-2 group"
                >
                    <div className="absolute -inset-10 bg-blue-600/10 blur-[120px] rounded-full opacity-60" />
                    <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group-hover:border-blue-500/40 transition-all duration-700">
                        <img
                            src="/imagenes/micrositios/Desarrollo-software/computer-scientists-data-center-managing-maintaining-databases.jpg"
                            alt="Microservices Architecture"
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="lg:order-1"
                >
                    <h2 className="text-5xl md:text-7xl font-black mb-10 italic underline underline-offset-[16px] decoration-blue-500/30 tracking-tighter leading-none">
                        Arquitectura de <br /><span className="text-blue-500">Microservicios</span>
                    </h2>
                    <motion.p variants={fadeIn} className="text-xl text-gray-300 mb-12 leading-relaxed italic border-l-4 border-blue-600/40 pl-8">
                        Desacopla tu negocio. Construimos sistemas modulares donde cada servicio escala de forma <span className="text-white font-medium underline decoration-blue-500/40">independiente</span>, minimizando puntos de falla.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                        {["Escalado elástico por módulo", "Resiliencia ante fallos", "Deployment independiente", "Stack tecnológico flexible"].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border-l-4 border-blue-600 transition-all hover:bg-white/[0.05]"
                            >
                                <span className="text-blue-100 text-sm font-bold italic uppercase tracking-wider">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-12 items-center">
                        {[
                            { val: 85, suf: "%", lab: "Enterprise Adoption" },
                            { val: 50, suf: "%", lab: "Fast-to-Market Boost" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl font-black text-blue-500 tabular-nums tracking-tighter">
                                    <CountUp end={stat.val} duration={2} enableScrollSpy scrollSpyOnce />
                                    {stat.suf}
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black leading-tight mt-1 max-w-[100px]">{stat.lab}</p>
                            </div>
                        ))}
                        <button
                            onClick={() => onOpenDetail({
                                category: "Infraestructura",
                                title: "Sistemas Modulares",
                                description: "Eliminamos el monolito. Nuestra arquitectura permite actualizar partes del sistema sin afectar al resto, asegurando una evolución técnica sin fricciones."
                            })}
                            className="bg-transparent border border-white/20 px-8 py-4 rounded-full text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
                        >
                            Diseño Evolutivo →
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

const MaintenanceSection = ({ onOpenDetail }) => (
    <section className="relative py-32 px-4 bg-[#0a0a0a]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 max-w-4xl mx-auto">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-blue-500 font-bold tracking-[0.5em] uppercase mb-6 block underline decoration-blue-500/30 underline-offset-8"
                >
                    Evolución Constante
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tighter leading-none italic"
                >
                    Mantenimiento & <br /><span className="text-blue-500">Soporte Continuo</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xl text-gray-400 italic mb-12 leading-relaxed"
                >
                    Estabilidad garantizada. Aseguramos que tu plataforma <span className="text-white font-medium underline decoration-blue-500/30">evolucione</span> al ritmo de la tecnología, sin deudas técnicas ni vulnerabilidades.
                </motion.p>

                <button
                    onClick={() => onOpenDetail({
                        category: "Soporte",
                        title: "Ciclo de Vida del Software",
                        description: "No solo construimos, cuidamos. Nuestro equipo realiza monitoreo proactivo y actualizaciones críticas para mantener el rendimiento al 100%."
                    })}
                    className="mx-auto bg-blue-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-2xl shadow-blue-500/40"
                >
                    Políticas de Soporte 🛡️
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                {[
                    { title: "Patching", desc: "Gestión de seguridad constante" },
                    { title: "Perf-Audit", desc: "Monitoreo técnico de carga real" },
                    { title: "Scale-Out", desc: "Optimización continua de recursos" },
                    { title: "Help-Desk", desc: "Respuesta inmediata ante incidentes" }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all text-center group"
                    >
                        <h4 className="text-2xl font-black text-white mb-3 tracking-tighter leading-none uppercase italic group-hover:text-blue-400 transition-colors">{item.title}</h4>
                        <p className="text-[10px] text-gray-500 leading-relaxed italic uppercase font-bold tracking-widest">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="relative p-1 gap-8 overflow-hidden rounded-[4rem] border border-white/5 bg-white/[0.02] shadow-2xl group">
                <div
                    className="absolute inset-0 -z-10 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-[3s] group-hover:scale-110"
                    style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/professional-hacker-using-ransomware-phishing-tactics-compromise-networks.jpg')" }}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 bg-[#0a0a0a]/80 divide-y md:divide-y-0 md:divide-x divide-white/5 backdrop-blur-sm">
                    {[
                        { val: 60, suf: "%", lab: "Lower Attack Vector" },
                        { val: 70, suf: "%", lab: "Incident Reduction" },
                        { val: 40, suf: "%", lab: "Efficiency Boost" }
                    ].map((stat, i) => (
                        <div key={i} className="p-16 text-center group/stat">
                            <div className="text-7xl font-black text-white mb-3 transition-transform duration-500 group-hover/stat:scale-110 tabular-nums tracking-tighter">
                                <CountUp end={stat.val} duration={2} enableScrollSpy scrollSpyOnce />
                                <span className="text-blue-500">{stat.suf}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black leading-relaxed max-w-[150px] mx-auto opacity-60 group-hover/stat:opacity-100 transition-opacity whitespace-pre-line">{stat.lab}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const CTASoftware = ({ onOpenModal }) => (
    <section className="relative py-40 px-4 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-blue-600/10 blur-[150px] opacity-40 animate-pulse" />
            <div
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 grayscale"
                style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/person-working-html-computer.jpg')" }}
            />
            <img
                src="/imagenes/micrositios/Desarrollo-software/person-pressing-power-button.jpg"
                alt="Final CTA"
                className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-20 grayscale pointer-events-none hidden lg:block"
                loading="lazy"
            />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <h2 className="text-6xl md:text-[8rem] font-black mb-10 leading-[0.85] tracking-tighter">
                    ¿Listo para <br />desarrollar tu <br /><span className="text-blue-500 italic underline decoration-white/20">plataforma?</span>
                </h2>
                <p className="text-2xl text-gray-400 mb-16 font-light italic max-w-3xl mx-auto leading-relaxed">
                    Transformamos ideas complejas en realidades técnicas escalables. Del concepto al código de producción.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <button
                        onClick={onOpenModal}
                        className="group relative px-14 py-8 bg-blue-600 rounded-full font-black text-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(37,99,235,0.4)]"
                    >
                        <span className="relative z-10 uppercase tracking-[0.2em] text-white">Solicitar asesoría</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
                    </button>
                    <Link
                        to="/"
                        className="px-14 py-8 bg-white/5 rounded-full font-black text-2xl border border-white/10 hover:bg-white/10 transition-all uppercase tracking-[0.2em] text-white/80"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        Volver al inicio
                    </Link>
                </div>
            </motion.div>
        </div>
    </section>
);

// --- MAIN PAGE ORCHESTRATOR ---

const DesarrolloSoftware = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeServiceInfo, setActiveServiceInfo] = useState(null);

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative selection:bg-blue-500/30">
            <BackgroundBlobs />

            <HeroSoftware />
            <PWADevelopment onOpenDetail={setActiveServiceInfo} />
            <FullStackDev onOpenDetail={setActiveServiceInfo} />
            <MobileApps onOpenDetail={setActiveServiceInfo} />
            <DevOpsEngineering onOpenDetail={setActiveServiceInfo} />
            <MicroservicesSection onOpenDetail={setActiveServiceInfo} />
            <MaintenanceSection onOpenDetail={setActiveServiceInfo} />
            <CTASoftware onOpenModal={() => setIsModalOpen(true)} />

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <AnimatePresence>
                {activeServiceInfo && (
                    <ServiceDetailModal
                        info={activeServiceInfo}
                        onClose={() => setActiveServiceInfo(null)}
                    />
                )}
            </AnimatePresence>

            <footer className="py-24 px-4 border-t border-white/5 text-center bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex justify-center">
                        <div className="w-12 h-px bg-blue-500/30" />
                    </div>
                    <p className="text-gray-500 text-[10px] font-black tracking-[0.6em] uppercase">
                        © {new Date().getFullYear()} Olimpo Innova • High-Performance Software Factory
                    </p>
                </div>
            </footer>
        </main>
    );
};

export default DesarrolloSoftware;
