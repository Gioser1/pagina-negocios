import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import ContactModal from "../../components/ContactModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
    {
        title: "Ingreso y Gestión de Leads en CRM",
        description: "Diseñamos sistemas que integran formularios, plataformas digitales y campañas publicitarias con CRM empresariales para capturar, clasificar y gestionar leads automáticamente.",
        icon: "🎯",
        color: "#0ea5e9",
        glowColor: "rgba(14,165,233,0.4)",
        benefits: ["Captura automática de prospectos", "Clasificación inteligente de leads", "Integración con CRM empresariales", "Seguimiento automatizado de oportunidades"],
        stats: [{ value: "29%", label: "más ventas" }, { value: "70%", label: "menos tareas" }, { value: "91%", label: "adopción CRM" }],
        image: "/imagenes/micrositios/Automatizaciones/ingreso.webp"
    },
    {
        title: "Onboarding de Nuevos Clientes",
        description: "Desarrollamos flujos automatizados para el proceso de registro, verificación y activación de nuevos clientes, mejorando la experiencia inicial y reduciendo tiempos administrativos.",
        icon: "🚀",
        color: "#6366f1",
        glowColor: "rgba(99,102,241,0.4)",
        benefits: ["Registro automatizado de clientes", "Integración con sistemas internos", "Activación rápida de servicios", "Reducción de carga administrativa"],
        stats: [{ value: "60%", label: "menos tiempo" }, { value: "50%", label: "más retención" }, { value: "80%", label: "menos errores" }],
        image: "/imagenes/micrositios/Automatizaciones/clientes.webp"
    },
    {
        title: "Asistentes Virtuales Inteligentes",
        description: "Desarrollamos asistentes virtuales capaces de interactuar con usuarios, resolver consultas y ejecutar tareas dentro de plataformas digitales, integrándose con CRM, bases de datos y sistemas empresariales.",
        icon: "🤖",
        color: "#38bdf8",
        glowColor: "rgba(56,189,248,0.4)",
        benefits: ["Atención automatizada 24/7", "Integración con sistemas empresariales", "Automatización de consultas frecuentes", "Escalabilidad en atención al cliente"],
        stats: [{ value: "70%", label: "consultas auto" }, { value: "30%", label: "menos costos" }, { value: "24/7", label: "disponibilidad" }],
        image: "/imagenes/micrositios/Automatizaciones/asistentes.webp"
    },
    {
        title: "Automatización Order-to-Cash (O2C)",
        description: "Automatización integral del ciclo desde la recepción del pedido hasta el cobro, integrando sistemas de ventas, facturación, inventario y pagos para eliminar tareas manuales y acelerar el flujo de ingresos.",
        icon: "💳",
        color: "#7dd3fc",
        glowColor: "rgba(125,211,252,0.4)",
        benefits: ["Reducción de errores en facturación y pedidos", "Ciclos de cobro más rápidos", "Mayor visibilidad del estado de cada orden", "Menor carga operativa administrativa"],
        stats: [{ value: "60%", label: "menos tiempo" }, { value: "-40%", label: "errores" }, { value: "+25%", label: "cobros" }],
        image: "/imagenes/micrositios/Automatizaciones/pagos.webp"
    },
    {
        title: "Flujos de Datos entre Plataformas (Data Pipelines)",
        description: "Diseño e implementación de pipelines de datos que conectan automáticamente distintas plataformas (CRM, ERP, marketing, bases de datos y herramientas analíticas), garantizando transferencia y sincronización en tiempo real.",
        icon: "🔄",
        color: "#0284c7",
        glowColor: "rgba(2,132,199,0.4)",
        benefits: ["Eliminación de carga manual de datos", "Información centralizada y actualizada", "Integración fluida entre herramientas del negocio", "Mayor confiabilidad en los datos"],
        stats: [{ value: "80%", label: "menos carga" }, { value: "50%", label: "más precisión" }, { value: "Real", label: "time sync" }],
        image: "/imagenes/micrositios/Automatizaciones/flujos.webp"
    },
    {
        title: "Reporting Operativo y Dashboards de KPIs",
        description: "Creación de dashboards automáticos que consolidan datos de distintas fuentes para visualizar métricas clave del negocio en tiempo real, facilitando el monitoreo operativo y la toma de decisiones.",
        icon: "📊",
        color: "#4f46e5",
        glowColor: "rgba(79,70,229,0.4)",
        benefits: ["Visibilidad clara del desempeño del negocio", "Monitoreo continuo de KPIs críticos", "Toma de decisiones basada en datos", "Reducción del tiempo dedicado a reportes manuales"],
        stats: [{ value: "70%", label: "menos reportes" }, { value: "50%", label: "más velocidad" }, { value: "24/7", label: "dashboards" }],
        image: "/imagenes/micrositios/Automatizaciones/operativo.webp"
    }
];

