import { motion } from "framer-motion";

const Preloader = () => {
    return (
        <motion.div
            className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[99999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            key="preloader"
        >
            {/* Logo con animación de pulso */}
            <motion.img
                src={`${import.meta.env.BASE_URL}imagenes/Logos/olimpologo.png`}
                alt="Olimpo Innova Logo"
                initial={{ scale: 0.8, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="w-40 md:w-56 h-auto"
            />
        </motion.div>
    );
};

export default Preloader;