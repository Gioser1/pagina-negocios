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
        <div ref={ref} className="text-center p-8 bg-[#050505] rounded-[2rem] border border-white/5 relative overflow-hidden group transition-all duration-500 hover:border-emerald-500/20 shadow-2xl flex-1 flex flex-col justify-center">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-5xl md:text-7xl font-black mb-4 flex items-baseline justify-center tracking-tighter text-white">
                    {display}
                    <span className="text-emerald-500">{suffix}</span>
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
                className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
            />
        </div>
    );
}

// Visual Enhancement: Blockchain Grid Background
function BlockchainGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.1"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {[...Array(15)].map((_, i) => (
          <motion.rect
            key={i}
            x={Math.random() * 100}
            y={Math.random() * 100}
            width="1.5"
            height="1.5"
            fill="rgba(16, 185, 129, 0.4)"
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
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
  if (type === 'smartcontracts') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-500/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2], rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-400/20 rounded-lg"
          animate={{ rotate: -360, scale: [1, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }
  if (type === 'dapps') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-500/40 rounded-sm"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
    );
  }
  if (type === 'tokenomics') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.path 
            d="M 20 80 Q 50 20 80 80"
            stroke="rgba(16, 185, 129, 0.4)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <motion.circle 
            r="1" fill="#10b981"
            animate={{ offsetDistance: ["0%", "100%"] }}
            style={{ offsetPath: "path('M 20 80 Q 50 20 80 80')" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
    );
  }
  if (type === 'security') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-emerald-500/5"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div 
            className="w-24 h-24 border-2 border-emerald-500/50 rounded-full"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    );
  }
  return null;
}

