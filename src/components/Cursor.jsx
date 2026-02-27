import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
    // Posiciones base del ratón
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Estados visuales
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Física para el cursor principal (menos delay)
    const springConfig = { damping: 25, stiffness: 1000, mass: 0.01 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);

            const clientX = e.clientX;
            const clientY = e.clientY;

            // Actualizamos la posición del cursor siempre al movimiento real del ratón
            mouseX.set(clientX);
            mouseY.set(clientY);

            // Verificamos si estamos sobre un elemento interactivo
            const target = e.target;
            const interactive = target?.closest?.("button") || target?.closest?.("a") || target?.closest?.("input") || target?.closest?.("textarea") || target?.closest?.(".cursor-pointer");

            setIsHovered(!!interactive);
        };

        const handleMouseLeaveWindow = () => {
            setIsVisible(false);
            setIsHovered(false);
        };

        const handleMouseEnterWindow = () => {
            setIsVisible(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeaveWindow);
        document.addEventListener("mouseenter", handleMouseEnterWindow);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeaveWindow);
            document.removeEventListener("mouseenter", handleMouseEnterWindow);
        };
    }, [mouseX, mouseY, isVisible]);

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
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: "rgba(2, 223, 130, 0.9)", // Verde sólido pero un 10% transparente para que respire
            border: "2px solid rgba(255, 255, 255, 0.2)", // Ligero borde blanco/gris para dar contraste
            backdropFilter: "blur(0px)",
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[999999] hidden md:block"
            style={{ x: cursorX, y: cursorY, opacity: isVisible ? 1 : 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.2 }}
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
