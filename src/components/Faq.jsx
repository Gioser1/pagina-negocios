import { useState } from "react";
import { motion } from "framer-motion";

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
        <section id="faq" className={`${compact ? 'py-10' : 'py-20'} bg-[#0a0a0a] text-white`}> 
            <div className={`${compact ? 'max-w-xl' : 'max-w-4xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`${compact ? 'text-2xl sm:text-3xl mb-8' : 'text-3xl sm:text-4xl mb-12'} font-black text-center`}
                >
                    Preguntas frecuentes
                </motion.h2>
                <div className="space-y-4">
                    {faqData.map((item, i) => (
                        <div key={i} className="bg-[#111] rounded-lg overflow-hidden">
                            <button
                                className={`w-full flex justify-between items-center ${compact ? 'px-4 py-2' : 'px-6 py-4'} text-left focus:outline-none bg-primary text-black`}
                                onClick={() => toggleIndex(i)}
                            >
                                <span className="font-medium">{item.question}</span>
                                <svg
                                    className={`w-5 h-5 text-black transition-transform duration-300 ${
                                        openIndex === i ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div
                                className={`${
                                    openIndex === i ? "max-h-screen" : "max-h-0"
                                } overflow-hidden transition-[max-height] duration-500 px-6`}
                            >
                                <p className={`${compact ? 'py-2 text-sm' : 'py-4'} text-gray-300`}>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
