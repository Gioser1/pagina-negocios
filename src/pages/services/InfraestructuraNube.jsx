import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Counter = ({ value, duration = 2.5 }) => {
    const [count, setCount] = useState("0");
    const nodeRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
        }, { threshold: 0.5 });
        if (nodeRef.current) observer.observe(nodeRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView) return;
        const targetNumber = parseFloat(value.replace(/[^0-9.]/g, ''));
        const prefix = value.match(/^[+<-]/) ? value.match(/^[+<-]/)[0] : '';
        const suffix = value.replace(/[0-9.+\-<>]/g, '');

        if (isNaN(targetNumber)) { setCount(value); return; }

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentNumber = (easeProgress * targetNumber).toFixed(targetNumber % 1 !== 0 ? 1 : 0);
            setCount(`${prefix}${currentNumber}${suffix}`);
            if (progress < 1) window.requestAnimationFrame(step);
            else setCount(value);
        };
        window.requestAnimationFrame(step);
    }, [inView, value, duration]);

    return <span ref={nodeRef}>{count}</span>;
};

const FloatingOrb = ({ color, size, duration, delay, x, y }) => (
    <motion.div
        animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="absolute pointer-events-none blur-[120px] opacity-30"
        style={{
            backgroundColor: color,
            width: size,
            height: size,
            left: x,
            top: y,
        }}
    />
);

