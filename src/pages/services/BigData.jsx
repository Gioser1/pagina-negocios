import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactModal from "../../components/ContactModal";

// ─── Utility Components ────────────────────────────────────────────────────────

const Counter = ({ value, label, prefix = "", suffix = "" }) => {
    const [display, setDisplay] = useState("0");
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    
    useEffect(() => {
        if (!inView) return;
        
        const target = parseFloat(value);
        if (isNaN(target)) {
            setDisplay(value);
            return;
        }

        let start = null;
        const duration = 2000;
        
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            const current = (ease * target).toFixed(target % 1 !== 0 ? 1 : 0);
            setDisplay(current);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, value]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-6xl font-black text-white mb-2 italic">
                {prefix}{display}{suffix}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-500 font-bold">{label}</div>
        </div>
    );
};

// ─── Canvas Backgrounds ───────────────────────────────────────────────────────

const DataFlowBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 + 1,
            size: Math.random() * 2 + 1,
            color: `rgba(6, 182, 212, ${Math.random() * 0.3 + 0.1})`
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                if (p.x > canvas.width) p.x = -10;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw faint lines
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x - 20, p.y);
                ctx.strokeStyle = p.color;
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />;
};

// ─── Process Flow Bar ────────────────────────────────────────────────────────

const ProcessFlow = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const steps = [
        { label: "Ingesta", icon: "📥" },
        { label: "Procesamiento", icon: "⚙️" },
        { label: "Almacenamiento", icon: "💾" },
        { label: "Análisis", icon: "🧠" },
        { label: "Visualización", icon: "📊" }
    ];

    return (
        <section ref={containerRef} className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="relative flex justify-between items-center max-w-5xl mx-auto">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                    />
                </div>

                {steps.map((step, i) => (
                    <StepItem key={i} step={step} index={i} scrollYProgress={scrollYProgress} total={steps.length} />
                ))}
            </div>
        </section>
    );
};

