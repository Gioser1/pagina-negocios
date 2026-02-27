import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Star, Users, Lightbulb, Shield, Zap, ChevronDown, Rocket, ShieldCheck, HeartHandshake, Globe, Activity, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CorporateIdentity = () => {
    const sectionRef = useRef(null);
    const { setIsGlobalLightMode, isGlobalLightMode } = useTheme();
    const isLightMode = isGlobalLightMode;
    const [openIndex, setOpenIndex] = useState(0); // Abrir la Misión por defecto

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsGlobalLightMode(true);
                } else {
                    setIsGlobalLightMode(false);
                }
            },
            {
                threshold: 0.15, // 🔥 comienza a cambiar al ver apenas el 15% de la sección
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
            if (setIsGlobalLightMode) {
                setIsGlobalLightMode(false);
            }
        };
    }, [setIsGlobalLightMode]);

    const values = [
        {
            icon: <Lightbulb className="w-6 h-6" />,
            title: "1. Innovación con Propósito",
            description: "Desarrollamos soluciones tecnológicas avanzadas que no solo incorporan innovación de vanguardia, sino que responden a necesidades reales del mercado y generan impacto económico, social y ambiental sostenible."
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "2. Excelencia Tecnológica",
            description: "Nos comprometemos con los más altos estándares de calidad, seguridad y escalabilidad en cada proyecto, garantizando soluciones robustas, eficientes y alineadas con las mejores prácticas internacionales."
        },
        {
            icon: <HeartHandshake className="w-6 h-6" />,
            title: "3. Ética, Transparencia y Confianza",
            description: "Actuamos con integridad en todas nuestras relaciones, promoviendo la transparencia, la protección de la información y la confianza como pilares fundamentales de nuestro modelo de negocio."
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Innovación Constante",
            description: "Buscamos continuamente nuevas formas de resolver problemas y mejorar procesos mediante la tecnología.",
            icon: <Lightbulb className="w-6 h-6" />
        },
        {
            title: "Excelencia y Calidad",
            description: "Nos comprometemos a entregar soluciones robustas, escalables y seguras que superen las expectativas.",
            icon: <Star className="w-6 h-6" />
        },
        {
            title: "Compromiso Ético",
            description: "Actuamos con transparencia, integridad y responsabilidad en cada proyecto y alianza.",
            icon: <Shield className="w-6 h-6" />
        },
        {
            title: "Trabajo en Equipo",
            description: "Fomentamos la colaboración, el respeto y la sinergia para alcanzar metas extraordinarias.",
            icon: <Users className="w-6 h-6" />
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const AccordionItem = ({ index, title, icon, children, isOpen }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className={`group/accordion relative rounded-3xl overflow-hidden mb-6 transition-colors duration-700 
                ${isOpen
                        ? (isLightMode ? 'bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)] ring-1 ring-cyan-600/20 border border-slate-200' : 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-primary/40 shadow-[0_0_40px_rgba(2,223,130,0.15)] ring-1 ring-primary/20 backdrop-blur-xl')
                        : (isLightMode ? 'bg-slate-200 border border-slate-300 hover:border-cyan-500/50 hover:bg-white shadow-sm' : 'bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04] backdrop-blur-lg')}`}
            >
                {/* Subtle highlight effect on open */}
                {isOpen && !isLightMode && (
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
                )}
                {isOpen && isLightMode && (
                    <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent opacity-80"></div>
                )}

                <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-6 sm:px-10 flex items-center justify-between text-left focus:outline-none relative z-10"
                >
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-lg 
                            ${isOpen
                                ? (isLightMode ? 'bg-cyan-100 text-cyan-700 scale-110 shadow-cyan-200/50' : 'bg-primary/20 text-primary scale-110 shadow-primary/20')
                                : (isLightMode ? 'bg-white text-slate-500 group-hover/accordion:text-cyan-700 border border-slate-200 group-hover/accordion:scale-105 shadow-sm' : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 group-hover/accordion:text-white group-hover/accordion:scale-105 border border-gray-700/50')}`}
                        >
                            {icon}
                        </div>
                        <h3 className={`text-2xl sm:text-3xl font-black transition-colors duration-700 tracking-wide
                            ${isOpen ? (isLightMode ? 'text-slate-900' : 'text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]') : (isLightMode ? 'text-slate-600 group-hover/accordion:text-slate-900' : 'text-gray-300 group-hover/accordion:text-white')}`}>
                            {title}
                        </h3>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-700 shadow-inner
                            ${isOpen
                                ? (isLightMode ? 'bg-cyan-100 border-cyan-300 text-cyan-700 shadow-sm' : 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(2,223,130,0.2)]')
                                : (isLightMode ? 'bg-slate-50 border-slate-300 text-slate-400 group-hover/accordion:text-cyan-700' : 'bg-black/20 border-white/10 text-gray-500 group-hover/accordion:text-white group-hover/accordion:border-white/30 group-hover/accordion:bg-white/5')}`}
                    >
                        <ChevronDown className="w-6 h-6" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className={`px-6 pb-8 sm:px-10 border-t pt-6 transition-colors duration-700 ${isLightMode ? 'border-slate-100' : 'border-white/5'}`}>
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <section id="identidad" ref={sectionRef} className={`py-24 relative transition-colors duration-1000 overflow-hidden ${isLightMode ? 'bg-slate-200 text-slate-900 border-transparent' : 'bg-transparent border-white/5 text-white'}`}>

            {/* Background elements (ligeramente más brillantes en el modo claro) */}
            <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 transition-opacity duration-1000 ${isLightMode ? 'opacity-30' : 'opacity-100'}`}>
                <div className="absolute top-[20%] right-[10%] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 backdrop-blur-md transition-colors duration-1000 ${isLightMode ? 'bg-cyan-100/50 border-cyan-400/50' : 'bg-white/5 border-white/10'}`}>
                        <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span>
                        <span className={`font-bold tracking-widest uppercase text-xs ${isLightMode ? 'text-cyan-800' : 'text-primary'}`}>Identidad Corporativa</span>
                    </div>
                    <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 transition-colors duration-1000 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        Nuestra <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isLightMode ? 'from-cyan-600 to-blue-700' : 'from-emerald-400 to-cyan-400'}`}>Esencia</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto transition-colors duration-1000 ${isLightMode ? 'text-slate-600' : 'text-gray-400'}`}>
                        Conoce los pilares que impulsan cada uno de nuestros desarrollos, estrategias y alianzas tecnológicas.
                    </p>
                </motion.div>

                <div className="w-full">
                    {/* Accordion Item: Misión */}
                    <AccordionItem
                        index={0}
                        title="Misión"
                        icon={<Target className="w-7 h-7" />}
                        isOpen={openIndex === 0}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            className={`text-lg sm:text-xl leading-relaxed font-light pl-2 sm:pl-4 border-l-2 transition-colors duration-700 ${isLightMode ? 'border-cyan-500 text-slate-800' : 'border-primary/30 text-gray-300'}`}
                        >
                            Ser una empresa especialista en brindar soluciones estratégicas, integrales, e innovadoras a nuestros clientes & entidades aliadas, con un capital humano profesional, respetuoso, idóneo, proactivo y recursivo.
                        </motion.div>
                    </AccordionItem>

                    {/* Accordion Item: Visión */}
                    <AccordionItem
                        index={1}
                        title="Visión"
                        icon={<Eye className="w-7 h-7" />}
                        isOpen={openIndex === 1}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            className={`text-lg sm:text-xl leading-relaxed font-light pl-2 sm:pl-4 border-l-2 transition-colors duration-700 ${isLightMode ? 'border-blue-600 text-slate-800' : 'border-blue-500/30 text-gray-300'}`}
                        >
                            Ser una empresa líder en el 2030 en el Distrito de Medellín, su área metropolitana, Antioquia y Colombia, en soluciones de NODOS de tecnología, innovación, Transformación Digital & ecosistemas de comunicaciones y mundos mágicos
                        </motion.div>
                    </AccordionItem>

                    {/* Accordion Item: Valores */}
                    <AccordionItem
                        index={2}
                        title="Valores Institucionales"
                        icon={<Star className="w-7 h-7" />}
                        isOpen={openIndex === 2}
                    >
                        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2, ease: "easeOut" }}
                                    className={`flex items-start gap-4 sm:gap-5 group p-5 sm:p-6 rounded-2xl transition-colors duration-700 shadow-inner ${isLightMode ? 'bg-white border border-slate-200 hover:bg-slate-50 hover:border-cyan-500/30 hover:shadow-lg' : 'bg-black/20 border border-white/5 hover:bg-white/[0.04] hover:border-white/10'}`}
                                >
                                    <div className={`mt-1 w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center border group-hover:scale-110 transition-all duration-700 shadow-lg relative ${isLightMode ? 'bg-cyan-100 text-cyan-700 border-cyan-300 group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'text-primary bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(2,223,130,0.3)]'}`}>
                                        <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLightMode ? 'bg-cyan-500/20' : 'bg-primary/20'}`} />
                                        <span className="relative z-10">{val.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className={`text-lg sm:text-xl font-bold mb-2 transition-colors duration-700 tracking-wide ${isLightMode ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-primary'}`}>{val.title}</h4>
                                        <p className={`text-sm leading-relaxed transition-colors duration-700 ${isLightMode ? 'text-slate-600' : 'text-gray-400'}`}>{val.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AccordionItem>
                </div>
            </div>
        </section>
    );
};

export default CorporateIdentity;
