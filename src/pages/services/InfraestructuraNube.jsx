import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ContactModal from "../../components/ContactModal";

// ─── Componentes Utilitarios ──────────────────────────────────────────────────

function Counter({ numericValue, suffix, label, duration = 2000 }) {
    const [display, setDisplay] = useState("0");
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                let start = null;
                const step = (ts) => {
                    if (!start) start = ts;
                    const p = Math.min((ts - start) / duration, 1);
                    const ease = 1 - Math.pow(1 - p, 4);
                    let currentVal = ease * numericValue;
                    if (numericValue % 1 !== 0) {
                        setDisplay(currentVal.toFixed(1));
                    } else {
                        setDisplay(Math.round(currentVal).toString());
                    }
                    if (p < 1) requestAnimationFrame(step);
                    else setDisplay(numericValue.toString());
                };
                requestAnimationFrame(step);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [numericValue, duration]);

    return (
        <div ref={ref} className="text-center p-8 bg-[#050505] rounded-[2rem] border border-white/5 relative overflow-hidden group transition-all duration-500 hover:border-cyan-500/20 shadow-2xl flex-1 flex flex-col justify-center">
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-5xl md:text-7xl font-black mb-4 flex items-baseline justify-center tracking-tighter text-white">
                    {display}
                    <span className="text-cyan-500">{suffix}</span>
                </div>
                <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-[0.2em] font-bold text-center">{label}</div>
            </div>
        </div>
    );
}

function MouseIndicator() {
    return (
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 mt-10 mx-auto">
            <motion.div
                animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-cyan-500 rounded-full"
            />
        </div>
    );
}

// ─── Tarjetas de Sección y Animaciones ────────────────────────────────────────

// 1. Migración a la nube
const CloudMigrationAnim = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
        <div className="absolute bottom-10 flex gap-12">
            {[1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -200], opacity: [0, 1, 0], scale: [1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    className="w-12 h-16 bg-cyan-900/40 border border-cyan-500/30 rounded-lg backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                    <span className="text-cyan-400 text-xs">☁️</span>
                </motion.div>
            ))}
        </div>
        <div className="absolute inset-0 opacity-30">
            {[1,2,3,4,5].map(i => (
                <motion.div 
                    key={i}
                    animate={{ y: ["100%", "-100%"] }}
                    transition={{ duration: Math.random()*2+2, repeat: Infinity, ease: "linear", delay: Math.random() }}
                    className="absolute w-px h-32 bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
                    style={{ left: `${15 * i + 10}%` }}
                />
            ))}
        </div>
    </div>
);

