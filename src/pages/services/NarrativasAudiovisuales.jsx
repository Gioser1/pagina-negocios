import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import ContactModal from "../../components/ContactModal";

const services = [
    {
        title: "Spot Publicitarios (TV/Digital)",
        description: "Producción audiovisual para campañas de alto impacto. Desarrollamos spots publicitarios para televisión, plataformas digitales y campañas institucionales, diseñados para comunicar propuestas de valor de forma clara, emocional y memorables de alto impacto.",
        icon: "🎬",
        color: "#0ea5e9",
        glowColor: "rgba(14,165,233,0.4)",
        benefits: [
            "Storytelling estratégico",
            "Producción audiovisual profesional",
            "Adaptación para TV y plataformas digitales",
            "Alto impacto visual y narrativo"
        ],
        stats: [
            { value: "82%", label: "tráfico video en internet" },
            { value: "95%", label: "mayor recordación de marca" },
            { value: "70%", label: "empresas usan video" }
        ],
        image: "/imagenes/micrositios/audiovisuales/TV.webp"
    },
    {
        title: "Animación 2D y Motion Graphics",
        description: "Creamos animaciones y motion graphics que permiten explicar conceptos complejos de forma visual, clara y atractiva, especialmente útiles para tecnología, educación, startups y presentaciones corporativas.",
        icon: "✨",
        color: "#6366f1",
        glowColor: "rgba(99,102,241,0.4)",
        benefits: [
            "Explicación visual de conceptos complejos",
            "Animación de datos y procesos",
            "Alto impacto visual en presentaciones",
            "Contenido optimizado para entornos digitales"
        ],
        stats: [
            { value: "74%", label: "videos animados aumentan comprensión" },
            { value: "80%", label: "motion graphics incrementan engagement" },
            { value: "60K", label: "veces más rápido que texto" }
        ],
        image: "/imagenes/micrositios/audiovisuales/2d.webp"
    },
    {
        title: "Contenido Corto (Reels/TikToks)",
        description: "Diseñamos y producimos videos cortos verticales adaptados a plataformas como Instagram, TikTok y YouTube Shorts, enfocados en captar atención rápidamente y generar alto alcance orgánico.",
        icon: "📱",
        color: "#38bdf8",
        glowColor: "rgba(56,189,248,0.4)",
        benefits: [
            "Formato optimizado para redes sociales",
            "Alto potencial de viralidad",
            "Mayor interacción con la audiencia",
            "Comunicación rápida y directa"
        ],
        stats: [
            { value: "60%", label: "consumo de video ocurre en móviles" },
            { value: "3seg", label: "clave para captar atención" },
            { value: "#1", label: "formato de mayor crecimiento digital" }
        ],
        image: "/imagenes/micrositios/audiovisuales/Corto.webp"
    },
    {
        title: "Videos Corporativos e Institucionales",
        description: "Creamos videos corporativos diseñados para comunicar misión, visión, proyectos y capacidades institucionales, ideales para presentaciones empresariales, eventos, sitios web y redes profesionales.",
        icon: "🏢",
        color: "#7dd3fc",
        glowColor: "rgba(125,211,252,0.4)",
        benefits: [
            "Fortalecimiento de imagen corporativa",
            "Comunicación clara de proyectos y servicios",
            "Alto impacto en presentaciones institucionales",
            "Adaptación para web, eventos y redes"
        ],
        stats: [
            { value: "72%", label: "empresas usan video corporativo" },
            { value: "58%", label: "videos institucionales aumentan confianza" },
            { value: "88%", label: "más permanencia en web con video" }
        ],
        image: "/imagenes/micrositios/audiovisuales/corporativo.webp"
    },
    {
        title: "Modelado y Renderizado 3D Avanzado",
        description: "Desarrollamos modelos tridimensionales y renderizados de alta calidad para representar proyectos arquitectónicos, productos, entornos virtuales y conceptos tecnológicos, permitiendo visualizar ideas antes de ser construidas.",
        icon: "🧊",
        color: "#0284c7",
        glowColor: "rgba(2,132,199,0.4)",
        benefits: [
            "Representación visual hiperrealista",
            "Visualización anticipada de proyectos",
            "Ideal para arquitectura, tecnología e industria",
            "Alto impacto en presentaciones y marketing"
        ],
        stats: [
            { value: "70%", label: "proyectos en 3D cierran negocios" },
            { value: "60%", label: "renderizados hiperrealistas aumentan interés" },
            { value: "90%", label: "mejoran comprensión de proyectos" }
        ],
        image: "/imagenes/micrositios/audiovisuales/modelado.webp"
    },
    {
        title: "Producción Cinematográfica y Animada",
        description: "Desarrollamos producciones audiovisuales con lenguaje cinematográfico y animación digital, combinando storytelling, efectos visuales y dirección creativa para comunicar ideas complejas de manera atractiva. Ideal para presentaciones de proyectos tecnológicos, campañas institucionales, documentales corporativos y contenidos de alto impacto visual.",
        icon: "🎥",
        color: "#4f46e5",
        glowColor: "rgba(79,70,229,0.4)",
        benefits: [
            "Storytelling cinematográfico",
            "Integración de animación y efectos visuales",
            "Alto impacto narrativo",
            "Producciones adaptables a múltiples plataformas"
        ],
        stats: [
            { value: "2X", label: "más engagement cinematográfico" },
            { value: "30%", label: "más posibilidad de compras con storytelling" },
            { value: "19h", label: "consumo semanal por usuario" }
        ],
        image: "/imagenes/micrositios/audiovisuales/drones.webp"
    }
];

