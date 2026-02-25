import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
    Code2,
    Cpu,
    MessageSquareShare,
    Gamepad2,
    Video
} from "lucide-react";

const servicesData = [
    {
        title: "Tecnología",
        description: "Diseñamos arquitecturas web y automatizamos aplicaciones para simplificar el trabajo de todos.",
        icon: <Code2 size={32} strokeWidth={1.5} />,
        detailedDescription: "Nuestros servicios de tecnología abarcan desde el desarrollo de aplicaciones web hasta soluciones de automatización empresarial. Creamos sistemas escalables y eficientes que se adaptan a tus necesidades."
    },
    {
        title: "Transformación Digital",
        description: "Llevamos tu modelo de negocio al entorno digital con herramientas escalables, eficientes e inteligentes.",
        icon: <Cpu size={32} strokeWidth={1.5} />,
        detailedDescription: "Transformamos tu negocio tradicional en una empresa digital moderna. Implementamos soluciones tecnológicas que mejoran tu competitividad y permiten que crezcas en el entorno digital."
    },
    {
        title: "Comunicaciones",
        description: "Estructuramos mensajes claros y estrategias de difusión audaces para conectar de forma directa y efectiva con tu audiencia ideal.",
        icon: <MessageSquareShare size={32} strokeWidth={1.5} />,
        detailedDescription: "Desarrollamos estrategias de comunicación integral que conectan tu marca con tu audiencia. Desde marketing digital hasta estrategias de difusión personalizadas para máximo impacto."
    },
    {
        title: "¡Mundos mágicos!",
        description: "¡Llevamos tu imaginación a otro nivel! Creamos experiencias inmersas a través de video juegos con historias y personajes futuristas o escenarios más reales.",
        icon: <Gamepad2 size={32} strokeWidth={1.5} />,
        detailedDescription: "Creamos mundos virtuales inmersivos y videojuegos con narrativas envolventes. Transformamos ideas en experiencias interactivas que cautivan a tu audiencia."
    },
    {
        title: "Narrativas Audiovisuales",
        description: "Contamos tu historia mediante producciones de alto impacto visual y sonoro, adaptadas a los formatos multiplataforma del mañana.",
        icon: <Video size={32} strokeWidth={1.5} />,
        detailedDescription: "Producimos contenido audiovisual de alta calidad que cuenta tu historia de forma impactante. Adaptamos nuestras producciones a todos los formatos y plataformas disponibles."
    }
];

const ServicesModal = ({ isOpen, onClose }) => {
    const [selectedService, setSelectedService] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]/98 backdrop-blur-xl p-4 sm:p-8 overflow-y-auto"
            >
                <motion.button
                    onClick={onClose}
                    className="fixed top-5 right-5 sm:top-8 sm:right-8 z-[999999] text-white hover:text-primary transition-colors p-2 sm:p-3 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer backdrop-blur-md border border-white/10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X size={24} />
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full max-w-6xl"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
                            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Servicios</span>
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg">Explora las soluciones que ofrecemos para tu negocio</p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {servicesData.map((service, index) => (
                            <motion.button
                                key={index}
                                variants={itemVariants}
                                onClick={() => setSelectedService(service)}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="relative group text-left h-full"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 z-0"></div>

                                <div className="relative z-10 bg-[#111827]/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:bg-[#1f2937]/95 group-hover:border-blue-500/40 flex flex-col gap-4 h-full">
                                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="text-blue-400 bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 w-fit">
                                        {service.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-4 text-blue-400 font-semibold text-sm">
                                        Ver más →
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>

                    {selectedService && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#050505]/98 backdrop-blur-xl p-4 sm:p-8"
                            onClick={() => setSelectedService(null)}
                        >
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedService(null);
                                }}
                                className="fixed top-5 right-5 sm:top-8 sm:right-8 text-white hover:text-primary transition-colors p-2 sm:p-3 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer backdrop-blur-md border border-white/10 z-[9999999]"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={24} />
                            </motion.button>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="bg-[#111827]/95 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 max-w-2xl w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-blue-400 bg-blue-500/10 p-4 rounded-lg w-fit mb-6">
                                    {selectedService.icon}
                                </div>

                                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                                    {selectedService.title}
                                </h2>

                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                                    {selectedService.detailedDescription}
                                </p>

                                <motion.button
                                    onClick={() => setSelectedService(null)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-6 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                                >
                                    Cerrar
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default ServicesModal;
