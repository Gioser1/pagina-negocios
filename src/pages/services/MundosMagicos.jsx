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
        <div ref={ref} className="text-center p-8 bg-[#050505] rounded-[2rem] border border-white/5 relative overflow-hidden group transition-all duration-500 hover:border-purple-500/20 shadow-2xl flex-1 flex flex-col justify-center">
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-5xl md:text-7xl font-black mb-4 flex items-baseline justify-center tracking-tighter text-white">
                    {display}
                    <span className="text-purple-500">{suffix}</span>
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
                className="w-1.5 h-1.5 bg-purple-500 rounded-full"
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
          stroke="rgba(168, 85, 247, 0.3)"
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
            fill="#a855f7"
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
  if (type === 'videojuegos') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    );
  }
  if (type === 'ar') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-cyan-500/40 rounded-full blur-sm"
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
  if (type === 'gamificacion') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 p-4 border border-purple-500/50 bg-purple-950/20 rounded-xl"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
        >
          <div className="text-purple-400 text-[10px] font-black tracking-widest uppercase">⭐ NIVEL DESBLOQUEADO</div>
        </motion.div>
      </div>
    );
  }
  if (type === 'vr') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.circle
            cx="50" cy="50" r="10" stroke="#a855f7" strokeWidth="0.5" fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </div>
    );
  }
  if (type === 'filtros') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] opacity-40"
        />
      </div>
    );
  }
  if (type === 'webxr') {
    return (
      <div className="absolute bottom-10 left-10 flex gap-4 z-20">
        {['METAVERSO', 'SHOWROOM', '3D', 'WEB', 'XR'].map((step, i) => (
          <motion.div
            key={step}
            className="px-3 py-1 text-[10px] font-black border border-white/10 rounded-md bg-black/40 text-gray-500"
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.5 }}
          >
            {step} {i === 4 && <span className="text-purple-500 ml-1">✓</span>}
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
            <div className="absolute inset-0 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative w-full h-full border hover:border-purple-500/50 border-white/10 rounded-[2rem] bg-[#050505] overflow-hidden shadow-2xl transition-all duration-700 
                hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] group">
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
                                i === arr.length - 1 ? <span key={i} className="text-purple-500 block sm:inline"> {word}</span> : word + " "
                            ))}
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-8">
                            {service.description}
                        </motion.p>

                        <motion.div variants={itemVariants} className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 md:p-10 mb-10 shadow-inner group hover:border-purple-500/20 transition-all duration-300">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 border-b border-white/5 pb-4">Beneficios</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex gap-4 items-start group">
                                        <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 group-hover:rotate-12 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
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
                                        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168,85,247,0.4)" }}
                                        key={i}
                                        className="px-5 py-3 rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20 flex flex-col items-center justify-center transition-all duration-300"
                                    >
                                        <span className="text-lg md:text-xl font-black text-white leading-none mb-1 uppercase">{stat.value}</span>
                                        <span className="text-[9px] uppercase tracking-widest text-purple-400 font-bold text-center">{stat.label}</span>
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