// Neural Canvas (Cloud themed: cyan/sky)
function NeuralCanvas() {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -999, y: -999 });
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };
        canvas.addEventListener("mousemove", onMove);

        const N = 90;
        let particles = Array.from({ length: N }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2 + 0.3,
            pulse: Math.random() * Math.PI * 2,
            hue: Math.random() > 0.5 ? 190 : (Math.random() > 0.5 ? 200 : 210) // Cyan/Sky variants
        }));

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += 0.025;

                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
                    p.x += (dx / d) * 1.2;
                    p.y += (dy / d) * 1.2;
                }

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                const r = p.size * (1 + 0.25 * Math.sin(p.pulse));
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4.5);
                grd.addColorStop(0, `hsla(${p.hue},100%,75%,0.85)`);
                grd.addColorStop(1, `hsla(${p.hue},100%,75%,0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, r * 4.5, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(14,165,233,${(1 - d / 110) * 0.25})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            animRef.current = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(animRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// Tilt card
function TiltCard({ children, className = "" }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotX = useTransform(y, [-0.5, 0.5], [12, -12]);
    const rotY = useTransform(x, [-0.5, 0.5], [-12, 12]);
    const springX = useSpring(rotX, { stiffness: 180, damping: 22 });
    const springY = useSpring(rotY, { stiffness: 180, damping: 22 });

    const onMove = useCallback((e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [x, y]);

    const onLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

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

// Animated counter
function Counter({ value, label }) {
    const [display, setDisplay] = useState("0");
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const num = parseFloat(value.replace(/[^0-9.]/g, ""));
                const prefix = value.match(/^[+\-]/) ? value[0] : "";
                const suffix = value.replace(/[0-9.\-+]/g, "");
                let start = 0;
                const duration = 2200;
                const step = (ts) => {
                    if (!start) start = ts;
                    const p = Math.min((ts - start) / duration, 1);
                    const ease = 1 - Math.pow(1 - p, 4);
                    setDisplay(`${prefix}${Math.round(ease * num)}${suffix}`);
                    if (p < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-5xl font-black text-white">{display}</div>
            <div className="text-[10px] text-sky-400 mt-2 uppercase tracking-[0.4em] font-bold">{label}</div>
        </div>
    );
}

// Glitch text
function GlitchText({ text, className = "" }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <style>{`
        @keyframes glitch1-cloud {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          25% { clip-path: inset(10% 0 80% 0); transform: translate(-3px, 2px); }
          75% { clip-path: inset(80% 0 5% 0); transform: translate(3px, -2px); }
        }
        @keyframes glitch2-cloud {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          40% { clip-path: inset(40% 0 10% 0); transform: translate(4px, -4px); }
        }
        .glitch-cloud::before {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #0ea5e9;
          animation: glitch1-cloud 4s infinite;
        }
        .glitch-cloud::after {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #6366f1;
          animation: glitch2-cloud 4s infinite 1s;
        }
      `}</style>
            <span className="glitch-cloud" data-text={text}>{text}</span>
        </span>
    );
}

// Typing text
function TypingText({ texts, className = "" }) {
    const [idx, setIdx] = useState(0);
    const [display, setDisplay] = useState("");
    const [phase, setPhase] = useState("type");

    useEffect(() => {
        const current = texts[idx];
        let timeout;
        if (phase === "type") {
            if (display.length < current.length) {
                timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 60);
            } else {
                timeout = setTimeout(() => setPhase("pause"), 3000);
            }
        } else if (phase === "pause") {
            timeout = setTimeout(() => setPhase("delete"), 500);
        } else if (phase === "delete") {
            if (display.length > 0) {
                timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 35);
            } else {
                setIdx((idx + 1) % texts.length);
                setPhase("type");
            }
        }
        return () => clearTimeout(timeout);
    }, [display, phase, idx, texts]);

    return (
        <span className={className}>
            {display}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-0.5 h-7 bg-sky-400 ml-1 align-middle"
            />
        </span>
    );
}

// Service Card
function ServiceCard({ service, index }) {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <TiltCard className="relative group cursor-pointer h-full">
            <motion.div
                onClick={() => setOpen(o => !o)}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
                className="relative rounded-[3rem] overflow-hidden border border-white/5 bg-[#020202] flex flex-col h-full shadow-2xl transition-all duration-700 hover:border-sky-500/30"
                style={{
                    boxShadow: hovered
                        ? `0 0 60px ${service.glowColor}, 0 0 120px ${service.glowColor.replace("0.4", "0.1")}`
                        : "0 0 0 transparent"
                }}
            >
                {/* Radar Effect on Hover */}
                {hovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute inset-0 border-[2px] border-sky-500/10 rounded-full"
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
                <div className="relative h-64 overflow-hidden shrink-0">
                    <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover grayscale-[40%]"
                        animate={{ scale: hovered ? 1.2 : 1, grayscale: hovered ? 0 : 0.4 }}
                        transition={{ duration: 1.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-sky-950/20 to-transparent opacity-80" />

                    <div className="absolute top-8 right-8">
                        <div
                            className="w-16 h-16 rounded-3xl flex items-center justify-center backdrop-blur-3xl text-4xl border border-white/10 shadow-2xl"
                            style={{ background: `${service.color}22` }}
                        >
                            {service.icon}
                        </div>
                    </div>

                    <div
                        className="absolute bottom-6 left-8 text-7xl font-black opacity-10 tracking-tighter italic"
                        style={{ color: service.color }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </div>
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col flex-1">
                    <h3
                        className="text-3xl font-black mb-6 tracking-tighter italic uppercase transition-all duration-500"
                        style={{ color: hovered ? service.color : "white", transform: hovered ? "translateY(-5px)" : "none" }}
                    >
                        {service.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed mb-10 italic opacity-80">
                        {service.description}
                    </p>

                    <footer className="mt-auto flex items-center gap-4 group/footer">
                        <div className="h-px bg-sky-500/40 w-12 group-hover/footer:w-20 transition-all duration-500" />
                        <span className="text-[10px] uppercase font-black tracking-[0.4em] text-sky-400 opacity-60">
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
                            <div className="p-10 space-y-10">
                                {/* Benefits */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-500 mb-8 flex items-center gap-3">
                                        <span className="w-8 h-px bg-sky-500/20" /> Beneficios Clave
                                    </h4>
                                    <ul className="grid grid-cols-1 gap-5">
                                        {service.benefits.map((b, i) => (
                                            <li key={i} className="flex items-center gap-5 text-sm text-gray-300 italic font-light group/li">
                                                <motion.div
                                                    className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                    style={{ background: service.color }}
                                                />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-3 gap-5 pt-4 border-t border-white/5">
                                    {service.stats.map((s, i) => (
                                        <div key={i} className="text-center group/metric">
                                            <div className="text-2xl font-black text-white group-hover/metric:text-sky-400 transition-colors">{s.value}</div>
                                            <div className="text-[8px] text-gray-500 uppercase font-black tracking-widest leading-none mt-2">{s.label}</div>
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

// Global Styles Container
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');
    * { font-family: 'Outfit', sans-serif; cursor: default; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #020202; }
    ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 10px; }
  `}</style>
);

