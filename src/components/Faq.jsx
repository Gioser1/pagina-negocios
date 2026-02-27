import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const faqData = [
    {
        question: "¿Cómo funciona la consultoría?",
        answer:
            "Revisaremos tu proyecto, para darte un diagnóstico claro de cómo podemos ayudarte a realizar tu proyecto de software, en tiempo récord y sin perder la calidad del mismo.",
    },
    {
        question: "¿Qué resultados puedo esperar?",
        answer:
            "Nuestros profesionales garantizan la calidad los proyectos y sus fases, con una garantía durante y post desarrollo, además nuestra metodología de trabajo ágil que logra, que tu desarrollo se comience en el menor tiempo posible y hasta en solo 90 días.",
    },
    {
        question: "¿Qué pasa si espero?",
        answer:
            "Actualmente, nos quedan solo 5 cupos para la asesoría y diagnóstico gratuito. Si esperas más tiempo, seguro te quedas sin cupo. Aprovecha que esta semana la sesión es gratuita.",
    },
    {
        question: "¿Por qué elegirnos?",
        answer:
            "Como startups no vendemos horas de desarrollo ni soluciones genéricas. Diseñamos, construimos e implementamos tecnología aplicada a problemas reales de negocio, con un enfoque estructurado, escalable y medible desde el primer día.",
    },
];

const Faq = ({ compact = false }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (idx) => {
        setOpenIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <section id="faq" className={`${compact ? 'py-10' : 'py-24'} relative bg-[#0a0a0a] text-white overflow-hidden`}>
            {/* Background Decorativo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className={`${compact ? 'max-w-3xl' : 'max-w-4xl'} mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 backdrop-blur-md">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="font-bold tracking-widest uppercase text-xs text-primary">Resolvemos tus dudas</span>
                    </div>
                    <h2 className={`${compact ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl md:text-6xl'} font-black text-white tracking-tight`}>
                        Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">frecuentes</span>
                    </h2>
                </motion.div>

                <div className="space-y-4 sm:space-y-6">
                    {faqData.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 border-2 ${isOpen
                                        ? "border-primary shadow-[0_0_30px_rgba(2,223,130,0.2)] bg-[#111111]"
                                        : "border-transparent bg-[#111111]"
                                    }`}
                            >
                                <button
                                    className={`w-full flex justify-between items-center text-left focus:outline-none transition-all duration-300 bg-primary hover:brightness-110 ${compact ? 'px-5 py-4' : 'px-6 sm:px-8 py-5 sm:py-6'
                                        }`}
                                    onClick={() => toggleIndex(i)}
                                >
                                    <span className="text-base sm:text-lg lg:text-xl font-bold text-black">
                                        {item.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                                        className="shrink-0 ml-4 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/10 text-black group-hover:bg-black/20 transition-colors duration-300"
                                    >
                                        <ChevronDown className="w-5 h-5" />
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
                                            <div className={`px-6 sm:px-8 pb-5 sm:pb-8 pt-2 text-gray-400 leading-relaxed ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
                                                <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent mb-5" />
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Faq;
