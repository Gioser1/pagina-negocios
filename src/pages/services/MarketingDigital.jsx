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
  if (type === 'campanas') {
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
  if (type === 'inbound') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-blue-500/40 rounded-full blur-sm"
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
  if (type === 'cro') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          className="absolute top-10 right-10 p-4 border border-blue-500/50 bg-blue-950/20 rounded-xl"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
        >
          <div className="text-blue-400 text-[10px] font-black tracking-widest uppercase">⬆ CONVERSION RATE +223%</div>
        </motion.div>
      </div>
    );
  }
  if (type === 'seo') {
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
  if (type === 'narrativas') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] opacity-40"
        />
      </div>
    );
  }
  if (type === 'estrategia') {
    return (
      <div className="absolute bottom-10 left-10 flex gap-4 z-20">
        {['DATA', 'ANÁLISIS', 'ESTRATEGIA', 'CRECIMIENTO'].map((step, i) => (
          <motion.div 
            key={step}
            className="px-3 py-1 text-[10px] font-black border border-white/10 rounded-md bg-black/40 text-gray-500"
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.5 }}
          >
            {step} {i === 3 && <span className="text-green-500 ml-1">✓</span>}
          </motion.div>
        ))}
      </div>
    );
  }
  return null;
}

// The structural image block
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

