import { motion } from "framer-motion";

const WhatsAppButton = () => {
    const pulseAnimation = {
        scale: [1, 1.1, 1],
        boxShadow: [
            "0px 0px 0px 0px rgba(34, 197, 94, 0.7)",
            "0px 0px 20px 10px rgba(34, 197, 94, 0.3)",
            "0px 0px 0px 0px rgba(34, 197, 94, 0.7)"
        ]
    };

    return (
        <motion.a
            href="https://wa.me/573025627200?text=Hola%2C%20me%20gustaría%20conocer%20más%20sobre%20vuestros%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[1000] flex items-center justify-center rounded-full"
            animate={pulseAnimation}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
        >
            <img 
                src={`${import.meta.env.BASE_URL}whatsapp.png`}
                alt="WhatsApp" 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 drop-shadow-xl cursor-pointer hover:drop-shadow-2xl transition-all"
            />
        </motion.a>
    );
};

export default WhatsAppButton;