const METRICS = [
    { val: "80",   suf: "%",  lab: "MENOS ERRORES" },
    { val: "60",   suf: "%",  lab: "AHORRO TIEMPO" },
    { val: "3x",   suf: "",   lab: "MÁS VELOCIDAD" },
    { val: "Zero", suf: "",   lab: "TAREAS MANUALES" }
];

// ─── NeuralCanvas ─────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 45;
const LINK_DIST      = 110;
const REPEL_DIST     = 110;
const REPEL_FORCE    = 1.0;

function NeuralCanvas() {
    const canvasRef = useRef(null);
    const mouse     = useRef({ x: -9999, y: -9999 });
    const animRef   = useRef(null);
    const visibleRef = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });

        function resize() {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        let pendingMouse = null;
        const onMove = (e) => { pendingMouse = e; };
        window.addEventListener("mousemove", onMove, { passive: true });

        const io = new IntersectionObserver(([entry]) => {
            visibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting && !animRef.current) scheduleFrame();
        }, { threshold: 0 });
        io.observe(canvas);

        const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            vx:    (Math.random() - 0.5) * 0.35,
            vy:    (Math.random() - 0.5) * 0.35,
            size:  Math.random() * 1.8 + 0.4,
            pulse: Math.random() * Math.PI * 2,
            hue:   [190, 200, 210][Math.floor(Math.random() * 3)]
        }));

        const CELL = LINK_DIST;
        function cellKey(cx, cy) { return (cx & 0xFFFF) << 16 | (cy & 0xFFFF); }

        function buildGrid() {
            const grid = new Map();
            for (let i = 0; i < particles.length; i++) {
                const p  = particles[i];
                const cx = Math.floor(p.x / CELL);
                const cy = Math.floor(p.y / CELL);
                const k  = cellKey(cx, cy);
                if (!grid.has(k)) grid.set(k, []);
                grid.get(k).push(i);
            }
            return grid;
        }

        let cachedRect = canvas.getBoundingClientRect();
        let rectDirty  = false;

        const ALPHA_BUCKETS = 5;
        const buckets = Array.from({ length: ALPHA_BUCKETS }, () => []);

        function animate() {
            animRef.current = null;
            if (!visibleRef.current) return;

            if (pendingMouse) {
                if (rectDirty) { cachedRect = canvas.getBoundingClientRect(); rectDirty = false; }
                mouse.current = {
                    x: pendingMouse.clientX - cachedRect.left,
                    y: pendingMouse.clientY - cachedRect.top
                };
                pendingMouse = null;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mx = mouse.current.x;
            const my = mouse.current.y;
            const rr = REPEL_DIST * REPEL_DIST;

            for (const p of particles) {
                p.x    += p.vx;
                p.y    += p.vy;
                p.pulse += 0.022;

                const dx = p.x - mx;
                const dy = p.y - my;
                const d2 = dx * dx + dy * dy;
                if (d2 < rr && d2 > 0) {
                    const inv = REPEL_FORCE / Math.sqrt(d2);
                    p.x += dx * inv;
                    p.y += dy * inv;
                }

                if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;

                const r = p.size * (1 + 0.2 * Math.sin(p.pulse));
                ctx.beginPath();
                ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue},100%,72%,0.65)`;
                ctx.fill();
            }

            const grid = buildGrid();
            for (let b = 0; b < ALPHA_BUCKETS; b++) buckets[b].length = 0;

            for (let i = 0; i < particles.length; i++) {
                const p  = particles[i];
                const cx = Math.floor(p.x / CELL);
                const cy = Math.floor(p.y / CELL);

                for (let nx = cx - 1; nx <= cx + 1; nx++) {
                    for (let ny = cy - 1; ny <= cy + 1; ny++) {
                        const neighbors = grid.get(cellKey(nx, ny));
                        if (!neighbors) continue;
                        for (const j of neighbors) {
                            if (j <= i) continue;
                            const q  = particles[j];
                            const dx = p.x - q.x;
                            const dy = p.y - q.y;
                            const d2 = dx * dx + dy * dy;
                            if (d2 < LINK_DIST * LINK_DIST) {
                                const d = Math.sqrt(d2);
                                const b = Math.min(ALPHA_BUCKETS - 1, Math.floor((1 - d / LINK_DIST) * ALPHA_BUCKETS));
                                buckets[b].push(p.x, p.y, q.x, q.y);
                            }
                        }
                    }
                }
            }

            ctx.lineWidth = 0.6;
            for (let b = 0; b < ALPHA_BUCKETS; b++) {
                const segs = buckets[b];
                if (!segs.length) continue;
                const alpha = ((b + 0.5) / ALPHA_BUCKETS) * 0.22;
                ctx.strokeStyle = `rgba(14,165,233,${alpha.toFixed(3)})`;
                ctx.beginPath();
                for (let s = 0; s < segs.length; s += 4) {
                    ctx.moveTo(segs[s],     segs[s + 1]);
                    ctx.lineTo(segs[s + 2], segs[s + 3]);
                }
                ctx.stroke();
            }

            scheduleFrame();
        }

        function scheduleFrame() {
            animRef.current = requestAnimationFrame(animate);
        }
        scheduleFrame();

        const onScroll = () => { rectDirty = true; };
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            ro.disconnect();
            io.disconnect();
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("scroll", onScroll);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
        />
    );
}

// ─── TiltCard ─────────────────────────────────────────────────────────────────

function TiltCard({ children, className = "" }) {
    const ref    = useRef(null);
    const x      = useMotionValue(0);
    const y      = useMotionValue(0);
    const rotX   = useTransform(y, [-0.5, 0.5], [12, -12]);
    const rotY   = useTransform(x, [-0.5, 0.5], [-12, 12]);
    const springX = useSpring(rotX, { stiffness: 180, damping: 22 });
    const springY = useSpring(rotY, { stiffness: 180, damping: 22 });

    const onMove  = useCallback((e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width  - 0.5);
        y.set((e.clientY - r.top)  / r.height - 0.5);
    }, [x, y]);

    const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: springX, rotateY: springY, transformPerspective: 1500 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ─── Counter ─────────────────────────────────────────────────────────────────

function Counter({ value, label }) {
    const [display, setDisplay] = useState("—");
    const ref     = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const numMatch = value.match(/^([+\-]?)(\d+\.?\d*)(.*)/);

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || started.current) return;
            started.current = true;

            if (!numMatch) {
                setTimeout(() => setDisplay(value), 400);
                return;
            }

            const [, prefix, rawNum, suffix] = numMatch;
            const target   = parseFloat(rawNum);
            const isFloat  = rawNum.includes(".");
            const decimals = isFloat ? rawNum.split(".")[1].length : 0;
            const start    = performance.now();
            const duration = 2200;

            function step(ts) {
                const p    = Math.min((ts - start) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 4);
                const cur  = ease * target;
                setDisplay(`${prefix}${isFloat ? cur.toFixed(decimals) : Math.round(cur)}${suffix}`);
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }, { threshold: 0.5 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div ref={ref} className="text-center px-2">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tabular-nums">{display}</div>
            <div className="text-[9px] sm:text-[10px] text-sky-400 mt-2 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold">{label}</div>
        </div>
    );
}

// ─── GlitchText ──────────────────────────────────────────────────────────────

function GlitchText({ text, className = "" }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <style>{`
                @keyframes glitch1-auto {
                    0%,100% { clip-path:inset(0 0 100% 0); transform:translate(0); }
                    25%     { clip-path:inset(10% 0 80% 0); transform:translate(-3px,2px); }
                    75%     { clip-path:inset(80% 0 5% 0);  transform:translate(3px,-2px); }
                }
                @keyframes glitch2-auto {
                    0%,100% { clip-path:inset(0 0 100% 0); transform:translate(0); }
                    40%     { clip-path:inset(40% 0 10% 0); transform:translate(4px,-4px); }
                }
                .glitch-auto::before {
                    content:attr(data-text); position:absolute; inset:0;
                    color:#0ea5e9; animation:glitch1-auto 4s infinite;
                }
                .glitch-auto::after {
                    content:attr(data-text); position:absolute; inset:0;
                    color:#6366f1; animation:glitch2-auto 4s infinite 1s;
                }
            `}</style>
            <span className="glitch-auto" data-text={text}>{text}</span>
        </span>
    );
}

// ─── TypingText ───────────────────────────────────────────────────────────────

function TypingText({ texts, className = "" }) {
    const [idx,     setIdx]     = useState(0);
    const [display, setDisplay] = useState("");
    const [phase,   setPhase]   = useState("type");

    useEffect(() => {
        const current = texts[idx];
        let timeout;
        if (phase === "type") {
            if (display.length < current.length)
                timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 60);
            else
                timeout = setTimeout(() => setPhase("pause"), 3000);
        } else if (phase === "pause") {
            timeout = setTimeout(() => setPhase("delete"), 500);
        } else {
            if (display.length > 0)
                timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 35);
            else { setIdx((idx + 1) % texts.length); setPhase("type"); }
        }
        return () => clearTimeout(timeout);
    }, [display, phase, idx, texts]);

    return (
        <span className={className}>
            {display}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-0.5 h-5 sm:h-6 md:h-7 bg-sky-400 ml-1 align-middle"
            />
        </span>
    );
}

// ─── ServiceCard ─────────────────────────────────────────────────────────────

function ServiceCard({ service, index }) {
    const [open,    setOpen]    = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <TiltCard className="relative group cursor-pointer h-full">
            <motion.div
                onClick={() => setOpen(o => !o)}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={()   => setHovered(false)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
                className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/5 bg-[#020202] flex flex-col h-full shadow-2xl transition-all duration-700 hover:border-sky-500/30"
                style={{
                    boxShadow: hovered
                        ? `0 0 60px ${service.glowColor}, 0 0 120px ${service.glowColor.replace("0.4", "0.1")}`
                        : "none"
                }}
            >
                {/* Radar pulse */}
                {hovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute inset-0 border-2 border-sky-500/10 rounded-full"
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                )}

                {/* Scan line */}
                <motion.div
                    className="absolute left-0 right-0 h-px bg-sky-500/20 z-20 pointer-events-none"
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden shrink-0">
                    <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: hovered ? 1.2 : 1 }}
                        transition={{ duration: 1.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-sky-950/20 to-transparent opacity-80" />

                    <div className="absolute top-5 right-5 sm:top-8 sm:right-8">
                        <div
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center backdrop-blur-3xl text-2xl sm:text-4xl border border-white/10 shadow-2xl"
                            style={{ background: `${service.color}22` }}
                        >
                            {service.icon}
                        </div>
                    </div>

                    <div
                        className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 text-5xl sm:text-7xl font-black opacity-10 tracking-tighter italic"
                        style={{ color: service.color }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-1">
                    <h3
                        className="text-xl sm:text-2xl md:text-3xl font-black mb-4 sm:mb-6 tracking-tighter italic uppercase transition-all duration-500"
                        style={{ color: hovered ? service.color : "white" }}
                    >
                        {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-10 italic opacity-80">
                        {service.description}
                    </p>

                    <footer className="mt-auto flex items-center gap-4">
                        <div className="h-px bg-sky-500/40 w-8 group-hover:w-16 transition-all duration-500" />
                        <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.3em] sm:tracking-[0.4em] text-sky-400 opacity-60">
                            {open ? "Cerrar Detalle" : "Ver Automatización"}
                        </span>
                    </footer>
                </div>

                {/* Details Pane */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden bg-sky-950/10 border-t border-white/5 backdrop-blur-sm"
                        >
                            <div className="p-6 sm:p-8 md:p-10 space-y-8 sm:space-y-10">
                                <div>
                                    <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-sky-500 mb-6 sm:mb-8 flex items-center gap-3">
                                        <span className="w-8 h-px bg-sky-500/20" /> Beneficios Clave
                                    </h4>
                                    <ul className="grid grid-cols-1 gap-4 sm:gap-5">
                                        {service.benefits.map((b, i) => (
                                            <li key={i} className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm text-gray-300 italic font-light">
                                                <motion.div
                                                    className="w-2 h-2 shrink-0 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                    style={{ background: service.color }}
                                                />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="grid grid-cols-3 gap-4 sm:gap-5 pt-4 border-t border-white/5">
                                    {service.stats.map((s, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-lg sm:text-2xl font-black text-white hover:text-sky-400 transition-colors">{s.value}</div>
                                            <div className="text-[7px] sm:text-[8px] text-gray-500 uppercase font-black tracking-widest leading-none mt-2">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </TiltCard>
    );
}

// ─── Global Styles ────────────────────────────────────────────────────────────

const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');
        * { font-family:'Outfit',sans-serif; }
        ::-webkit-scrollbar       { width:5px; }
        ::-webkit-scrollbar-track { background:#020202; }
        ::-webkit-scrollbar-thumb { background:#0ea5e9; border-radius:10px; }
    `}</style>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const Automatizaciones = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mainRef = useRef(null);
    const mouseX  = useMotionValue(0);
    const mouseY  = useMotionValue(0);

    const onMouseMove = useCallback((e) => {
        const rect = mainRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
            mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
        }
    }, [mouseX, mouseY]);

    return (
        <>
            <GlobalStyles />
            <main
                ref={mainRef}
                onMouseMove={onMouseMove}
                className="min-h-screen bg-[#020202] text-white selection:bg-sky-500/30 overflow-x-hidden pt-20 sm:pt-28 md:pt-32"
            >

                {/* ── HERO ── */}
                <section className="relative mx-4 sm:mx-8 md:mx-16 rounded-[2.5rem] sm:rounded-[4rem] md:rounded-[5rem] overflow-hidden mb-20 sm:mb-32 md:mb-40 border border-white/5 shadow-2xl min-h-[600px] sm:min-h-[680px] md:min-h-[750px] flex items-center">
                    <NeuralCanvas />
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-950/20 via-transparent to-indigo-950/20 pointer-events-none" />

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden:  {},
                            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
                        }}
                        className="relative z-10 px-6 sm:px-12 md:px-20 py-16 sm:py-20 w-full"
                    >
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md text-sky-200 text-xs tracking-[0.2em] font-bold uppercase mb-6 border border-white/20 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                        >
                            Procesos sin fricción. Resultados sin límites.
                        </motion.span>

                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter mb-8 sm:mb-12 italic uppercase"
                        >
                            Automatiza <br />
                            <GlitchText
                                text="Tu Negocio"
                                className="text-sky-500 underline decoration-white/10 underline-offset-[10px] sm:underline-offset-[18px] md:underline-offset-[25px]"
                            />
                        </motion.h1>

                        <motion.div
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="h-10 sm:h-12 mb-8 sm:mb-16"
                        >
                            <TypingText
                                texts={[
                                    "Flujos inteligentes. Cero tareas manuales.",
                                    "Integra, sincroniza y escala sin esfuerzo.",
                                    "Automatización que trabaja mientras duermes.",
                                    "Decisiones respaldadas por datos en tiempo real."
                                ]}
                                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-sky-100 font-light italic tracking-tight"
                            />
                        </motion.div>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-gray-500 max-w-3xl text-base sm:text-lg leading-relaxed mb-10 sm:mb-16 font-light italic opacity-70"
                        >
                            Diseñamos e implementamos soluciones de automatización empresarial que eliminan tareas repetitivas,
                            conectan tus plataformas y aceleran cada proceso crítico del negocio.
                        </motion.p>

                        <motion.button
                            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                            whileHover={{ scale: 1.08, backgroundColor: "#0ea5e9", color: "#fff" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('servicios-inicio')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 sm:px-16 md:px-20 py-5 sm:py-7 md:py-8 bg-white text-black rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.3em] transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)]"
                        >
                            Ver Automatizaciones
                        </motion.button>
                    </motion.div>
                </section>

                {/* ── METRICS ── */}
                <section id="servicios-inicio" className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-24 sm:mb-36 md:mb-48">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-14 sm:py-20 md:py-24 px-8 sm:px-12 md:px-16 rounded-[3rem] sm:rounded-[5rem] md:rounded-[6rem] bg-white/[0.01] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-600/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
                        {METRICS.map((m, i) => (
                            <div key={i} className="relative z-10">
                                <Counter value={m.val + m.suf} label={m.lab} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── SERVICES GRID ── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-24 sm:mb-36 md:mb-48">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 sm:mb-24 md:mb-28 gap-8 sm:gap-12">
                        <div>
                            <span className="text-sky-500 font-black tracking-[0.5em] sm:tracking-[0.7em] text-[10px] sm:text-[11px] uppercase block mb-6 sm:mb-8">
                                Automatización Empresarial
                            </span>
                            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none italic uppercase">
                                Nuestros <br /><span className="text-sky-900/50 underline decoration-sky-500/10">Flujos</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 max-w-sm text-left md:text-right italic text-base sm:text-xl leading-relaxed md:border-r-4 border-sky-600 md:pr-10 opacity-80">
                            Automatización de precisión para procesos que no pueden fallar.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-12">
                        {services.map((s, i) => (
                            <div key={i} className="h-full">
                                <ServiceCard service={s} index={i} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── ARCHITECTURE HIGHLIGHT ── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-24 sm:mb-36 md:mb-48">
                    <div className="relative rounded-[2.5rem] sm:rounded-[4rem] md:rounded-[6rem] overflow-hidden border border-white/5 bg-gradient-to-br from-[#020202] to-[#080808] p-8 sm:p-16 md:p-24 lg:p-36 group shadow-2xl">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-[0.03] grayscale transition-all duration-[4s] group-hover:scale-105 group-hover:opacity-10 pointer-events-none"
                            style={{ backgroundImage: "url('/imagenes/micrositios/Automatizaciones/banner.webp')" }}
                        />
                        <div className="relative z-10 grid lg:grid-cols-12 gap-12 sm:gap-16 md:gap-24 items-center">
                            <div className="lg:col-span-7">
                                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black mb-8 sm:mb-12 md:mb-16 italic leading-[0.85] tracking-tighter uppercase">
                                    Eficiencia <br />Operativa.
                                </h2>
                                <p className="text-base sm:text-xl md:text-2xl text-gray-500 mb-8 sm:mb-12 md:mb-16 font-light italic leading-relaxed max-w-2xl opacity-90">
                                    La verdadera transformación no es tecnológica, es{" "}
                                    <span className="text-sky-400 underline decoration-sky-500/30 underline-offset-8">operativa</span>.
                                    Diseñamos flujos que se ejecutan solos y escalan con tu negocio.
                                </p>
                                <Link
                                    to="/servicios/desarrollo-software"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="inline-flex items-center gap-4 sm:gap-6 text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] group/link border-b border-sky-500/20 pb-2"
                                >
                                    Software Factory{" "}
                                    <span className="text-2xl sm:text-3xl transition-transform group-hover/link:translate-x-4">→</span>
                                </Link>
                            </div>
                            <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
                                {[
                                    { t: "Integración Total",   d: "CRM · ERP · Marketing · BI" },
                                    { t: "Flujos Sin Código",   d: "Despliegue Rápido y Sin Fricciones" },
                                    { t: "Monitoreo en Vivo",   d: "Alertas y KPIs en Tiempo Real" }
                                ].map((box, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 16 }}
                                        className="p-7 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-sky-900/10 transition-all duration-300"
                                    >
                                        <h4 className="text-white font-black text-base sm:text-xl mb-2 sm:mb-3 uppercase italic tracking-tighter">{box.t}</h4>
                                        <p className="text-[9px] sm:text-[10px] text-sky-500 font-black uppercase tracking-[0.4em] opacity-60">{box.d}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="relative py-32 sm:py-48 md:py-60 px-4 sm:px-8 md:px-12 text-center overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] md:w-[1000px] h-[600px] sm:h-[800px] md:h-[1000px] bg-sky-600/5 blur-[120px] sm:blur-[180px] rounded-full animate-pulse" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[14rem] font-black leading-[0.8] tracking-tighter mb-10 sm:mb-16 md:mb-20 italic uppercase">
                            Automatiza <br />
                            <span className="text-sky-600 drop-shadow-[0_0_80px_rgba(14,165,233,0.4)]">Ahora.</span>
                        </h2>
                        <p className="text-lg sm:text-2xl md:text-3xl text-gray-500 mb-14 sm:mb-20 md:mb-24 italic font-light max-w-4xl mx-auto leading-relaxed px-4">
                            Analizamos tus procesos actuales y diseñamos el mapa hacia la automatización total de tu operación.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 justify-center items-center">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto px-10 sm:px-16 md:px-24 py-7 sm:py-10 md:py-12 bg-sky-600 rounded-full font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-sky-500 hover:scale-105 transition-all shadow-[0_0_100px_rgba(14,165,233,0.5)] active:scale-95 text-white"
                            >
                                Automatizar Mi Empresa
                            </button>
                            <Link
                                to="/"
                                onClick={() => window.scrollTo(0, 0)}
                                className="w-full sm:w-auto px-10 sm:px-16 md:px-24 py-7 sm:py-10 md:py-12 bg-white/5 border border-white/10 rounded-full font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40 hover:text-white transition-all shadow-2xl text-center"
                            >
                                Volver al Inicio
                            </Link>
                        </div>
                    </motion.div>
                </section>

                <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <footer className="py-20 sm:py-28 md:py-40 px-8 md:px-12 border-t border-white/5 text-center bg-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="w-24 h-px bg-sky-600 mx-auto mb-10 sm:mb-16 opacity-40 shadow-[0_0_20px_rgba(14,165,233,1)]" />
                        <p className="text-gray-600 text-[10px] sm:text-[11px] font-black tracking-[0.5em] sm:tracking-[0.8em] uppercase leading-relaxed">
                            © {new Date().getFullYear()} Olimpo Innova • Business Automation Architects
                        </p>
                    </div>
                </footer>

            </main>
        </>
    );
};

export default Automatizaciones;