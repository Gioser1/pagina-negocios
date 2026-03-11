import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ContactModal from "../../components/ContactModal";

// Counter component for stats
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
        <div ref={ref} className="text-center p-8 bg-[#050505] rounded-[2rem] border border-white/5 relative overflow-hidden group transition-all duration-500 hover:border-blue-500/20 shadow-2xl flex-1 flex flex-col justify-center">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-5xl md:text-7xl font-black mb-4 flex items-baseline justify-center tracking-tighter text-white">
                    {display}
                    <span className="text-blue-500">{suffix}</span>
                </div>
                <div className="text-[10px] md:text-sm text-gray-500 uppercase tracking-[0.2em] font-bold text-center">{label}</div>
            </div>
        </div>
    );
}

// Mouse Scroll Indicator
function MouseIndicator() {
    return (
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 mt-10 mx-auto">
            <motion.div
                animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-blue-500 rounded-full"
            />
        </div>
    );
}

// The structural image block to replace the abstract ones
function ImageGlowBlock({ src, alt }) {
    return (
        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative w-full h-full border hover:border-blue-500/50 border-white/10 rounded-[2rem] bg-[#050505] overflow-hidden shadow-2xl transition-all duration-700 
                hover:shadow-[0_0_50px_rgba(37,99,235,0.2)] group">
                <motion.img 
                    src={src} 
                    alt={alt} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
        </div>
    );
}

// Alternating Service Component
function ServiceSection({ service, index }) {
    const isEven = index % 2 === 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, x: isEven ? -50 : 50 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            x: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
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
                {/* Image Side */}
                <motion.div variants={imageVariants} className="w-full lg:w-1/2">
                    <ImageGlowBlock src={service.image} alt={service.title} />
                </motion.div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2">
                    <motion.div variants={itemVariants}>
                        {service.quote && (
                            <motion.div 
                                variants={itemVariants}
                                className="mb-4 inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]"
                            >
                                {service.quote}
                            </motion.div>
                        )}
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-tight">
                            {service.title.split(' ').map((word, i, arr) => (
                                i === arr.length - 1 ? <span key={i} className="text-blue-500 block sm:inline"> {word}</span> : word + " "
                            ))}
                        </motion.h2>
                        
                        {service.subtitle && (
                            <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-bold text-gray-200 mb-4 italic leading-tight">
                                {service.subtitle}
                            </motion.h3>
                        )}

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-8">
                            {service.description}
                        </motion.p>

                        {service.ideales && (
                            <motion.div variants={itemVariants} className="mb-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 italic">Ideales para:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {service.ideales.map((item, i) => (
                                        <motion.span 
                                            whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
                                            key={i} 
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 font-medium transition-colors"
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        
                        <motion.div variants={itemVariants} className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 md:p-10 mb-10 shadow-inner">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 border-b border-white/5 pb-4">Beneficios Clave</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex gap-4 items-start group">
                                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 group-hover:rotate-12">
                                            <span className="text-[10px] font-black">✓</span>
                                        </div>
                                        <span className="text-gray-300 text-sm md:text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {service.stats && (
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
                                {service.stats.map((stat, i) => (
                                    <motion.div 
                                        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.4)" }}
                                        key={i} 
                                        className="px-5 py-3 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 flex flex-col items-center justify-center transition-all duration-300"
                                    >
                                        <span className="text-lg md:text-xl font-black text-white leading-none mb-1">{stat.value}</span>
                                        <span className="text-[9px] uppercase tracking-widest text-blue-400 font-bold text-center">{stat.label}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

const DesarrolloSoftware = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    
    // Hero Parallax values
    const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const yDesc = useTransform(scrollYProgress, [0, 0.2], [0, 30]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    const pwaService = {
        title: "Aplicaciones Web Progresivas (PWA)",
        description: "Desarrollamos Aplicaciones Web Progresivas (PWA) que combinan lo mejor de la web y las aplicaciones móviles. Funcionan offline, cargan en milisegundos y pueden instalarse directamente desde el navegador, eliminando fricción en la adquisición de usuarios.",
        ideales: ["Plataformas financieras (FinTech)", "Turismo y reservas", "E-commerce", "Sistemas educativos (EdTech)", "Portales corporativos"],
        benefits: ["Instalables sin App Store", "Notificaciones push", "Funcionamiento offline", "Alto rendimiento y SEO", "Menor costo que apps nativas"],
        stats: [
            { value: "3X", label: "Más rápidas" },
            { value: "+50%", label: "Mayor retención" },
            { value: "70%", label: "Empresas buscan IA" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/primer_texto.webp"
    };

    const fullStackService = {
        title: "Desarrollo Full-Stack Escalable",
        subtitle: "Construimos plataformas robustas de extremo a extremo.",
        description: "Construimos plataformas robustas de extremo a extremo: interfaz intuitiva, lógica de negocio sólida y arquitectura preparada para alto tráfico.",
        benefits: ["Interfaces modernas", "Backend escalable en la nube", "APIs RESTful integrables", "Crecimiento exponencial"],
        stats: [
            { value: "99.9%", label: "Disponibilidad Cloud" },
            { value: "60%", label: "Reducción integración" },
            { value: "5X", label: "Crecimiento sin rediseño" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/people-working-html-codes.webp"
    };

    const nativasService = {
        title: "Aplicaciones Nativas iOS y Android",
        quote: "Experiencia móvil total. Rendimiento superior.",
        description: "Desarrollamos aplicaciones nativas optimizadas específicamente para los entornos iOS y Android, garantizando máxima velocidad, estabilidad y una experiencia alineada a los estándares de cada ecosistema. Diseñadas para escalar, monetizar y fidelizar usuarios.",
        benefits: ["Rendimiento optimizado", "Integración total Hardware", "Máxima seguridad", "Publicación en Stores"],
        stats: [
            { value: "6.8B+", label: "Usuarios smartphones" },
            { value: "88%", label: "Tiempo móvil en apps" },
            { value: "70%", label: "Comercio móvil en apps" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/smile-young-man-playing-happy-woman.webp"
    };

    const devopsService = {
        title: "Ingeniería DevOps & Cloud",
        subtitle: "Automatización, despliegue continuo y alta disponibilidad.",
        description: "Implementamos pipelines de integración y despliegue continuo (CI/CD), contenedorización y orquestación en entornos cloud para garantizar estabilidad, velocidad y escalabilidad operativa. Diseñado para evolucionar sin fricciones técnicas.",
        benefits: ["Automatización CI/CD", "Infraestructura como código", "Docker y Orquestación", "Monitoreo en tiempo real"],
        stats: [
            { value: "61%", label: "Menos tiempo despliegue" },
            { value: "+94%", label: "Uso de servicios cloud" },
            { value: "99.9%", label: "Disponibilidad total" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/professional-hacker-using-ransomware-phishing-tactics-compromise-networks.webp"
    };

    const microserviciosService = {
        title: "Arquitectura de Microservicios",
        subtitle: "Sistemas modulares diseñados para escalar sin límites.",
        description: "Diseñamos plataformas basadas en microservicios que permiten crecimiento independiente, alta resiliencia y actualización sin afectar el sistema completo. Ideal para proyectos de alto tráfico o expansión internacional.",
        benefits: ["Escalabilidad modular", "Alta tolerancia a fallos", "Rendimiento bajo demanda", "Actualización sin cortes"],
        stats: [
            { value: "85%", label: "Migran a microservicios" },
            { value: "50%", label: "Menos tiempo desarrollo" },
            { value: "30%", label: "Más resiliencia" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/business-people-using-internet.webp"
    };

    const mantenimientoService = {
        title: "Mantenimiento y Soporte Continuo",
        subtitle: "Evolución constante. Estabilidad garantizada.",
        description: "Aseguramos el funcionamiento, actualización y optimización continua de las plataformas digitales, previniendo riesgos técnicos y mejorando el rendimiento operativo. No solo desarrollamos. Acompañamos el crecimiento.",
        benefits: ["Monitoreo proactivo", "Actualizaciones seguridad", "Optimización continua", "Soporte especializado"],
        stats: [
            { value: "60%", label: "Riesgo desactualizado" },
            { value: "70%", label: "Menos incidentes críticos" },
            { value: "+40%", label: "Mejor retención de IT" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/person-pressing-power-button.webp"
    };


    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        * { font-family: 'Open Sans', system-ui, -apple-system, sans-serif; cursor: default; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 10px; }
      `}</style>

            <main className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30 overflow-x-hidden pt-28 pb-0 relative">

                {/* --- HERO SECTION --- */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-10 z-10 w-full overflow-hidden mb-20">
                    <motion.div 
                        style={{ scale: scaleHero, opacity: opacityHero }}
                        className="absolute inset-x-0 inset-y-[-20%] z-0 opacity-80 pointer-events-none"
                    >
                        <img 
                            src="/imagenes/micrositios/Desarrollo-software/portrait-male-engineer-working-field-engineers-day-celebration.webp" 
                            alt="Ingeniero en campo"
                            className="w-full h-full object-cover mask-image-gradient"
                            style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-black/60 to-[#000]" />
                    </motion.div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[600px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none z-0" />

                    <motion.div 
                        animate={{ y: [-10, 10, -10] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center mt-10"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-[3.5rem] sm:text-[5rem] lg:text-[8rem] font-black leading-[0.85] tracking-tighter mb-6 text-white uppercase text-center"
                            style={{ y: yTitle, textShadow: "0 0 80px rgba(59, 130, 246, 0.4)" }}
                        >
                            Desarrollo <br /> <span className="text-blue-500">Software</span>
                        </motion.h1>

                        <motion.p
                            style={{ y: yDesc }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-3xl text-gray-300 font-light max-w-5xl mx-auto italic leading-relaxed mb-12 text-center"
                        >
                            <span className="text-white">Creamos aplicaciones web y móviles </span>
                            <span className="text-blue-400 font-semibold italic">robustas, escalables y diseñadas </span>
                            <span className="text-white">para potenciar el crecimiento de tu negocio en la era digital.</span>
                        </motion.p>
                        
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
                            <MouseIndicator />
                        </motion.div>
                    </motion.div>
                </section>


                {/* --- BLOCK 1: PWA & FULL STACK --- */}
                <div className="relative">
                    <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
                    <ServiceSection service={pwaService} index={0} />
                    <ServiceSection service={fullStackService} index={1} />
                </div>

                {/* STATS BANNER 1 (After Block 1) */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={3} suffix="X" label="Más rápidas que webs convencionales" />
                        <Counter numericValue={50} suffix="%" label="Mayor retención de usuarios" />
                        <Counter numericValue={70} suffix="%" label="Empresas confían en mensajería in-app" />
                    </div>
                </section>


                {/* --- CENTRAL HERO BANNER: ROI / Impact --- */}
                <section className="relative py-40 mb-32 border-y border-white/5 bg-[#050505] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.05)]">
                    <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
                        <img 
                            src="/imagenes/micrositios/Desarrollo-software/electronic-circuit-board-shallow-dof.webp" 
                            alt="Background ROI"
                            className="w-full h-full object-cover mask-image-radial"
                            style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)' }}
                        />
                        <div className="absolute inset-0 bg-[#050505]/60" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[400px] bg-gradient-to-r from-blue-700/10 via-cyan-500/10 to-blue-700/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
                    
                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mix-blend-lighten uppercase opacity-90">
                                Impacto <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-blue-500">Real</span>
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center justify-center md:divide-x divide-white/10">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center px-4 md:py-0">
                                <div className="text-6xl md:text-8xl font-black text-white flex items-center justify-center mb-2 tracking-tighter">300<span className="text-blue-500">%</span></div>
                                <div className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">HASTA 300% ROI</div>
                                <p className="text-gray-400 text-xs italic max-w-[280px]">Retorno de inversión maximizado en desarrollo a medida.</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center px-4 border-t border-white/10 pt-12 md:border-t-0 md:pt-0">
                                <div className="text-6xl md:text-8xl font-black text-white flex items-center justify-center mb-2 tracking-tighter">800<span className="text-blue-500">M</span></div>
                                <div className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">USD PROYECTADOS</div>
                                <p className="text-gray-400 text-xs italic max-w-[280px]">En ingresos a través de aplicaciones comerciales para 2024.</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-center px-4 border-t border-white/10 pt-12 md:border-t-0 md:pt-0">
                                <div className="text-6xl md:text-8xl font-black text-white flex items-center justify-center mb-2 tracking-tighter">50<span className="text-blue-500">%</span></div>
                                <div className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">REDUCCIÓN OPERATIVA</div>
                                <p className="text-gray-400 text-xs italic max-w-[280px]">Del tiempo en tareas al automatizar procesos en los primeros meses.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>


                {/* --- BLOCK 2: APPS NATIVAS & DEVOPS --- */}
                <div className="relative">
                    <div className="absolute left-0 top-1/3 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
                    <ServiceSection service={nativasService} index={2} />
                    <ServiceSection service={devopsService} index={3} />
                </div>

                {/* STATS BANNER 2 (After Block 2) */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={6.8} suffix="B" label="Usuarios de smartphones en el mundo" />
                        <Counter numericValue={88} suffix="%" label="Del tiempo móvil se consume en apps" />
                        <Counter numericValue={70} suffix="%" label="Del comercio digital viene de apps" />
                    </div>
                </section>


                {/* --- BLOCK 3: MICROSERVICIOS & MANTENIMIENTO --- */}
                <div className="relative">
                    <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
                    <ServiceSection service={microserviciosService} index={4} />
                    <ServiceSection service={mantenimientoService} index={5} />
                </div>

                {/* STATS BANNER 3 (After Block 3) */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-40 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={85} suffix="%" label="Migran hacia microservicios" />
                        <Counter numericValue={50} suffix="%" label="Reducción en tiempos de desarrollo" />
                        <Counter numericValue={30} suffix="%" label="Resiliencia frente a fallos sistémicos" />
                    </div>
                </section>


                {/* --- CTA SECTION --- */}
                <section className="relative py-48 px-10 text-center overflow-hidden bg-black border-t border-white/5">
                    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                        <img 
                            src="/imagenes/micrositios/Desarrollo-software/computer-scientists-data-center-managing-maintaining-databases.webp" 
                            alt="CTA Background"
                            className="w-full h-full object-cover mask-image-gradient"
                            style={{ WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-black/60 to-transparent" />
                    </div>
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 text-white uppercase">
                            ¿Listo para <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Escalar?</span>
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-16 py-6 bg-blue-600 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                            >
                                Contactar Ahora
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

export default DesarrolloSoftware;