const InfraestructuraNube = () => {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-sky-500/30 overflow-hidden pt-28 md:pt-32 relative">
            
            {/* --- BACKROUND DYNAMICS --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingOrb color="rgba(14, 165, 233, 0.2)" size="600px" duration={15} delay={0} x="10%" y="10%" />
                <FloatingOrb color="rgba(79, 70, 229, 0.15)" size="500px" duration={18} delay={2} x="60%" y="40%" />
                <FloatingOrb color="rgba(14, 165, 233, 0.1)" size="700px" duration={22} delay={5} x="20%" y="70%" />
            </div>

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 md:px-10 z-10 w-full mb-32 mt-8">
                <motion.div 
                    style={{ scale: scaleHero, opacity: opacityHero }}
                    className="absolute inset-x-0 inset-y-[-20%] z-0 opacity-80 pointer-events-none"
                >
                    <img 
                        src="/imagenes/micrositios/Infraestructura-en-la-nube/cyber-security-concept-digital-art.jpg" 
                        alt="Infraestructura en la Nube"
                        className="w-full h-full object-cover mask-image-cyan"
                        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-black/40 to-[#050505]" />
                </motion.div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[600px] bg-sky-600/10 blur-[180px] rounded-full pointer-events-none z-0" />

                <motion.div 
                    style={{ y: yHero, opacity: opacityHero }}
                    className="relative z-10 max-w-6xl mx-auto flex flex-col items-center"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4 text-gray-200 uppercase">
                        Infraestructura
                    </h1>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-light italic tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                        en la Nube
                    </h2>

                    <p className="text-xl md:text-3xl text-gray-400 font-light max-w-3xl leading-relaxed mb-6 italic">
                        Orquestamos ecosistemas digitales ultra-resilientes.
                        <br/>
                        <span className="text-sky-400 underline decoration-sky-500/30 underline-offset-8">Tu negocio, sin límites.</span>
                    </p>

                    <div className="mt-12">
                        <Link 
                            to="/contacto"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-colors duration-300"
                        >
                            Explorar Soluciones
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* --- MIGRACION INTELIGENTE --- */}
            <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center relative mb-32">
                <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-sky-900/10 blur-[150px] rounded-full pointer-events-none" />
                
                <motion.div 
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full lg:w-1/2 relative z-10"
                >
                    <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white leading-[0.9]">
                        Migración a la<br/>
                        <span className="text-sky-500">Nube.</span>
                    </motion.h2>
                    <motion.h3 variants={itemVariants} className="text-2xl text-white font-bold mb-4 tracking-widest uppercase mt-6">Lift & Shift / Refactor</motion.h3>
                    <motion.p variants={itemVariants} className="text-xl text-gray-400 font-light italic leading-relaxed mb-8 max-w-lg">
                        Migramos aplicaciones y sistemas empresariales hacia entornos cloud mediante estrategias Lift & Shift o Refactorización, garantizando continuidad operativa y optimización tecnológica.
                    </motion.p>

                    <motion.div variants={itemVariants} className="mb-10">
                        <h4 className="text-sky-400 font-bold mb-4 uppercase tracking-widest text-sm">Beneficios Clave</h4>
                        <ul className="space-y-3">
                            {[
                                "Migración segura sin interrupciones críticas",
                                "Modernización de aplicaciones heredadas",
                                "Escalabilidad bajo demanda",
                                "Mayor resiliencia operativa"
                            ].map((beneficio, i) => (
                                <li key={i} className="flex items-center text-gray-300 text-sm font-medium">
                                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-3 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></span>
                                    {beneficio}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="text-sky-400 font-bold mb-6 uppercase tracking-widest text-sm">Datos Globales</h4>
                        <div className="flex flex-col gap-6">
                            {[
                                { num: "94%", desc: "De empresas utilizan servicios cloud." },
                                { num: "30%", desc: "De reducción de costos TI al migrar." },
                                { num: "∞", desc: "Escalabilidad de recursos en milisegundos." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 rounded-xl border border-sky-500/20 bg-sky-950/30 flex items-center justify-center text-sky-400 font-black italic text-xl group-hover:bg-sky-500 group-hover:text-white transition-all flex-shrink-0">
                                        {item.num}
                                    </div>
                                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 relative"
                >
                    <div className="w-full aspect-square md:aspect-[4/5] rounded-[3rem] border border-white/20 bg-[#0a0a0d] overflow-hidden group shadow-[0_0_50px_rgba(14,165,233,0.15)]">
                        <img 
                            src="/imagenes/micrositios/Infraestructura-en-la-nube/cloud-security-data-protection-concept.jpg" 
                            alt="Cloud Migration"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-10 left-10 p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/20 max-w-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm text-sky-400">Cloud Native Performance</h4>
                            <p className="text-gray-400 text-xs italic">Escalado dinámico en tiempo real bajo demanda, reduciendo cuellos de botella geográficos.</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- SOPORTE 24/7 (SRE) --- */}
            <motion.section 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="py-40 flex flex-col items-center justify-center text-center px-4 relative border-y border-white/10 bg-black/40 overflow-hidden mb-32 shadow-2xl"
            >
                <div className="absolute inset-0 z-0">
                    <img src="/imagenes/micrositios/Infraestructura-en-la-nube/skilled-mechanic-resolving-performance-related-issues-server-room-expert-utilizing-tablet-identify-operational-problems-causing-high-tech-facility-electronics-slowdown.jpg" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-[#050505]" />
                </div>
                
                <h2 className="relative z-10 text-5xl md:text-7xl font-black tracking-tighter italic text-white mb-4 drop-shadow-xl">
                    Balanceo <span className="text-sky-500">Multi-Región.</span>
                </h2>
                <p className="relative z-10 text-xl md:text-2xl text-gray-200 italic font-light mb-12 drop-shadow-lg max-w-4xl mx-auto">
                    Implementamos sistemas de balanceo de carga distribuidos en múltiples regiones para garantizar estabilidad, velocidad y continuidad del servicio incluso ante picos de tráfico o fallos regionales.
                </p>
                
                <div className="relative z-10 mb-16 flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                    {[
                        "Alta disponibilidad global",
                        "Distribución inteligente del tráfico",
                        "Reducción de latencia internacional",
                        "Tolerancia a fallos regionales"
                    ].map((beneficio, i) => (
                        <div key={i} className="bg-black/50 border border-white/10 px-6 py-3 rounded-full text-gray-300 text-sm italic font-medium backdrop-blur-md flex items-center shadow-lg">
                            <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                            {beneficio}
                        </div>
                    ))}
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 w-full max-w-5xl rounded-[3rem] border border-white/20 bg-[#050505]/70 backdrop-blur-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                    {[
                        { val: "99.9%", lbl: "DISPONIBILIDAD" },
                        { val: "60%", lbl: "REDUCCIÓN LATENCIA" },
                        { val: "70%", lbl: "MENOS RIESGOS" }
                    ].map((stat, i) => (
                        <div key={i} className={`flex flex-col items-center justify-center p-12 ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''} hover:bg-white/[0.05] transition-colors`}>
                            <div className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-[0_0_20px_rgba(14,165,233,0.4)]">{stat.val}</div>
                            <div className="border border-sky-400/50 bg-sky-950/80 px-6 py-2 rounded-full text-[10px] md:text-xs text-sky-300 font-bold uppercase tracking-[0.2em] text-center w-full max-w-[200px] truncate">{stat.lbl}</div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* --- SERVERLESS & CONTENEDORES --- */}
            <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative mb-32">
                <div className="absolute top-1/2 left-0 w-full h-full bg-indigo-900/10 blur-[150px] pointer-events-none" />
                
                <motion.div 
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative z-10"
                >
                    <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white leading-[0.9]">
                        Arquitectura<br/>
                        <span className="text-sky-500">Serverless.</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-xl text-gray-400 font-light italic leading-relaxed mb-6 max-w-lg mt-6">
                        Diseñamos arquitecturas basadas en serverless y contenedores, permitiendo ejecutar aplicaciones sin administrar servidores físicos y con escalabilidad automática. Ideal para plataformas digitales de alto crecimiento.
                    </motion.p>
                    
                    <motion.div variants={itemVariants}>
                        <h4 className="text-sky-400 font-bold mb-4 uppercase tracking-widest text-sm">Beneficios Clave</h4>
                        <ul className="space-y-4 pl-4 border-l border-sky-500/40 mb-10">
                            {[
                                "Escalabilidad automática",
                                "Reducción de costos operativos",
                                "Despliegue rápido de aplicaciones",
                                "Infraestructura altamente modular"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 items-center text-lg text-gray-300 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="text-sky-400 font-bold mb-4 uppercase tracking-widest text-sm">Datos Globales</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <span className="block text-2xl font-black text-white">40%</span>
                                <span className="text-xs text-gray-400">Reducción de costos en Serverless</span>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                <span className="block text-2xl font-black text-white">3X</span>
                                <span className="text-xs text-gray-400">Más rápido con contenedores</span>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:col-span-2">
                                <span className="block text-2xl font-black text-white">$30 Mil M</span>
                                <span className="text-xs text-gray-400">Mercado global de contenedores</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10 w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center perspective-1000 mt-10 lg:mt-0"
                    >
                        {/* Background faint image */}
                        <img src="/imagenes/micrositios/Infraestructura-en-la-nube/server-cloud-data-storage-concept-cloudscape-digital-online-service-global-network-web-database-backup-computer-infrastructure-technology.jpg" className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-[4rem] blur-[2px]" />
                        <div className="absolute inset-0 bg-[#050505]/40 rounded-[4rem]" />
                        
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ rotateY: -10, rotateX: 5, zIndex: 30, scale: 1.05 }}
                            className="absolute top-4 left-0 md:-left-12 w-[55%] aspect-square bg-[#0a0a0d]/90 backdrop-blur-md border border-white/20 rounded-[3rem] p-8 flex flex-col justify-end z-10 shadow-2xl transition-transform duration-500"
                        >
                            <div className="text-3xl lg:text-5xl font-black text-sky-500 tracking-tighter drop-shadow-lg">DOCKER</div>
                            <div className="text-[10px] text-gray-300 uppercase tracking-[0.3em] mt-2 font-bold">PORTABILIDAD</div>
                        </motion.div>
                        
                        <motion.div 
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            whileHover={{ rotateY: 10, rotateX: -5, scale: 1.1, zIndex: 30 }}
                            className="absolute bottom-4 right-0 md:-right-8 w-[60%] aspect-square bg-sky-500/90 backdrop-blur-md border border-white/30 rounded-[3rem] p-8 flex flex-col justify-end z-20 shadow-[0_0_60px_rgba(14,165,233,0.6)] transition-transform duration-500"
                        >
                            <div className="text-4xl lg:text-6xl font-black text-white tracking-tighter drop-shadow-md">K8s</div>
                            <div className="text-[10px] text-white/90 uppercase tracking-[0.3em] mt-2 font-bold">SCALING</div>
                        </motion.div>
                    </motion.div>
            </section>

            {/* --- CAPAS DE SEGURIDAD --- */}
            <section className="relative py-32 px-6 md:px-10 border-y border-white/5 bg-black/20 overflow-hidden mb-32">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img src="/imagenes/micrositios/Infraestructura-en-la-nube/cloud-download-icon-line-connection-circuit-board.jpg" className="w-full h-full object-cover opacity-20 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]" />
                </div>
                
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="order-2 lg:order-1 relative z-10 w-full aspect-square max-w-[500px] mx-auto bg-[#030712] rounded-[4rem] border border-white/20 overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(14,165,233,0.15)] group"
                    >
                        <img src="/imagenes/micrositios/Infraestructura-en-la-nube/cloud-security-data-protection-concept (1).jpg" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2s]" />
                        <div className="absolute inset-0 bg-[#050505]/60" />
                        
                        {/* Interactive Radar Rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {[0.3, 0.6, 0.9].map((s, i) => (
                                <motion.div 
                                    key={i}
                                    animate={{ 
                                        scale: [s, s + 0.1, s],
                                        opacity: [0.1, 0.3, 0.1]
                                    }}
                                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                                    className="absolute border border-sky-400/30 rounded-full"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ))}
                        </div>
                        
                        <motion.div 
                            className="absolute w-[50%] h-[50%] bg-gradient-to-tr from-sky-400/40 to-transparent rounded-full blur-xl origin-bottom-right"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            style={{ top: 0, left: 0 }}
                        />
                        
                        <motion.div 
                            className="w-8 h-8 bg-sky-400 rounded-full shadow-[0_0_40px_rgba(14,165,233,1)] z-10 flex items-center justify-center" 
                            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }} 
                            transition={{ duration: 2, repeat: Infinity }} 
                        >
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="order-1 lg:order-2 relative z-10"
                    >
                        <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white leading-[0.9]">
                            Copias de<br/>
                            <span className="text-indigo-400">Seguridad & DR.</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-gray-300 font-light italic leading-relaxed mb-8">
                            Implementamos sistemas de backup automatizado y planes de recuperación ante desastres (DRP) que garantizan la continuidad operativa y la protección de los datos críticos.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mb-10">
                            <ul className="grid grid-cols-2 gap-4">
                                {[
                                    "Copias de seguridad automáticas",
                                    "Recuperación rápida ante fallos",
                                    "Protección contra pérdida de datos",
                                    "Continuidad operativa garantizada"
                                ].map((beneficio, i) => (
                                    <li key={i} className="flex items-start text-gray-400 text-sm font-medium hover:text-white transition-colors cursor-default">
                                        <span className="text-indigo-500 mr-2 text-lg">✔</span>
                                        {beneficio}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.h4 variants={itemVariants} className="text-indigo-400 font-bold mb-4 uppercase tracking-widest text-sm">El Riesgo Real</motion.h4>
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            {[
                                { title: "60% CIERRE DE EMPRESAS", desc: "Empresas que pierden datos críticos cierran en menos de 6 meses." },
                                { title: "HASTA 90% MENOS RIESGO", desc: "Los Backups automatizados reducen riesgos mortales de pérdida." },
                                { title: "COSTO: USD $1 MILLÓN", desc: "El costo promedio corporativo de una pérdida de datos masiva." }
                            ].map((box, i) => (
                                <motion.div 
                                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                                    key={i} 
                                    className="border border-indigo-500/20 bg-[#0a0a0d]/80 backdrop-blur-md p-6 rounded-2xl border-l-[4px] border-l-indigo-500 transition-all shadow-lg cursor-default"
                                >
                                    <h4 className="font-black uppercase tracking-[0.15em] text-white mb-2 text-sm">{box.title}</h4>
                                    <p className="text-gray-400 text-xs italic">{box.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- FINOPS: AUDITADO --- */}
            <section className="relative py-32 px-6 md:px-10 bg-black/40 overflow-hidden mb-40">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img src="/imagenes/micrositios/Infraestructura-en-la-nube/saas-concept-collage.jpg" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/70 to-[#050505]" />
                </div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center relative z-10">
                    <motion.div 
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-[45%] relative z-10"
                    >
                        <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white leading-[0.9]">
                            Optimización de<br/>
                            <span className="text-sky-500">Costos.</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-gray-300 font-light italic leading-relaxed mb-12">
                            Aplicamos metodologías FinOps para analizar, optimizar y controlar el gasto cloud, alineando tecnología con eficiencia financiera.
                        </motion.p>

                        <motion.h4 variants={itemVariants} className="text-sky-400 font-bold mb-4 uppercase tracking-widest text-sm">Beneficios Clave</motion.h4>
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            {[
                                { title: "MONITOREO EN TIEMPO REAL", desc: "Visibilidad total del consumo granular en horas." },
                                { title: "OPTIMIZACIÓN AUTOMÁTICA", desc: "Ajuste dinámico de los recursos para no sobrepagar." },
                                { title: "ELIMINACIÓN DE BASURA", desc: "Destrucción de infraestructuras ociosas e innecesarias." },
                                { title: "PLANIFICACIÓN FINANCIERA", desc: "Presupuestos predecibles con métricas TCO claras." }
                            ].map((item, i) => (
                                <motion.div 
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    key={i} 
                                    className="border border-white/10 bg-white/5 p-4 lg:p-6 rounded-[1.5rem] flex items-center justify-between hover:border-sky-400/50 hover:bg-white/10 transition-all group shadow-md cursor-default"
                                >
                                    <div>
                                        <h4 className="font-black uppercase tracking-[0.15em] text-white text-xs mb-1 group-hover:text-sky-400 transition-colors">{item.title}</h4>
                                        <p className="text-gray-400 italic text-[11px] md:text-xs">{item.desc}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-sky-400/50 text-sky-400 flex items-center justify-center flex-shrink-0 ml-4 font-bold text-lg group-hover:bg-sky-400 group-hover:text-white transition-colors shadow-[0_0_10px_rgba(14,165,233,0.3)]">+</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-[55%] relative z-10 h-full"
                    >
                        <div className="w-full aspect-square max-h-[600px] border border-white/20 rounded-[4rem] bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center p-10 shadow-[0_0_50px_rgba(14,165,233,0.15)] group">
                            <img 
                                src="/imagenes/micrositios/Infraestructura-en-la-nube/businessman-analyzing-data-tablet-cityscape-background.jpg" 
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-black/90" />
                            
                            <div className="relative z-10 text-center">
                                <h4 className="text-sky-300 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-8 drop-shadow-md">30% DEL GASTO CLOUD SUELE DESPERDICIARSE</h4>
                                <motion.div 
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-[7rem] md:text-[9rem] font-black leading-none tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-400 drop-shadow-2xl"
                                >
                                    <Counter value="35" />%
                                </motion.div>
                                <p className="text-gray-200 font-bold text-lg max-w-sm mx-auto drop-shadow-md">
                                    Optimización Automática
                                </p>
                                <div className="mt-8 pt-6 border-t border-white/20 flex flex-col gap-2 relative z-20">
                                    <span className="text-gray-400 text-sm">25% Promedio de reducción en costos</span>
                                    <span className="text-gray-500 text-xs italic">Mercado global supera USD $600 Mil Millones</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- HOSTING GESTIONADO --- */}
            <section className="relative py-40 px-6 md:px-10 border-y border-white/10 bg-black/40 overflow-hidden mb-40 shadow-2xl">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img src="/imagenes/micrositios/Infraestructura-en-la-nube/website-hosting-concept-with-cloud.jpg" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/60 to-[#050505]" />
                </div>

                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
                    <motion.div 
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative z-10 max-w-5xl"
                    >
                        <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 text-white leading-[0.9]">
                            Hosting <span className="text-sky-500">Gestionado.</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-gray-300 font-light italic leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-lg">
                            Ofrecemos servicios de hosting gestionado con entornos optimizados para aplicaciones empresariales, garantizando alto rendimiento, seguridad avanzada y monitoreo permanente.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
                            {[
                                { title: "INFRAESTRUCTURA OPTIMIZADA", desc: "Arquitectura hiperconvergente de máxima velocidad." },
                                { title: "MONITOREO 24/7", desc: "Supervisión proactiva contra picos de carga y caídas." },
                                { title: "SEGURIDAD AVANZADA", desc: "Firewall y limpieza automatizada de malware." },
                                { title: "SOPORTE TÉCNICO", desc: "Ingenieros especialistas gestionando tu host." }
                            ].map((box, i) => (
                                <motion.div 
                                    whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.08)" }}
                                    key={i} 
                                    className="border border-white/10 bg-[#050505]/70 backdrop-blur-xl p-8 rounded-3xl border-t-[4px] border-t-sky-500 hover:border-sky-400 transition-all shadow-2xl cursor-default"
                                >
                                    <h4 className="font-black uppercase tracking-[0.1em] text-white/90 mb-3 text-[11px] leading-tight h-8 flex items-center group-hover:text-sky-400">{box.title}</h4>
                                    <p className="text-gray-400 italic text-xs">{box.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 md:gap-10 border-t border-white/20 pt-10">
                            {[
                                { val: "20%", lbl: "REDUCCIÓN DE CARGA" },
                                { val: "50%", lbl: "OPTIMIZACIÓN RENDIMIENTO" },
                                { val: "70%", lbl: "MENOS VULNERABILIDADES" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className="text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                                        <Counter value={stat.val} />
                                    </span>
                                    <span className="text-xs text-sky-400 uppercase tracking-widest mt-2 font-bold drop-shadow-md">{stat.lbl}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- BOTTOM CTA --- */}
            <section className="relative py-48 px-10 text-center overflow-hidden bg-black border-t border-white/5">
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <img 
                        src="/imagenes/micrositios/Infraestructura-en-la-nube/server-cabinets-data-center-maintaining-large-scale-ai-datasets.jpg" 
                        alt="CTA Background"
                        className="w-full h-full object-cover mask-image-gradient mix-blend-luminosity"
                        style={{ WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/80 to-[#050505]" />
                </div>
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-sky-600/10 blur-[150px] rounded-full pointer-events-none" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <motion.h2 
                        animate={{ scale: [0.98, 1.02, 0.98] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 text-white italic"
                    >
                        ¿Listo para la <span className="text-sky-500 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Nube?</span>
                    </motion.h2>
                    
                    <div className="flex justify-center mt-12">
                        <Link 
                            to="/contacto"
                            className="group relative px-12 py-6 bg-sky-500 text-white rounded-full font-black uppercase tracking-widest border border-sky-400/50 shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_80px_rgba(14,165,233,0.5)] hover:scale-110 transition-all overflow-hidden"
                            onClick={() => window.scrollTo(0,0)}
                        >
                            <span className="relative z-10">SOLICITAR AUDITORÍA</span>
                            <motion.div 
                                className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                            />
                        </Link>
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

export default InfraestructuraNube;