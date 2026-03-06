import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, memo } from "react";
import CountUp from "react-countup";
import ContactModal from "../../components/ContactModal";

const DesarrolloSoftware = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeServiceInfo, setActiveServiceInfo] = useState(null);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.05
            }
        }
    };

    const BackgroundBlobs = memo(() => (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
            <div
                className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
                    willChange: 'transform'
                }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(8, 145, 178, 0.15) 0%, transparent 70%)',
                    willChange: 'transform'
                }}
            />
        </div>
    ));



    const ServiceDetailModal = ({ info, onClose }) => {
        if (!info) return null;
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-[#0f0f0f] border border-white/10 p-8 rounded-[2.5rem] max-w-2xl w-full relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6">
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
                    </div>
                    <div className="relative z-10">
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">{info.category}</span>
                        <h3 className="text-4xl font-bold mb-6 text-white">{info.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">{info.description}</p>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
            <BackgroundBlobs />

            {/* 1️⃣ HERO / BANNER PRINCIPAL */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 transform-gpu will-change-transform">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-60 transform-gpu"
                        style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/portrait-male-engineer-working-field-engineers-day-celebration.jpg')" }}
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-black/40 to-[#050505]" />

                    {/* Futuristic Grid Pattern - Static and simplified */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
                </motion.div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-5xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-500 tracking-tight"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Desarrollo de Software
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto font-light leading-relaxed"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Soluciones tecnológicas modernas diseñadas para escalar, optimizar procesos y potenciar el crecimiento digital de las empresas.
                        </motion.p>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <button
                                onClick={() => {
                                    document.getElementById('pwa-section').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group relative px-8 py-4 bg-blue-600 rounded-full font-bold overflow-hidden transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-lg">
                                    Explorar servicios
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-blue-400 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* 2️⃣ SECCIÓN: Aplicaciones Web Progresivas (PWA) */}
            <section id="pwa-section" className="relative py-24 px-4 bg-[#0a0a0a]/60 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-blue-500/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-video md:aspect-square">
                                <img
                                    src="/imagenes/micrositios/Desarrollo-software/primer_texto.jpg"
                                    alt="PWA Development"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-2xl shadow-2xl border border-white/20 hidden md:block"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                            >
                                <p className="text-sm font-bold uppercase tracking-widest text-blue-100 italic">Offline Ready</p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.span variants={fadeIn} className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 block underline decoration-2 underline-offset-8">Vanguardia Digital</motion.span>
                            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Aplicaciones Web <br />Progresivas (PWA)
                            </motion.h2>
                            <motion.p variants={fadeIn} className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Desarrollamos Aplicaciones Web Progresivas (PWA) que combinan lo mejor de la web y las aplicaciones móviles. Funcionan offline, cargan en milisegundos y pueden instalarse directamente desde el navegador, eliminando fricción en la adquisición de usuarios.
                            </motion.p>

                            {/* Ideales para */}
                            <motion.div variants={fadeIn} className="mb-10">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-blue-500" />
                                    Ideales para
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: "Plataformas financieras" },
                                        { name: "Turismo y reservas" },
                                        { name: "E-commerce" },
                                        { name: "Sistemas educativos" },
                                        { name: "Portales corporativos" }
                                    ].map((item, i) => (
                                        <div key={i} className="group/item relative overflow-hidden rounded-2xl border border-white/10 p-4 bg-white/5 hover:bg-white/[0.08] transition-all duration-300">
                                            <div className="relative z-10 flex items-center gap-3">
                                                <span className="text-xs text-blue-100 font-medium">{item.name}</span>
                                            </div>
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-2xl rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.button
                                variants={fadeIn}
                                onClick={() => setActiveServiceInfo({
                                    category: "PWA",
                                    title: "Aplicaciones Web Progresivas",
                                    description: "Desarrollamos Aplicaciones Web Progresivas (PWA) que combinan lo mejor de la web y las aplicaciones móviles. Funcionan offline, cargan en milisegundos y pueden instalarse directamente desde el navegador, eliminando fricción en la adquisición de usuarios."
                                })}
                                className="mb-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                            >
                                Ver descripción ampliada <span className="text-lg">→</span>
                            </motion.button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Instalables", desc: "Sin App Store ni Play Store" },
                                    { title: "Push Notifications", desc: "Fidelización directa" },
                                    { title: "Funcionamiento Offline", desc: "Acceso sin conexión" },
                                    { title: "Alto rendimiento", desc: "Y SEO optimizado" },
                                    { title: "Reducción de costos", desc: "Frente a apps nativas" }
                                ].map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group/card cursor-default transform-gpu"
                                    >
                                        <h4 className="font-bold text-white text-sm mb-1">{benefit.title}</h4>
                                        <p className="text-xs text-gray-400">{benefit.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3️⃣ SECCIÓN DE ESTADÍSTICAS (PWA) */}
            <section className="py-20 bg-[#050505]/40 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { value: 3, suffix: "X", label: "más rápidas que sitios web tradicionales" },
                            { value: 50, suffix: "%", label: "mayor retención frente a webs estándar" },
                            { value: 70, suffix: "%", label: "de las empresas necesitan software con IA" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
                                <div className="relative">
                                    <h3 className="text-6xl font-black text-white mb-2">
                                        <CountUp end={stat.value} duration={3} enableScrollSpy scrollSpyOnce />
                                        <span className="text-blue-500">{stat.suffix}</span>
                                    </h3>
                                    <p className="text-gray-400 font-medium">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4️⃣ SECCIÓN: Desarrollo Full-Stack Escalable */}
            <section className="relative py-24 px-4 bg-[#0a0a0a]/60 overflow-hidden" style={{ contentVisibility: 'auto' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic underline underline-offset-8 decoration-blue-500/30">Desarrollo Full-Stack <br />Escalable</h2>
                            <motion.p variants={fadeIn} className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Construimos plataformas robustas de extremo a extremo: interfaz intuitiva, lógica de negocio sólida y arquitectura preparada para alto tráfico.
                            </motion.p>

                            <motion.button
                                variants={fadeIn}
                                onClick={() => setActiveServiceInfo({
                                    category: "Full-Stack",
                                    title: "Desarrollo Web & Full-Stack",
                                    description: "Construimos plataformas robustas de extremo a extremo: interfaz intuitiva, lógica de negocio sólida y arquitectura preparada para alto tráfico."
                                })}
                                className="mb-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                            >
                                Ver descripción ampliada <span className="text-lg">→</span>
                            </motion.button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                {[
                                    { title: "Interfaces Modernas", desc: "Y responsivas" },
                                    { title: "Backend Seguro", desc: "Y escalable en la nube" },
                                    { title: "APIs RESTful", desc: "Para integración con terceros" },
                                    { title: "Arquitectura Preparada", desc: "Para crecimiento exponencial" }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-8">
                                {[
                                    { val: 99.9, suf: "%", lab: "disponibilidad cloud" },
                                    { val: 60, suf: "%", lab: "reducción tiempos integración" },
                                    { val: 5, suf: "X", lab: "crecimiento tráfico soportado" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-3xl font-black text-blue-500">
                                            <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={2} enableScrollSpy scrollSpyOnce />
                                            {stat.suf}
                                        </div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold leading-tight w-24">{stat.lab}</p>
                                    </div>
                                ))}
                            </div>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group mt-10 lg:mt-0"
                        >
                            <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-3xl" />
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] group-hover:border-blue-500/30 transition-all duration-500">
                                <img
                                    src="/imagenes/micrositios/Desarrollo-software/people-working-html-codes.jpg"
                                    alt="Full-Stack Dev"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5️⃣ SECCIÓN: Aplicaciones Nativas iOS y Android */}
            <section className="relative py-24 px-4 bg-[#050505]/40 overflow-hidden" style={{ contentVisibility: 'auto' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1 relative group"
                        >
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] group-hover:border-blue-500/30 transition-all duration-700 aspect-video md:aspect-[4/3]">
                                <img
                                    src="/imagenes/micrositios/Desarrollo-software/smile-young-man-playing-happy-woman.jpg"
                                    alt="Mobile Development"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent" />
                            </div>

                            {/* Floating Stats Label */}
                            <div className="absolute top-10 left-[-20px] bg-blue-600 px-6 py-4 rounded-xl rotate-[-5deg] shadow-xl border border-white/20 hidden md:block">
                                <p className="text-xs font-bold uppercase tracking-widest text-white italic">Rendimiento Superior</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="order-1 lg:order-2"
                        >
                            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 block underline decoration- blue-500/30 underline-offset-8">Experiencia móvil total</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Apps Nativas <br />iOS y Android</h2>
                            <motion.p variants={fadeIn} className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Experiencia móvil total. Rendimiento superior. Desarrollamos aplicaciones nativas optimizadas para los entornos iOS y Android, garantizando máxima velocidad, estabilidad y una experiencia alineada a los estándares de cada ecosistema.
                            </motion.p>

                            <motion.button
                                variants={fadeIn}
                                onClick={() => setActiveServiceInfo({
                                    category: "Mobile",
                                    title: "Apps Nativas iOS y Android",
                                    description: "Experiencia móvil total. Rendimiento superior. Desarrollamos aplicaciones nativas optimizadas para los entornos iOS y Android, garantizando máxima velocidad, estabilidad y una experiencia alineada a los estándares de cada ecosistema."
                                })}
                                className="mb-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                            >
                                Ver descripción ampliada <span className="text-lg">→</span>
                            </motion.button>

                            <div className="space-y-4 mb-10">
                                {[
                                    "Rendimiento optimizado por plataforma",
                                    "Integración total con hardware (cámara, GPS, biometría)",
                                    "Mayor seguridad y estabilidad",
                                    "Publicación en App Store y Play Store"
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        {benefit}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                                {[
                                    { val: 6.8, suf: "B", lab: "usuarios de smartphones en el mundo" },
                                    { val: 88, suf: "%", lab: "del tiempo móvil se pasa en apps" },
                                    { val: 70, suf: "%", lab: "del comercio digital móvil" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-2xl font-black text-white">
                                            <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={2} enableScrollSpy scrollSpyOnce />
                                            {stat.suf}
                                        </div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold leading-tight">{stat.lab}</p>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    </div>
                </div>
            </section>


            {/* 6️⃣ SECCIÓN: Ingeniería DevOps & Cloud */}
            <section className="relative py-24 px-4 bg-[#0a0a0a]/60 overflow-hidden" style={{ contentVisibility: 'auto' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                    >
                        <div>
                            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 block">Alta Disponibilidad</span>
                            <h2 className="text-4xl md:text-5xl font-bold">Ingeniería DevOps & Cloud</h2>
                        </div>
                        <p className="text-gray-400 max-w-md italic border-l-2 border-blue-500 pl-6 py-2">
                            Automatización, despliegue continuo y alta disponibilidad. Implementamos pipelines CI/CD, contenedorización y orquestación en entornos cloud para garantizar estabilidad, velocidad y escalabilidad operativa.
                        </p>
                    </motion.div>

                    <motion.button
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        onClick={() => setActiveServiceInfo({
                            category: "Cloud",
                            title: "Ingeniería DevOps & Cloud",
                            description: "Automatización, despliegue continuo y alta disponibilidad. Implementamos pipelines CI/CD, contenedorización y orquestación en entornos cloud para garantizar estabilidad, velocidad y escalabilidad operativa."
                        })}
                        className="mb-16 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                    >
                        Ver descripción ampliada <span className="text-lg">→</span>
                    </motion.button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {[
                            { title: "Automatización", desc: "De despliegues continuos" },
                            { title: "Infraestructura", desc: "Definida como código (IaC)" },
                            { title: "Contenedores", desc: "Docker y orquestación" },
                            { title: "Monitoreo", desc: "En tiempo real" }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all group"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/40 to-transparent p-10 rounded-[2.5rem] border border-white/10 flex flex-wrap justify-around gap-8 text-center relative overflow-hidden group">
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-cover bg-center mix-blend-overlay opacity-40 filter grayscale-0 group-hover:scale-105 transition-all duration-1000"
                            style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/young-engineer-server-room-medium-shot.jpg')" }}
                            loading="lazy"
                            decoding="async"
                        />
                        {[
                            { val: 61, suf: "%", lab: "reducción en tiempo de despliegue" },
                            { val: 94, suf: "%", lab: "de las empresas ya utilizan la nube" },
                            { val: 99.9, suf: "%", lab: "disponibilidad en infraestructuras" }
                        ].map((stat, i) => (
                            <div key={i} className="relative z-10">
                                <div className="text-4xl font-black text-white mb-2">
                                    <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} duration={2} enableScrollSpy scrollSpyOnce />
                                    {stat.suf}
                                </div>
                                <p className="text-xs text-blue-200 uppercase tracking-widest font-bold opacity-70">{stat.lab}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 7️⃣ SECCIÓN: Arquitectura de Microservicios */}
            <section className="relative py-24 px-4 bg-[#050505]/40 overflow-hidden" style={{ contentVisibility: 'auto' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative lg:order-2 group"
                        >
                            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] group-hover:border-blue-500/30 transition-all duration-700 aspect-video">
                                <img
                                    src="/imagenes/micrositios/Desarrollo-software/computer-scientists-data-center-managing-maintaining-databases.jpg"
                                    alt="Microservices Architecture"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="lg:order-1"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic underline underline-offset-8 decoration-blue-500/30">Arquitectura de <br />Microservicios</h2>
                            <motion.p variants={fadeIn} className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Sistemas modulares diseñados para escalar sin límites. Diseñamos plataformas basadas en microservicios que permiten crecimiento independiente y alta resiliencia.
                            </motion.p>

                            <motion.button
                                variants={fadeIn}
                                onClick={() => setActiveServiceInfo({
                                    category: "Infraestructura",
                                    title: "Arquitectura de Microservicios",
                                    description: "Sistemas modulares diseñados para escalar sin límites. Diseñamos plataformas basadas en microservicios que permiten crecimiento independiente y alta resiliencia."
                                })}
                                className="mb-10 text-blue-400 font-bold flex items-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                            >
                                Ver descripción ampliada <span className="text-lg">→</span>
                            </motion.button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {["Escalabilidad independiente por módulo", "Alta tolerancia a fallos", "Mejor rendimiento bajo demanda", "Actualizaciones sin interrupciones"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border-l-2 border-blue-500">
                                        <span className="text-white text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-8">
                                {[
                                    { val: 85, suf: "%", lab: "de las organizaciones migran a microservicios" },
                                    { val: 50, suf: "%", lab: "reducción en tiempos de desarrollo" },
                                    { val: 30, suf: "%", lab: "más resiliencia ante fallos" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-2xl font-black text-blue-400">
                                            <CountUp end={stat.val} duration={2} enableScrollSpy scrollSpyOnce />
                                            {stat.suf}
                                        </div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold w-24 leading-tight">{stat.lab}</p>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 8️⃣ SECCIÓN: Mantenimiento y Soporte Continuo */}
            <section className="relative py-24 px-4 bg-[#0a0a0a]/60 overflow-hidden" style={{ contentVisibility: 'auto' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center mb-16"
                    >
                        <span className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 block">Evolución Constante</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Mantenimiento y Soporte Continuo</h2>
                        <motion.p variants={fadeIn} className="text-lg text-gray-400 max-w-3xl mx-auto italic mb-10">
                            Evolución constante. Estabilidad garantizada. Aseguramos el funcionamiento, actualización y optimización continua de las plataformas digitales.
                        </motion.p>

                        <motion.button
                            variants={fadeIn}
                            onClick={() => setActiveServiceInfo({
                                category: "Soporte",
                                title: "Mantenimiento y Soporte Continuo",
                                description: "Evolución constante. Estabilidad garantizada. Aseguramos el funcionamiento, actualización y optimización continua de las plataformas digitales."
                            })}
                            className="mx-auto text-blue-400 font-bold flex items-center justify-center gap-2 hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                        >
                            Ver descripción ampliada <span className="text-lg">→</span>
                        </motion.button>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {[
                            { title: "Monitoreo", desc: "Proactivo 24/7" },
                            { title: "Seguridad", desc: "Mediante actualizaciones constantes" },
                            { title: "Optimización", desc: "Mejora continua del rendimiento" },
                            { title: "Soporte", desc: "Técnico especializado" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:border-blue-500/40 transition-all text-center"
                            >
                                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative p-1 gap-8 overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.03] shadow-2xl group/main-card">
                        <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-40 filter grayscale-0 transform-gpu transition-transform duration-1000 group-hover/main-card:scale-105" style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/professional-hacker-using-ransomware-phishing-tactics-compromise-networks.jpg')" }} loading="lazy" decoding="async" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative z-10">
                            {[
                                { val: 60, suf: "%", lab: "de ciberataques afectan sistemas desactualizados" },
                                { val: 70, suf: "%", lab: "menos incidentes con mantenimiento preventivo" },
                                { val: 40, suf: "%", lab: "mejora en retención tecnológica" }
                            ].map((stat, i) => (
                                <div key={i} className={`p-12 text-center transition-all duration-500 hover:bg-white/[0.05] group/stat ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-white/5' : ''}`}>
                                    <div className="text-5xl font-black text-white mb-3 transition-transform duration-500 group-hover/stat:scale-110">
                                        <CountUp end={stat.val} duration={2} enableScrollSpy scrollSpyOnce />
                                        <span className="text-blue-500">{stat.suf}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold leading-relaxed max-w-[200px] mx-auto opacity-70 group-hover/stat:opacity-100 transition-opacity whitespace-pre-line">{stat.lab}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section className="relative py-24 px-4 bg-[#050505]/40 overflow-hidden" style={{ contentVisibility: 'auto' }}>
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-blue-600/10 blur-[150px] animate-pulse" />
                    <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25" style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/person-working-html-computer.jpg')" }} />
                    <img
                        src="/imagenes/micrositios/Desarrollo-software/person-pressing-power-button.jpg"
                        alt="Final CTA"
                        className="absolute right-0 bottom-0 w-full h-full object-cover opacity-15 grayscale-0 pointer-events-none"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">¿Listo para desarrollar tu <br /><span className="text-blue-500">plataforma digital?</span></h2>
                        <motion.p className="text-xl text-gray-400 mb-12 font-light">
                            Transformamos tus ideas en soluciones tecnológicas escalables que potencian el crecimiento real de tu empresa.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group relative px-10 py-5 bg-blue-600 rounded-full font-bold text-lg overflow-hidden transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/40"
                            >
                                <span className="relative z-10">Solicitar asesoría</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                            </button>
                            <Link
                                to="/"
                                className="px-10 py-5 bg-white/5 rounded-full font-bold text-lg border border-white/10 hover:bg-white/10 transition-all"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <ServiceDetailModal info={activeServiceInfo} onClose={() => setActiveServiceInfo(null)} />
        </main>
    );
};

export default DesarrolloSoftware;
