import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import ContactModal from "../../components/ContactModal";

const services = [
    {
        title: "Aplicaciones Web Progresivas (PWA)",
        description: "Interfaces rápidas, instalables y offline-first que eliminan la fricción de descarga.",
        icon: "🌐",
        color: "#3b82f6",
        glowColor: "rgba(59,130,246,0.4)",
        benefits: [
            "Velocidad de carga instantánea",
            "Funcionalidad sin conexión",
            "Notificaciones Push",
            "Sin comisiones de App Store"
        ],
        stats: [
            { value: "50%", label: "más retención" },
            { value: "-70%", label: "uso de datos" },
            { value: "3x", label: "más engagement" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/primer_texto.jpg"
    },
    {
        title: "Desarrollo Full-Stack",
        description: "Arquitecturas de extremo a extremo diseñadas para manejar alto tráfico con latencia mínima.",
        icon: "💻",
        color: "#818cf8",
        glowColor: "rgba(129,140,248,0.4)",
        benefits: [
            "React & Next.js Pro",
            "Node.js Escalable",
            "Bases de Datos Robustas",
            "Optimización SEO"
        ],
        stats: [
            { value: "99.9%", label: "uptime" },
            { value: "+40%", label: "velocidad" },
            { value: "Zero", label: "duda técnica" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/people-working-html-codes.jpg"
    },
    {
        title: "Apps Nativas iOS y Android",
        description: "Experiencia de usuario total aprovechando al máximo el hardware nativo de cada dispositivo.",
        icon: "📱",
        color: "#f472b6",
        glowColor: "rgba(244,114,182,0.4)",
        benefits: [
            "Rendimiento nativo 100%",
            "Acceso a sensores",
            "Seguridad biométrica",
            "Publicación en Stores"
        ],
        stats: [
            { value: "88%", label: "tiempo en apps" },
            { value: "1.2s", label: "tiempo de inicio" },
            { value: "+60%", label: "conversión" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/smile-young-man-playing-happy-woman.jpg"
    },
    {
        title: "DevOps & Cloud Engineering",
        description: "Automatización de despliegues y gestión de infraestructura como código para escala infinita.",
        icon: "⚙️",
        color: "#fb923c",
        glowColor: "rgba(251,146,60,0.4)",
        benefits: [
            "CI/CD Pipelines",
            "Terraform & IaC",
            "Kubernetes Clusters",
            "Azure / AWS Expertise"
        ],
        stats: [
            { value: "-80%", label: "tiempo despliegue" },
            { value: "Zero", label: "caídas" },
            { value: "94%", label: "adopción cloud" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/young-engineer-server-room-medium-shot.jpg"
    },
    {
        title: "Arquitectura Microservicios",
        description: "Sistemas modulares desacoplados donde cada componente escala de forma independiente.",
        icon: "🧱",
        color: "#22d3ee",
        glowColor: "rgba(34,211,238,0.4)",
        benefits: [
            "Evolución por módulos",
            "Resiliencia extrema",
            "Deployment aislado",
            "Fácil mantenimiento"
        ],
        stats: [
            { value: "85%", label: "uso empresarial" },
            { value: "+50%", label: "escalabilidad" },
            { value: "24/7", label: "operativo" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/computer-scientists-data-center-managing-maintaining-databases.jpg"
    },
    {
        title: "Mantenimiento Proactivo",
        description: "Monitoreo técnico y actualizaciones constantes para garantizar el rendimiento perpetuo.",
        icon: "🛡️",
        color: "#a78bfa",
        glowColor: "rgba(167,139,250,0.4)",
        benefits: [
            "Parches de seguridad",
            "Auditoría de performance",
            "Soporte 24/7",
            "Optimización de costos"
        ],
        stats: [
            { value: "60%", label: "menos ataques" },
            { value: "-40%", label: "incidentes" },
            { value: "100%", label: "tranquilidad" }
        ],
        image: "/imagenes/micrositios/Desarrollo-software/professional-hacker-using-ransomware-phishing-tactics-compromise-networks.jpg"
    }
];

// Neural Canvas
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

        const N = 80;
        let particles = Array.from({ length: N }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            pulse: Math.random() * Math.PI * 2,
            hue: Math.random() > 0.5 ? 210 : (Math.random() > 0.5 ? 240 : 200) // Blue variants for software
        }));

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += 0.02;

                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 100) {
                    p.x += (dx / d) * 1;
                    p.y += (dy / d) * 1;
                }

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                const r = p.size * (1 + 0.2 * Math.sin(p.pulse));
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
                grd.addColorStop(0, `hsla(${p.hue},100%,70%,0.8)`);
                grd.addColorStop(1, `hsla(${p.hue},100%,70%,0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(59,130,246,${(1 - d / 100) * 0.2})`;
                        ctx.lineWidth = 0.5;
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
    const rotX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotY = useTransform(x, [-0.5, 0.5], [-10, 10]);
    const springX = useSpring(rotX, { stiffness: 150, damping: 20 });
    const springY = useSpring(rotY, { stiffness: 150, damping: 20 });

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
            style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
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
                const duration = 2000;
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
            <div className="text-4xl font-black">{display}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{label}</div>
        </div>
    );
}

// Glitch text
function GlitchText({ text, className = "" }) {
    return (
        <span className={`relative inline-block ${className}`}>
            <style>{`
        @keyframes glitch1 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 2px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
        }
        @keyframes glitch2 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          50% { clip-path: inset(10% 0 70% 0); transform: translate(-4px, 4px); }
        }
        .glitch::before {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #3b82f6;
          animation: glitch1 3s infinite;
        }
        .glitch::after {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #818cf8;
          animation: glitch2 3s infinite 0.5s;
        }
      `}</style>
            <span className="glitch" data-text={text}>{text}</span>
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
                timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 50);
            } else {
                timeout = setTimeout(() => setPhase("pause"), 2500);
            }
        } else if (phase === "pause") {
            timeout = setTimeout(() => setPhase("delete"), 500);
        } else if (phase === "delete") {
            if (display.length > 0) {
                timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 30);
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
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-6 bg-blue-500 ml-1 align-middle"
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                className="relative rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a] flex flex-col h-full shadow-2xl transition-all duration-500"
                style={{
                    boxShadow: hovered
                        ? `0 0 50px ${service.glowColor}, 0 0 100px ${service.glowColor.replace("0.4", "0.1")}`
                        : "0 0 0 transparent"
                }}
            >
                {/* Top Glow */}
                <div
                    className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-500"
                    style={{ background: service.color, opacity: hovered ? 1 : 0.2 }}
                />

                {/* Image */}
                <div className="relative h-60 overflow-hidden shrink-0">
                    <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: hovered ? 1.15 : 1 }}
                        transition={{ duration: 1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

                    <div className="absolute top-6 right-6">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl text-3xl border border-white/10"
                            style={{ background: `${service.color}22` }}
                        >
                            {service.icon}
                        </div>
                    </div>

                    <div
                        className="absolute bottom-4 left-6 text-6xl font-black opacity-10 italic"
                        style={{ color: service.color }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                    <h3
                        className="text-2xl font-black mb-4 tracking-tighter italic uppercase transition-colors duration-300"
                        style={{ color: hovered ? service.color : "white" }}
                    >
                        {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">
                        {service.description}
                    </p>

                    <footer className="mt-auto flex items-center gap-3">
                        <div className="w-8 h-px bg-white/10" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                            {open ? "Cerrar Detalles" : "Ver Especificaciones"}
                        </span>
                    </footer>
                </div>

                {/* Details */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-white/5 bg-white/[0.02]"
                        >
                            <div className="p-8 space-y-8">
                                {/* Benefits */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 underline decoration-white/10 underline-offset-4">Capacidades Clave</h4>
                                    <ul className="grid grid-cols-1 gap-4">
                                        {service.benefits.map((b, i) => (
                                            <li key={i} className="flex items-center gap-4 text-sm text-gray-300 italic group/li">
                                                <div className="w-1.5 h-1.5 rounded-full transition-transform group-hover/li:scale-150" style={{ background: service.color }} />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    {service.stats.map((s, i) => (
                                        <div key={i} className="p-4 rounded-2xl border border-white/5 bg-black/50 text-center">
                                            <div className="text-xl font-black text-white">{s.value}</div>
                                            <div className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">{s.label}</div>
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

// Main Component
const DesarrolloSoftware = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const heroRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const onMouseMove = useCallback((e) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
            mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
        }
    }, [mouseX, mouseY]);

    const pX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const pY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; cursor: default; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      `}</style>

            <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/3s0 overflow-x-hidden pt-28">

                {/* HERO */}
                <section
                    ref={heroRef}
                    onMouseMove={onMouseMove}
                    className="relative h-[700px] mx-6 md:mx-12 rounded-[4rem] overflow-hidden mb-32 border border-white/5"
                >
                    <motion.div
                        className="absolute inset-[-40px] bg-cover bg-center transition-opacity duration-1000"
                        style={{
                            backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/portrait-male-engineer-working-field-engineers-day-celebration.jpg')",
                            x: pX, y: pY, opacity: 0.4
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/40 to-black/80" />
                    <div className="absolute inset-0 opacity-40">
                        <NeuralCanvas />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-10 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-black tracking-[0.5em] uppercase text-blue-400"
                        >
                            High-Performance Software Factory
                        </motion.div>

                        <h1 className="text-6xl md:text-[8rem] font-black leading-[0.8] tracking-tighter mb-8 italic">
                            Desarrollo <br />
                            <GlitchText text="Software" className="text-blue-500 underline decoration-white/10 underline-offset-[20px]" />
                        </h1>

                        <div className="h-10 mb-12">
                            <TypingText
                                texts={[
                                    "Escalamos tu visión al siguiente nivel.",
                                    "Arquitecturas modernas, resultados reales.",
                                    "Innovación pura en cada línea de código.",
                                    "Sistemas que evolucionan con tu negocio."
                                ]}
                                className="text-xl md:text-3xl text-gray-300 font-light italic"
                            />
                        </div>

                        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed mb-12 opacity-80">
                            Desde aplicaciones web progresivas hasta infraestructuras en la nube ultra-resilientes.
                            Diseñamos el futuro técnico de tu empresa hoy mismo.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.scrollTo({ top: 1200, behavior: "smooth" })}
                            className="px-16 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                        >
                            Explorar Tecnologías
                        </motion.button>
                    </div>
                </section>

                {/* METRICS */}
                <section className="max-w-7xl mx-auto px-10 mb-40">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 px-12 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-60 h-60 bg-blue-600/5 blur-[100px] rounded-full" />
                        {[
                            { val: "100", suf: "%", lab: "CÓDIGO PROPIO" },
                            { val: "24", suf: "/7", lab: "MONITOREO ACTIVO" },
                            { val: "3", suf: "X", lab: "MÁS VELOCIDAD" },
                            { val: "50", suf: "+", lab: "SISTEMAS DESPLEGADOS" }
                        ].map((m, i) => (
                            <div key={i} className="relative z-10">
                                <Counter value={m.val + m.suf} label={m.lab} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* MAIN SERVICES GRID */}
                <section className="max-w-7xl mx-auto px-10 mb-40">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-10">
                        <div>
                            <span className="text-blue-500 font-bold tracking-[0.5em] text-[10px] uppercase block mb-6 px-1">Expertise Técnico</span>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
                                Nuestros <br /><span className="text-gray-600">Servicios</span>
                            </h2>
                        </div>
                        <p className="text-gray-500 max-w-sm text-right italic text-lg leading-relaxed border-r-4 border-blue-600 pr-8">
                            Soluciones modulares diseñadas para la era del alto rendimiento digital.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {services.map((s, i) => (
                            <div key={i} className="h-full">
                                <ServiceCard service={s} index={i} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* FEATURE HIGHLIGHT */}
                <section className="max-w-7xl mx-auto px-10 mb-40">
                    <div className="relative rounded-[5rem] overflow-hidden border border-white/5 bg-gradient-to-br from-[#0a0a0a] to-black p-16 md:p-32 group">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-10 grayscale group-hover:opacity-30 transition-all duration-1000"
                            style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/people-working-html-codes.jpg')" }}
                        />
                        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-5xl md:text-8xl font-black mb-12 italic leading-[0.8] tracking-tighter">
                                    Arquitectura <br />Evolutiva.
                                </h2>
                                <p className="text-xl text-gray-400 mb-14 font-light italic leading-relaxed">
                                    No creamos software estático. Construimos ecosistemas que <span className="text-white underline decoration-blue-500/40">aprenden, escalan y se adaptan</span> al crecimiento real de tu negocio.
                                </p>
                                <Link
                                    to="/servicios/infraestructura-nube"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="inline-flex items-center gap-4 text-blue-400 font-black uppercase tracking-widest text-xs group/link"
                                >
                                    Explorar Nube <span className="text-2xl transition-transform group-hover/link:translate-x-3">→</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { t: "Resiliencia", d: "Zero downtime" },
                                    { t: "Escala", d: "Horizontal scaling" },
                                    { t: "Seguridad", d: "Encryption AES" },
                                    { t: "Velo", d: "Cache L1/L2" }
                                ].map((box, i) => (
                                    <div key={i} className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 hover:bg-blue-600/10 transition-colors">
                                        <h4 className="text-white font-black text-sm mb-2 uppercase italic">{box.t}</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{box.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative py-48 px-10 text-center overflow-hidden">
                    <div className="absolute inset-0 z-0 opactiy-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <h2 className="text-7xl md:text-[12rem] font-black leading-[0.8] tracking-tighter mb-16 italic">
                            ¿Siguiente <br /><span className="text-blue-600">Despliegue?</span>
                        </h2>
                        <p className="text-2xl text-gray-400 mb-20 italic font-light max-w-3xl mx-auto leading-relaxed">
                            Transformamos la complejidad técnica en una ventaja competitiva brutal para tu empresa.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 justify-center">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-20 py-10 bg-blue-600 rounded-[3rem] font-black text-2xl uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-[0_0_80px_rgba(59,130,246,0.3)] active:scale-95"
                            >
                                Contactar Ahora
                            </button>
                            <Link
                                to="/"
                                className="px-20 py-10 bg-white/5 border border-white/10 rounded-[3rem] font-black text-2xl uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all shadow-2xl"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Inicio
                            </Link>
                        </div>
                    </motion.div>
                </section>

                <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <footer className="py-32 px-10 border-t border-white/5 text-center bg-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="w-20 h-px bg-blue-600 mx-auto mb-12 opacity-30" />
                        <p className="text-gray-600 text-[10px] font-black tracking-[0.7em] uppercase">
                            © {new Date().getFullYear()} Olimpo Innova • Engineering Beyond Limits
                        </p>
                    </div>
                </footer>

            </main>
        </>
    );
};

export default DesarrolloSoftware;