const StepItem = ({ step, index, scrollYProgress, total }) => {
    const threshold = index / (total - 1);
    const isActive = useTransform(scrollYProgress, [threshold - 0.1, threshold], [0, 1]);
    const scale = useTransform(isActive, [0, 1], [0.8, 1.2]);
    const glow = useTransform(isActive, [0, 1], ["0px 0px 0px cyan", "0px 0px 20px rgba(6, 182, 212, 0.6)"]);

    return (
        <div className="relative z-10 flex flex-col items-center">
            <motion.div 
                style={{ scale, boxShadow: glow }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border-2 border-white/20 flex items-center justify-center text-2xl md:text-3xl backdrop-blur-xl"
            >
                <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-cyan-500/5"
                />
                {step.icon}
            </motion.div>
            <motion.span 
                style={{ opacity: isActive }}
                className="mt-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white whitespace-nowrap"
            >
                {step.label}
            </motion.span>
        </div>
    );
};

// ─── Section Components ──────────────────────────────────────────────────────

const Section = ({ title, description, benefits, stats, image, isEven, children, bgImage }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} className="relative py-32 overflow-hidden border-t border-white/5">
            {bgImage && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img src={bgImage} className="w-full h-full object-cover opacity-[0.15]" alt="background" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-[#020202]" />
                </div>
            )}
            <div className="px-6 md:px-10 max-w-7xl mx-auto relative z-10">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image / Animation Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 relative group"
                    >
                        <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
                            <img src={image} alt={title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105 ${children ? 'opacity-40 filter brightness-50' : 'opacity-80'}`} />
                            {children && (
                                <div className="absolute inset-0 z-10">
                                    {children}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                        </div>
                    </motion.div>

                {/* Text Column */}
                <div className="w-full lg:w-1/2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 text-white leading-tight uppercase">
                            {title.split(' ').map((w, i, a) => i === a.length - 1 ? <span key={i} className="text-cyan-500"> {w}</span> : w + " ")}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed italic border-l-4 border-cyan-500/30 pl-6">
                            {description}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefits.map((b, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                            >
                                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0">✓</div>
                                <span className="text-sm font-medium text-gray-300">{b}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex gap-8 pt-6">
                        {stats.map((s, i) => (
                            <Counter key={i} value={s.value} label={s.label} suffix={s.suffix} />
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
};

// ─── Specialized Animations ──────────────────────────────────────────────────

const ETLAnimation = () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent p-10 relative overflow-hidden">
        {/* Dirty data */}
        <div className="absolute left-10 flex flex-col gap-2">
            {[1, 2, 3].map(i => (
                <motion.div 
                    key={i}
                    animate={{ x: [0, 400], opacity: [0, 1, 0], filter: ["blur(4px)", "blur(0px)", "blur(0px)"] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    className="w-16 h-4 bg-red-500/20 border border-red-500/40 rounded-full"
                />
            ))}
        </div>
        {/* Filter */}
        <div className="w-24 h-48 border-y-2 border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md relative z-10 flex items-center justify-center">
            <motion.div 
                animate={{ height: ["10%", "90%", "10%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 bg-cyan-500"
            />
        </div>
        {/* Clean data */}
        <div className="absolute right-10 flex flex-col gap-2">
            {[1, 2, 3].map(i => (
                <motion.div 
                    key={i}
                    animate={{ x: [-400, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    className="w-20 h-4 bg-cyan-500/40 border border-cyan-500 rounded-full"
                />
            ))}
        </div>
    </div>
);

const BIAnimation = () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent p-12">
        <div className="w-full h-full grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 flex flex-col justify-end overflow-hidden group">
                <div className="flex items-end gap-2 h-32">
                    {[40, 70, 50, 90].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="flex-1 bg-cyan-500/60 rounded-t-lg group-hover:bg-cyan-400 transition-colors"
                        />
                    ))}
                </div>
                <div className="mt-2 text-[8px] text-gray-500 uppercase font-black">Performance KPI</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-center group overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-24 h-24 rotate-[-90deg]">
                    <motion.circle
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="rgba(6, 182, 212, 0.2)"
                        strokeWidth="8"
                    />
                    <motion.circle
                        cx="50" cy="50" r="40"
                        fill="transparent"
                        stroke="#06b6d4"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        whileInView={{ strokeDashoffset: 60 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="group-hover:stroke-cyan-300 transition-colors"
                    />
                </svg>
            </div>
            <div className="col-span-2 bg-white/5 rounded-2xl p-4">
                <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5 }}
                    className="h-2 w-full bg-cyan-500/20 rounded-full overflow-hidden"
                >
                    <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-1/3 h-full bg-cyan-500"
                    />
                </motion.div>
                <div className="mt-4 flex justify-between">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-8 h-1 bg-white/10 rounded-full" />)}
                </div>
            </div>
        </div>
    </div>
);

const NeuralMining = () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent p-10 relative overflow-hidden">
        <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Nodes */}
            {[
                {x: 50, y: 150}, 
                {x: 150, y: 50}, {x: 150, y: 150}, {x: 150, y: 250},
                {x: 250, y: 100}, {x: 250, y: 200},
                {x: 350, y: 150}
            ].map((node, i) => (
                <motion.circle
                    key={i}
                    cx={node.x} cy={node.y} r="6"
                    fill="#06b6d4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                />
            ))}
            {/* Connections */}
            {[
                {f: 0, t: 1}, {f: 0, t: 2}, {f: 0, t: 3},
                {f: 1, t: 4}, {f: 2, t: 4}, {f: 2, t: 5}, {f: 3, t: 5},
                {f: 4, t: 6}, {f: 5, t: 6}
            ].map((conn, i) => (
                <motion.line
                    key={i}
                    x1={[
                        {x: 50, y: 150}, {x: 150, y: 50}, {x: 150, y: 150}, {x: 150, y: 250},
                        {x: 250, y: 100}, {x: 250, y: 200}, {x: 350, y: 150}
                    ][conn.f].x}
                    y1={[
                        {x: 50, y: 150}, {x: 150, y: 50}, {x: 150, y: 150}, {x: 150, y: 250},
                        {x: 250, y: 100}, {x: 250, y: 200}, {x: 350, y: 150}
                    ][conn.f].y}
                    x2={[
                        {x: 50, y: 150}, {x: 150, y: 50}, {x: 150, y: 150}, {x: 150, y: 250},
                        {x: 250, y: 100}, {x: 250, y: 200}, {x: 350, y: 150}
                    ][conn.t].x}
                    y2={[
                        {x: 50, y: 150}, {x: 150, y: 50}, {x: 150, y: 150}, {x: 150, y: 250},
                        {x: 250, y: 100}, {x: 250, y: 200}, {x: 350, y: 150}
                    ][conn.t].y}
                    stroke="rgba(6, 182, 212, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                />
            ))}
            {/* Pulsing signals */}
            <motion.circle
                r="3"
                fill="#06b6d4"
                animate={{
                    cx: [50, 150, 250, 350],
                    cy: [150, 50, 100, 150],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </svg>
        <div className="absolute inset-0 pointer-events-none">
            {[1,2,3,4,5].map(i => (
                <motion.div
                    key={i}
                    animate={{ 
                        y: [0, -40, 0], 
                        x: [0, Math.random() * 40 - 20, 0],
                        opacity: [0.1, 0.4, 0.1]
                    }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
                    className="absolute text-cyan-500/20 text-[6px] font-black tracking-widest"
                    style={{ left: `${20 * i}%`, top: `${15 * i}%` }}
                >
                    DATA_EXTRACT_0{i}
                </motion.div>
            ))}
        </div>
    </div>
);

const StorageLake = () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent p-10 relative overflow-hidden">
        <div className="grid grid-cols-3 gap-6 relative z-10 w-full">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center gap-4">
                    <div className="w-16 h-20 border-2 border-white/10 rounded-xl relative overflow-hidden bg-white/5">
                        <motion.div 
                            initial={{ top: "100%" }}
                            whileInView={{ top: "20%" }}
                            transition={{ duration: 2, delay: i * 0.3 }}
                            className="absolute inset-x-0 bottom-0 bg-cyan-500/30"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-xs opacity-40">DB</div>
                    </div>
                </div>
            ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-64 h-64 rounded-full bg-blue-500 blur-[80px]"
            />
        </div>
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <motion.path 
                d="M50,300 Q200,150 350,300" 
                fill="none" stroke="cyan" strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
            />
        </svg>
    </div>
);

const RealTimeStream = () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent relative overflow-hidden">
        <div className="w-full h-full relative">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <motion.div
                    key={i}
                    animate={{ x: ["-10%", "110%"] }}
                    transition={{ 
                        duration: 1 + Math.random(), 
                        repeat: Infinity, 
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                    className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    style={{ top: `${15 * i}%`, left: 0, width: "100px", opacity: 0.6 }}
                />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-black italic text-cyan-500/20 tracking-tighter scale-150">REAL_TIME</div>
            </div>
            {/* Blinking Indicators */}
            <div className="absolute top-10 right-10 flex gap-2">
                <motion.div animate={{ opacity: [1, 0.2] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_red]" />
                <motion.div animate={{ opacity: [1, 0.2] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_cyan]" />
            </div>
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const BigData = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 overflow-x-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');
                * { font-family:'Outfit',sans-serif; }
                ::-webkit-scrollbar { width:5px; }
                ::-webkit-scrollbar-track { background:#0a0a0a; }
                ::-webkit-scrollbar-thumb { background:#06b6d4; border-radius:10px; }
            `}</style>
            
            {/* ── HERO SECTION ── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-40 overflow-hidden">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/imagenes/micrositios/Big-data/643835450551232.webp" 
                        alt="Hero Background" 
                        className="w-full h-full object-cover opacity-40 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
                </div>
                
                <DataFlowBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-[#020202] pointer-events-none" />
                
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 max-w-5xl"
                >
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block py-1 px-4 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-black uppercase tracking-[0.4em] mb-12"
                    >
                        Data Analytics Engine
                    </motion.span>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-7xl md:text-9xl lg:text-[14rem] font-black italic tracking-tighter leading-[0.8] mb-12 uppercase"
                    >
                        Big <br />
                        <span className="text-cyan-500 drop-shadow-[0_0_80px_rgba(6,182,212,0.4)]">Data</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-xl md:text-3xl text-gray-400 font-light max-w-4xl mx-auto italic leading-relaxed mb-16"
                    >
                        Soluciones y tecnologías que permiten analizar, procesar y visualizar grandes volúmenes de datos para generar valor y tomar decisiones inteligentes.
                    </motion.p>

                    <motion.button 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(6,182,212,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('flujo').scrollIntoView({ behavior: 'smooth' })}
                        className="px-12 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-cyan-500 hover:text-white transition-all"
                    >
                        Explorar Soluciones
                    </motion.button>
                </motion.div>
                
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500/40"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </motion.div>
            </section>

            {/* ── FLOW SECTION ── */}
            <div id="flujo">
                <ProcessFlow />
            </div>

            {/* ── ENGINEERING ── */}
            <Section 
                title="Ingeniería de Datos (Tuberías)"
                description="Se encarga de diseñar y orquestar pipelines de datos que permiten recolectar, transformar y preparar información para su análisis."
                benefits={[
                    "Integración de múltiples fuentes",
                    "Procesamiento eficiente",
                    "Automatización de flujos",
                    "Escalabilidad sistémica"
                ]}
                stats={[
                    { value: "90", suffix: "%", label: "Eficiencia mejorada" },
                    { value: "60", suffix: "%", label: "Menos latencia" }
                ]}
                image="/imagenes/micrositios/Big-data/analyst-looking-presentation-charts-dashboard-implement-analytics.webp"
                bgImage="/imagenes/micrositios/Big-data/engineers-doing-brainstorming-programming-server-farm.webp"
                isEven={false}
            />

            {/* ── VISUALIZATION ── */}
            <Section 
                title="Visualización (Dashboards / BI)"
                description="Permite transformar grandes volúmenes de datos en dashboards interactivos que facilitan la toma de decisiones."
                benefits={[
                    "Dashboards interactivos",
                    "Visualización de KPIs",
                    "Análisis de tendencias",
                    "Comunicación clara"
                ]}
                stats={[
                    { value: "70", suffix: "%", label: "Mejora decisiones" },
                    { value: "40", suffix: "%", label: "Rapidez análisis" }
                ]}
                image="/imagenes/micrositios/Big-data/young-company-analyst-office-watching-business-presentation-pc.webp"
                bgImage="/imagenes/micrositios/Big-data/business-analyst-reviewing-budgeting-project-updates-numbers-ensuring-organizational-success.webp"
                isEven={true}
            >
                <BIAnimation />
            </Section>

            {/* ── MINING ── */}
            <Section 
                title="Minería de Datos"
                description="Analiza grandes conjuntos de datos para descubrir patrones, correlaciones y tendencias que permiten obtener conocimiento útil."
                benefits={[
                    "Patrones ocultos",
                    "Predicción comportamientos",
                    "Segmentación clientes",
                    "Optimización procesos"
                ]}
                stats={[
                    { value: "40", suffix: "%", label: "Mejora predicciones" },
                    { value: "25", suffix: "%", label: "Aumento ventas" }
                ]}
                image="/imagenes/micrositios/Big-data/coworkers-use-technology-office.webp"
                bgImage="/imagenes/micrositios/Big-data/bigdata2.webp"
                isEven={false}
            >
                <NeuralMining />
            </Section>

            {/* ── STORAGE ── */}
            <Section 
                title="Almacenamiento (Data Lakes)"
                description="Infraestructura que permite almacenar grandes volúmenes de datos estructurados y no estructurados para su análisis."
                benefits={[
                    "Acceso rápido",
                    "Integración masiva",
                    "Escalabilidad",
                    "Seguridad blindada"
                ]}
                stats={[
                    { value: "50", suffix: "%", label: "Reducción tiempos" },
                    { value: "30", suffix: "%", label: "Eficiencia mejorada" }
                ]}
                image="/imagenes/micrositios/Big-data/server-farm-team-leader-overseeing-work-done-by-expert-upgrading-ai-systems.webp"
                bgImage="/imagenes/micrositios/Big-data/bigdata3.webp"
                isEven={true}
            >
                <StorageLake />
            </Section>

            {/* ── REAL TIME ── */}
            <Section 
                title="Procesamiento en Tiempo Real"
                description="Permite analizar datos en el momento en que se generan, generando respuestas inmediatas para negocios y sistemas."
                benefits={[
                    "Análisis instantáneo",
                    "Detección de eventos",
                    "Decisiones automáticas",
                    "Respuestas inmediatas"
                ]}
                stats={[
                    { value: "80", suffix: "%", label: "Reducción latencia" },
                    { value: "0", suffix: "ms", label: "Latencia ideal" }
                ]}
                image="/imagenes/micrositios/Big-data/portrait-happy-system-administrators-data-center-using-devices.webp"
                isEven={false}
            >
                <RealTimeStream />
            </Section>

            {/* ── ETL ── */}
            <Section 
                title="Limpieza y Transformación (ETL)"
                description="Proceso que prepara los datos eliminando errores, duplicados y transformándolos para que puedan ser analizados correctamente."
                benefits={[
                    "Datos consistentes",
                    "Eliminación de errores",
                    "Integración total",
                    "Precisión absoluta"
                ]}
                stats={[
                    { value: "95", suffix: "%", label: "Calidad de datos" },
                    { value: "100", suffix: "%", label: "Confiabilidad" }
                ]}
                image="/imagenes/micrositios/Big-data/bigdata1.webp"
                isEven={true}
            >
                <ETLAnimation />
            </Section>

            {/* ── FINAL CTA ── */}
            <section className="relative py-48 px-10 text-center overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 z-0 opacity-40 grayscale pointer-events-none">
                    <img src="/imagenes/micrositios/Big-data/conceptual-image-showcasing-businessman-digital-environment.webp" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-[#020202]" />
                </div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-12 leading-none uppercase">
                        Decide con <br />
                        <span className="text-cyan-500 underline decoration-white/10 underline-offset-[20px]">Evidencia.</span>
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-500 mb-20 italic font-light max-w-3xl mx-auto leading-relaxed">
                        Transformamos el caos de la información en una ventaja competitiva soberana.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-16 py-6 bg-cyan-600 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)]"
                        >
                            Contactar Ahora
                        </button>
                        <Link 
                            to="/" 
                            onClick={() => window.scrollTo(0,0)}
                            className="px-16 py-6 bg-[#0a0a0a] border border-white/10 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all outline-none"
                        >
                            Volver al Inicio
                        </Link>
                    </div>
                </motion.div>
            </section>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
};

export default BigData;
