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

// Visual Enhancement: Network Lines for Background
function NetworkLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 10 10 L 90 90 M 90 10 L 10 90 M 50 0 L 50 100 M 0 50 L 100 50"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="0.05"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 100}
            cy={Math.random() * 100}
            r="0.2"
            fill="#3b82f6"
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Specific Animation Layers for each section
function SectionOverlay({ type }) {
  if (type === 'auditoria') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    );
  }
  if (type === 'ddos') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-red-500/40 rounded-full blur-sm"
            style={{ 
              width: '20px', 
              top: `${20 + i * 15}%`, 
              left: '-10%' 
            }}
            animate={{ left: '110%' }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
          />
        ))}
      </div>
    );
  }
  if (type === 'phishing') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          className="absolute top-10 right-10 p-4 border border-red-500/50 bg-red-950/20 rounded-xl"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
        >
          <div className="text-red-500 text-[10px] font-black tracking-widest uppercase">⚠ PHISHING DETECTED</div>
        </motion.div>
      </div>
    );
  }
  if (type === 'zerotrust') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.circle 
            cx="50" cy="50" r="10" stroke="#3b82f6" strokeWidth="0.5" fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </div>
    );
  }
  if (type === 'nocsoc') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] opacity-40"
        />
      </div>
    );
  }
  if (type === 'devsecops') {
    return (
      <div className="absolute bottom-10 left-10 flex gap-4 z-20">
        {['CODE', 'BUILD', 'TEST', 'SCAN', 'DEPLOY'].map((step, i) => (
          <motion.div 
            key={step}
            className="px-3 py-1 text-[10px] font-black border border-white/10 rounded-md bg-black/40 text-gray-500"
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.5 }}
          >
            {step} {i === 4 && <span className="text-green-500 ml-1">✓</span>}
          </motion.div>
        ))}
      </div>
    );
  }
  return null;
}