// Main Orchestrator
const InfraestructuraNube = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mainRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const onMouseMove = useCallback((e) => {
        const rect = mainRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
            mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
        }
    }, [mouseX, mouseY]);

    const pX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
    const pY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

    return (
        <>
            <GlobalStyles />

            <main
                ref={mainRef}
                onMouseMove={onMouseMove}
                className="min-h-screen bg-[#020202] text-white selection:bg-sky-500/30 overflow-x-hidden pt-32"
            >

                {/* HERO */}
                <section className="relative h-[750px] mx-8 md:mx-16 rounded-[5rem] overflow-hidden mb-40 border border-white/5 shadow-2xl">
                    <motion.div
                        className="absolute inset-[-60px] bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/imagenes/micrositios/audiovisuales/banner.webp')",
                            x: pX, y: pY, opacity: 0.35
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020202] via-sky-950/40 to-black/90" />
                    <div className="absolute inset-0 opacity-50">
                        <NeuralCanvas />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12 px-8 py-3 rounded-full border border-sky-500/40 bg-sky-500/10 text-[11px] font-black tracking-[0.6em] uppercase text-sky-400 shadow-[0_0_40px_rgba(14,165,233,0.15)]"
                        >
                            Producción Audiovisual Profesional
                        </motion.div>

                        <h1 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter mb-12 italic uppercase">
                            Narrativas <br />
                            <GlitchText text="Audiovisuales" className="text-sky-500 underline decoration-white/10 underline-offset-[25px]" />
                        </h1>

                        <div className="h-12 mb-16">
                            <TypingText
                                texts={[
                                    "Historias que conectan. Marcas que impactan.",
                                    "Contenido audiovisual de alto nivel.",
                                    "Del concepto a la pantalla.",
                                    "Producción que comunica y convierte."
                                ]}
                                className="text-2xl md:text-4xl text-sky-100 font-light italic tracking-tight"
                            />
                        </div>

                        <p className="text-gray-500 max-w-3xl text-lg leading-relaxed mb-16 font-light italic opacity-70">
                            Creamos contenido audiovisual estratégico que conecta marcas con audiencias.
                            Desde spots publicitarios hasta producciones cinematográficas de alto impacto visual y narrativo.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#0ea5e9", color: "#fff" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => document.getElementById('servicios-inicio')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-20 py-8 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.3em] transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)]"
                        >
                            Ver Servicios
                        </motion.button>
                    </div>
                </section>

                {/* CLOUD METRICS */}
                <section id="servicios-inicio" className="max-w-7xl mx-auto px-12 mb-48">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-16 py-24 px-16 rounded-[6rem] bg-white/[0.01] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-600/5 blur-[120px] rounded-full" />
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/5 blur-[120px] rounded-full" />
                        {[
                            { val: "99.99", suf: "%", lab: "UPTIME" },
                            { val: "15", suf: "min", lab: "RESPUESTA" },
                            { val: "45", suf: "%", lab: "AHORRO" },
                            { val: "Zero", suf: "", lab: "BRECHAS" }
                        ].map((m, i) => (
                            <div key={i} className="relative z-10">
                                <Counter value={m.val + m.suf} label={m.lab} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* SERVICES GRID */}
                <section className="max-w-7xl mx-auto px-12 mb-48">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-28 gap-12">
                        <div>
                            <span className="text-sky-500 font-black tracking-[0.7em] text-[11px] uppercase block mb-8 px-2">Nuestros Servicios</span>
                            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none italic uppercase">
                                Nuestras <br /><span className="text-sky-900/50 underline decoration-sky-500/10">Producciones</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 max-w-sm text-right italic text-xl leading-relaxed border-r-4 border-sky-600 pr-10 opacity-80">
                            Contenido audiovisual de alta precisión para marcas que quieren impactar.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {services.map((s, i) => (
                            <div key={i} className="h-full">
                                <ServiceCard service={s} index={i} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ARCHITECTURE HIGHLIGHT */}
                <section className="max-w-7xl mx-auto px-12 mb-48">
                    <div className="relative rounded-[6rem] overflow-hidden border border-white/5 bg-gradient-to-br from-[#020202] to-[#080808] p-20 md:p-36 group shadow-2xl">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-[0.03] grayscale transition-all duration-[4s] group-hover:scale-105 group-hover:opacity-10"
                            style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/server-cabinets-data-center-maintaining-large-scale-ai-datasets.webp')" }}
                        />
                        <div className="relative z-10 grid lg:grid-cols-12 gap-24 items-center">
                            <div className="lg:col-span-7">
                                <h2 className="text-6xl md:text-9xl font-black mb-16 italic leading-[0.8] tracking-tighter uppercase">
                                    Impacto <br />Visual.
                                </h2>
                                <p className="text-2xl text-gray-500 mb-16 font-light italic leading-relaxed max-w-2xl opacity-90">
                                    La verdadera comunicación no es solo información, es <span className="text-sky-400 underline decoration-sky-500/30 underline-offset-8">emoción</span>. Creamos producciones que generan conexión real entre marcas y audiencias.
                                </p>
                                <Link
                                    to="/servicios/desarrollo-software"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="inline-flex items-center gap-6 text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] group/link border-b border-sky-500/20 pb-2"
                                >
                                    Más Servicios <span className="text-3xl transition-transform group-hover/link:translate-x-4">→</span>
                                </Link>
                            </div>
                            <div className="lg:col-span-5 grid grid-cols-1 gap-8">
                                {[
                                    { t: "Storytelling", d: "Narrativas que conectan y convierten" },
                                    { t: "Multiplataforma", d: "TV, Digital, Redes y más" },
                                    { t: "Alto Impacto", d: "Producción cinematográfica profesional" }
                                ].map((box, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 20 }}
                                        className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:bg-sky-900/10 transition-all duration-300"
                                    >
                                        <h4 className="text-white font-black text-xl mb-3 uppercase italic tracking-tighter">{box.t}</h4>
                                        <p className="text-[10px] text-sky-500 font-black uppercase tracking-[0.4em] opacity-60">{box.d}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA FINAL */}
                <section className="relative py-60 px-12 text-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-sky-600/5 blur-[180px] rounded-full animate-pulse" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <h2 className="text-8xl md:text-[14rem] font-black leading-[0.75] tracking-tighter mb-20 italic uppercase">
                            Tu Historia <br /><span className="text-sky-600 drop-shadow-[0_0_80px_rgba(14,165,233,0.4)]">Comienza.</span>
                        </h2>
                        <p className="text-3xl text-gray-500 mb-24 italic font-light max-w-4xl mx-auto leading-relaxed px-4">
                            Cuéntanos tu proyecto y desarrollamos juntos la producción audiovisual que tu marca necesita para impactar.
                        </p>

                        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-24 py-12 bg-sky-600 rounded-full font-black text-3xl uppercase tracking-[0.3em] hover:bg-sky-500 hover:scale-105 transition-all shadow-[0_0_100px_rgba(14,165,233,0.5)] active:scale-95 text-white"
                            >
                                Iniciar Proyecto
                            </button>
                            <Link
                                to="/"
                                className="px-24 py-12 bg-white/5 border border-white/10 rounded-full font-black text-3xl uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all shadow-2xl"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Volver al Inicio
                            </Link>
                        </div>
                    </motion.div>
                </section>

                <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <footer className="py-40 px-12 border-t border-white/5 text-center bg-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="w-24 h-px bg-sky-600 mx-auto mb-16 opacity-40 shadow-[0_0_20px_rgba(14,165,233,1)]" />
                        <p className="text-gray-600 text-[11px] font-black tracking-[0.8em] uppercase leading-relaxed">
                            © {new Date().getFullYear()} Olimpo Innova • Narrativas Audiovisuales
                        </p>
                    </div>
                </footer>

            </main>
        </>
    );
};

export default InfraestructuraNube;