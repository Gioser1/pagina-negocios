import { motion } from "framer-motion";
import { Globe, Gem, Smile, Building, Trophy, TrendingUp } from "lucide-react";

const porQueData = [
    {
        number: "5+",
        icon: Globe,
        title: "Presencia Global",
        description:
            "Presencia solida en 5+ paises de Latinoamérica, llevando innovación tecnologica, soluciones dinámicas a la medida y escalables a diversos mercados.",
    },
    {
        number: "10+",
        icon: Gem,
        title: "Proyectos Exitosos",
        description:
            "Más de 10 proyectos exitosos entregados, para diversas industrias y necesidades.",
    },
    {
        number: "98%",
        icon: Smile,
        title: "Satisfacción",
        description:
            "Nivel de satisfacción de nuestros clientes superior al 98%, reflejo de nuestro compromiso con la calidad y resultados efectivos.",
    },
    {
        number: "100%",
        icon: Building,
        title: "Arquitectura Escalable",
        description:
            "Arquitectures a la Medida y Escalables. Diseñamos e implementamos ecosistemas tecnologicos robustos, preparados para crecer con tu empresa y adaptarse a nuevos mercados.",
    },
    {
        number: "N.1",
        icon: Trophy,
        title: "Consultoría Digital",
        description:
            "Consultoría Estratégica en Transformación Digital. No solo desarrollamos software. Diagnosticamos, estructuramos y acompañamos la evolución tecnológica de tu organización con visión de largo plazo.",
    },
    {
        number: "65%",
        icon: TrendingUp,
        title: "Productividad",
        description:
            "Productividad organizacional, con sistemas inteligentes que transforman datos en decisiones estratégicas en tiempo real.",
    },
];

const PorQueOlimpo = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <section className="py-20 bg-[#0a0a0a] text-white overflow-hidden relative">
            {/* Fondo decorativo */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -right-[15%] w-[60rem] h-[60rem] bg-primary/5 rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight text-white">
                        Por qué <span className="text-primary">Olimpo Innova</span>
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto text-gray-400">
                        Nos apasiona el desarrollo de NODOS de tecnología y transformación digital.
                    </p>
                </motion.div>

                {/* Grid de estadísticas */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {porQueData.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group"
                            >
                                <div className="h-full rounded-2xl border p-8 transition-all flex flex-col bg-gradient-to-br from-white/5 to-white/10 border-primary/20 hover:border-primary/50">
                                    {/* Número grande y icono */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="text-5xl sm:text-6xl font-black text-primary group-hover:text-primary-light">
                                            {item.number}
                                        </div>
                                        <motion.div
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                            className="w-16 h-16 rounded-xl flex items-center justify-center transition-all flex-shrink-0 bg-primary/10 text-white group-hover:bg-primary group-hover:text-black"
                                        >
                                            <IconComponent className="w-8 h-8" />
                                        </motion.div>
                                    </div>

                                    {/* Título */}
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary">
                                        {item.title}
                                    </h3>

                                    {/* Descripción */}
                                    <p className="text-sm leading-relaxed flex-grow text-gray-400 group-hover:text-gray-300">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default PorQueOlimpo;