// The structural image block to replace the abstract ones
function ImageGlowBlock({ src, alt, type }) {
    return (
        <div className="relative w-full aspect-[4/3] flex items-center justify-center px-4 md:px-0">
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
                <SectionOverlay type={type} />
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
                <motion.div variants={imageVariants} className="w-full lg:w-1/2 h-full">
                    <ImageGlowBlock src={service.image} alt={service.title} type={service.animKey} />
                </motion.div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2">
                    <motion.div variants={itemVariants}>
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-tight uppercase">
                            {service.title.split(' ').map((word, i, arr) => (
                                i === arr.length - 1 ? <span key={i} className="text-blue-500 block sm:inline"> {word}</span> : word + " "
                            ))}
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-8">
                            {service.description}
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 md:p-10 mb-10 shadow-inner group hover:border-blue-500/20 transition-all duration-300">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 border-b border-white/5 pb-4">Beneficios</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex gap-4 items-start group">
                                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 group-hover:rotate-12 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                            <span className="text-[10px] font-black">✔</span>
                                        </div>
                                        <span className="text-gray-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                                          {benefit.startsWith("✔") ? benefit.substring(1).trim() : benefit}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {service.stats && (
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
                                {service.stats.map((stat, i) => (
                                    <motion.div 
                                        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(37,99,235,0.4)" }}
                                        key={i} 
                                        className="px-5 py-3 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 flex flex-col items-center justify-center transition-all duration-300"
                                    >
                                        <span className="text-lg md:text-xl font-black text-white leading-none mb-1 uppercase">{stat.value}</span>
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

const Ciberseguridad = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    
    // Hero Parallax values
    const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const yDesc = useTransform(scrollYProgress, [0, 0.2], [0, 30]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    const auditoriaService = {
        animKey: 'auditoria',
        title: "Auditorías y Penetration Testing (Hacking Ético)",
        description: "Evaluación de la seguridad de sistemas, redes y aplicaciones mediante pruebas controladas de hacking ético para identificar vulnerabilidades antes de que sean explotadas por atacantes.",
        benefits: ["Identificación temprana de vulnerabilidades", "Mejora en la postura de seguridad", "Protección de datos sensibles", "Cumplimiento de estándares de seguridad"],
        stats: [
            { value: "80%", label: "MENOS VULNERABILIDADES CRÍTICAS" },
            { value: "60%", label: "MEJORA EN SEGURIDAD GENERAL" },
            { value: "+200%", label: "DETECCIÓN PREVENTIVA DE INCIDENTES" }
        ],
        image: "/imagenes/micrositios/ciberseguridad/auditoria.webp"
    };

    const ddosService = {
        animKey: 'ddos',
        title: "Protección contra ataques DDoS",
        description: "Implementación de soluciones y monitoreo para detectar, mitigar y bloquear ataques de denegación de servicio (DDoS), asegurando la disponibilidad continua de plataformas y servicios.",
        benefits: ["Reducción de la disponibilidad de servicios", "Protección de infraestructura crítica", "Mitigación automática de ataques", "Respuesta inmediata ante amenazas"],
        stats: [
            { value: "40%", label: "MAYOR ESTABILIDAD DEL SERVICIO" },
            { value: "LOW", label: "REDUCCIÓN DE INTERRUPCIONES" }
        ],
        image: "/imagenes/micrositios/ciberseguridad/proteccion.webp"
    };

    const phishingService = {
        animKey: 'phishing',
        title: "Capacitación Anti-Phishing para empleados",
        description: "Programas de formación y simulaciones prácticas que entrenan a los empleados para identificar correos fraudulentos, enlaces maliciosos y ataques de ingeniería social.",
        benefits: ["Reducción de riesgos humanos", "Mayor conciencia de seguridad", "Prevención de ataques por phishing", "Cultura organizacional de ciberseguridad"],
        stats: [
            { value: "91%", label: "ATAQUES COMIENZAN CON PHISHING" },
            { value: "70%", label: "MENOS ATAQUES EXITOSOS" },
            { value: "+30%", label: "CULTURA DE SEGURIDAD EN EMPRESAS" }
        ],
        image: "/imagenes/micrositios/ciberseguridad/capacitacion.webp"
    };

    const zeroTrustService = {
        animKey: 'zerotrust',
        title: "Arquitectura de confianza cero (Zero Trust)",
        description: "Modelo de seguridad basado en el principio “never trust, always verify”, donde cada usuario, dispositivo o aplicación debe autenticarse antes de acceder a recursos.",
        benefits: ["Control estricto de accesos", "Protección contra amenazas internas", "Reducción de brechas de seguridad", "Seguridad avanzada en entornos cloud"],
        stats: [
            { value: "60%", label: "MENOS BRECHAS DE SEGURIDAD" },
            { value: "40%", label: "MAYOR CONTROL DE ACCESOS" }
        ],
        image: "/imagenes/micrositios/ciberseguridad/arquitectura.webp"
    };

    const nocSocService = {
        animKey: 'nocsoc',
        title: "Monitoreo NOC/SOC 24/7",
        description: "Supervisión continua de infraestructura, redes y sistemas mediante centros de operaciones de seguridad (SOC) y centros de operaciones de red (NOC), detectando incidentes en tiempo real.",
        benefits: ["Monitoreo permanente", "Detección temprana de amenazas", "Respuesta rápida a incidentes", "Continuidad operativa"],
        stats: [
            { value: "24/7", label: "MONITOREO CONTINUO" },
            { value: "70%", label: "DETECCIÓN TEMPRANA DE AMENAZAS" },
            { value: "90%", label: "MENOS INCIDENTES GRAVES" }
        ],
        image: "/imagenes/micrositios/ciberseguridad/monitoreo.webp"
    };

    const devsecopsService = {
        animKey: 'devsecops',
        title: "DevSecOps (Seguridad en el código)",
        description: "Integración de prácticas de seguridad dentro del ciclo de desarrollo de software para identificar vulnerabilidades desde las primeras etapas del desarrollo.",
        benefits: ["Desarrollo seguro desde el inicio", "Reducción de vulnerabilidades en producción", "Automatización de pruebas de seguridad", "Integración con pipelines DevOps"],
        stats: [
            { value: "80%", label: "MENOS VULNERABILIDADES" },
            { value: "50%", label: "MAYOR EFICIENCIA EN DESARROLLO SEGURO" }
        ],
        image: "/imagenes/micrositios/ciberseguridad/devsecops.webp"
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
                <NetworkLines />

                {/* --- HERO SECTION --- */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-10 z-10 w-full overflow-hidden mb-20">
                    <motion.div 
                        style={{ scale: scaleHero, opacity: opacityHero }}
                        className="absolute inset-x-0 inset-y-[-20%] z-0 opacity-80 pointer-events-none"
                    >
                        <img 
                            src="/imagenes/micrositios/ciberseguridad/banner.webp" 
                            alt="Cybersecurity Hero"
                            className="w-full h-full object-cover mask-image-gradient"
                            style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-black/70 to-[#000]" />
                    </motion.div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

                    <motion.div 
                        animate={{ y: [-10, 10, -10] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center mt-10"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-[3rem] sm:text-[5rem] lg:text-[8rem] font-black leading-[0.85] tracking-tighter mb-6 text-white uppercase text-center"
                            style={{ y: yTitle, textShadow: "0 0 80px rgba(59, 130, 246, 0.3)" }}
                        >
                            Ciberseguridad <br /> <span className="text-blue-500">y protección digital</span>
                        </motion.h1>

                        <motion.p
                            style={{ y: yDesc }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-3xl text-gray-300 font-light max-w-5xl mx-auto italic leading-relaxed mb-12 text-center"
                        >
                            <span className="text-white">Soluciones avanzadas para </span>
                            <span className="text-blue-400 font-semibold italic">proteger infraestructuras, </span>
                            <span className="text-white">aplicaciones y datos empresariales ante cualquier amenaza.</span>
                        </motion.p>
                        
                        <motion.div 
                          className="flex gap-6 mt-4"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                        >
                          <button onClick={() => setIsModalOpen(true)} className="px-10 py-4 bg-blue-600 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all">
                            Conocer soluciones
                          </button>
                        </motion.div>
                        <MouseIndicator />
                    </motion.div>
                </section>


                {/* --- SERVICES BLOCKS --- */}
                <div className="relative">
                    <ServiceSection service={auditoriaService} index={0} />
                    <ServiceSection service={ddosService} index={1} />
                </div>

                {/* STATS BANNER 1 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={80} suffix="%" label="MENOS VULNERABILIDADES CRÍTICAS" />
                        <Counter numericValue={60} suffix="%" label="MEJORA EN SEGURIDAD GENERAL" />
                        <Counter numericValue={200} suffix="%" label="DETECCIÓN PREVENTIVA DE INCIDENTES" />
                    </div>
                </section>

                <div className="relative">
                    <ServiceSection service={phishingService} index={2} />
                    <ServiceSection service={zeroTrustService} index={3} />
                </div>

                {/* STATS BANNER 2 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={91} suffix="%" label="ATAQUES COMIENZAN CON PHISHING" />
                        <Counter numericValue={70} suffix="%" label="MENOS ATAQUES EXITOSOS" />
                        <Counter numericValue={30} suffix="%" label="CULTURA DE SEGURIDAD EN EMPRESAS" />
                    </div>
                </section>

                <div className="relative">
                    <ServiceSection service={nocSocService} index={4} />
                    <ServiceSection service={devsecopsService} index={5} />
                </div>

                {/* STATS BANNER 3 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-40 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={24} suffix="/7" label="MONITOREO CONTINUO PROACTIVO" />
                        <Counter numericValue={70} suffix="%" label="DETECCIÓN TEMPRANA DE AMENAZAS" />
                        <Counter numericValue={90} suffix="%" label="MENOS INCIDENTES GRAVES" />
                    </div>
                </section>

                {/* --- FINAL CTA SECTION --- */}
                <section className="relative py-48 px-10 text-center overflow-hidden bg-black border-t border-white/5">
                    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                        <img 
                            src="/imagenes/micrositios/ciberseguridad/banner.webp" 
                            alt="CTA Background"
                            className="w-full h-full object-cover mask-image-gradient"
                            style={{ WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-black/80 to-transparent" />
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 text-white uppercase">
                            ¿Listo para <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Protección?</span>
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

export default Ciberseguridad;
