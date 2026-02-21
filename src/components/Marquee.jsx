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
        <div className="bg-dark-200/40 backdrop-blur-xl py-6 overflow-hidden flex whitespace-nowrap border-y border-white/10 relative my-16 z-20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
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
                        <motion.span
                            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white bg-[length:200%_auto] text-2xl md:text-3xl font-black uppercase tracking-widest drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        >
                            {item}
                        </motion.span>
                        {/* Separador (Estrella) */}
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="text-primary text-xl"
                        >
                            ✦
                        </motion.span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
