import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Eye, Star, Lightbulb, Rocket, ShieldCheck, HeartHandshake, Globe, Activity, Users, MapPin, ChevronDown } from "lucide-react";

const CorporateIdentity = () => {
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
            title: "4. Orientación al Cliente y al Valor",
            description: "Escuchamos, comprendemos y acompañamos a nuestros clientes, diseñando soluciones personalizadas que maximicen el valor, la rentabilidad y el crecimiento sostenible de sus proyectos."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "5. Impacto Social y Tecnología Inclusiva",
            description: "Creemos en la tecnología como motor de transformación positiva. Impulsamos iniciativas que promuevan la inclusión, el acceso equitativo, la sostenibilidad y el desarrollo de comunidades."
        },
        {
            icon: <Activity className="w-6 h-6" />,
            title: "6. Adaptabilidad y Evolución Continua",
            description: "Nos anticipamos al cambio y evolucionamos constantemente, integrando nuevas tecnologías, metodologías ágiles y modelos disruptivos que mantengan a nuestros clientes y aliados a la vanguardia."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "7. Colaboración Estratégica",
            description: "Fomentamos alianzas sólidas, multidisciplinarias y de largo plazo, basadas en el respeto, la cooperación y la creación conjunta de soluciones de alto impacto."
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "8. Visión Global con Enfoque Local",
            description: "Operamos con mentalidad internacional, comprendiendo las dinámicas locales y regionales para ofrecer soluciones tecnológicas escalables y culturalmente relevantes."
        }
    ];

    const [openIndex, setOpenIndex] = useState(0); // Abrir la Misión por defecto

    const toggleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const AccordionItem = ({ index, title, icon, children, isOpen }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className={`group/accordion relative rounded-3xl overflow-hidden mb-6 transition-all duration-500 
                ${isOpen
                        ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-primary/40 shadow-[0_0_40px_rgba(2,223,130,0.15)] ring-1 ring-primary/20 backdrop-blur-xl'
                        : 'bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04] backdrop-blur-lg'}`}
            >
                {/* Subtle highlight effect on open */}
                {isOpen && (
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
                )}

                <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-6 sm:px-10 flex items-center justify-between text-left focus:outline-none relative z-10"
                >
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg 
                            ${isOpen
                                ? 'bg-primary/20 text-primary scale-110 shadow-primary/20'
                                : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 group-hover/accordion:text-white group-hover/accordion:scale-105 border border-gray-700/50'}`}
                        >
                            {icon}
                        </div>
                        <h3 className={`text-2xl sm:text-3xl font-black transition-colors duration-300 tracking-wide
                            ${isOpen ? 'text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]' : 'text-gray-300 group-hover/accordion:text-white'}`}>
                            {title}
                        </h3>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 shadow-inner
                            ${isOpen
                                ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(2,223,130,0.2)]'
                                : 'bg-black/20 border-white/10 text-gray-500 group-hover/accordion:text-white group-hover/accordion:border-white/30 group-hover/accordion:bg-white/5'}`}
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
                            <div className="px-6 pb-8 sm:px-10 border-t border-white/5 pt-6">
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <section id="identidad" className="py-24 bg-[#0a0f1a] relative border-t border-white/5 overflow-hidden text-white">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">Identidad Corporativa</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                        Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Esencia</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                            className="text-gray-300 text-lg sm:text-xl leading-relaxed font-light pl-2 sm:pl-4 border-l-2 border-primary/30"
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
                            className="text-gray-300 text-lg sm:text-xl leading-relaxed font-light pl-2 sm:pl-4 border-l-2 border-blue-500/30"
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
                                    className="flex items-start gap-4 sm:gap-5 group p-5 sm:p-6 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 shadow-inner"
                                >
                                    <div className="mt-1 w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-primary border border-gray-700 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(2,223,130,0.3)] transition-all duration-300 shadow-lg relative">
                                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative z-10">{val.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors tracking-wide">{val.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{val.description}</p>
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