const Marketing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    
    const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const yDesc = useTransform(scrollYProgress, [0, 0.2], [0, 30]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    const campanasService = {
        animKey: 'campanas',
        title: "Campañas Performance (Anuncios)",
        description: "Planificación, ejecución y optimización de campañas publicitarias en plataformas digitales (Meta, Google, LinkedIn y otras), enfocadas en generación de leads, tráfico cualificado y conversiones medibles.",
        benefits: [
            "Captación de clientes potenciales",
            "Segmentación avanzada de audiencias",
            "Optimización continua de campañas",
            "Medición precisa de resultados"
        ],
        stats: [
            { value: "65%", label: "NEGOCIOS USAN ANUNCIOS PPC" },
            { value: "200%", label: "ROI PROMEDIO GOOGLE ADS" },
            { value: "3.5x", label: "MÁS TRÁFICO CON CAMPAÑAS PAGAS" }
        ],
        image: "/imagenes/micrositios/Marketing/campañas.jpg"
    };

    const inboundService = {
        animKey: 'inbound',
        title: "Estrategias Inbound y Contenido",
        description: "Diseño de estrategias de inbound marketing basadas en contenido de valor que atrae, educa y convierte audiencias mediante blogs, redes sociales, videos y recursos digitales.",
        benefits: [
            "Atracción orgánica de clientes potenciales",
            "Construcción de autoridad de marca",
            "Generación constante de leads",
            "Relación de largo plazo con la audiencia"
        ],
        stats: [
            { value: "3x", label: "MÁS LEADS CON INBOUND" },
            { value: "62%", label: "MENOR COSTO POR LEAD" },
            { value: "70%", label: "USUARIOS PREFIEREN CONTENIDO ÚTIL" }
        ],
        image: "/imagenes/micrositios/Marketing/estrategias.jpg"
    };

    const croService = {
        animKey: 'cro',
        title: "Optimización de Conversión (CRO)",
        description: "Análisis y optimización de sitios web, landing pages y embudos digitales para mejorar la tasa de conversión mediante pruebas, análisis de comportamiento y mejoras en experiencia de usuario.",
        benefits: [
            "Mejora del rendimiento de campañas",
            "Mayor conversión de visitantes a clientes",
            "Optimización de la experiencia del usuario",
            "Aprovechamiento máximo del tráfico existente"
        ],
        stats: [
            { value: "223%", label: "AUMENTO PROMEDIO CON CRO" },
            { value: "53%", label: "USUARIOS ABANDONAN PÁGINAS LENTAS" },
            { value: "2-5%", label: "CONVERSIÓN PROMEDIO WEB GLOBAL" }
        ],
        image: "/imagenes/micrositios/Marketing/optimizacion.webp"
    };

    const seoService = {
        animKey: 'seo',
        title: "Posicionamiento Orgánico SEO",
        description: "Optimización técnica y estratégica de sitios web para mejorar su posicionamiento en motores de búsqueda mediante SEO técnico, contenido optimizado y estrategias de autoridad digital.",
        benefits: [
            "Mayor visibilidad en buscadores",
            "Incremento de tráfico orgánico cualificado",
            "Posicionamiento de marca a largo plazo",
            "Reducción de dependencia en anuncios pagos"
        ],
        stats: [
            { value: "68%", label: "EXPERIENCIAS ONLINE INICIAN EN BUSCADORES" },
            { value: "75%", label: "USUARIOS NO PASAN PÁGINA 1" },
            { value: "53%", label: "TRÁFICO WEB PROVIENE DE SEO" }
        ],
        image: "/imagenes/micrositios/Marketing/posicionamiento.webp"
    };

    const narrativasService = {
        animKey: 'narrativas',
        title: "Narrativas Audiovisuales para Campañas de Marca",
        description: "Producción estratégica de contenido audiovisual para campañas comerciales y posicionamiento de marca en plataformas digitales y medios publicitarios.",
        benefits: [
            "Mayor impacto visual en campañas",
            "Mejor recordación de marca",
            "Contenido adaptable a múltiples canales",
            "Aumento del engagement digital"
        ],
        stats: [
            { value: "82%", label: "TRÁFICO ONLINE ES VIDEO" },
            { value: "95%", label: "RETENCIÓN EN MENSAJES VISUALES" },
            { value: "2x", label: "ENGAGEMENT CON VIDEO" }
        ],
        image: "/imagenes/micrositios/Marketing/narrativas.webp"
    };

    const estrategiaService = {
        animKey: 'estrategia',
        title: "Estrategia Digital y Analítica de Mercado",
        description: "Diseño de estrategias de comunicación y transformación digital basadas en análisis de datos, comportamiento del mercado y métricas de rendimiento.",
        benefits: [
            "Toma de decisiones basada en datos",
            "Identificación de oportunidades de mercado",
            "Optimización de estrategias digitales",
            "Mejora en posicionamiento competitivo"
        ],
        stats: [
            { value: "23x", label: "MÁS CLIENTES CON DATA-DRIVEN" },
            { value: "19x", label: "MÁS RENTABILIDAD EMPRESARIAL" },
            { value: "5x", label: "DECISIONES MÁS RÁPIDAS CON ANALÍTICA" }
        ],
        image: "/imagenes/micrositios/Marketing/digital.webp"
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
                            src="/imagenes/micrositios/Marketing/banner.jpg" 
                            alt="Marketing Hero"
                            className="w-full h-full object-cover"
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
                            Marketing <br /> <span className="text-blue-500">y estrategia digital</span>
                        </motion.h1>

                        <motion.p
                            style={{ y: yDesc }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-3xl text-gray-300 font-light max-w-5xl mx-auto italic leading-relaxed mb-12 text-center"
                        >
                            <span className="text-white">Soluciones avanzadas para </span>
                            <span className="text-blue-400 font-semibold italic">potenciar tu marca, </span>
                            <span className="text-white">atraer clientes y crecer en el entorno digital.</span>
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
                    <ServiceSection service={campanasService} index={0} />
                    <ServiceSection service={inboundService} index={1} />
                </div>

                {/* STATS BANNER 1 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={65} suffix="%" label="NEGOCIOS USAN ANUNCIOS PPC" />
                        <Counter numericValue={200} suffix="%" label="ROI PROMEDIO GOOGLE ADS" />
                        <Counter numericValue={70} suffix="%" label="USUARIOS PREFIEREN CONTENIDO ÚTIL" />
                    </div>
                </section>

                <div className="relative">
                    <ServiceSection service={croService} index={2} />
                    <ServiceSection service={seoService} index={3} />
                </div>

                {/* STATS BANNER 2 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={223} suffix="%" label="AUMENTO PROMEDIO CON CRO" />
                        <Counter numericValue={68} suffix="%" label="EXPERIENCIAS INICIAN EN BUSCADORES" />
                        <Counter numericValue={53} suffix="%" label="TRÁFICO WEB PROVIENE DE SEO" />
                    </div>
                </section>

                <div className="relative">
                    <ServiceSection service={narrativasService} index={4} />
                    <ServiceSection service={estrategiaService} index={5} />
                </div>

                {/* STATS BANNER 3 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-40 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={82} suffix="%" label="TRÁFICO ONLINE ES VIDEO" />
                        <Counter numericValue={23} suffix="x" label="MÁS CLIENTES CON DATA-DRIVEN" />
                        <Counter numericValue={95} suffix="%" label="RETENCIÓN EN MENSAJES VISUALES" />
                    </div>
                </section>

                {/* --- FINAL CTA SECTION --- */}
                <section className="relative py-48 px-10 text-center overflow-hidden bg-black border-t border-white/5">
                    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                        <img 
                            src="/imagenes/micrositios/marketing/banner.jpg" 
                            alt="CTA Background"
                            className="w-full h-full object-cover"
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
                            ¿Listo para <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Crecer?</span>
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

export default Marketing;