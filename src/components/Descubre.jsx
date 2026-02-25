import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Code2,
    Cpu,
    MessageSquareShare,
    Gamepad2,
    Video
} from "lucide-react";

const discoverItems = [
    {
        title: "Tecnología",
        description: "Diseñamos arquitecturas web y automatizamos aplicaciones para simplificar el trabajo de todos.",
        icon: <Code2 size={32} strokeWidth={1.5} />,
        path: "/services/desarrollo-software"
    },
    {
        title: "Transformación Digital",
        description: "Llevamos tu modelo de negocio al entorno digital con herramientas escalables, eficientes e inteligentes.",
        icon: <Cpu size={32} strokeWidth={1.5} />,
        path: "/services/automatizaciones"
    },
    {
        title: "Comunicaciones",
        description: "Estructuramos mensajes claros y estrategias de difusión audaces para conectar de forma directa y efectiva con tu audiencia ideal.",
        icon: <MessageSquareShare size={32} strokeWidth={1.5} />,
        path: "/services/marketing-digital"
    },
    {
        title: "¡Mundos mágicos!",
        description: "¡Llevamos tu imaginación a otro nivel! Creamos experiencias inmersas a través de video juegos con historias y personajes futuristas o escenarios más reales.",
        icon: <Gamepad2 size={32} strokeWidth={1.5} />,
        path: "/services/mundos-magicos"
    },
    {
        title: "Narrativas Audiovisuales",
        description: "Contamos tu historia mediante producciones de alto impacto visual y sonoro, adaptadas a los formatos multiplataforma del mañana.",
        icon: <Video size={32} strokeWidth={1.5} />,
        path: "/services/narrativas-audiovisuales"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring", stiffness: 150, damping: 20
        }
    }
};

const Descubre = () => {
    return (
        <section id="Services" className="py-20 md:py-32 bg-[#0a0f1a] text-white relative overflow-hidden border-t border-white/5">
            {/* Background glowing blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, -50, 0], y: [0, -40, 0], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] -right-[10%] w-[50rem] h-[50rem] bg-indigo-600/20 rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-blue-400 font-bold tracking-widest uppercase text-xs">Descubre lo que hacemos</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
                    >
                        Soluciones para el <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">futuro digital</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 w-24 bg-blue-500 mt-8 origin-left mx-auto md:mx-0"
                    />
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {discoverItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="relative group h-full"
                        >
                            {/* Glow exterior al hacer hover en la tarjeta */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 z-0"></div>

                            <Link to={item.path} className="relative z-10 bg-[#111827]/90 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:bg-[#1f2937]/95 group-hover:border-blue-500/40 flex flex-col sm:flex-row gap-6 h-full items-start">
                                {/* Destello de fondo dentro de la tarjeta */}
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="flex-shrink-0 relative">
                                    <motion.div
                                        className="text-blue-400 bg-blue-500/10 p-4 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {item.icon}
                                    </motion.div>
                                </div>
                                <div className="flex flex-col h-full">
                                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base flex-grow mb-6 group-hover:text-gray-200 transition-colors duration-300">
                                        {item.description}
                                    </p>

                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Descubre;