function ImageGlowBlock({ src, alt, type }) {
    return (
        <div className="relative w-full aspect-[4/3] flex items-center justify-center px-4 md:px-0">
            <div className="absolute inset-0 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative w-full h-full border hover:border-emerald-500/50 border-white/10 rounded-[2rem] bg-[#050505] overflow-hidden shadow-2xl transition-all duration-700 
                hover:shadow-[0_0_50px_rgba(16,185,129,0.2)] group">
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
                <motion.div variants={imageVariants} className="w-full lg:w-1/2 h-full">
                    <ImageGlowBlock src={service.image} alt={service.title} type={service.animKey} />
                </motion.div>

                <div className="w-full lg:w-1/2">
                    <motion.div variants={itemVariants}>
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-tight uppercase">
                            {service.title.split(' ').map((word, i, arr) => (
                                i === arr.length - 1 ? <span key={i} className="text-emerald-500 block sm:inline"> {word}</span> : word + " "
                            ))}
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-8">
                            {service.description}
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="bg-[#050505] border border-white/5 rounded-[2.5rem] p-8 md:p-10 mb-10 shadow-inner group hover:border-emerald-500/20 transition-all duration-300">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 border-b border-white/5 pb-4">Beneficios</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex gap-4 items-start group">
                                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 group-hover:rotate-12 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                            <span className="text-[10px] font-black">✔</span>
                                        </div>
                                        <span className="text-gray-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                                          {benefit}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {service.stats && (
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
                                {service.stats.map((stat, i) => (
                                    <motion.div 
                                        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(16,185,129,0.4)" }}
                                        key={i} 
                                        className="px-5 py-3 rounded-2xl bg-gradient-to-br from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 flex flex-col items-center justify-center transition-all duration-300"
                                    >
                                        <span className="text-lg md:text-xl font-black text-white leading-none mb-1 uppercase">{stat.value}</span>
                                        <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold text-center">{stat.label}</span>
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

const BlockchainWeb3 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    
    const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const yDesc = useTransform(scrollYProgress, [0, 0.2], [0, 30]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    const smartContractsService = {
        animKey: 'smartcontracts',
        title: "Smart Contracts Development",
        description: "Desarrollo de contratos inteligentes seguros y optimizados para Ethereum, Binance Smart Chain, Polygon y otras redes EVM, garantizando la inmutabilidad y transparencia de tus procesos.",
        benefits: ["Seguridad auditada", "Automatización total", "Reducción de intermediarios", "Eficiencia en gas fee"],
        stats: [
            { value: "100%", label: "INMUTABILIDAD" },
            { value: "SECURE", label: "CODE AUDIT" },
            { value: "0", label: "FALLOS CRÍTICOS" }
        ],
        image: "/imagenes/micrositios/blockchain/beautiful-cryptocurrwncy-concept.webp"
    };

    const dappsService = {
        animKey: 'dapps',
        title: "DApps & Web3 Applications",
        description: "Construimos aplicaciones descentralizadas de alto rendimiento que ofrecen una experiencia de usuario superior, integrando wallets, sistemas de archivos distribuidos y gobernanza on-chain.",
        benefits: ["Descentralización real", "Privacidad por diseño", "Interoperabilidad Web3", "UX fluida e intuitiva"],
        stats: [
            { value: "HIGH", label: "SCALABILITY" },
            { value: "WEB3", label: "NATIVE" }
        ],
        image: "/imagenes/micrositios/blockchain/3.webp"
    };

    const tokenomicsService = {
        animKey: 'tokenomics',
        title: "Tokenomics & Economía Digital",
        description: "Diseño estratégico de ecosistemas económicos digitales, incluyendo creación de tokens (ERC-20, ERC-721, ERC-1155), mecanismos de quema, recompensas y staking.",
        benefits: ["Modelos sostenibles", "Incentivos alineados", "Crecimiento orgánico", "Valor a largo plazo"],
        stats: [
            { value: "GROW", label: "ECOSYSTEM" },
            { value: "STABLE", label: "ECONOMY" },
            { value: "MAX", label: "REWARDS" }
        ],
        image: "/imagenes/micrositios/blockchain/2.webp"
    };

    const securityService = {
        animKey: 'security',
        title: "Seguridad y Auditoría Blockchain",
        description: "Protección integral para protocolos descentralizados. Realizamos auditorías exhaustivas de código y monitoreo de amenazas en tiempo real para prevenir exploits.",
        benefits: ["Análisis dinámico", "Prevención de reentrancia", "Verificación formal", "Monitoreo 24/7"],
        stats: [
            { value: "ZERO", label: "EXPLOITS" },
            { value: "99%", label: "DETECCIÓN VULN" }
        ],
        image: "/imagenes/micrositios/blockchain/5.webp"
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        * { font-family: 'Open Sans', system-ui, -apple-system, sans-serif; cursor: default; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
      `}</style>

            <main className="min-h-screen bg-[#000000] text-white selection:bg-emerald-500/30 overflow-x-hidden pt-28 pb-0 relative">
                <BlockchainGrid />

                {/* --- HERO SECTION --- */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-10 z-10 w-full overflow-hidden mb-20">
                    <motion.div 
                        style={{ scale: scaleHero, opacity: opacityHero }}
                        className="absolute inset-x-0 inset-y-[-20%] z-0 opacity-80 pointer-events-none"
                    >
                        {/* Note: User should provide this image, or I choose a general placeholder if not available */}
                        <img 
                            src="/imagenes/micrositios/blockchain/banner.webp" 
                            alt="Blockchain Hero"
                            className="w-full h-full object-cover mask-image-gradient"
                            style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-black/70 to-[#000]" />
                    </motion.div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

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
                            style={{ y: yTitle, textShadow: "0 0 80px rgba(16, 185, 129, 0.3)" }}
                        >
                            Blockchain <br /> <span className="text-emerald-500">& Web3 Ecosystems</span>
                        </motion.h1>

                        <motion.p
                            style={{ y: yDesc }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-3xl text-gray-300 font-light max-w-5xl mx-auto italic leading-relaxed mb-12 text-center"
                        >
                            <span className="text-white">Descentralización, confianza y </span>
                            <span className="text-emerald-400 font-semibold italic">nueva economía digital </span>
                            <span className="text-white">para la próxima evolución de Internet.</span>
                        </motion.p>
                        
                        <motion.div 
                          className="flex gap-6 mt-4"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                        >
                          <button onClick={() => setIsModalOpen(true)} className="px-10 py-4 bg-emerald-600 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:bg-emerald-500 transition-all">
                            Explorar Web3
                          </button>
                        </motion.div>
                        <MouseIndicator />
                    </motion.div>
                </section>

                {/* --- SERVICES BLOCKS --- */}
                <div className="relative">
                    <ServiceSection service={smartContractsService} index={0} />
                    <ServiceSection service={dappsService} index={1} />
                </div>

                {/* STATS BANNER 1 */}
                <section className="max-w-7xl mx-auto px-6 md:px-10 mb-32 -mt-4 relative z-20">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Counter numericValue={100} suffix="%" label="SEGURIDAD Y TRANSPARENCIA" />
                        <Counter numericValue={0} suffix="" label="DEPENDENCIAS CENTRALIZADAS" />
                        <Counter numericValue={24} suffix="/7" label="DISPONIBILIDAD ON-CHAIN" />
                    </div>
                </section>

                <div className="relative">
                    <ServiceSection service={tokenomicsService} index={2} />
                    <ServiceSection service={securityService} index={3} />
                </div>

                {/* --- FINAL CTA SECTION --- */}
                <section className="relative py-48 px-10 text-center overflow-hidden bg-black border-t border-white/5">
                    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
                        <img 
                            src="/imagenes/micrositios/blockchain/banner.webp" 
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
                            ¿Listo para el <span className="text-emerald-500 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Futuro?</span>
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-16 py-6 bg-emerald-600 rounded-full font-black text-sm uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-[0_0_40px_rgba(16,185,129,0.4)]"
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

export default BlockchainWeb3;
