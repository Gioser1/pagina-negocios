import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { pillarsData } from "../data/pillarsData";

const DarkContrastSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const yTransform = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const blurObjY = useTransform(scrollYProgress, [0, 1], [150, -150]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 bg-[#194B80] overflow-hidden">
            {/* Elemento visual animado de fondo (Nivel 3) */}
            <motion.div
                className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    x: [0, 100, 0, -100, 0],
                    y: [0, -50, 50, 0, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ top: '-400px', right: '-200px', y: blurObjY }}
            />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                style={{ y: yTransform }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.h2
                    variants={{ hidden: { opacity: 0, y: 40, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
                    className="text-3xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-400 to-white bg-[length:200%_auto] mb-6 tracking-tight leading-[1.1] max-w-[800px] mx-auto"
                    animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                >
                    Construimos productos digitales que <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 italic">escalan</span>.
                </motion.h2>

                <motion.div variants={itemVariants}>
                    <p className="text-base sm:text-xl md:text-2xl text-blue-100 max-w-[600px] mx-auto font-light leading-relaxed px-4">
                        Dejamos atrás las plantillas para crear arquitecturas sólidas diseñadas a medida para el crecimiento de tu negocio.
                    </p>
                </motion.div>

                {/* Pilares de Valor */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 max-w-5xl mx-auto border-t border-white/10 pt-10 md:pt-16 px-4"
                >
                    {pillarsData.map((pillar, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="flex flex-col items-center text-center p-4 rounded-xl transition-colors hover:bg-white/5"
                        >
                            <span className="text-xl md:text-2xl font-bold text-primary mb-3">{pillar.title}</span>
                            <span className="text-blue-200 text-sm md:text-base font-light">{pillar.description}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default DarkContrastSection;
