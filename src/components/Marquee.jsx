import { motion } from "framer-motion";

const Marquee = () => {
    // Contenido del cartel promocional repetido
    const items = [
        "CRECIMIENTO ESCALABLE",
        "EXPERIENCIAS INMERSIVAS",
        "PRODUCTOS DIGITALES",
        "ARQUITECTURAS SÓLIDAS",
        "DISEÑO CENTRADO EN EL USUARIO"
    ];

    // Lo repetimos solo lo necesario para cubrir una pantalla ultra ancha y que su 50% no sea una pista kilométrica
    const repeatCount = 8;
    const marquees = Array(repeatCount).fill(items).flat();

    return (
        <div className="bg-dark-200/20 backdrop-blur-md py-6 overflow-hidden flex whitespace-nowrap border-y border-white/5 relative -rotate-2 origin-center scale-105 my-16 z-20">
            <motion.div
                className="flex space-x-12 px-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 35
                }}
            >
                {marquees.map((item, index) => (
                    <div key={index} className="flex items-center space-x-12">
                        <span className="text-white text-2xl md:text-3xl font-bold uppercase tracking-widest opacity-90">
                            {item}
                        </span>
                        {/* Separador (Estrella) */}
                        <span className="text-primary text-xl opacity-60">
                            ✦
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