const MundosMagicos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const yDesc = useTransform(scrollYProgress, [0, 0.2], [0, 30]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    const videojuegosService = {
        animKey: 'videojuegos',
        title: "Desarrollo de Videojuegos (2D / 3D / VR / AR)",
        description: "Diseño y desarrollo de videojuegos interactivos en entornos 2D, 3D y realidad extendida (VR/AR), aplicados tanto al entretenimiento como a soluciones educativas, empresariales o de simulación.",
        benefits: [
            "Experiencias interactivas avanzadas",
            "Desarrollo multiplataforma",
            "Aplicaciones en educación, marketing y empresarial",
            "Alto nivel de engagement del usuario"
        ],
        stats: [
            { value: "3.3B", label: "JUGADORES EN EL MUNDO" },
            { value: "$200B", label: "INDUSTRIA GLOBAL GAMING" },
            { value: "90%", label: "ENGAGEMENT EN EXPERIENCIAS INTERACTIVAS" }
        ],
        image: "/imagenes/micrositios/mundos-magicos/videojuegos.png"
    };

    const arService = {
        animKey: 'ar',
        title: "Aplicaciones de Realidad Aumentada (AR)",
        description: "Desarrollo de aplicaciones de realidad aumentada que integran elementos digitales en entornos físicos mediante dispositivos móviles o wearables, creando experiencias interactivas para educación, marketing y entretenimiento.",
        benefits: [
            "Experiencias inmersivas para usuarios",
            "Mayor interacción con productos o marcas",
            "Innovación en campañas y experiencias digitales",
            "Integración con apps y plataformas móviles"
        ],
        stats: [
            { value: "1.7B", label: "USUARIOS AR MÓVILES" },
            { value: "94%", label: "MÁS ENGAGEMENT CON AR" },
            { value: "70%", label: "MARCAS EXPLORAN AR MARKETING" }
        ],
        image: "/imagenes/micrositios/mundos-magicos/gamificacion.png"
    };

    const gamificacionService = {
        animKey: 'gamificacion',
        title: "Gamificación para marcas (B2C)",
        description: "Diseño de estrategias de gamificación que incorporan mecánicas de juego en experiencias digitales para aumentar participación, fidelización y engagement del público con las marcas.",
        benefits: [
            "Mayor interacción con clientes",
            "Incremento de fidelización",
            "Experiencias digitales atractivas",
            "Incentivo a participación del usuario"
        ],
        stats: [
            { value: "47%", label: "MÁS ENGAGEMENT CON GAMIFICACIÓN" },
            { value: "30%", label: "AUMENTO EN RETENCIÓN" },
            { value: "2x", label: "PARTICIPACIÓN DE USUARIOS" }
        ],
        image: "/imagenes/micrositios/mundos-magicos/gamificacion.png"
    };

    const vrService = {
        animKey: 'vr',
        title: "Simuladores de Realidad Virtual (VR)",
        description: "Desarrollo de simuladores en realidad virtual que recrean entornos y procesos reales para entrenamiento, educación, demostraciones de productos y experiencias inmersivas.",
        benefits: [
            "Entrenamiento inmersivo y seguro",
            "Simulación de escenarios complejos",
            "Mayor retención de aprendizaje",
            "Experiencias interactivas realistas"
        ],
        stats: [
            { value: "4x", label: "MÁS RETENCIÓN EN VR" },
            { value: "275%", label: "MAYOR CONFIANZA TRAS ENTRENAMIENTO VR" },
            { value: "30%", label: "REDUCCIÓN EN TIEMPOS DE CAPACITACIÓN" }
        ],
        image: "/imagenes/micrositios/mundos-magicos/vr.png"
    };

    const filtrosService = {
        animKey: 'filtros',
        title: "Filtros avanzados para IG, TikTok y Snap",
        description: "Creación de filtros y efectos de realidad aumentada personalizados para Instagram, TikTok y Snapchat, diseñados para campañas de marketing viral, lanzamientos de productos y experiencias de marca interactivas.",
        benefits: [
            "Incremento de visibilidad de marca",
            "Experiencias virales y compartibles",
            "Integración nativa en plataformas sociales",
            "Alta tasa de interacción con usuarios"
        ],
        stats: [
            { value: "5x", label: "MAYOR ALCANCE ORGÁNICO" },
            { value: "80%", label: "MÁS INTERACCIONES CON FILTROS AR" },
            { value: "3x", label: "INCREMENTO EN BRAND AWARENESS" }
        ],
        image: "/imagenes/micrositios/mundos-magicos/banner.png"
    };

    const webxrService = {
        animKey: 'webxr',
        title: "WebXR (Metaversos y Showrooms 3D)",
        description: "Desarrollo de experiencias WebXR accesibles desde navegadores que permiten explorar metaversos, showrooms 3D y espacios virtuales interactivos sin necesidad de instalar aplicaciones.",
        benefits: [
            "Experiencias inmersivas desde web",
            "Exploración interactiva de productos o espacios",
            "Acceso multiplataforma",
            "Innovación en marketing digital y eventos virtuales"
        ],
        stats: [
            { value: "1B+", label: "DISPOSITIVOS COMPATIBLES XR" },
            { value: "70%", label: "MAYOR INTERACCIÓN EN 3D" },
            { value: "2x", label: "PERMANENCIA EN ENTORNOS INMERSIVOS" }
        ],
        image: "/imagenes/micrositios/mundos-magicos/webxr.png"
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        * { font-family: 'Open Sans', system-ui, -apple-system, sans-serif; cursor: default; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #a855f7; border-radius: 10px; }
      `}</style>

            <main className="min-h-screen bg-[#000000] text-white selection:bg-purple-500/30 overflow-x-hidden pt-28 pb-0 relative">
                <NetworkLines />

                {/* --- HERO SECTION --- */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-10 z-10 w-full overflow-hidden mb-20">
                    <motion.div
                        style={{ scale: scaleHero, opacity: opacityHero }}
                        className="absolute inset-x-0 inset-y-[-20%] z-0 opacity-80 pointer-events-none"
                    >
                        <img
                            src="/imagenes/micrositios/mundos-magicos/banner.png"
                            alt="Mundos Mágicos Hero"
                            className="w-full h-full object-cover"
                            style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-black/70 to-[#000]" />
                    </motion.div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

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
                            style={{ y: yTitle, textShadow: "0 0 80px rgba(168, 85, 247, 0.3)" }}
                        >
                            Mundos Mágicos <br /> <span className="text-purple-500">y Experiencias XR</span>
                        </motion.h1>

                        <motion.p
                            style={{ y: yDesc }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-3xl text-gray-300 font-light max-w-5xl mx-auto italic leading-relaxed mb-12 text-center"
                        >
                            <span className="text-white">Soluciones inmersivas en </span>
                            <span className="text-purple-400 font-semibold italic">VR, AR y videojuegos </span>
                            <span className="text-white">para transformar la experiencia digital de tu marca.</span>
                        </motion.p>

                        <motion.div
                          className="flex gap-6 mt-4"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                        >
                          <button onClick={() => setIsModalOpen(true)} className="px-10 py-4 bg-purple-600 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:bg-purple-500 transition-all">
                            Conocer soluciones
                          </button>
                        </motion.div>
                        <MouseIndicator />
                    </motion.div>
                </section>

                {/* --- SERVICES BLOCKS --- */}
                <div className="relative">
                    <ServiceSection service={videojuegosService} index={0} />
                    <ServiceSection service={arService} index={1} />
                </div>

                {/* STATS BANNER 1 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={3} suffix=".3B" label="JUGADORES EN EL MUNDO" />
                        <Counter numericValue={94} suffix="%" label="MÁS ENGAGEMENT CON AR" />
                        <Counter numericValue={47} suffix="%" label="MÁS ENGAGEMENT CON GAMIFICACIÓN" />
                    </div>
                </section>

                <div className="relative">
                    <ServiceSection service={gamificacionService} index={2} />
                    <ServiceSection service={vrService} index={3} />
                </div>

                {/* STATS BANNER 2 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={4} suffix="x" label="MÁS RETENCIÓN EN VR" />
                        <Counter numericValue={275} suffix="%" label="MAYOR CONFIANZA TRAS ENTRENAMIENTO VR" />
                        <Counter numericValue={30} suffix="%" label="REDUCCIÓN EN TIEMPOS DE CAPACITACIÓN" />
                    </div>
                </section>

                <div className="relative">
                    <ServiceSection service={filtrosService} index={4} />
                    <ServiceSection service={webxrService} index={5} />
                </div>

                {/* STATS BANNER 3 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-40 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={5} suffix="x" label="MAYOR ALCANCE ORGÁNICO CON FILTROS AR" />
                        <Counter numericValue={70} suffix="%" label="MAYOR INTERACCIÓN EN 3D" />
                        <Counter numericValue={2} suffix="x" label="PERMANENCIA EN ENTORNOS INMERSIVOS" />
                    </div>
                </section>

                {/* --- FINAL CTA SECTION --- */}
                <section className="relative py-48 px-10 text-center overflow-hidden bg-black border-t border-white/5">
                    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                        <img
                            src="/imagenes/micrositios/mundos-magicos/banner.png"
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
                            ¿Listo para <span className="text-purple-500 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">Inmersión?</span>
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-16 py-6 bg-purple-600 rounded-full font-black text-sm uppercase tracking-widest hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)]"
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

export default MundosMagicos;