// 2. Balanceo de Carga Multi-Región
const MultiRegionAnim = () => (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center p-8">
        <div className="relative w-full h-full border-2 border-cyan-500/10 rounded-full bg-cyan-900/5 backdrop-blur-[2px]">
            {/* Dots */}
            {[
                { top: '20%', left: '30%' }, { top: '30%', left: '70%' }, 
                { top: '70%', left: '20%' }, { top: '60%', left: '80%' },
                { top: '50%', left: '50%' }
            ].map((pos, i) => (
                <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i*0.2 }}
                    className="absolute w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                    style={pos}
                />
            ))}
            {/* Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
                <motion.path 
                    d="M 100 80 Q 200 150 250 100 T 350 200 M 100 80 Q 150 250 250 100" 
                    fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, 100] }}
                    transition={{ duration: 4, repeat: Infinity, linear: true }}
                />
            </svg>
        </div>
    </div>
);

// 3. FinOps
const FinOpsAnim = () => (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-end justify-center gap-4 p-10">
        {[40, 70, 30, 90, 50].map((h, i) => (
            <div key={i} className="w-12 bg-emerald-900/30 border border-emerald-500/20 rounded-t-lg relative flex justify-center items-end h-full">
                <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-emerald-600/50 to-emerald-400 absolute bottom-0 rounded-t-lg"
                />
                <motion.div
                    animate={{ y: [-10, -30], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i*0.5 }}
                    className="absolute bottom-[110%] text-emerald-400 font-bold text-sm"
                >
                    $
                </motion.div>
            </div>
        ))}
    </div>
);

// 4. Serverless
const ServerlessAnim = () => (
    <div className="absolute inset-0 pointer-events-none z-20 p-12 grid grid-cols-3 grid-rows-3 gap-4">
        {[...Array(9)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: Math.random() }}
                className="bg-purple-900/20 border border-purple-500/30 rounded-xl backdrop-blur-sm relative overflow-hidden"
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                    className="w-4 h-4 bg-purple-500 rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                />
            </motion.div>
        ))}
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
            <motion.path 
                d="M 100 100 L 200 200 L 300 100" 
                fill="none" stroke="#a855f7" strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
            />
        </svg>
    </div>
);

// 5. Backups DRP
const BackupAnim = () => (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
        <div className="relative w-48 h-48">
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-4 border-blue-500"
            />
            {/* Shield */}
            <motion.svg 
                viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1" 
                className="absolute inset-0 w-full h-full p-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </motion.svg>
            
            {/* Backup flow */}
            <motion.div
                animate={{ x: [-50, 50], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-white/80 rounded-full -translate-y-1/2"
            />
        </div>
    </div>
);

// 6. Hosting Gestionado
const HostingAnim = () => (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center gap-6">
        {[1, 2, 3].map(i => (
            <div key={i} className="w-64 h-8 bg-black/40 border border-white/10 rounded-full relative overflow-hidden backdrop-blur-md flex items-center px-4">
                <span className="text-[10px] text-gray-500 w-12 font-black">CPU {i}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full ml-2 relative overflow-hidden">
                    <motion.div
                        animate={{ width: [`${Math.random()*40+20}%`, `${Math.random()*80+20}%`] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400"
                    />
                </div>
                <motion.div 
                    animate={{ opacity: [1, 0.2] }} 
                    transition={{ duration: 0.5, repeat: Infinity, delay: Math.random() }} 
                    className="w-2 h-2 rounded-full bg-cyan-400 ml-4 shadow-[0_0_5px_cyan]" 
                />
            </div>
        ))}
    </div>
);


function ImageGlowBlock({ src, alt, customAnim: CustomAnim }) {
    return (
        <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative w-full h-full border hover:border-cyan-500/50 border-white/10 rounded-[2rem] bg-[#050505] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] group">
                <motion.img 
                    src={src} 
                    alt={alt} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 filter brightness-75 group-hover:brightness-90 group-hover:opacity-100" 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 pointer-events-none z-10" />
                <div className="relative z-20 w-full h-full">
                    {CustomAnim && <CustomAnim />}
                </div>
            </div>
        </div>
    );
}

function ServiceSection({ service, index }) {
    const isEven = index % 2 === 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, x: isEven ? -50 : 50 },
        visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-10 mb-24 md:mb-40 relative z-20">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
                <motion.div variants={imageVariants} className="w-full lg:w-1/2">
                    <ImageGlowBlock src={service.image} alt={service.title} customAnim={service.customAnim} />
                </motion.div>

                <div className="w-full lg:w-1/2">
                    <motion.div variants={itemVariants}>
                        {service.quote && (
                            <motion.div 
                                variants={itemVariants}
                                className="mb-4 inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]"
                            >
                                {service.quote}
                            </motion.div>
                        )}
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-tight">
                            {service.title.split(' ').map((word, i, arr) => (
                                i === arr.length - 1 ? <span key={i} className="text-cyan-500 block sm:inline"> {word}</span> : word + " "
                            ))}
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-8">
                            {service.description}
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 md:p-10 mb-10 shadow-inner group transition-all hover:bg-white/[0.02]">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 border-b border-white/5 pb-4">Beneficios Clave</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex gap-4 items-start group/item">
                                        <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-cyan-500 group-hover/item:text-white transition-all duration-300 group-hover/item:rotate-12 shadow-[0_0_10px_transparent] group-hover/item:shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                                            <span className="text-[10px] font-black">✓</span>
                                        </div>
                                        <span className="text-gray-300 text-sm font-medium leading-relaxed group-hover/item:text-white transition-colors">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

// ─── Data Services ────────────────────────────────────────────────────────────

const services = [
    {
        title: "Migración a la Nube (Lift & Shift / Refactor)",
        description: "Explica que consiste en trasladar aplicaciones y sistemas desde infraestructura local hacia plataformas en la nube para mejorar escalabilidad, disponibilidad y eficiencia tecnológica.",
        benefits: ["Migración segura sin interrupciones críticas", "Adaptación rápida al entorno cloud", "Escalabilidad bajo demanda", "Mayor resiliencia operativa"],
        stats: [{ value: "30", label: "% REDUCCIÓN DE COSTOS" }, { value: "Segundos", label: "ESCALABILIDAD" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/cloud-security-data-protection-concept.jpg",
        customAnim: CloudMigrationAnim,
        quote: "Ecosistemas cloud elásticos"
    },
    {
        title: "Balanceo de Carga Multi-Región",
        description: "Sistema que distribuye tráfico entre múltiples servidores o regiones para mejorar rendimiento, disponibilidad y tolerancia a fallos.",
        benefits: ["Alta disponibilidad global", "Distribución inteligente del tráfico", "Reducción de latencia para usuarios", "Mayor estabilidad de aplicaciones"],
        stats: [{ value: "40", label: "% REDUCCIÓN DE LATENCIA" }, { value: "Mayor", label: "ESTABILIDAD EN SERVICIOS" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/skilled-mechanic-resolving-performance-related-issues-server-room-expert-utilizing-tablet-identify-operational-problems-causing-high-tech-facility-electronics-slowdown.jpg",
        customAnim: MultiRegionAnim
    },
    {
        title: "Optimización de Costos (FinOps)",
        description: "Metodología que permite analizar, controlar y optimizar el gasto en infraestructura tecnológica mediante gestión financiera del uso de recursos.",
        benefits: ["Reducción de costos en cloud", "Control del gasto en infraestructura", "Mejor asignación de recursos", "Transparencia financiera tecnológica"],
        stats: [{ value: "30", label: "% AHORRO GASTO CLOUD" }, { value: "25", label: "% REDUCCIÓN COSTOS" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/businessman-analyzing-data-tablet-cityscape-background.jpg",
        customAnim: FinOpsAnim,
        quote: "Control y ahorro auditado"
    },
    {
        title: "Arquitectura Serverless y Contenedores",
        description: "Diseño de arquitecturas basadas en microservicios que permiten ejecutar aplicaciones sin administrar servidores físicos.",
        benefits: ["Escalabilidad automática", "Reducción de costos operativos", "Implementación rápida", "Mayor eficiencia de desarrollo"],
        stats: [{ value: "60", label: "% REDUCCIÓN COSTOS IT" }, { value: "30", label: "% MEJORA RENDIMIENTO" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/server-cloud-data-storage-concept-cloudscape-digital-online-service-global-network-web-database-backup-computer-infrastructure-technology.jpg",
        customAnim: ServerlessAnim
    },
    {
        title: "Copias de Seguridad Automatizadas y DRP",
        description: "Sistemas que realizan respaldos automáticos y permiten recuperar información en caso de fallos, pérdidas o desastres tecnológicos.",
        benefits: ["Protección contra pérdida de datos", "Recuperación rápida ante fallos", "Automatización de backups", "Seguridad empresarial"],
        stats: [{ value: "95", label: "% RECUPERACIÓN MINUTOS" }, { value: "Fallos", label: "PROTECCIÓN CRÍTICA" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/cloud-security-data-protection-concept (1).jpg",
        customAnim: BackupAnim,
        quote: "Resiliencia absoluta"
    },
    {
        title: "Hosting Gestionado de Alto Rendimiento",
        description: "Infraestructura administrada con servidores optimizados para aplicaciones web, garantizando rendimiento, estabilidad y monitoreo continuo.",
        benefits: ["Infraestructura optimizada", "Soporte técnico especializado", "Escalabilidad automática", "Monitoreo constante"],
        stats: [{ value: "50", label: "% REDUCCIÓN CARGA" }, { value: "Alto", label: "RENDIMIENTO WEB" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/saas-concept-collage.jpg",
        customAnim: HostingAnim
    }
];

// ─── Main Component ───────────────────────────────────────────────────────────

const InfraestructuraNube = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    
    // Hero Parallax values
    const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const yDesc = useTransform(scrollYProgress, [0, 0.2], [0, 30]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
                * { font-family: 'Open Sans', system-ui, -apple-system, sans-serif; cursor: default; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #000; }
                ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 10px; }
            `}</style>
            
            {/* Global Animated Background Particles */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                {[...Array(20)].map((_,i) => (
                    <motion.div 
                        key={i}
                        animate={{ 
                            y: ['-10%', '110%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: Math.random()*10 + 10, repeat: Infinity, ease: "linear", delay: Math.random()*5 }}
                        className="absolute w-px h-16 bg-gradient-to-t from-transparent via-cyan-500 to-transparent"
                        style={{ left: `${Math.random()*100}%` }}
                    />
                ))}
            </div>

            <main className="min-h-screen bg-[#000000] text-white selection:bg-cyan-500/30 overflow-x-hidden pt-28 pb-0 relative">

                {/* --- HERO SECTION --- */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-10 z-10 w-full overflow-hidden mb-20">
                    <motion.div 
                        style={{ scale: scaleHero, opacity: opacityHero }}
                        className="absolute inset-x-0 inset-y-[-20%] z-0 opacity-80 pointer-events-none"
                    >
                        <img 
                            src="/imagenes/micrositios/Infraestructura-en-la-nube/cyber-security-concept-digital-art.jpg" 
                            alt="Ingeniería Cloud"
                            className="w-full h-full object-cover mask-image-gradient filter brightness-[0.85]"
                            style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-black/40 to-[#000]" />
                    </motion.div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[600px] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none z-0" />

                    <motion.div 
                        animate={{ y: [-10, 10, -10] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center mt-10"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-[3.5rem] sm:text-[5rem] lg:text-[7.5rem] font-black leading-[0.85] tracking-tighter mb-6 text-white uppercase text-center"
                            style={{ y: yTitle, textShadow: "0 0 80px rgba(6, 182, 212, 0.4)" }}
                        >
                            Infraestructura <br /> <span className="text-cyan-500">Cloud</span>
                        </motion.h1>

                        <motion.p
                            style={{ y: yDesc }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-3xl text-gray-300 font-light max-w-5xl mx-auto italic leading-relaxed mb-12 text-center"
                        >
                            <span className="text-white">Orquestamos ecosistemas digitales ultra-resilientes </span>
                            <span className="text-cyan-400 font-semibold italic">con disponibilidad global </span>
                            <span className="text-white">y eficiencia operativa sin precedentes.</span>
                        </motion.p>
                        
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
                            <MouseIndicator />
                        </motion.div>
                    </motion.div>
                </section>

                {/* --- SECTIONS BLOCK 1 --- */}
                <div className="relative">
                    <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
                    <ServiceSection service={services[0]} index={0} />
                    <ServiceSection service={services[1]} index={1} />
                </div>

                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={30} suffix="%" label="Reducción global en costos de infraestructura" />
                        <Counter numericValue={40} suffix="%" label="Reducción en la latencia para usuarios" />
                        <Counter numericValue={100} suffix="%" label="Estabilidad garantizada en multi-región" />
                    </div>
                </section>

                {/* --- SECTIONS BLOCK 2 --- */}
                <div className="relative">
                    <div className="absolute left-0 top-1/3 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
                    <ServiceSection service={services[2]} index={2} />
                    <ServiceSection service={services[3]} index={3} />
                </div>

                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={30} suffix="%" label="Ahorro financiero en infraestructura Cloud" />
                        <Counter numericValue={60} suffix="%" label="Reducción de dependencia IT" />
                        <Counter numericValue={30} suffix="%" label="Aumento de velocidad transaccional" />
                    </div>
                </section>

                {/* --- SECTIONS BLOCK 3 --- */}
                <div className="relative">
                    <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
                    <ServiceSection service={services[4]} index={4} />
                    <ServiceSection service={services[5]} index={5} />
                </div>

                 <section className="max-w-7xl mx-auto px-6 md:px-10 mb-40 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={95} suffix="%" label="Tasa de recuperación DRP en minutos" />
                        <Counter numericValue={50} suffix="%" label="Reducción en fallos operativos críticos" />
                        <Counter numericValue={99} suffix=".9%" label="Uptime en servicios de misión crítica" />
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section className="relative py-48 px-10 text-center overflow-hidden bg-black border-t border-white/5">
                    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                        <img 
                            src="/imagenes/micrositios/Infraestructura-en-la-nube/skilled-mechanic-resolving-performance-related-issues-server-room-expert-utilizing-tablet-identify-operational-problems-causing-high-tech-facility-electronics-slowdown.jpg" 
                            alt="CTA Background"
                            className="w-full h-full object-cover filter brightness-50 sepia-0 mask-image-gradient"
                            style={{ WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-black/80 to-transparent" />
                    </div>
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 text-white uppercase italic">
                            ¿Listo para la <br/><span className="text-cyan-500 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Supremacía Digital?</span>
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-16 py-6 bg-cyan-600 rounded-full font-black text-sm uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)]"
                            >
                                Auditar Ecosistema
                            </button>
                            <Link
                                to="/"
                                className="px-16 py-6 bg-[#0a0a0a] border border-white/10 rounded-full font-black text-sm uppercase tracking-widest text-white hover:bg-white/5 transition-all outline-none"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Volver al Inicio
                            </Link>
                        </div>
                    </motion.div>
                </section>

                <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            </main>
        </>
    );
};

export default InfraestructuraNube;