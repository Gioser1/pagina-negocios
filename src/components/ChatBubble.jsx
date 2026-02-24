import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBubble = ({ isVisible, onClose }) => {
    // Cerrar automáticamente después de 5 segundos
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.3, x: -30, y: -30 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.3, x: -30, y: -30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 z-[100000] pointer-events-auto w-max"
                    style={{ marginTop: "10px" }}
                >
                    <motion.div
                        className="pointer-events-auto relative"
                        layoutId="chatBubble"
                    >
                        {/* Contenedor de la burbuja con estilo comic */}
                        <div className="relative">
                            {/* Burbuja principal */}
                            <div className="bg-white rounded-xl p-2 shadow-lg border-2 border-black"
                                style={{
                                    boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.3), 2px 2px 0px rgba(0, 0, 0, 0.15)"
                                }}
                            >
                                {/* Texto */}
                                <p className="text-black font-bold text-xs text-center whitespace-nowrap" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                                    ¡Contactame para asesoría!
                                </p>
                            </div>

                            {/* Puntero de la burbuja estilo comic */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                                <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white"
                                    style={{
                                        filter: "drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.3))"
                                    }}
                                />
                                {/* Borde del puntero */}
                                <div className="absolute top-0 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black"
                                    style={{
                                        left: "-2px",
                                        top: "-2px"
                                    }}
                                />
                            </div>

                            {/* Botón de cerrar estilo comic */}
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white rounded-full border-2 border-black font-bold text-xs flex items-center justify-center shadow-lg hover:bg-emerald-500 transition-colors"
                                style={{
                                    boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.3)"
                                }}
                            >
                                ×
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatBubble;
