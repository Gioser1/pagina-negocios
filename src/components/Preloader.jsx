import { motion } from "framer-motion";

const Preloader = () => {
    return (
        <motion.div
            className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[99999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
            key="preloader"
        >
            <div className="relative flex items-center justify-center">
                {/* Anillo exterior animado de expansión rápida */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-primary opacity-0"
                    animate={{
                        scale: [0.8, 1.8],
                        opacity: [0.6, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 0.2
                    }}
                />

                {/* Anillo exterior secundario más lento */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/40 opacity-0"
                    animate={{
                        scale: [0.8, 2.2],
                        opacity: [0.4, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                />

                {/* Contenedor animado con overflow hidden para recortar la palabra OLIMPO INNOVA */}
                <motion.div
                    initial={{ scale: 0.3, opacity: 0, rotate: -20, filter: "blur(15px)" }}
                    animate={{
                        scale: [0.3, 1.1, 1],
                        opacity: [0, 1, 1],
                        rotate: [-20, 5, 0],
                        filter: ["blur(15px)", "blur(0px)", "blur(0px)"]
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                    }}
                    // Contenedor que recorta la mitad inferior del logo
                    className="relative z-10 w-32 md:w-48 overflow-hidden h-[3.8rem] md:h-[5.8rem] flex items-start justify-center"
                    style={{ filter: "drop-shadow(0px 0px 25px rgba(2,223,130,0.5))" }}
                    whileInView={{
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1],
                        transition: {
                            delay: 1.2, // Empieza después de la entrada
                            duration: 2.5,
                            ease: "easeInOut",
                            repeat: Infinity
                        }
                    }}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}imagenes/Logos/olimpologo.png`}
                        alt="Olimpo Innova Logo"
                        className="w-full h-auto object-cover object-top"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Preloader;