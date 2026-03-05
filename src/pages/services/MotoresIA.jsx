import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import ContactModal from "../../components/ContactModal";

const services = [
  {
    title: "Asistentes Virtuales Cognitivos",
    description: "Automatización inteligente con interacción humana avanzada.",
    icon: "🤖",
    color: "#34d399",
    glowColor: "rgba(52,211,153,0.4)",
    benefits: [
      "Comprensión contextual",
      "Integración con CRM / ERP",
      "Respuesta multicanal (web, WhatsApp, app)",
      "Automatización 24/7"
    ],
    stats: [
      { value: "80%", label: "empresas implementarán IA" },
      { value: "70%", label: "interacciones automatizables" },
      { value: "-40%", label: "costos operativos" }
    ],
    image: "/imagenes/micrositios/Motores-ia/imagen-ia2.jpg"
  },
  {
    title: "Procesamiento de Lenguaje NPL",
    description: "Interpretación de texto, voz e intención con NLP avanzado.",
    icon: "🧠",
    color: "#818cf8",
    glowColor: "rgba(129,140,248,0.4)",
    benefits: [
      "Análisis de sentimientos",
      "Clasificación automática",
      "Extracción de entidades",
      "Automatización documental"
    ],
    stats: [
      { value: "80%", label: "datos no estructurados" },
      { value: "+30%", label: "precisión" },
      { value: "70%", label: "ahorro tiempo" }
    ],
    image: "/imagenes/micrositios/Motores-ia/npl.jpg"
  },
  {
    title: "Análisis Predictivo",
    description: "Machine learning para anticipar escenarios estratégicos.",
    icon: "📊",
    color: "#f472b6",
    glowColor: "rgba(244,114,182,0.4)",
    benefits: [
      "Proyección demanda",
      "Detección riesgos",
      "Optimización inventarios",
      "Segmentación"
    ],
    stats: [
      { value: "23x", label: "adquisición clientes" },
      { value: "+15%", label: "ingresos" },
      { value: "-30%", label: "riesgos" }
    ],
    image: "/imagenes/micrositios/Motores-ia/predictivo.png"
  },
  {
    title: "IA Generativa Empresarial",
    description: "Automatización creativa y productiva impulsada por modelos avanzados. Implementamos soluciones de IA generativa para creación de contenido, automatización documental, generación de código, asistentes internos y optimización operativa. Aplicable a marketing, educación, legal, inmobiliario y atención empresarial.",
    icon: "✨",
    color: "#fb923c",
    glowColor: "rgba(251,146,60,0.4)",
    benefits: [
      "Generación automática de contenido",
      "Automatización de documentos y reportes",
      "Copilotos empresariales internos",
      "Optimización de procesos creativos y técnicos"
    ],
    stats: [
      { value: "75%", label: "empresas ya experimentan con IA generativa" },
      { value: "+40%", label: "aumento de productividad" },
      { value: "-30%", label: "reducción tiempos operativos" }
    ],
    image: "/imagenes/micrositios/Motores-ia/Generativa.png"
  },
  {
    title: "Arquitectura De Microservicios",
    description: "Inteligencia que interpreta el mundo visual. Desarrollamos soluciones de visión artificial capaces de analizar imágenes y video en tiempo real para detección, reconocimiento y automatización de decisiones. Ideal para seguridad, industria, retail y logística.",
    icon: "👁️",
    color: "#22d3ee",
    glowColor: "rgba(34,211,238,0.4)",
    benefits: [
      "Reconocimiento facial y biométrico",
      "Detección de objetos y anomalías",
      "Automatización de inspección visual",
      "Monitoreo inteligente en tiempo real"
    ],
    stats: [
      { value: "-90%", label: "reducción de errores humanos" },
      { value: "+35%", label: "mejora en detección temprana" },
      { value: "+20%", label: "crecimiento anual del sector" }
    ],
    image: "/imagenes/micrositios/Motores-ia/vision.png"
  },
  {
    title: "Modelos de IA Personalizados",
    description: "Inteligencia entrenada con datos propios y control empresarial. Desarrollamos e implementamos modelos de lenguaje y sistemas de IA entrenados con información privada de la organización, garantizando seguridad, precisión y ventaja competitiva.",
    icon: "🔐",
    color: "#a78bfa",
    glowColor: "rgba(167,139,250,0.4)",
    benefits: [
      "Entrenamiento con datos corporativos",
      "Mayor precisión contextual",
      "Control y confidencialidad",
      "Implementación on-premise o cloud privada"
    ],
    stats: [
      { value: "68%", label: "empresas priorizan IA privada por seguridad" },
      { value: "+40%", label: "mayor precisión contextual" },
      { value: "+60%", label: "corporaciones adoptan IA propietaria" }
    ],
    image: "/imagenes/micrositios/Motores-ia/Personalizada.png"
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

    const N = 90;
    let particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.5 ? 160 : (Math.random() > 0.5 ? 260 : 320)
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          p.x += (dx / d) * 1.5;
          p.y += (dy / d) * 1.5;
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const r = p.size * (1 + 0.3 * Math.sin(p.pulse));
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        grd.addColorStop(0, `hsla(${p.hue},100%,70%,0.9)`);
        grd.addColorStop(1, `hsla(${p.hue},100%,70%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(52,211,153,${(1 - d / 120) * 0.3})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        const dx = particles[i].x - mouse.current.x;
        const dy = particles[i].y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(129,140,248,${(1 - d / 160) * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
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
  const rotX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotY, { stiffness: 200, damping: 20 });

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
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
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
        const duration = 1800;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
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
      <div className="text-3xl font-black" style={{ fontFamily: "'Orbitron', monospace" }}>{display}</div>
      <div className="text-xs text-gray-400 mt-1 leading-tight">{label}</div>
    </div>
  );
}

// Glitch text
function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`} style={{ position: "relative" }}>
      <style>{`
        @keyframes glitch1 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 2px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(3px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 1px); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -1px); }
        }
        @keyframes glitch2 {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          25% { clip-path: inset(50% 0 30% 0); transform: translate(4px, -3px); }
          50% { clip-path: inset(10% 0 70% 0); transform: translate(-4px, 3px); }
          75% { clip-path: inset(70% 0 15% 0); transform: translate(2px, -2px); }
        }
        .glitch-1::before {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #34d399;
          animation: glitch1 4s infinite;
        }
        .glitch-1::after {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #818cf8;
          animation: glitch2 4s infinite 0.5s;
        }
      `}</style>
      <span className="glitch-1" data-text={text}>{text}</span>
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
        layout
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#080d14] flex flex-col h-full"
        style={{
          boxShadow: hovered
            ? `0 0 40px ${service.glowColor}, 0 0 80px ${service.glowColor.replace("0.4", "0.15")}`
            : "0 0 0 transparent",
          transition: "box-shadow 0.4s ease"
        }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: `linear-gradient(135deg, ${service.color}22, transparent, ${service.color}11)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s"
          }}
        />

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)"
          }}
        />

        {/* Image */}
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <motion.img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.12 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, #080d14 0%, transparent 60%), linear-gradient(135deg, ${service.color}33 0%, transparent 60%)`
            }}
          />
          {/* Icon badge */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{ rotate: hovered ? [0, -10, 10, -5, 5, 0] : 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md text-2xl"
              style={{ background: `${service.color}22`, border: `1px solid ${service.color}44` }}
            >
              {service.icon}
            </div>
          </motion.div>

          {/* Index */}
          <div
            className="absolute bottom-3 left-4 text-5xl font-black opacity-10"
            style={{ fontFamily: "'Orbitron', monospace", color: service.color }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <motion.h3
            className="font-bold mb-2 leading-tight"
            style={{
              color: hovered ? service.color : "white",
              transition: "color 0.3s",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.95rem"
            }}
          >
            {service.title}
          </motion.h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {service.description}
          </p>

          {/* Click hint */}
          <motion.div
            className="flex items-center gap-2 text-xs mt-auto"
            style={{ color: service.color }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >▼</motion.span>
            {open ? "Cerrar detalle" : "Ver detalle"}
          </motion.div>
        </div>

        {/* Expanded */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="expand"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-5">
                <motion.div
                  className="h-px"
                  style={{ background: `linear-gradient(to right, ${service.color}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Benefits */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: service.color, fontFamily: "'Orbitron', monospace" }}>
                    Beneficios Clave
                  </div>
                  <ul className="space-y-2">
                    {service.benefits.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 text-sm text-gray-300"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: service.color }}
                        />
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: service.color, fontFamily: "'Orbitron', monospace" }}>
                    Datos Globales
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {service.stats.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="rounded-xl p-3 text-center"
                        style={{
                          background: `${service.color}11`,
                          border: `1px solid ${service.color}33`
                        }}
                      >
                        <div className="text-sm font-black" style={{ color: service.color, fontFamily: "'Orbitron', monospace" }}>{s.value}</div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </TiltCard>
  );
}

// Floating orb
function Orb({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      animate={{ y: [0, -30, 0], scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
      style={style}
    />
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
        timeout = setTimeout(() => setPhase("pause"), 2000);
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
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-emerald-400 ml-1 align-middle"
      />
    </span>
  );
}

// Main Component
const MotoresIA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleHeroMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  }, [mouseX, mouseY]);

  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
        .hero-title { font-family: 'Orbitron', monospace; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05070b; }
        ::-webkit-scrollbar-thumb { background: #34d399; border-radius: 2px; }
      `}</style>

      <main className="min-h-screen pt-28 pb-24 bg-[#05070b] text-white overflow-hidden relative">

        {/* Background orbs */}
        <Orb style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)", top: "5%", left: "10%" }} />
        <Orb style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)", top: "30%", right: "5%" }} />
        <Orb style={{ width: 350, height: 350, background: "radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)", bottom: "20%", left: "30%" }} />

        {/* HERO */}
        <section
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          className="relative h-[600px] mx-4 md:mx-8 rounded-3xl overflow-hidden mb-28"
          style={{ border: "1px solid rgba(52,211,153,0.15)" }}
        >
          <motion.div
            className="absolute inset-[-40px] bg-cover bg-center"
            style={{
              backgroundImage: "url('/imagenes/micrositios/Motores-ia/banner.jpg')",
              x: parallaxX,
              y: parallaxY
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-emerald-950/70 to-indigo-950/85" />
          <div className="absolute inset-0 opacity-50">
            <NeuralCanvas />
          </div>

          {[{ top: 16, left: 16 }, { top: 16, right: 16 }, { bottom: 16, left: 16 }, { bottom: 16, right: 16 }].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              style={{
                ...pos,
                borderTop: i < 2 ? "2px solid rgba(52,211,153,0.7)" : "none",
                borderBottom: i >= 2 ? "2px solid rgba(52,211,153,0.7)" : "none",
                borderLeft: i % 2 === 0 ? "2px solid rgba(52,211,153,0.7)" : "none",
                borderRight: i % 2 === 1 ? "2px solid rgba(52,211,153,0.7)" : "none",
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399" }}
            >
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle"
              />
              Plataforma de IA Empresarial
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-title text-5xl md:text-7xl font-black mb-4 leading-none"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #34d399 50%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Motores de IA
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-xl text-gray-300 mb-2 h-8"
            >
              <TypingText texts={["Aprende. Analiza. Decide.", "Automatiza tu empresa.", "Inteligencia sin límites.", "El futuro es ahora."]} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-gray-400 max-w-xl mt-2 text-sm leading-relaxed"
            >
              Modelos inteligentes capaces de aprender, analizar y automatizar decisiones empresariales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 flex flex-col items-center gap-2"
            >
              <span className="text-xs text-gray-500 tracking-widest uppercase">Explorar</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-emerald-400 to-transparent"
              />
            </motion.div>
          </div>
        </section>

        {/* STATS BAND */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto px-6 mb-24"
        >
          <div
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { value: "99", suffix: "%", label: "Uptime garantizado" },
              { value: "6", suffix: " motores", label: "Soluciones especializadas" },
              { value: "24", suffix: "/7", label: "Disponibilidad total" },
              { value: "40", suffix: "%", label: "Reducción de costos" }
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div style={{ color: ["#34d399", "#818cf8", "#f472b6", "#fbbf24"][i] }}>
                  <Counter value={s.value + s.suffix} label={s.label} />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION HEADING */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-px bg-emerald-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-400" style={{ fontFamily: "'Orbitron', monospace" }}>
              Nuestros Motores
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mt-4"
            style={{ fontFamily: "'Orbitron', monospace", lineHeight: 1.1 }}
          >
            Tecnología que{" "}
            <span style={{ color: "#34d399" }}>transforma</span>
          </motion.h2>
        </div>

        {/* CARDS GRID — 6 cards */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </section>

        {/* FEATURE HIGHLIGHT */}
        <section className="max-w-7xl mx-auto px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(129,140,248,0.05) 50%, rgba(244,114,182,0.05) 100%)",
              border: "1px solid rgba(52,211,153,0.2)"
            }}
          >
            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-4" style={{ fontFamily: "'Orbitron', monospace" }}>
                  ¿Por qué elegirnos?
                </div>
                <h3 className="text-3xl font-black mb-6" style={{ fontFamily: "'Orbitron', monospace" }}>
                  IA adaptada a tu<br />
                  <span style={{ color: "#34d399" }}>negocio</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: "⚡", text: "Implementación rápida en semanas, no meses" },
                    { icon: "🔒", text: "Seguridad y privacidad de datos garantizada" },
                    { icon: "🔗", text: "Integración nativa con tus sistemas actuales" },
                    { icon: "📈", text: "ROI medible desde el primer trimestre" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)" }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square relative">
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute inset-0 rounded-full border"
                      style={{ borderColor: `rgba(52,211,153,${0.3 / ring})`, margin: `${(ring - 1) * 15}%` }}
                      animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                      transition={{ duration: 10 + ring * 5, repeat: Infinity, ease: "linear" }}
                    />
                  ))}
                  <div
                    className="absolute inset-[20%] rounded-full flex items-center justify-center"
                    style={{ background: "radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)" }}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-2">🤖</div>
                      <div className="text-xs text-emerald-400 font-bold tracking-widest" style={{ fontFamily: "'Orbitron', monospace" }}>
                        AI ENGINE
                      </div>
                    </div>
                  </div>
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: ["#34d399", "#818cf8", "#f472b6", "#fbbf24", "#fb923c", "#22d3ee"][i],
                        top: "50%", left: "50%"
                      }}
                      animate={{
                        x: Math.cos(deg * Math.PI / 180) * 80 - 4,
                        y: Math.sin(deg * Math.PI / 180) * 80 - 4,
                        rotate: [0, 360]
                      }}
                      transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.1 },
                        x: { duration: 6, repeat: Infinity, ease: "linear" },
                        y: { duration: 6, repeat: Infinity, ease: "linear" }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto mt-28 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(ellipse at center, rgba(52,211,153,0.12) 0%, transparent 70%)", filter: "blur(40px)" }}
            />
            <div className="relative">
              <motion.div
                className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-4"
                style={{ fontFamily: "'Orbitron', monospace" }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ▸ Siguiente paso
              </motion.div>
              <h3
                className="text-4xl md:text-5xl font-black mb-6"
                style={{ fontFamily: "'Orbitron', monospace", lineHeight: 1.1 }}
              >
                Implementa{" "}
                <GlitchText text="Inteligencia" className="text-emerald-400" />
                <br />
                Artificial hoy
              </h3>
              <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
                Creamos motores de IA adaptados a tus datos y procesos empresariales. Sin compromisos, sin código complejo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="relative px-10 py-4 rounded-xl font-bold overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, #34d399, #059669)", boxShadow: "0 0 30px rgba(52,211,153,0.4)" }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #10b981, #34d399)" }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Solicitar Implementación
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                  </span>
                </motion.button>

                <Link to="/">
                  <motion.div
                    whileHover={{ scale: 1.05, borderColor: "rgba(52,211,153,0.5)" }}
                    className="px-10 py-4 rounded-xl font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    ← Volver al inicio
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MotoresIA;