<<<<<<< HEAD
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Counter = ({ value, duration = 2.5 }) => {
    const [count, setCount] = useState("0");
    const nodeRef = useRef(null);
    const [inView, setInView] = useState(false);
=======
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import ContactModal from "../../components/ContactModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
    {
        title: "Migración a la Nube",
        description: "Traslado estratégico de infraestructuras locales a ecosistemas cloud elásticos y seguros.",
        icon: "☁️",
        color: "#0ea5e9",
        glowColor: "rgba(14,165,233,0.4)",
        benefits: ["Migración Zero-Downtime", "Rediseño Cloud-Native", "Optimización de latencia", "Escalabilidad automática"],
        stats: [{ value: "99.9%", label: "disponibilidad" }, { value: "-40%", label: "costos TCO" }, { value: "Instant", label: "scaling" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/cyber-security-concept-digital-art.jpg"
    },
    {
        title: "FinOps & Optimización",
        description: "Control riguroso del gasto cloud mediante auditoría técnica y ajuste de recursos en tiempo real.",
        icon: "💰",
        color: "#6366f1",
        glowColor: "rgba(99,102,241,0.4)",
        benefits: ["Ajuste Right-Sizing", "Gestión de Instancias Spot", "Alertas de presupuesto", "Reportes de valor real"],
        stats: [{ value: "45%", label: "ahorro promedio" }, { value: "100%", label: "visibilidad" }, { value: "Zero", label: "desperdicio" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/businessman-analyzing-data-tablet-cityscape-background.jpg"
    },
    {
        title: "Seguridad Cloud (SOC)",
        description: "Blindaje integral con arquitecturas Zero-Trust y monitoreo proactivo contra amenazas globales.",
        icon: "🛡️",
        color: "#38bdf8",
        glowColor: "rgba(56,189,248,0.4)",
        benefits: ["Identidad Zero-Trust", "Prevención DLP avanzada", "SOC 24/7 con IA", "Cifrado AES-256"],
        stats: [{ value: "Zero", label: "brechas" }, { value: "24/7", label: "vigilancia" }, { value: "SOC2", label: "compliance" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/cloud-security-data-protection-concept.jpg"
    },
    {
        title: "Serverless & Containers",
        description: "Desacoplamiento total de la infraestructura física mediante orquestación avanzada y funciones lambda.",
        icon: "📦",
        color: "#7dd3fc",
        glowColor: "rgba(125,211,252,0.4)",
        benefits: ["Kubernetes (EKS/AKS)", "Docker Containerization", "Lambda & Functions", "Microservicios Cloud"],
        stats: [{ value: "85%", label: "adopción cloud" }, { value: "Zero", label: "mantenimiento" }, { value: "Infinite", label: "burst" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/saas-concept-collage.jpg"
    },
    {
        title: "Monitoreo SRE 24/7",
        description: "Observabilidad total del sistema con respuesta automática ante incidentes y degradación de servicios.",
        icon: "📊",
        color: "#0284c7",
        glowColor: "rgba(2,132,199,0.4)",
        benefits: ["Métricas en tiempo real", "Alertas predictivas", "Auto-healing systems", "SLA garantizado"],
        stats: [{ value: "15min", label: "MTTR" }, { value: "100%", label: "uptime" }, { value: "99.9", label: "SLA" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/server-cloud-data-storage-concept-cloudscape-digital-online-service-global-network-web-database-backup-computer-infrastructure-technology.jpg"
    },
    {
        title: "Arquitectura Híbrida",
        description: "Conexión fluida entre nubes públicas, privadas y centros de datos locales para máxima flexibilidad.",
        icon: "🔗",
        color: "#4f46e5",
        glowColor: "rgba(79,70,229,0.4)",
        benefits: ["VPC Peering & ExpressRoute", "Cloud Privada (Azure Stack)", "Storage Sincronizado", "Conectividad VPN Pro"],
        stats: [{ value: "Zero", label: "lock-in" }, { value: "+50%", label: "flexibilidad" }, { value: "Hybrid", label: "ready" }],
        image: "/imagenes/micrositios/Infraestructura-en-la-nube/website-hosting-concept-with-cloud.jpg"
    }
];

const METRICS = [
    { val: "99.99", suf: "%", lab: "UPTIME" },
    { val: "15",    suf: "min", lab: "RESPUESTA" },
    { val: "45",    suf: "%",   lab: "AHORRO" },
    { val: "Zero",  suf: "",    lab: "BRECHAS" }
];

// ─── NeuralCanvas ─────────────────────────────────────────────────────────────
// Optimizations:
//  • 45 particles instead of 80  → O(n²) comparisons: 990 vs 3160
//  • Spatial grid (cell size = LINK_DIST) → only checks neighboring cells for links
//  • Mouse throttled via ref flag  → no setState / no forced re-renders
//  • Pauses via IntersectionObserver when hero is off-screen
//  • createRadialGradient replaced with globalAlpha + arc fill (cheaper)
//  • Canvas pointer-events:none so mouse never hits canvas hit-testing

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

        // ── resize ──
        function resize() {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // ── mouse — throttled to one update per rAF ──
        let pendingMouse = null;
        const onMove = (e) => { pendingMouse = e; };
        // Listen on window so fast mouse moves outside canvas still register
        window.addEventListener("mousemove", onMove, { passive: true });

        // ── visibility pause ──
        const io = new IntersectionObserver(([entry]) => {
            visibleRef.current = entry.isIntersecting;
            if (entry.isIntersecting && !animRef.current) scheduleFrame();
        }, { threshold: 0 });
        io.observe(canvas);

        // ── particles ──
        const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            vx:    (Math.random() - 0.5) * 0.35,
            vy:    (Math.random() - 0.5) * 0.35,
            size:  Math.random() * 1.8 + 0.4,
            pulse: Math.random() * Math.PI * 2,
            hue:   [190, 200, 210][Math.floor(Math.random() * 3)]
        }));

        // ── spatial grid helpers ──
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

        // ── cached bounding rect (updated lazily on scroll/resize) ──
        let cachedRect = canvas.getBoundingClientRect();
        let rectDirty  = false;

        // ── link buckets: batch segments by alpha to minimize strokeStyle changes ──
        const ALPHA_BUCKETS = 5;
        const buckets = Array.from({ length: ALPHA_BUCKETS }, () => []);

        // ── draw ──
        function animate() {
            animRef.current = null;
            if (!visibleRef.current) return;

            // consume pending mouse — only one getBoundingClientRect per dirty cycle
            if (pendingMouse) {
                if (rectDirty) { cachedRect = canvas.getBoundingClientRect(); rectDirty = false; }
                mouse.current = {
                    x: pendingMouse.clientX - cachedRect.left,
                    y: pendingMouse.clientY - cachedRect.top
                };
                pendingMouse = null;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // ── update + draw particles ──
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

                // plain circle — no gradient allocation per particle
                const r = p.size * (1 + 0.2 * Math.sin(p.pulse));
                ctx.beginPath();
                ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue},100%,72%,0.65)`;
                ctx.fill();
            }

            // ── links: spatial grid + batched strokes ──
            const grid = buildGrid();

            // reuse bucket arrays to avoid GC pressure
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

            // one ctx.stroke() per bucket → minimal GPU state changes
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
// Handles numeric strings ("99.9%", "-40%", "45%") and text tokens ("Zero", "Instant", "Hybrid", etc.)

function Counter({ value, label }) {
    const [display, setDisplay] = useState("—");
    const ref     = useRef(null);
    const started = useRef(false);
>>>>>>> 6281ec77e5b3fa342eca88f0485b8c6f1eb434d8

    useEffect(() => {
        const numMatch = value.match(/^([+\-]?)(\d+\.?\d*)(.*)/);

        const observer = new IntersectionObserver(([entry]) => {
<<<<<<< HEAD
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
=======
            if (!entry.isIntersecting || started.current) return;
            started.current = true;

            if (!numMatch) {
                // Non-numeric value — just display directly after a brief delay
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
                @keyframes glitch1-cloud {
                    0%,100% { clip-path:inset(0 0 100% 0); transform:translate(0); }
                    25%     { clip-path:inset(10% 0 80% 0); transform:translate(-3px,2px); }
                    75%     { clip-path:inset(80% 0 5% 0);  transform:translate(3px,-2px); }
                }
                @keyframes glitch2-cloud {
                    0%,100% { clip-path:inset(0 0 100% 0); transform:translate(0); }
                    40%     { clip-path:inset(40% 0 10% 0); transform:translate(4px,-4px); }
                }
                .glitch-cloud::before {
                    content:attr(data-text); position:absolute; inset:0;
                    color:#0ea5e9; animation:glitch1-cloud 4s infinite;
                }
                .glitch-cloud::after {
                    content:attr(data-text); position:absolute; inset:0;
                    color:#6366f1; animation:glitch2-cloud 4s infinite 1s;
                }
            `}</style>
            <span className="glitch-cloud" data-text={text}>{text}</span>
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
                            {open ? "Cerrar Estructura" : "Analizar Capacidad"}
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
                                        <span className="w-8 h-px bg-sky-500/20" /> Ingeniería Cloud
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

const InfraestructuraNube = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mainRef = useRef(null);
    const mouseX  = useMotionValue(0);
    const mouseY  = useMotionValue(0);

    const onMouseMove = useCallback((e) => {
        const rect = mainRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
            mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
>>>>>>> 6281ec77e5b3fa342eca88f0485b8c6f1eb434d8
        }
    };

<<<<<<< HEAD
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
=======
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
                    {/* Background canvas */}
                    <NeuralCanvas />

                    {/* Gradient overlay */}
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
                            Architecting Global Scale
                        </motion.span>

                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter mb-8 sm:mb-12 italic uppercase"
                        >
                            Infraestructura <br />
                            <GlitchText
                                text="Cloud"
                                className="text-sky-500 underline decoration-white/10 underline-offset-[10px] sm:underline-offset-[18px] md:underline-offset-[25px]"
                            />
                        </motion.h1>

                        <motion.div
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="h-10 sm:h-12 mb-8 sm:mb-16"
                        >
                            <TypingText
                                texts={[
                                    "Escalado elástico. Resiliencia total.",
                                    "Tu negocio sin límites geográficos.",
                                    "Arquitecturas diseñadas para ganar.",
                                    "Eficiencia cloud auditada y optimizada."
                                ]}
                                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-sky-100 font-light italic tracking-tight"
                            />
                        </motion.div>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-gray-500 max-w-3xl text-base sm:text-lg leading-relaxed mb-10 sm:mb-16 font-light italic opacity-70"
                        >
                            Orquestamos ecosistemas digitales ultra-resilientes mediante ingeniería de vanguardia.
                            Garantizamos disponibilidad global, seguridad blindada y eficiencia de costos sin precedentes.
                        </motion.p>

                        <motion.button
                            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                            whileHover={{ scale: 1.08, backgroundColor: "#0ea5e9", color: "#fff" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.scrollTo({ top: 1100, behavior: "smooth" })}
                            className="px-10 sm:px-16 md:px-20 py-5 sm:py-7 md:py-8 bg-white text-black rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.3em] transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)]"
                        >
                            Ver Ecosistemas
                        </motion.button>
                    </motion.div>
                </section>

                {/* ── METRICS ── */}
                <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 mb-24 sm:mb-36 md:mb-48">
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
                                Expertise Cloud
                            </span>
                            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none italic uppercase">
                                Nuestras <br /><span className="text-sky-900/50 underline decoration-sky-500/10">Capas</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 max-w-sm text-left md:text-right italic text-base sm:text-xl leading-relaxed md:border-r-4 border-sky-600 md:pr-10 opacity-80">
                            Ingeniería de alta precisión para arquitecturas modernas y escalables.
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
                            style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/server-cabinets-data-center-maintaining-large-scale-ai-datasets.jpg')" }}
                        />
                        <div className="relative z-10 grid lg:grid-cols-12 gap-12 sm:gap-16 md:gap-24 items-center">
                            <div className="lg:col-span-7">
                                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black mb-8 sm:mb-12 md:mb-16 italic leading-[0.85] tracking-tighter uppercase">
                                    Eficiencia <br />Soberana.
                                </h2>
                                <p className="text-base sm:text-xl md:text-2xl text-gray-500 mb-8 sm:mb-12 md:mb-16 font-light italic leading-relaxed max-w-2xl opacity-90">
                                    La verdadera transformación no es digital, es{" "}
                                    <span className="text-sky-400 underline decoration-sky-500/30 underline-offset-8">estructural</span>.
                                    Diseñamos sistemas que se reparan solos y escalan antes que tú lo sepas.
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
                                    { t: "Multi-Region", d: "Latencia Global < 50ms" },
                                    { t: "K8s Native",   d: "Orquestación Elástica" },
                                    { t: "Edge Compute", d: "Procesamiento al Borde" }
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
                            Evolución <br />
                            <span className="text-sky-600 drop-shadow-[0_0_80px_rgba(14,165,233,0.4)]">Garantizada.</span>
                        </h2>
                        <p className="text-lg sm:text-2xl md:text-3xl text-gray-500 mb-14 sm:mb-20 md:mb-24 italic font-light max-w-4xl mx-auto leading-relaxed px-4">
                            Auditamos tu arquitectura actual y trazamos el mapa hacia la supremacía técnica en la nube.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 justify-center items-center">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto px-10 sm:px-16 md:px-24 py-7 sm:py-10 md:py-12 bg-sky-600 rounded-[2.5rem] sm:rounded-[3.5rem] font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-sky-500 hover:scale-105 transition-all shadow-[0_0_100px_rgba(14,165,233,0.5)] active:scale-95 text-white"
                            >
                                Auditar Mi Nube
                            </button>
                            <Link
                                to="/"
                                onClick={() => window.scrollTo(0, 0)}
                                className="w-full sm:w-auto px-10 sm:px-16 md:px-24 py-7 sm:py-10 md:py-12 bg-white/5 border border-white/10 rounded-[2.5rem] sm:rounded-[3.5rem] font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40 hover:text-white transition-all shadow-2xl text-center"
                            >
                                Inicio
                            </Link>
>>>>>>> 6281ec77e5b3fa342eca88f0485b8c6f1eb434d8
                        </div>
                    </motion.div>
                </motion.div>

<<<<<<< HEAD
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
=======
                <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <footer className="py-20 sm:py-28 md:py-40 px-8 md:px-12 border-t border-white/5 text-center bg-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="w-24 h-px bg-sky-600 mx-auto mb-10 sm:mb-16 opacity-40 shadow-[0_0_20px_rgba(14,165,233,1)]" />
                        <p className="text-gray-600 text-[10px] sm:text-[11px] font-black tracking-[0.5em] sm:tracking-[0.8em] uppercase leading-relaxed">
                            © {new Date().getFullYear()} Olimpo Innova • Cloud Sovereignty Architects
                        </p>
>>>>>>> 6281ec77e5b3fa342eca88f0485b8c6f1eb434d8
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