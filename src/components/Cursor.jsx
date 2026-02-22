import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
    // Posiciones base del ratón
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Estados visuales
    const [isHovered, setIsHovered] = useState(false);

    // Física para el cursor principal
    const springConfig = { damping: 40, stiffness: 600, mass: 0.05 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const clientX = e.clientX;
            const clientY = e.clientY;

            // Actualizamos la posición del cursor siempre al movimiento real del ratón
            mouseX.set(clientX);
            mouseY.set(clientY);

            // Verificamos si estamos sobre un elemento interactivo
            const target = e.target;
            const interactive = target.closest("button") || target.closest("a") || target.closest("input") || target.closest("textarea");

            setIsHovered(!!interactive);
        };

        const handleMouseLeaveWindow = () => {
            setIsHovered(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeaveWindow);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeaveWindow);
        };
    }, [mouseX, mouseY]);

    // Ocultar en dispositivos móviles
    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    // Animaciones del cursor:
    // - normal: pequeño círculo verde
    // - hover: círculo más grande, fondo muy transparente para no tapar texto
    const variants = {
        default: {
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#02DF82",
            border: "0px solid transparent",
            backdropFilter: "blur(0px)",
        },
        hover: {
            width: 70,
            height: 70,
            borderRadius: "50%",
            backgroundColor: "rgba(2, 223, 130, 0.15)", // Transparencia para dejar ver el texto
            border: "1.5px solid rgba(2, 223, 130, 0.8)", // Borde definido verde
            backdropFilter: "blur(0px)", // Sin blur para legibilidad perfecta
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100]"
            style={{ x: cursorX, y: cursorY }}
        >
            <motion.div
                className="flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                variants={variants}
                animate={isHovered ? "hover" : "default"}
                transition={{
                    type: "tween",
                    ease: "easeOut",
                    duration: 0.25
                }}
            />
        </motion.div>
    );
};

export default Cursor;
